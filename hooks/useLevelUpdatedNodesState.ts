import { useEffect } from "react";
import { Node, useNodesState } from "react-flow-renderer";
import { createCard, Data } from "../utils/create-card";

export const useLevelUpdatedNodesState = (
  initialNodesOnLevel: Node<Data>[]
) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesOnLevel);

  useEffect(() => {
    const newNodes = initialNodesOnLevel.map((node) =>
      createCard(node.data.title, node.data.difficulty)
    );
    console.log(newNodes);
    setNodes(newNodes);
  }, [initialNodesOnLevel]);

  return [nodes, setNodes, onNodesChange] as const;
};
