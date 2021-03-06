import { Node, Edge, OnConnect, OnConnectStart, OnConnectStop, OnConnectEnd, CoordinateExtent, OnNodesChange, OnEdgesChange, ConnectionMode, SnapGrid, DefaultEdgeOptions, FitViewOptions, OnNodesDelete, OnEdgesDelete } from '../../types';
interface StoreUpdaterProps {
    nodes?: Node[];
    edges?: Edge[];
    defaultNodes?: Node[];
    defaultEdges?: Edge[];
    onConnect?: OnConnect;
    onConnectStart?: OnConnectStart;
    onConnectStop?: OnConnectStop;
    onConnectEnd?: OnConnectEnd;
    nodesDraggable?: boolean;
    nodesConnectable?: boolean;
    minZoom?: number;
    maxZoom?: number;
    nodeExtent?: CoordinateExtent;
    onNodesChange?: OnNodesChange;
    onEdgesChange?: OnEdgesChange;
    elementsSelectable?: boolean;
    connectionMode?: ConnectionMode;
    snapToGrid?: boolean;
    snapGrid?: SnapGrid;
    translateExtent?: CoordinateExtent;
    connectOnClick: boolean;
    defaultEdgeOptions?: DefaultEdgeOptions;
    fitView?: boolean;
    fitViewOptions?: FitViewOptions;
    onNodesDelete?: OnNodesDelete;
    onEdgesDelete?: OnEdgesDelete;
}
declare const StoreUpdater: ({ nodes, edges, defaultNodes, defaultEdges, onConnect, onConnectStart, onConnectStop, onConnectEnd, nodesDraggable, nodesConnectable, minZoom, maxZoom, nodeExtent, onNodesChange, onEdgesChange, elementsSelectable, connectionMode, snapGrid, snapToGrid, translateExtent, connectOnClick, defaultEdgeOptions, fitView, fitViewOptions, onNodesDelete, onEdgesDelete, }: StoreUpdaterProps) => null;
export default StoreUpdater;
