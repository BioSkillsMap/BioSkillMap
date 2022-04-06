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
      sourceHandle: sourceID,
      targetHandle: targetID,
      source,
      target,
      type: "smoothstep",
    } as Edge;

    dispatch(createConnection(newEdge));
  };
};
