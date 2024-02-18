import { Dialog } from "@primer/react/drafts";
import { Spinner, Button } from "@primer/react";
import { PlayIcon } from "@primer/octicons-react";
import React from "react";
import Player from "../assets/player.png";
import { useNavigate } from "react-router-dom";

export default function ReadyLessonPopup({ isOpen, closePopup, node }) {
  const returnFocusRef = React.useRef(null);
  const navigate = useNavigate();
  return (
    <>
      <Dialog
        returnFocusRef={returnFocusRef}
        isOpen={isOpen}
        onClose={() => closePopup()}
        width="2xlarge"
        height="md"
        title={node.node_name}
      >
        <div style={{ padding: "10px" }}>
          <div style={{ display: "flex", gap: "40px" }}>
            <img
              src={Player}
              alt="Player"
              style={{ width: "300px", cursor: "pointer" }}
              onClick={() => {
                navigate("/video/" + node.node_id);
              }}
            />
            <div style={{ width: "350px" }}>
              <h4>Video Description</h4>
              <p style={{ marginTop: "-20px" }}>
                You did really good in the last lesson, but had some trouble
                implementing integration by parts. In this newly generated
                lesson, we dive deeper into integration by parts.
              </p>
            </div>
          </div>
          <hr style={{ marginTop: "30px", marginBottom: "30px" }} />
          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ width: "420px" }}>
              <h4>Lesson Description</h4>
              <p style={{ marginTop: "-20px" }}>
                You’ve flown through this lesson! You instantly understood the
                quotient and power rule, but struggled a bit with integration by
                parts. Keep going and you’ll have it in no time!
              </p>
            </div>
            <div style={{ width: "250px" }}>
              <h4>Lesson Description</h4>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "10px",
                }}
              >
                <>Attempt #1</>
                <Button leadingVisual={PlayIcon}>Watch Video</Button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "10px",
                }}
              >
                <>Attempt #2</>
                <Button leadingVisual={PlayIcon}>Watch Video</Button>
              </div>
            </div>
          </div>
          <hr style={{ marginTop: "30px", marginBottom: "30px" }} />
          <h4>Lesson Topics</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ width: "20px", color: "#1EDA94" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>Power Rule</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ width: "20px", color: "#1EDA94" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>Quotient Rule</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ width: "20px", color: "#1EDA94" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>Integration by Parts</span>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
