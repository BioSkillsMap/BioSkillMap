import { useObservable } from "observable-hooks";
import { useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  NodeTypes,
  ConnectionMode,
  Node,
} from "react-flow-renderer";
import { withLatestFrom } from "rxjs";
import { trigger$ } from "../Toolbar/Buttons/Add-Card/AddCard";
import { insertEdges$ } from "../Toolbar/Buttons/Add-Edge/AddEdge";
import CustomCard from "../Card/Card";

import {
  nodes as initialNodes,
  edges as initialEdges,
  Data,
} from "./data/tree";

const nodeTypes: NodeTypes = {
  Card: CustomCard,
};

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const handleAddFile = (nodes: Node<Data>[]) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: "Card",
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        description: "<3 Rox",
        id: "Web Developer",
        level: "Roxy",
        resource: "https://youtu.be/XUZFdXlr53k",
      } as Data,
    } as Node<Data>;
    setNodes((nodes) => [...nodes, newNode]);
  };

  const nodes$ = useObservable((nodes$) => nodes$, [nodes]);
  useEffect(() => {
    trigger$.pipe(withLatestFrom(nodes$)).subscribe(([_, [nodes]]) => {
      handleAddFile(nodes);
    });
  }, []);
  const onConnect = (connection: Connection) => {
    console.log(connection);
    setEdges((eds) => addEdge(connection, eds));
  };

  return (
    <ReactFlow
      connectionMode={"loose" as ConnectionMode}
      nodes={nodes}
      edges={edges}
      onNodesChange={(nodeChanges) => {
        onNodesChange(nodeChanges);
        insertEdges$.next(false);
      }}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      nodeTypes={nodeTypes}
      attributionPosition='top-right'>
      <Controls />
      <Background
        style={{
          backgroundColor: "#414565",
        }}
        color='white'
        gap={16}
      />
    </ReactFlow>
  );
};

export default OverviewFlow;
