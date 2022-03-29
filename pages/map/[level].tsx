import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import React, { FC } from "react";
import { Edge, Node, ReactFlowProvider } from "react-flow-renderer";
import { prisma } from "../../prisma/prisma";
import Toolbar from "../../src/components/Toolbar/Toolbar";
import styles from "../../styles/Home.module.css";
const Tree = dynamic(() => import("../../src/components/Tree/Tree"), {
  ssr: false,
});
const Maps: FC<{ edges: Edge[]; nodes: Node[] }> = ({ nodes, edges }) => {
  return (
    <div className={styles.container}>
      <Toolbar></Toolbar>
      <ReactFlowProvider>
        <Tree gEdges={edges} gNodes={nodes}></Tree>
      </ReactFlowProvider>
      <div className={styles.roadmap__container}></div>
    </div>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { level } = context.query as { level: string };
  const graph = await prisma.graph.findFirst({
    where: {
      level,
    },
  });
  const nodes = JSON.parse(graph?.nodes || ("[]" as string));
  const edges = JSON.parse(graph?.edges || ("[]" as string));
  return {
    props: {
      edges,
      nodes,
    },
  };
};

export default Maps;
