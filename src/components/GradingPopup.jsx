import { Dialog } from "@primer/react/drafts";
import { Spinner } from "@primer/react";
import React from "react";
import Grading from "../assets/grading.png";

export default function GradingPopup({ isOpen, closePopup, node }) {
  const returnFocusRef = React.useRef(null);
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
        <div
          style={{
            padding: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={Grading} alt="Grading" style={{ width: "300px" }} />
          <h3 style={{ width: "200px", textAlign: "center" }}>
            Currently Grading and Analyzing your Work
          </h3>
          <p
            style={{
              color: "#838383",
              marginTop: "-10px",
              width: "300px",
              textAlign: "center",
            }}
          >
            Feel free to leave this lesson and come back later when this is
            complete.
          </p>
        </div>
      </Dialog>
    </>
  );
}
