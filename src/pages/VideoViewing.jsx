import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function VideoViewing() {
  // get the video id from the url
  const { id } = useParams();

  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [previousTime, setPreviousTime] = useState(0);
  const [action, setAction] = useState("");
  const [isWebGazerInitialized, setIsWebGazerInitialized] = useState(false);

  const [gatheredData, setGatheredData] = useState({
    eyeTracking: [],
    pauses: [],
    rewinds: [],
    fastForwards: [],
  });

  useEffect(() => {
    // Initialize WebGazer here
    webgazer
      .setGazeListener((data, elapsedTime) => {
        if (data) {
          console.log(data); // Log gaze data for debugging
        }
      })
      .begin()
      .then(() => {
        setIsWebGazerInitialized(true); // Set flag to true once WebGazer is ready
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

      // Adjust these thresholds as needed to better detect fast forwards/rewinds
      const fastForwardThreshold = 5; // Example threshold for fast forwarding
      const rewindThreshold = -5; // Example threshold for rewinding
      const normalPlaybackRate = 1; // Normal playback rate is 1

      // Detect fast forward or rewind actions
      if (video.playbackRate === normalPlaybackRate) {
        if (timeDiff >= fastForwardThreshold) {
          console.log("Fast forwarded");
          setGatheredData((prevData) => ({
            ...prevData,
            fastForwards: [
              ...prevData.fastForwards,
              {
                from: previousTime,
                to: currentTime,
              },
            ],
          }));
        } else if (timeDiff <= rewindThreshold) {
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
      console.log("Video has ended");
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
  }, [previousTime]);

  useEffect(() => {
    let interval;
    if (isWebGazerInitialized) {
      const video = videoRef.current;
      if (video) {
        video.play().catch((error) => {
          console.error("Error attempting to play video:", error);
        });
      }
      interval = setInterval(() => {
        if (action == "paused") return;
        const prediction = webgazer.getCurrentPrediction();
        if (prediction) {
          prediction.then((data) => {
            if (data) {
              setGatheredData((prevData) => ({
                ...prevData,
                eyeTracking: [
                  ...prevData.eyeTracking,
                  {
                    x: data.x,
                    y: data.y,
                    time: video.currentTime,
                  },
                ],
              }));
            }
          });
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ overflowY: "scroll" }}>
      <video
        ref={videoRef}
        style={{ width: "90vw" }}
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        controls
      />
    </div>
  );
}
