import { useEffect } from "react";
import { Node, useNodesState, useReactFlow } from "react-flow-renderer";
import { normalizeCards, Data } from "../utils/card-helpers";

const gNodes: Node[] = [
  {
    id: "web",
    type: "Card",
    data: {
      title: "WEB",
      difficulty: "beginner",
      description:
        "Web Development is very much about learning new things, and we want to provide everything you need to kickstart your journey",
    } as Data,
    position: { x: 0, y: 0 },
    // handleBounds: {
    //   source: [],
    //   target: [],
    // },
  },
  {
    id: "a",
    type: "Card",
    data: {
      title: "A",
      difficulty: "beginner",
      description:
        "Web Development is very much about learning new things, and we want to provide everything you need to kickstart your journey",
    } as Data,
    position: { x: 250, y: 250 },
    // handleBounds: {
    //   source: [],
    //   target: [],
    // },
  },
];

export const useLevelUpdatedNodesState = (
  initialNodesOnLevel: Node<Data>[]
) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(gNodes);
  const ReactFlowInstance = useReactFlow();
  // useEffect(() => {
  //   setNodes(initialNodesOnLevel);
  //   // console.log("initialNodes: ", ReactFlowInstance.getNodes());
  // }, [initialNodesOnLevel]);

  return [nodes, setNodes, onNodesChange] as const;
};
