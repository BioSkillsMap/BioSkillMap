import { useEffect } from "react";
import { Node, useNodesState } from "react-flow-renderer";

export const useLevelUpdatedNodesState = (initialNodesOnLevel: Node[]) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesOnLevel);

  useEffect(() => {
    setNodes(initialNodesOnLevel);
  }, [initialNodesOnLevel]);

  return [nodes, setNodes, onNodesChange] as const;
};
