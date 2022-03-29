import { useObservable } from "observable-hooks";
import { FC, useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  NodeTypes,
  ConnectionMode,
  Node,
  ReactFlowProvider,
  useReactFlow,
  Edge,
} from "react-flow-renderer";
import { Subject, withLatestFrom } from "rxjs";
import { trigger$ } from "../Toolbar/Buttons/Add-Card/AddCard";
import CustomCard from "../Card/Card";
import { useAppSelector } from "../../../redux-hooks";
import { useLevelUpdatedNodesState } from "../../../hooks/useLevelUpdatedNodesState";
import { useLevelUpdatedEdgesState } from "../../../hooks/useLevelUpdatedEdgesState";

const nodeTypes: NodeTypes = {
  Card: CustomCard,
};

export interface Data {
  id: string;
  CardId: string;
  resource: string;
  level: "beginner" | "intermediate" | "advanced" | "Roxy";
  description: string;
}

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

  const handleAddFile = (nodes: Node<Data>[]) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: "Card",
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        description: Cards[nodes.length % 3].description,
        id: Cards[nodes.length % 3].id,
        level: Cards[nodes.length % 3].level,
        resource: Cards[nodes.length % 3].resource,
      } as Data,
    } as Node<Data>;
    setNodes((nodes) => {
      console.log([...nodes, newNode]);
      return [...nodes, newNode];
    });
  };

  const nodes$ = useObservable((nodes$) => nodes$, [nodes]);
  useEffect(() => {
    trigger$.pipe(withLatestFrom(nodes$)).subscribe(([_, [nodes]]) => {
      handleAddFile(nodes);
    });
  }, []);

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
