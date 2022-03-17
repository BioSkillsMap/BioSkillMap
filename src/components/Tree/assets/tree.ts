import React from "react";
import { Edge, Node } from "react-flow-renderer";
import BasicCard from "../../Card/Card";

export interface Data {
  id: string;
  resource: string;
  level: "beginner" | "intermediate" | "advanced" | "Roxy";
  description: string;
}

export const nodes: Node[] = [
  {
    id: "1",
    type: "Card",
    data: {
      id: "Web Development",
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
    data: {} as Data,
    position: { x: 100, y: 100 },
  },
];

export const edges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];
