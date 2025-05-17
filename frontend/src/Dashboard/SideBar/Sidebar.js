import React from "react";
import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./CreateRoomButton";
import { connect } from 'react-redux';
import ActiveRoomButton from "./ActiveRoomButton";
import TechniquesWidget from "./TechniquesWidget";
import ChatbotWidget from "./ChatbotWidget";
import GoalsWidget from "./GoalsWidget";
import DisplayFriends from "./DisplayFriends";

const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
  "@media (max-width: 768px)": {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    marginTop: '40px',
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "10px"
  },
});

const SideBar = ({ activeRooms, isUserInRoom, toggleSidebar }) => {
  return (
    <MainContainer>
      <MainPageButton />
      <DisplayFriends toggleSidebar={toggleSidebar} />
      <CreateRoomButton isUserInRoom={isUserInRoom} />
      {activeRooms.map(room => (
        <ActiveRoomButton
          roomId={room.roomId}
          creatorUsername={room.creatorUsername}
          amountOfParticipants={room.participants.length}
          key={room.roomId}
          isUserInRoom={isUserInRoom}
        />
      ))}
      <TechniquesWidget />
      <ChatbotWidget />
      <GoalsWidget />
    </MainContainer>
  );
};


const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(SideBar);
