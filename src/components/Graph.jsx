import React from "react";
import { ForceGraph2D } from "react-force-graph";
import Profile from "../assets/profile.jpeg";

const graphData = {
  nodes: [
    { id: "start_node", name: "Start Node", color: "lightblue" },
    { id: "math_base_node", name: "Math", color: "lightgreen" },
    { id: "biology_base_node", name: "Biology", color: "lightcoral" },
    { id: "chemistry_base_node", name: "Chemistry", color: "lightpink" },
    {
      id: "comp_sci_base_node",
      name: "Computer Science",
      color: "lightyellow",
    },
    { id: "physics_base_node", name: "Physics", color: "lightgrey" },
    { id: "derivatives", name: "Derivatives", color: "lavender" },
    { id: "antiderivatives", name: "Antiderivatives", color: "lavenderblush" },
    {
      id: "indefiniteintegrals",
      name: "Indefinite Integrals",
      color: "lemonchiffon",
    },
    { id: "integrals", name: "Integrals", color: "lightsalmon" },
  ],
  links: [
    { source: "start_node", target: "math_base_node" },
    { source: "start_node", target: "biology_base_node" },
    { source: "start_node", target: "chemistry_base_node" },
    { source: "start_node", target: "physics_base_node" },
    { source: "start_node", target: "comp_sci_base_node" },
    { source: "math_base_node", target: "derivatives" },
    // Repeat for all edges
    // Note: Duplicate edges in your input are omitted for brevity
    { source: "derivatives", target: "antiderivatives" },
    { source: "derivatives", target: "integrals" },
    { source: "antiderivatives", target: "indefiniteintegrals" },
    { source: "indefiniteintegrals", target: "integrals" },
  ],
};

function Graph() {
  return (
    <ForceGraph2D
      graphData={graphData}
      nodeLabel="name"
      nodeAutoColorBy="color"
      nodeCanvasObject={(node, ctx, globalScale) => {
        if (node.id === "start_node") {
          const size = 24; // Customize the size of the image
          const img = new Image();
          img.src = Profile;
          img.onload = () => {
            ctx.drawImage(
              img,
              node.x - size / 2,
              node.y - size / 2,
              size,
              size
            );
          };
        } else {
          const label = node.name;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(
            (n) => n + fontSize * 0.2
          ); // some padding
          const iconSize = fontSize * 1.5; // Customize icon size

          // Draw the circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, iconSize, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color;
          ctx.fill();

          // Draw the icon
          // Here, you would render the icon - this is a placeholder for the actual drawing code

          // Draw the text
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "black";
          ctx.fillText(label, node.x, node.y + iconSize + fontSize * 0.5);
        }
      }}
      linkDirectionalParticles={4}
      linkDirectionalParticleSpeed={(d) => d.value * 0.001}
    />
  );
}

export default Graph;
