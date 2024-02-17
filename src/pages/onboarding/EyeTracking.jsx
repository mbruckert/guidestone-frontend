import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Eye from "../../assets/eye.png";
import Radial from "../../assets/radial.svg";
import { Token } from "@primer/react";
import { AlertIcon } from "@primer/octicons-react";
import { toast } from "react-hot-toast";

export default function EyeTracking() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const eyeTrackerRef = useRef(null);

  const [loading, setLoading] = useState(true);

  // Update eye-tracker position using React state
  const updateEyePosition = (x, y) => {
    if (eyeTrackerRef.current) {
      eyeTrackerRef.current.style.left = `${x}px`;
      eyeTrackerRef.current.style.top = `${y}px`;
    }
  };

  useEffect(() => {
    const gazeListener = (data, elapsedTime) => {
      if (!data) return;
      webgazer.util.bound(data);
      updateEyePosition(data.x, data.y);
    };

    webgazer.setGazeListener(gazeListener).begin();

    // return () => webgazer.end(); // Clean up
  }, []);

  useEffect(() => {
    if (count === 11) {
      toast.success("Eye tracking complete! Storing tracking information...", {
        duration: 5000,
        position: "top-center",
      });
      setTimeout(() => {
        webgazer.end();
        navigate("/more-info");
      }, 5000);
    }
  }, [count, navigate]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [loading]);

  const handleClick = (e) => {
    //create new div
    const newDiv = document.createElement("div");
    newDiv.style.width = "300px";
    newDiv.style.height = "300px";
    newDiv.style.backgroundColor = "none";

    e.target.replaceWith(newDiv);
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "-150px",
          width: "120%",
          marginLeft: "0%",
        }}
      >
        {[...Array(4)].map((_, index) => (
          <img
            key={index}
            src={Radial}
            style={{
              width: "300px",
              zIndex: index === 0 ? "50000" : undefined,
            }}
            onClick={handleClick}
            alt="Clickable radial"
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "180px",
          width: "100%",
          position: "absolute",
          zIndex: "50000",
        }}
      >
        {[...Array(3)].map((_, index) => (
          <img
            key={index}
            src={Radial}
            style={{ width: "300px" }}
            onClick={handleClick}
            alt="Clickable radial"
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "150px",
          flexDirection: "column",
          position: "absolute",
        }}
      >
        {loading && (
          <Token
            leadingVisual={AlertIcon}
            text="Eye tracking is likely still loading, please wait..."
          ></Token>
        )}
        <h2 style={{ width: "600px", fontSize: "30px" }}>
          GuideStone uses Eye Tracking to learn what content you engage with, so
          we can create videos that you really resonate with.
        </h2>
        <p
          style={{
            width: "600px",
            fontSize: "25px",
            color: "#878787",
            fontWeight: "500",
            marginTop: "-10px",
          }}
        >
          Please look at your cursor and track it with your eyes as you click
          each of the red dots around the screen.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "350px",
          width: "130%",
          marginLeft: "-5%",
        }}
      >
        {[...Array(4)].map((_, index) => (
          <img
            key={index}
            src={Radial}
            style={{ width: "300px" }}
            onClick={handleClick}
            alt="Clickable radial"
          />
        ))}
      </div>
      <img
        src={Eye}
        style={{ width: "20px", position: "fixed" }}
        ref={eyeTrackerRef}
        alt="Eye Tracker"
      />
    </div>
  );
}
