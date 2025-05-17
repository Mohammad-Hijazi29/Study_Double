import React from "react";
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from "react-router-dom";

const MainPageButton = () => {
  const history = useHistory();

  const handleMoveToExplore = () => {
    history.push("/explore");
  }

  return (
    <Button
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "16px",
        margin: 0,
        padding: 0,
        minWidth: 0,
        marginTop: "10px",
        color: "white",
        background: "linear-gradient(135deg, rgb(100, 72, 255), rgb(0, 217, 173))",
      }}
    >
      <HomeIcon onClick={handleMoveToExplore} />
    </Button>
  );
};

export default MainPageButton;
