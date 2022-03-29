import { prisma } from "./prisma";
import { Edge, Node } from "react-flow-renderer";
import type { Data } from "../src/components/Tree/Tree";

const nodes: Node[] = [
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

const edges: Edge[] = [];

export default async function seed() {
  // await prisma.graph.deleteMany({});
  const graph = await prisma.graph.createMany({
    data: [
      {
        level: "first-level",
        edges: JSON.stringify(edges),
        nodes: JSON.stringify(nodes),
      },
      {
        level: "1",
        edges: JSON.stringify([]),
        nodes: JSON.stringify([]),
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
