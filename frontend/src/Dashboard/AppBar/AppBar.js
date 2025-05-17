import React from "react";
import { styled } from "@mui/system";
import DropdownMenu from "./DropdownMenu";
import ChosenOptionLabel from "./ChosenOptionLabel";

const MainContainer = styled("div")(({ sidebarVisible }) => ({
  position: "absolute",
  right: "0",
  top: "0",
  height: "48px",
  borderBottom: "1px solid black",
  backgroundColor: "#36393f",
  width: sidebarVisible ? "calc(100% - 294px)" : "95.2%", 
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 15px",
  transition: "width 0.3s ease",
  "@media (max-width: 768px)": {
    width: "100%",
    left: "0",
    right: "0",
    padding: "0 10px",
  },
}));

const AppBar = ({ sidebarVisible }) => {
  return (
    <MainContainer sidebarVisible={sidebarVisible}>
      <ChosenOptionLabel />
      <DropdownMenu />
    </MainContainer>
  );
};

export default AppBar;
