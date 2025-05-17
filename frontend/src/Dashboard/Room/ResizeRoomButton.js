import React from "react";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

const MainContainer = styled("div")({
  position: "absolute",
  bottom: "10px",
  right: "10px",
});

const ResizeRoomButton = ({ isRoomMinimized, handleRoomResize }) => {
  return (
    <MainContainer>
      <IconButton style={{ color: "white", fontSize: !isRoomMinimized ? "2rem" : "1.5rem" }} onClick={handleRoomResize}>
        {isRoomMinimized ? <OpenInFullIcon style={{ fontSize: !isRoomMinimized ? "2rem" : "1.5rem" }} /> : <CloseFullscreenIcon style={{ fontSize: !isRoomMinimized ? "2rem" : "1.5rem" }} />}
      </IconButton>
    </MainContainer>
  );
};

export default ResizeRoomButton;
