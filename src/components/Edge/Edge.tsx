import React, { FC, MouseEvent } from "react";
import {
  Edge,
  EdgeProps,
  getBezierPath,
  getEdgeCenter,
  useReactFlow,
  getBezierEdgeCenter,
  getSimpleBezierEdgeCenter,
  getSimpleBezierPath,
} from "react-flow-renderer";
import edge__styles from "./edge.module.css";
const foreignObjectSize = 40;

const removeEdges = (event: MouseEvent, edges: Edge[], id: string) => {
  event.stopPropagation();
  return edges.filter((edge) => edge.id !== id);
};

const CustomEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const edgePath = getSimpleBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [edgeCenterX, edgeCenterY] = getSimpleBezierEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const edges = useReactFlow().getEdges();
  const setEdges = useReactFlow().setEdges;
  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className={edge__styles.edgebuttonforeignobject}
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div>
          <button
            className={edge__styles.edgebutton}
            onClick={(event) => setEdges(removeEdges(event, edges, id))}
          >
            ×
          </button>
        </div>
      </foreignObject>
    </>
  );
};
export default CustomEdge;
