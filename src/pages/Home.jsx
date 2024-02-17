import react, { useState, useEffect } from "react";
import Graph from "../components/Graph"; // Adjust the import path according to your project structure
import { TextInput, Button } from "@primer/react";
import GeneratingPopup from "../components/GeneratingPopup";
import ReadyLessonPopup from "../components/ReadyLessonPopup";
import QuizPopup from "../components/QuizPopup";

export default function Home() {
  // const nodes = [
  //   { id: "1", data: { label: "You" } },
  //   { id: "2", data: { label: "Math" } },
  //   { id: "3", data: { label: "Computer Science" } },
  //   { id: "4", data: { label: "Biology" } },
  //   { id: "5", data: { label: "Physics" } },
  //   { id: "6", data: { label: "Chemistry" } },
  // ];

  // const edges = [
  //   { id: "e1-2", source: "1", target: "2", type: "straight" },
  //   { id: "e1-3", source: "1", target: "3", type: "straight" },
  //   { id: "e1-4", source: "1", target: "4", type: "straight" },
  //   { id: "e1-5", source: "1", target: "5", type: "straight" },
  //   { id: "e1-6", source: "1", target: "6", type: "straight" },
  // ];

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [popupState, setPopupState] = useState({ state: "closed" });

  useEffect(() => {
    fetch(
      "https://guidestone-functions.azurewebsites.net/api/getGraphStructure",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        var tempNodes = [];
        for (let i = 0; i < data.nodes.length; i++) {
          var tempNode = {};
          tempNode.id = data.nodes[i];
          tempNode.data = { label: data.nodes[i] };
          tempNodes.push(tempNode);
        }
        setNodes(tempNodes);
        var tempEdges = [];
        for (let i = 0; i < data.edges.length; i++) {
          var tempEdge = {};
          tempEdge.id = i.toString();
          tempEdge.source = data.edges[i][0];
          tempEdge.target = data.edges[i][1];
          tempEdge.type = "straight";
          tempEdges.push(tempEdge);
        }
        console.log(tempEdges);
        setEdges(tempEdges);
      });
  }, []);

  return (
    <div
      style={{
        width: "110vw",
        height: "100vh",
        background: "linear-gradient(#E7E7E7, white)",
        backgroundSize: "cover",
        marginLeft: "-10%",
      }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          marginLeft: "5%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src="https://pbs.twimg.com/profile_images/1583932303373475840/fXBz2s6k_400x400.jpg"
            alt="Profile"
            style={{ width: "20px", borderRadius: "50%" }}
          />
          <h4 style={{ color: "#5F5F5F", fontSize: "20px", fontWeight: "500" }}>
            Welcome, Mark!
          </h4>
        </div>
        <h4 style={{ fontSize: "20px", fontWeight: "700", marginTop: "-20px" }}>
          What do you want to learn today?
        </h4>
        <div style={{ marginTop: "-20px" }}>
          <TextInput
            placeholder="Type any STEM topic and GuideStone will help you get there..."
            width="450px"
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button onClick={() => setPopupState({ state: "generating" })}>
            Test Generating Popup
          </Button>
          <Button onClick={() => setPopupState({ state: "readyLesson" })}>
            Test Ready Lesson Popup
          </Button>
          <Button onClick={() => setPopupState({ state: "quiz" })}>
            Test Quiz Popup
          </Button>
        </div>
        {popupState["state"] == "generating" && (
          <GeneratingPopup
            isOpen={popupState["status"] == "generating"}
            closePopup={() => setPopupState({ state: "closed" })}
            title="Integrals"
            subtitle="Math -> Limits -> Derivatives"
          />
        )}
        {popupState["state"] == "readyLesson" && (
          <ReadyLessonPopup
            isOpen={popupState["status"] == "readyLesson"}
            closePopup={() => setPopupState({ state: "closed" })}
            title="Integrals"
            subtitle="Math -> Limits -> Derivatives"
          />
        )}
        {popupState["state"] == "quiz" && (
          <QuizPopup
            isOpen={popupState["status"] == "quiz"}
            closePopup={() => setPopupState({ state: "closed" })}
            title="Integrals"
            subtitle="Math -> Limits -> Derivatives"
          />
        )}
      </div>
      <Graph nodesData={nodes} edgesData={edges} />
    </div>
  );
}
