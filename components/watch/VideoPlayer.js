import {
  useAccount,
  useOwnedCourse,
  useOwnedCourses,
} from "@/components/hooks/web3";

import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";

function VideoPlayer() {
  // State variables for user input
  const [userStart, setUserStart] = useState(0);
  const [userEnd, setUserEnd] = useState(0);

  // State variables for video start and end time
  const [videoEnd, setVideoEnd] = useState(0);

  // State variable for video completion status
  const [completed, setCompleted] = useState(false);
  const playerRef = useRef();
  const handleReady = () => {
    // Get video duration
    const duration = playerRef.current.getDuration();
    // Set video end time to duration if not specified by user
    if (userEnd === 0) {
      setVideoEnd(duration);
    }
  };

  // Handler for video time update event
  const handleTimeUpdate = () => {
    const currentTime = playerRef.current.getCurrentTime();

    if (currentTime > videoEnd) {
      // playerRef.current.pause();

      setCompleted(true);

      console.log("Congratulations! You have completed the course");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <ReactPlayer
          ref={playerRef}
          url="https://vimeo.com/783453809"
          controls={true}
          onReady={handleReady}
          onProgress={handleTimeUpdate}
        />
      </div>
    </>
  );
}

export default VideoPlayer;
