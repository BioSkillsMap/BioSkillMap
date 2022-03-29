import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";
const updateGraphOnLevel = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { level } = req.query as { level: string };
  const { edges, nodes } = JSON.parse(req.body);
  console.log(edges, nodes);
  await prisma.graph.upsert({
    where: {
      level,
    },
    create: {
      level,
      edges,
      nodes,
    },
    update: {
      edges,
      nodes,
    },
  });
};

export default updateGraphOnLevel;
