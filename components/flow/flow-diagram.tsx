import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  BaseEdge,
  EdgeText,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useChatStore } from "../chat/chat-store";
import { useEffect } from "react";
import ELK from "elkjs/lib/elk.bundled.js";

const elk = new ELK();

export const ANALYSIS_NODE_WIDTH = 180;
export const ANALYSIS_NODE_HEIGHT = 40;

export function FlowDiagram() {
  const { chats, activeChatId } = useChatStore();
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  useEffect(() => {
    const processGraph = async () => {
      const activeChat = chats.find((c) => c._id === activeChatId);
      const graph = activeChat?.messages.findLast((msg) => msg.graph)?.graph;

      if (!graph) {
        setNodes([]);
        setEdges([]);
        return;
      }

      try {
        // 1. Prepare ELK Input
        const elkGraph = {
          id: "root",
          children: graph.nodes.map((node) => ({
            ...node,
            id: node.id,
            width: ANALYSIS_NODE_WIDTH,
            height: ANALYSIS_NODE_HEIGHT,
          })),
          edges: graph.edges.map((edge) => ({
            id: edge.id,
            sources: [edge.source],
            targets: [edge.target],
          })),
          layoutOptions: {
            "elk.algorithm": "layered",
            "elk.direction": "DOWN",
            "elk.spacing.nodeNode": "40",
            "elk.layered.spacing.nodeNodeBetweenLayers": "40",
          },
        };

        // 2. Run ELK Layout
        const layout = await elk.layout(elkGraph);

        // 3. Transform Nodes
        const nodes =
          layout.children?.map((elkNode) => ({
            id: elkNode.id,
            position: { x: elkNode.x, y: elkNode.y },
            data: { label: elkNode.data.label },
            style: {
              width: ANALYSIS_NODE_WIDTH,
              height: ANALYSIS_NODE_HEIGHT,
            },
            type: "default",
          })) || [];

        // 4. Transform Edges
        const edges =
          layout.edges?.map((elkEdge) => ({
            id: elkEdge.id,
            source: elkEdge.sources[0],
            target: elkEdge.targets[0],
          })) || [];

        setNodes(nodes);
        setEdges(edges);
      } catch (error) {
        console.error("ELK Layout Error:", error);
        setNodes([]);
        setEdges([]);
      }
    };

    processGraph();
  }, [activeChatId, chats]);

  return (
    <div className="h-full w-full bg-slate-900">
      <ReactFlow nodes={nodes} edges={edges} fitView minZoom={0.1}>
        <Background color="#64748b" gap={16} />
      </ReactFlow>
    </div>
  );
}
