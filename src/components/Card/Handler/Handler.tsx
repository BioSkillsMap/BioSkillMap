import React, { FC, useEffect, useState } from "react";
import {
  Handle,
  useReactFlow,
  useUpdateNodeInternals,
  Node,
  useStore,
} from "react-flow-renderer";
import { useAppDispatch, useAppSelector } from "../../../../redux-hooks";
import { editingEdge$ } from "../../Toolbar/Buttons/Add-Edge/AddEdge";
import { mousePosition$ } from "../../Tree/Tree";
import { first } from "rxjs";
import { getCardMetrics, snapEdge } from "./snap-edge";
import { updateCard } from "../card-slice";

const Handlers: FC<{ id: string }> = ({ id }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { handlers } = useAppSelector(({ card }) => card);
  const dispatch = useAppDispatch();
  const updateNodeInternals = useUpdateNodeInternals();
  const ReactFlowInstance = useReactFlow();
  /**
   * Tracking if the user is in edge-editing mode
   */
  useEffect(() => {
    editingEdge$.subscribe(setIsEditing);
  }, []);

  return (
    <>
      <Handle
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          borderRadius: "0",
          border: "none",
          background: "transparent",
          zIndex: 1,
          // If the user is in edge-editing mode, we cover the card with a transparent
          // handler. This way they can drag edges from anywhere inside the card.
          // If not in edge-editing, the handler should not be visible
          visibility: isEditing ? "visible" : "hidden",
        }}
        id={id}
        onConnect={({ source, sourceHandle, target, targetHandle }) => {
          mousePosition$.pipe(first()).subscribe(({ x, y }) => {
            /**
             * The cursor position inside the canvas
             */
            const cursorPosition = ReactFlowInstance.project({
              x,
              y,
            });

            const targetCard = ReactFlowInstance.getNode(target!);
            /**
             * The card's metrics necessary for placing the handler on one edge
             */
            const metrics = getCardMetrics(targetCard as Node);

            // the x and y position for snapping the handler to the closest edge
            const { x: handlerX, y: handlerY } = snapEdge(
              metrics,
              cursorPosition
            );

            // adding multiple edges on the same node requires a targetHandle,
            // that connect a handler to an edge. The targetHandle should be unique
            // and known by both the handler and the edge.
            const targetID = (Math.random() + 1).toString(36).substring(7);

            // update the node's handlers and connections
            dispatch(
              updateCard({
                card: {
                  handlerX,
                  handlerY,
                  id: targetCard!.id,
                  targetID,
                },
                connection: {
                  source,
                  sourceHandle,
                  target,
                  targetHandle: targetID,
                },
              })
            );
            updateNodeInternals(target!);
          });
        }}
        type='source'
      />
      {handlers[id]?.length
        ? handlers[id].map(({ handleX, handleY, targetID }) => (
            <Handle
              style={{
                left: handleX,
                top: handleY,
              }}
              type='target'
              id={targetID}
              key={targetID}
            />
          ))
        : null}
    </>
  );
};

export default Handlers;
