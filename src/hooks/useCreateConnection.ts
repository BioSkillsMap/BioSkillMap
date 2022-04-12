import { Connection, Edge, useReactFlow } from "react-flow-renderer";
import { useAppDispatch } from "../../redux-hooks";
import { createConnection } from "../components/Card/card-slice";

export const useCreateConnection = () => {
  const dispatch = useAppDispatch();
  return (
    source: string,
    sourceID: string,
    target: string,
    targetID: string
  ) => {
    const newEdge = {
      id: `skillsmap_edge__${sourceID}_${targetID}`,
      sourceHandle: sourceID,
      targetHandle: targetID,
      source,
      target,
      type: "ButtonEdge",
      markerEnd: { type: "arrowclosed" },
    } as Edge;

    console.log(newEdge);
    dispatch(createConnection(newEdge));
  };
};
