import { useEffect, FC, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Handle,
  Node,
  useReactFlow,
  useUpdateNodeInternals,
} from "react-flow-renderer";
import { editingEdge$ } from "../Toolbar/Buttons/Add-Edge/AddEdge";
import { Data } from "../Tree/data/tree";
import { first } from "rxjs";
import { useAppDispatch, useAppSelector } from "../../../redux-hooks";
import { updateCard } from "./card-slice";
import { mousePosition$ } from "../Tree/Tree";
import { snapEdge, getCardMetrics } from "./snap-edge";

const CustomCard: FC<{ data: Data; id: string }> = ({ data, id }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { handlers } = useAppSelector(({ card }) => card);
  const dispatch = useAppDispatch();

  /**
   * Tracking if the user is in edge-editing mode
   */
  useEffect(() => {
    editingEdge$.subscribe(setIsEditing);
  }, []);

  const ReactFlowInstance = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  return (
    <Card
      sx={{ minWidth: 275 }}
      style={{
        maxWidth: "350px",
      }}>
      <Handle
        style={{
          position: "absolute",
          top: 0,

          // If the user is in edge-editing mode, we cover the card with a transparent
          // handler. This way they can drag edges from anywhere inside the card.
          // If not in edge-editing, the handler should not be visible
          visibility: isEditing ? "visible" : "hidden",
          width: "100%",
          height: "100%",
          borderRadius: "0",
          border: "none",
          background: "transparent",
          zIndex: "1",
        }}
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
            const { x: handleX, y: handleY } = snapEdge(
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
                id: targetCard!.id,
                handleX,
                handleY,
                targetID,
                connection: {
                  source,
                  sourceHandle,
                  target,
                  targetHandle: targetID,
                },
              })
            );

            // alert the node about the new handlers
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
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {data.level}
        </Typography>
        <Typography variant='h5' component='div'>
          {data.id}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'></Typography>
        <Typography variant='body2'>{data.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>
          <a href={data.resource}> Resource </a>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
