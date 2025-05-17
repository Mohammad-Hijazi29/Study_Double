import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { Box } from "@mui/material";

const MainContainer = styled("div")(({ count }) => {
  let width = "100%";
  let height = "100%";

  if (count === 2) {
    width = "80%";
    height = "100%";
  } else if (count === 3 || count === 4) {
    width = "100%";
    height = "100%";
  }

  return {
    width,
    height,
    backgroundColor: "black",
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative",
  };
});

const VideoEl = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
});

const Video = ({ stream, isLocalStream, index, count }) => {
  const videoRef = useRef();
  const [cameraOn, setCameraOn] = useState(true);

  const checkCameraStatus = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      const isEnabled = videoTrack && videoTrack.enabled;
      setCameraOn(isEnabled);

      if (videoRef.current) {
        if (isEnabled) {
          if (videoRef.current.srcObject !== stream) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch((err) => console.error("Error playing video:", err));
          }
        } else {
          videoRef.current.srcObject = null;
        }
      }
    }
  };

  useEffect(() => {
    checkCameraStatus();  

    const intervalId = setInterval(() => {
      checkCameraStatus();
    }, 500);

    
    return () => clearInterval(intervalId);
  }, [stream]);

  return (
    <MainContainer count={count} data-index={index}>
      {cameraOn ? (
        <VideoEl autoPlay playsInline muted={isLocalStream} ref={videoRef} />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
          }}
        >
          <VideocamOffIcon sx={{ fontSize: 64, color: "white" }} />
        </Box>
      )}
    </MainContainer>
  );
};

export default Video;
