import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import Sidebar from "./SideBar/Sidebar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { logout } from "../shared/utils/auth";
import { connect } from "react-redux";
import { getActions } from "../store/actions/authActions";
import { connectWithSocketServer } from "../realtimeCommunication/socketConnection";
import Room from "./Room/Room";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "row",
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },

});

const Dashboard = ({ setUserDetails, isUserInRoom }) => {
  const [showFriendsSidebar, setShowFriendsSidebar] = useState(true);

  useEffect(() => {
    const userDetails = localStorage.getItem("user");

    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, [setUserDetails]);

  return (
    <Wrapper>
      <Sidebar toggleSidebar={() => setShowFriendsSidebar(prev => !prev)} />
      {showFriendsSidebar && <FriendsSideBar />}
      <Messenger fullWidth={!showFriendsSidebar} />
      <AppBar sidebarVisible={showFriendsSidebar} toggleSidebar={() => setShowFriendsSidebar(prev => !prev)} />
      {isUserInRoom && <Room />}
    </Wrapper>

  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard);
