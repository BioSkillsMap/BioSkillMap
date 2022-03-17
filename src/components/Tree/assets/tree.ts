import React from "react";
import { Edge, Node } from "react-flow-renderer";
import BasicCard from "../../Card/Card";

export const nodes: Node[] = [
  {
    id: "1",
    type: "Card",
    data: {
      label: "1",
    },
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    type: "Card",
    data: {
      label: "2",
    },
    position: { x: 100, y: 100 },
  },
];

export const edges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];
