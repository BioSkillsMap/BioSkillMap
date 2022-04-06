import { useEffect } from "react";
import { Node, useNodesState, useReactFlow } from "react-flow-renderer";
import { normalizeCards, Data } from "../utils/card-helpers";

export const useLevelUpdatedNodesState = (
  initialNodesOnLevel: Node<Data>[]
) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesOnLevel);
  useEffect(() => {
    setNodes(initialNodesOnLevel);
  }, [initialNodesOnLevel]);

  return [nodes, setNodes, onNodesChange] as const;
};
