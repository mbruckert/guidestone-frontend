import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { XCircleIcon } from "@primer/octicons-react";
import { Button, Box, ToggleSwitch } from "@primer/react";

export default function VideoViewing() {
  // get the video id from the url
  const { id } = useParams();

  const navigate = useNavigate();

  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [previousTime, setPreviousTime] = useState(0);
  const [action, setAction] = useState("");
  const [isWebGazerInitialized, setIsWebGazerInitialized] = useState(false);

  const [showEyeTracking, setShowEyeTracking] = useState(false);

  const eyeTrackerRef = useRef(null);

  const [gatheredData, setGatheredData] = useState({
    eyeTracking: [],
    pauses: [],
    rewinds: [],
    fastForwards: [],
  });

  const updateEyePosition = (x, y) => {
    if (eyeTrackerRef.current) {
      eyeTrackerRef.current.style.left = `${x}px`;
      eyeTrackerRef.current.style.top = `${y}px`;
    }
  };

  useEffect(() => {
    // Initialize WebGazer here
    webgazer
      .setGazeListener((data, elapsedTime) => {
        if (data) {
          webgazer.util.bound(data);
          updateEyePosition(data.x, data.y);
        }
      })
      .begin()
      .then(() => {
        setIsWebGazerInitialized(true);
        toast("Click play on the video to begin!");
        webgazer.pause(); // Set flag to true once WebGazer is ready
      })
      .catch((error) => {
        console.error("Error initializing WebGazer:", error);
      });

    // return () => webgazer.end(); // Cleanup WebGazer on component unmount
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      console.log("Playing");
      setAction("playing");
      webgazer.resume();
    };
    const handlePause = () => {
      console.log(gatheredData);
      webgazer.pause();
      setAction("paused");
      setGatheredData((prevData) => ({
        ...prevData,
        pauses: [
          ...prevData.pauses,
          {
            time: video.currentTime,
          },
        ],
      }));
    };
    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const timeDiff = currentTime - previousTime;

      // Consider a significant jump as any change greater than 2 seconds
      // This threshold can be adjusted based on the observed behavior of your application
      const significantJumpThreshold = 8;

      if (Math.abs(timeDiff) > significantJumpThreshold) {
        if (timeDiff > 0) {
          console.log("Fast forwarded");
        } else {
          console.log("Rewinded");
          setGatheredData((prevData) => ({
            ...prevData,
            rewinds: [
              ...prevData.rewinds,
              {
                from: previousTime,
                to: currentTime,
              },
            ],
          }));
        }
      }

      setCurrentTime(currentTime);
      setPreviousTime(currentTime);
    };

    const handleEnded = () => {
      webgazer.end();
      window.localStorage.setItem("gatheredData", JSON.stringify(gatheredData));
      navigate(`/?quizId=${id}`);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
  }, [previousTime]);

  useEffect(() => {
    if (isWebGazerInitialized) {
      const interval = setInterval(() => {
        webgazer.getCurrentPrediction().then((prediction) => {
          if (prediction && videoRef.current) {
            const { x, y } = prediction;
            setGatheredData((prevData) => ({
              ...prevData,
              eyeTracking: [
                ...prevData.eyeTracking,
                { x, y, time: videoRef.current.currentTime },
              ],
            }));
          }
        });
      }, 100); // Capture data every 100ms

      return () => clearInterval(interval);
    }
  }, [isWebGazerInitialized, action]);

  return (
    <div
      style={{
        overflowY: "scroll",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <video
        ref={videoRef}
        style={{ width: "90vw" }}
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
        controls
      />
      <div
        style={{
          position: "absolute",
          padding: "10px",
          display: "flex",
          gap: "20px",
        }}
      >
        <Button
          leadingVisual={XCircleIcon}
          onClick={() => {
            navigate("/");
          }}
        >
          Close
        </Button>
        <Box display="flex" maxWidth="300px" style={{ alignItems: "center" }}>
          <Box flexGrow={1} fontSize={2} fontWeight="bold" id="switchLabel">
            <span style={{ color: "white" }}>Show Eye Tracking</span>
          </Box>
          <ToggleSwitch aria-labelledby="switchLabel" />
        </Box>
      </div>
      <div
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: "red",
          position: "fixed",
        }}
        ref={eyeTrackerRef}
        alt="Eye Tracker"
      />
    </div>
  );
}
