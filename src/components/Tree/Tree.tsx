import { useObservable } from "observable-hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  NodeTypes,
  ConnectionMode,
  Node,
} from "react-flow-renderer";
import { Subject, withLatestFrom } from "rxjs";
import { trigger$ } from "../Toolbar/Buttons/Add-Card/AddCard";
import CustomCard from "../Card/Card";
import { newEdge$ } from "../Card/Card";
import {
  nodes as initialNodes,
  edges as initialEdges,
  Data,
} from "./data/tree";

const nodeTypes: NodeTypes = {
  Card: CustomCard,
};

const Cards = [
  {
    description: "The best HTML introduction I have ever seen",
    id: "Web Development",
    level: "beginner",
    resource: "https://youtu.be/XUZFdXlr53k",
  },
  {
    description: "The best CSS introduction I have ever seen",
    id: "Web Development",
    level: "beginner",
    resource: "https://youtu.be/XUZFdXlr53k",
  },
  {
    description: "The best JAVASCRIPT introduction I have ever seen",
    id: "Web Development",
    level: "beginner",
    resource: "https://youtu.be/XUZFdXlr53k",
  },
] as Data[];

export const mousePosition$ = new Subject<{ x: number; y: number }>();
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
        description: Cards[(nodes.length - 1) % 3].description,
        id: Cards[(nodes.length - 1) % 3].id,
        level: Cards[(nodes.length - 1) % 3].level,
        resource: Cards[(nodes.length - 1) % 3].resource,
      } as Data,
    } as Node<Data>;
    setNodes((nodes) => [...nodes, newNode]);
  };

  const nodes$ = useObservable((nodes$) => nodes$, [nodes]);
  useEffect(() => {
    trigger$.pipe(withLatestFrom(nodes$)).subscribe(([_, [nodes]]) => {
      handleAddFile(nodes);
    });
    newEdge$.subscribe((connection) => {
      setEdges((currentEdges) => {
        const newEdges = addEdge(connection, currentEdges);
        return newEdges;
      });
    });
  }, []);

  // const onConnect = useCallback(
  //   (connection) => {
  //     console.log(connection);
  //     return setEdges((eds) => addEdge(connection, eds));
  //   },
  //   [setEdges]
  // );
  const mapRef = useRef<HTMLDivElement>(null);
  return (
    <ReactFlow
      connectionMode={"loose" as ConnectionMode}
      nodes={nodes}
      edges={edges}
      onNodesChange={(nodeChanges) => {
        console.log(nodeChanges);
        onNodesChange(nodeChanges);
      }}
      // onConnect={onConnect}
      onEdgesChange={(r) => {
        onEdgesChange(r);
      }}
      ref={mapRef}
      onConnectEnd={(e) => {
        mousePosition$.next({
          x: e.pageX - mapRef.current?.getBoundingClientRect().x,
          y: e.pageY - mapRef.current?.getBoundingClientRect().y,
        });
      }}
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
