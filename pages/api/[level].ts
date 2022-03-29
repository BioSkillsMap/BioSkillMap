import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";
export const updateGraphOnLevel = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { level } = req.query as { level: string };
  const { edges, nodes } = req.body;
  prisma.graph.upsert({
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
