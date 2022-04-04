import { prisma } from "./prisma";
import { Edge, Node } from "react-flow-renderer";
import type { Data } from "../utils/card-helpers";

const nodes: Node[] = [
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
    handleBounds: {
      source: [],
      target: [],
    },
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
    handleBounds: {
      source: [],
      target: [],
    },
  },
];

const edges: Edge[] = [];

export default async function seed() {
  await prisma.graph.deleteMany({});
  const graph = await prisma.graph.createMany({
    data: [
      {
        level: "web",
        edges: JSON.stringify(edges),
        nodes: JSON.stringify(nodes),
        handlers: JSON.stringify({}),
      },
    ],
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
