import React, { useEffect, useState, useRef } from "react";
import { ForceGraph2D } from "react-force-graph";
import Profile from "../assets/profile.jpeg";
import MathIcon from "../assets/math.svg";
import BiologyIcon from "../assets/biology.svg";
import ChemistryIcon from "../assets/chemistry.svg";
import ComputerScienceIcon from "../assets/computerscience.svg";
import PhysicsIcon from "../assets/physics.svg";

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
    { id: "derivatives_node", name: "Derivatives", color: "#ECECEC" },
    { id: "integrals_node", name: "Integrals", color: "#ECECEC" },
    // ... other nodes
  ],
  links: [
    { source: "start_node", target: "math_base_node" },
    { source: "start_node", target: "biology_base_node" },
    { source: "start_node", target: "chemistry_base_node" },
    { source: "start_node", target: "physics_base_node" },
    { source: "start_node", target: "comp_sci_base_node" },
    { source: "math_base_node", target: "derivatives_node" },
    { source: "derivatives_node", target: "integrals_node" },
  ],
};

const iconMap = {
  math_base_node: MathIcon,
  biology_base_node: BiologyIcon,
  chemistry_base_node: ChemistryIcon,
  comp_sci_base_node: ComputerScienceIcon,
  physics_base_node: PhysicsIcon,
};

const baseNodeIds = [
  "start_node",
  "math_base_node",
  "biology_base_node",
  "chemistry_base_node",
  "comp_sci_base_node",
  "physics_base_node",
];

function Graph() {
  const [profileImg, setProfileImg] = useState(null);
  const [icons, setIcons] = useState({});

  const forceGraphRef = useRef();

  useEffect(() => {
    // Access the d3 force simulation
    const forceSimulation = forceGraphRef.current.d3Force("charge");
    if (forceSimulation) {
      forceSimulation.strength(-400); // increase repulsion strength
      forceGraphRef.current.d3ReheatSimulation(); // reheat the simulation for changes to take effect
    }
  }, [forceGraphRef]);

  useEffect(() => {
    // Load the profile image
    const img = new Image();
    img.src = Profile;
    img.onload = () => setProfileImg(img);

    // Load SVG icons
    const loadedIcons = {};
    Object.entries(iconMap).forEach(([nodeId, iconPath]) => {
      const icon = new Image();
      icon.src = iconPath;
      icon.onload = () => {
        loadedIcons[nodeId] = icon;
        setIcons(loadedIcons);
      };
    });
  }, []);

  const nodeCanvasObject = (node, ctx, globalScale) => {
    const label = node.name;
    const fontSize = 12 / globalScale; // Adjust font size to scale with zoom
    ctx.font = `${fontSize}px Sans-Serif`;

    // Calculate text width and height for padding and background
    const textWidth = ctx.measureText(label).width + fontSize * 0.8; // Adding some padding
    const textHeight = fontSize * 1.4; // Height of the text with some padding

    if (baseNodeIds.includes(node.id)) {
      // Base nodes and start node
      const size = 80 / globalScale;
      const iconSize = size * 0.4; // Make icons a bit smaller than the node itself

      // Draw the node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, size / 2, 0, Math.PI * 2, false);
      ctx.fillStyle = node.color;
      ctx.fill();

      // Draw the profile image for the start node
      if (node.id === "start_node" && profileImg) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, size / 2, 0, Math.PI * 2, false);
        ctx.clip();
        ctx.drawImage(
          profileImg,
          node.x - size / 2,
          node.y - size / 2,
          size,
          size
        );
        ctx.restore();
      } else {
        // Draw the icon for base nodes
        const icon = icons[node.id];
        if (icon) {
          ctx.drawImage(
            icon,
            node.x - iconSize / 2,
            node.y - iconSize / 2,
            iconSize,
            iconSize
          );
          // Draw the text
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "black";
          ctx.fillText(node.name, node.x, node.y + size / 2 + fontSize);
        }
      }
    } else {
      // Define scale factors
      const scaleFactor = 2; // Increase this to make the node and text bigger
      const fontSizeScaleFactor = 1.5; // Increase this to make the font size bigger

      // Adjust fontSize, textWidth, and textHeight according to the scale factors
      var fontSizeTemp = fontSize * fontSizeScaleFactor;
      var textWidthTemp = textWidth * scaleFactor;
      var textHeightTemp = textHeight * scaleFactor;

      // Adjust borderRadius based on the new fontSize
      const borderRadius = fontSizeTemp * 0.8;
      const rectX = node.x - textWidthTemp / 2;
      const rectY = node.y - textHeightTemp / 2;

      ctx.beginPath();
      ctx.moveTo(rectX + borderRadius, rectY);
      ctx.lineTo(rectX + textWidthTemp - borderRadius, rectY);
      ctx.quadraticCurveTo(
        rectX + textWidthTemp,
        rectY,
        rectX + textWidthTemp,
        rectY + borderRadius
      );
      ctx.lineTo(rectX + textWidthTemp, rectY + textHeightTemp - borderRadius);
      ctx.quadraticCurveTo(
        rectX + textWidthTemp,
        rectY + textHeightTemp,
        rectX + textWidthTemp - borderRadius,
        rectY + textHeightTemp
      );
      ctx.lineTo(rectX + borderRadius, rectY + textHeightTemp);
      ctx.quadraticCurveTo(
        rectX,
        rectY + textHeightTemp,
        rectX,
        rectY + textHeightTemp - borderRadius
      );
      ctx.lineTo(rectX, rectY + borderRadius);
      ctx.quadraticCurveTo(rectX, rectY, rectX + borderRadius, rectY);
      ctx.closePath();
      ctx.fillStyle = node.color;
      ctx.fill();

      // Apply the new fontSize for the text
      ctx.font = `${fontSizeTemp}px Arial`; // Set the font with the new fontSizeTemp
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "black";
      ctx.fillText(label, node.x, node.y);
    }
  };

  return (
    <ForceGraph2D
      ref={forceGraphRef}
      graphData={graphData}
      nodeCanvasObject={nodeCanvasObject}
      nodeLabel="name"
      nodeAutoColorBy="color"
      linkDirectionalParticles={4}
      linkDirectionalParticleSpeed={(d) => d.value * 0.001}
    />
  );
}

export default Graph;
