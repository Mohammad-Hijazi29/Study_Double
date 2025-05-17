import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

const MicButton = ({ localStream, isFullscreen }) => {
  const [micEnabled, setMicEnabled] = useState(true);

  const handleToggleMic = () => {
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicEnabled(!micEnabled);
  };

  return (
    <IconButton onClick={handleToggleMic} style={{ color: "white", fontSize: isFullscreen ? "2rem" : "1.5rem" }}>
      {micEnabled ? <MicIcon style={{ fontSize: isFullscreen ? "2rem" : "1.5rem" }} /> : <MicOffIcon style={{ fontSize: isFullscreen ? "2rem" : "1.5rem" }} />}
    </IconButton>
  );
};

export default MicButton;
