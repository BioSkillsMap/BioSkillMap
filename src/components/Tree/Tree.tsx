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
} from "react-flow-renderer";
import CustomCard from "../Card/Card";
import { useAppSelector } from "../../../redux-hooks";
import { useLevelUpdatedNodesState } from "../../../hooks/useLevelUpdatedNodesState";
import { useLevelUpdatedEdgesState } from "../../../hooks/useLevelUpdatedEdgesState";
import { useObservableState } from "observable-hooks";
import { Nodes$ } from "../../widgets/CustomizeCard";
import {
  sourceHandlerPosition$,
  targetHandlerPosition$,
} from "../Card/Handler/handlers-position";
// import CustomEdge from "../Edge/Edge";

const nodeTypes: NodeTypes = {
  Card: CustomCard,
};

// const edgeTypes: EdgeTypes = {
//   type: CustomEdge,
// };

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
      onNodesChange={onNodesChange}
      onConnectStart={(e) => {
        sourceHandlerPosition$.next({
          x: e.pageX - mapRef.current?.getBoundingClientRect().x,
          y: e.pageY - mapRef.current?.getBoundingClientRect().y,
        });
      }}
      // onConnect={onConnect}
      onEdgesChange={onEdgesChange}
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
      attributionPosition="top-right"
    >
      <Controls />
      <Background
        style={{
          backgroundColor: "#414565",
        }}
        color="white"
        gap={16}
      />
    </ReactFlow>
  );
};

export default OverviewFlow;
