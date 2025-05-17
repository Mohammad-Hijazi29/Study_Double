import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

const CameraButton = ({ localStream, isFullscreen }) => {
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const handleToggleCamera = () => {
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  return (
    <IconButton onClick={handleToggleCamera} style={{ color: "white", fontSize: isFullscreen ? "2rem" : "1.5rem" }}>
      {cameraEnabled ? <VideocamIcon style={{ fontSize: isFullscreen ? "2rem" : "1.5rem" }} /> : <VideocamOffIcon style={{ fontSize: isFullscreen ? "2rem" : "1.5rem" }} />}
    </IconButton>
  );
};

export default CameraButton;
