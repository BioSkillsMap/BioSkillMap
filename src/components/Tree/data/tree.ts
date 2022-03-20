import { Dispatch, SetStateAction } from "react";
import { Connection, Edge, Node } from "react-flow-renderer";

export interface Data {
  id: string;
  CardId: string;
  resource: string;
  level: "beginner" | "intermediate" | "advanced" | "Roxy";
  description: string;
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>;
}

export const nodes: Node[] = [
  {
    id: "1",
    type: "Card",
    data: {
      id: "Web Development",
      CardId: "1",
      resource: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      level: "beginner",
      description:
        "Web Development is very much about learning new things, and we want to provide everything you need to kickstart your journey",
    } as Data,
    position: { x: 0, y: 0 },
  },
];

export const edges: Edge[] = [
  // { id: "e1-2", source: "1", target: "2", type: "floating" },
  // {
  //   id: "e2-e1",
  //   source: "2",
  //   target: "1",
  //   targetHandle: "fedora",
  //   type: "floating",
  // },
];
