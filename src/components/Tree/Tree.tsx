import { FC, useEffect, useRef } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  NodeTypes,
  ConnectionMode,
  Node,
  Edge,
} from "react-flow-renderer";
import { Subject } from "rxjs";
import CustomCard from "../Card/Card";
import { useAppSelector } from "../../../redux-hooks";
import { useLevelUpdatedNodesState } from "../../../hooks/useLevelUpdatedNodesState";
import { useLevelUpdatedEdgesState } from "../../../hooks/useLevelUpdatedEdgesState";
import { useObservableState } from "observable-hooks";
import { Nodes$ } from "../../widgets/CustomizeCard";

const nodeTypes: NodeTypes = {
  Card: CustomCard,
};

export const mousePosition$ = new Subject<{ x: number; y: number }>();
const OverviewFlow: FC<{ gNodes: Node[]; gEdges: Edge[] }> = ({
  gNodes,
  gEdges,
}) => {
  const [nodes, setNodes, onNodesChange] = useLevelUpdatedNodesState(gNodes);
  const [edges, setEdges, onEdgesChange] = useLevelUpdatedEdgesState(gEdges);

  const { connection } = useAppSelector(({ card }) => card);
  useEffect(() => {
    setEdges((edges) => {
      return addEdge(connection, edges);
    });
  }, [connection, setEdges]);
  const newNode = useObservableState(Nodes$);

  useEffect(() => {
    newNode
      ? setNodes((nodes) => {
          return [...nodes, newNode];
        })
      : null;
  }, [newNode]);

  // useEffect(() => {
  //   console.log(...nodes);
  // }, [nodes]);

  const mapRef = useRef<HTMLDivElement>(null);
  return (
    <ReactFlow
      connectionMode={"loose" as ConnectionMode}
      nodes={nodes}
      edges={edges}
      onNodesChange={(nodeChanges) => {
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
