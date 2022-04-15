import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import ReactFlow, { Edge, Node, useReactFlow } from "react-flow-renderer";
import { prisma } from "../../prisma/prisma";
import Toolbar from "../../src/components/Toolbar/Toolbar";
import styles from "../../styles/Home.module.css";
const Tree = dynamic(() => import("../../src/components/Tree/Tree"), {
  ssr: false,
});

import CustomizeCard from "../../src/widgets/CustomizeCard";
import { createTheme, Fab } from "@mui/material";
import { AiOutlineUpload } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import {
  HandlerStack,
  rebuildHandlers,
} from "../../src/components/Card/card-slice";

const Maps: FC<{ edges: Edge[]; nodes: Node[]; handlers: HandlerStack }> = ({
  nodes,
  edges,
  handlers,
}) => {
  const router = useRouter();
  const ReactFlowInstance = useReactFlow();
  const { card } = useAppSelector((ev) => ev);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(rebuildHandlers(handlers));
  }, []);

  return (
    <div className={styles.container}>
      <Toolbar></Toolbar>
      <Tree gEdges={edges} gNodes={nodes}></Tree>
      <CustomizeCard></CustomizeCard>
      <Fab
        aria-label='add'
        sx={{
          position: "absolute",
          right: "2rem",
          top: "2rem",
          fontSize: "1.7rem",
          backgroundColor: "rgb(35, 36, 43)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgb(35, 36, 43)",
          },
        }}
        onClick={() => {
          console.log((router.query.level as string) || "web-development", {
            nodes: ReactFlowInstance.getNodes(),
            edges: ReactFlowInstance.getEdges(),
            handlers: card.handlers,
          });

          // the changes are made on the applyUpdates function inside the react-flow-renderer module.
          // applyUpdates was not picking up on the handlers, only the dimensions.
          fetch(`/api/${(router.query.level as string) || "web-development"}`, {
            method: "POST",
            body: JSON.stringify({
              nodes: JSON.stringify(ReactFlowInstance.getNodes()),
              edges: JSON.stringify(ReactFlowInstance.getEdges()),
              handlers: JSON.stringify(card.handlers),
            }),
          });
        }}>
        <AiOutlineUpload />
      </Fab>
      <div className={styles.roadmap__container}></div>
    </div>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { level } = context.query as { level: string };
  const graph = [];
  const nodes = JSON.parse(graph?.nodes || ("[]" as string));
  const edges = JSON.parse(graph?.edges || ("[]" as string));
  const handlers = JSON.parse(graph?.handlers || ("{}" as string));
  return {
    props: {
      edges,
      nodes,
      handlers,
    },
  };
};

export default Maps;
