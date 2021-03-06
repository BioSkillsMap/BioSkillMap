import { FC, useEffect, useRef } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  NodeTypes,
  ConnectionMode,
  Node,
  Edge,
  ConnectionLineType,
  EdgeTypes,
} from "react-flow-renderer";
import CustomCard from "../Card/Card";
import { useAppSelector } from "../../../redux-hooks";
import { useLevelUpdatedNodesState } from "@hooks/useLevelUpdatedNodesState";
import { useLevelUpdatedEdgesState } from "@hooks/useLevelUpdatedEdgesState";
import { useObservableState } from "observable-hooks";
import { Nodes$ } from "../../widgets/CustomizeCard";
import {
  sourceHandlerPosition$,
  targetHandlerPosition$,
} from "../Card/Handler/handlers-position";
import CustomEdge from "../Edge/Edge";
// import CustomEdge from "../Edge/Edge";

const nodeTypes: NodeTypes = {
  Card: CustomCard,
};

const edgeTypes: EdgeTypes = {
  ButtonEdge: CustomEdge,
};

const OverviewFlow: FC<{ gNodes: Node[]; gEdges: Edge[] }> = ({
  gNodes,
  gEdges,
}) => {
  const [nodes, setNodes, onNodesChange] = useLevelUpdatedNodesState(gNodes);
  const [edges, setEdges, onEdgesChange] = useLevelUpdatedEdgesState(gEdges);
  const newEdge = useAppSelector(({ card }) => card.edge);
  useEffect(() => {
    setEdges((edges) => addEdge(newEdge, edges));
  }, [newEdge, setEdges]);

  useEffect(() => {
    console.log(edges);
  }, [edges]);

  const newNode = useObservableState(Nodes$);
  useEffect(() => {
    newNode
      ? setNodes((nodes) => {
          return [...nodes, newNode];
        })
      : null;
  }, [newNode]);

  const mapRef = useRef<HTMLDivElement>(null);
  return (
    <ReactFlow
      connectionMode={"loose" as ConnectionMode}
      nodes={nodes}
      edges={edges}
      onNodesChange={(c) => {
        console.log(c);
        onNodesChange(c);
      }}
      onConnectStart={(e) => {
        sourceHandlerPosition$.next({
          x: e.pageX - mapRef.current?.getBoundingClientRect().x,
          y: e.pageY - mapRef.current?.getBoundingClientRect().y,
        });
      }}
      // onConnect={onConnect}
      onEdgesChange={(e) => {
        console.log("CHANGES TO BE APPLIED: ", e);
        onEdgesChange(e);
      }}
      onEdgesDelete={(e) => {
        console.log("EDGE TO DELETE:", e);
      }}
      ref={mapRef}
      onConnectEnd={(e) => {
        targetHandlerPosition$.next({
          x: e.pageX - mapRef.current?.getBoundingClientRect().x,
          y: e.pageY - mapRef.current?.getBoundingClientRect().y,
        });
      }}
      fitView
      nodeTypes={nodeTypes}
      connectionLineType={ConnectionLineType.SimpleBezier}
      attributionPosition='top-right'
      edgeTypes={edgeTypes}>
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
