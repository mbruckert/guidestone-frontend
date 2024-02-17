import ReactFlow, { MiniMap, Controls, Background } from "react-flow-renderer";
import { useState, useEffect } from "react";

export default function Graph({ nodesData, edgesData }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    // Apply radial layout to nodes only on initial load or specific triggers
    const positionedNodes = layoutNodesRadially(nodesData);
    // Merge with existing nodes to preserve user-driven position changes
    const updatedNodes = positionedNodes.map((newNode) => {
      const existing = nodes.find((n) => n.id === newNode.id);
      return existing ? { ...newNode, position: existing.position } : newNode;
    });
    setNodes(updatedNodes);
    setEdges(edgesData);
  }, [nodesData, edgesData]); // Consider dependencies carefully to avoid unnecessary re-renders

  const layoutNodesRadially = (nodes) => {
    const radius = 200; // Radius for the layout
    const centerX = 500; // Center X position
    const centerY = 500; // Center Y position

    if (nodes.length === 0) return [];

    const angleStep = (2 * Math.PI) / nodes.length;

    return nodes.map((node, index) => {
      if (index === 0) {
        // Central node position
        return { ...node, position: { x: centerX, y: centerY } };
      } else {
        // Calculate position for other nodes
        const angle = angleStep * index;
        return {
          ...node,
          position: {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
          },
        };
      }
    });
  };

  const onNodesChange = (changes) => {
    setNodes((nds) =>
      nds.map((node) => {
        const change = changes.find((c) => c.id === node.id);
        return change ? { ...node, ...change } : node;
      })
    );
  };

  return (
    <div style={{ width: "1000px", height: "1000px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={false}
        paneMoveable={true}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
