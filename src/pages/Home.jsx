import react, { useState, useEffect } from "react";
import Graph from "../components/Graph"; // Adjust the import path according to your project structure
import { TextInput, Button } from "@primer/react";
import GeneratingPopup from "../components/GeneratingPopup";
import ReadyLessonPopup from "../components/ReadyLessonPopup";
import QuizPopup from "../components/QuizPopup";
import GradingPopup from "../components/GradingPopup";
import { toast } from "react-hot-toast";
import { SignOutIcon, TrashIcon } from "@primer/octicons-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [baseNodes, setBaseNodes] = useState([]);
  const [oldData, setOldData] = useState(null);

  const [popupState, setPopupState] = useState({ state: "closed" });

  const [selectedNode, setSelectedNode] = useState(null);

  const [newTopicDescription, setNewTopicDescription] = useState("");

  useEffect(() => {
    //if there is no user_id in local storage, redirect to auth page
    if (!window.localStorage.getItem("userId")) {
      navigate("/auth");
    }

    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get("quizId");
    if (quizId) {
      fetch(
        "https://guidestone-functions.azurewebsites.net/api/getNodeDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            node_id: quizId,
          }),
        }
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          setSelectedNode(data);
          setPopupState({ state: "quiz" });
        });
    }
  }, []);

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

  useEffect(() => {
    console.log(selectedNode);
  }, [selectedNode]);

  function isEquivalent(a, b) {
    // Get the keys of both objects
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If their property lengths are different, they're different objects
    if (aProps.length != bProps.length) {
      return false;
    }

    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      // If the values of the property are different, not equal
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    // If we made it this far, objects are considered equivalent
    return true;
  }

  const listOfNodeColors = [
    "#FFD4D4", // Light pink
    "#D4EAFF", // Light sky blue
    "#D4DDFF", // Light lavender
    "#FFD541", // Sunflower yellow
    "#1EDA94", // Medium spring green
    "#A2D2FF", // Soft blue
    "#FF9B85", // Soft red
    "#BDB2FF", // Pastel purple
    "#FFC6FF", // Light magenta
    "#FDFFB6", // Light lemon
    "#83C5BE", // Soft cyan
    "#FFDDD2", // Peach
    "#BDE0FE", // Baby blue
    "#A0C4FF", // Sky blue
    "#CAF0F8", // Light cyan
    "#FFD4D4", // Light Red
    "#D4EAFF", // Light Blue
    "#D4DDFF", // Light Periwinkle
    "#FFD541", // Sunflower Yellow
    "#1EDA94", // Medium Spring Green
    "#FA8072", // Salmon
    "#6A5ACD", // Slate Blue
    "#20B2AA", // Light Sea Green
    "#FF69B4", // Hot Pink
    "#FFA07A", // Light Salmon
    "#B0E0E6", // Powder Blue
    "#FF6347", // Tomato
    "#3CB371", // Medium Sea Green
    "#FFD700", // Gold
  ];

  const learnNewTopic = async () => {
    fetch("https://guidestone-functions.azurewebsites.net/api/expandGraph", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: window.localStorage.getItem("userId"),
        topic: newTopicDescription,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        return getNewGraphData();
      })
      .catch((error) => {
        console.error("Error expanding graph:", error);
      });
  };

  const getNewGraphData = async () => {
    fetch(
      "https://guidestone-functions.azurewebsites.net/api/getGraphStructure",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: window.localStorage.getItem("userId"),
        }),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (
          oldData == null ||
          !isEquivalent(data["nodes"], oldData["nodes"]) // if oldData is null, check to see if names are the same (can't use JSON.stringify because the order of the keys might be different)
        ) {
          setOldData(data);
          var tempNodes = [];
          for (let i = 0; i < data.nodes.length; i++) {
            var tempNode = {
              id: data.nodes[i],
              name: data.names[data.nodes[i]],
              // get random color from list
              color:
                listOfNodeColors[
                  Math.floor(Math.random() * listOfNodeColors.length)
                ],
            };
            tempNodes.push(tempNode);
          }
          setNodes(tempNodes);
          console.log(tempNodes);
          var tempEdges = [];
          for (let i = 0; i < data.edges.length; i++) {
            var tempEdge = {};
            tempEdge["id"] = Math.random().toString(36).substring(7);
            tempEdge["source"] = data.edges[i][0];
            tempEdge["target"] = data.edges[i][1];
            tempEdge["type"] = "straight";
            tempEdges.push(tempEdge);
          }
          setEdges(tempEdges);
          setBaseNodes(data.bases);
        }
      });
  };

  useEffect(() => {
    // interval to get new graph data every 5 seconds
    getNewGraphData();
    // setInterval(() => {
    //   getNewGraphData();
    // }, 5000);
  }, []);

  function getFirstName(fullName) {
    // Split the full name by spaces and return the first element
    return fullName.split(" ")[0];
  }

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
            justifyContent: "space-between",
            alignItems: "center",
            width: "1350px",
            gap: "10px",
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
            <h4
              style={{ color: "#5F5F5F", fontSize: "20px", fontWeight: "500" }}
            >
              Welcome,{" "}
              {getFirstName(
                JSON.parse(window.localStorage.getItem("userInfo"))["name"]
              )}
              !
              {/* {window.localStorage.getItem("user") &&
                JSON.parse(window.localStorage.getItem("user")).firstName}
              ! */}
            </h4>
          </div>
          <Button
            leadingVisual={SignOutIcon}
            onClick={() => {
              window.localStorage.removeItem("userInfo");
              window.localStorage.removeItem("userId");
              navigate("/auth");
            }}
          >
            Sign Out
          </Button>
        </div>
        <h4 style={{ fontSize: "20px", fontWeight: "700", marginTop: "-20px" }}>
          What do you want to learn today?
        </h4>
        <div
          style={{
            marginTop: "-20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <TextInput
            placeholder="Type any STEM topic and GuideStone will help you get there..."
            width="450px"
            value={newTopicDescription}
            onChange={(e) => {
              setNewTopicDescription(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              toast.promise(learnNewTopic(), {
                loading: "Adding New Topics",
                success: "New Topics Added!",
                error: "Error generating new topics",
              });
            }}
          >
            Learn
          </Button>
        </div>
        {/* <div style={{ marginTop: "10px" }}>
          <Button onClick={() => setPopupState({ state: "generating" })}>
            Test Generating Popup
          </Button>
          <Button onClick={() => setPopupState({ state: "readyLesson" })}>
            Test Ready Lesson Popup
          </Button>
          <Button onClick={() => setPopupState({ state: "quiz" })}>
            Test Quiz Popup
          </Button>
          <Button onClick={() => setPopupState({ state: "grading" })}>
            Test Grading
          </Button>
        </div> */}
        {popupState["state"] == "generating" && (
          <GeneratingPopup
            isOpen={popupState["status"] == "generating"}
            closePopup={() => setPopupState({ state: "closed" })}
            node={selectedNode}
          />
        )}
        {popupState["state"] == "readyLesson" && (
          <ReadyLessonPopup
            isOpen={popupState["status"] == "readyLesson"}
            closePopup={() => setPopupState({ state: "closed" })}
            node={selectedNode}
          />
        )}
        {popupState["state"] == "quiz" && (
          <QuizPopup
            isOpen={popupState["status"] == "quiz"}
            closePopup={() => setPopupState({ state: "closed" })}
            node={selectedNode}
          />
        )}
        {popupState["state"] == "grading" && (
          <GradingPopup
            isOpen={popupState["status"] == "grading"}
            closePopup={() => setPopupState({ state: "closed" })}
            node={selectedNode}
          />
        )}
      </div>
      <Graph
        nodesData={nodes}
        edgesData={edges}
        baseNodes={baseNodes}
        setPopupState={setPopupState}
        setSelectedNode={setSelectedNode}
      />
    </div>
  );
}
