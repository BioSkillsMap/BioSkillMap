import { prisma } from "./prisma";
import { Edge, Node } from "react-flow-renderer";
import type { Data } from "../utils/create-card";

const nodes: Node[] = [
  {
    id: "web-development",
    type: "Card",
    data: {
      difficulty: "beginner",
      description:
        "Web Development is very much about learning new things, and we want to provide everything you need to kickstart your journey",
    } as Data,
    position: { x: 0, y: 0 },
  },
];

const edges: Edge[] = [];

export default async function seed() {
  await prisma.graph.deleteMany({});
  const graph = await prisma.graph.createMany({
    data: [
      {
        level: "web-development",
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
