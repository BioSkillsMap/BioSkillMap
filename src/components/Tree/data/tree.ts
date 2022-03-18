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
        "A VERY VERY USEFUL TUTORIAL THAT WILL TEACH YOU ALL ABOUT ROCKET ASTRONOMY SCIENCE CLICK NOW END GET YOU'RE REWARD",
    } as Data,
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    type: "Card",
    data: {
      CardId: "2",
    } as Data,
    position: { x: 100, y: 100 },
  },
];

export const edges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "floating" },
  // {
  //   id: "e2-e1",
  //   source: "2",
  //   target: "1",
  //   targetHandle: "fedora",
  //   type: "floating",
  // },
];
