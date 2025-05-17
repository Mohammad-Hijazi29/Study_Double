import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import * as roomHandler from "../../../realtimeCommunication/roomHandler";

const CloseRoomButton = ({ isFullscreen }) => {
  const handleLeaveRoom = () => {
    roomHandler.leaveRoom();
  };

  return (
    <IconButton onClick={handleLeaveRoom} style={{ color: "white", fontSize: isFullscreen ? "2rem" : "1.5rem" }}>
      <CloseIcon style={{ fontSize: isFullscreen ? "2rem" : "1.5rem" }} />
    </IconButton>
  );
};

export default CloseRoomButton;
