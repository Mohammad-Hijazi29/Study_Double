import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
// import Chat from '../../shared/images/Chat.gif';
import QuickreplyIcon from '@mui/icons-material/Quickreply';

const Wrapper = styled("div")({
  flexGrow: 1,
  height: "80%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  "@media (max-width: 768px)": {
    marginTop: "0",
    padding: "20px",
  },
});

// const StyledImage = styled("img")({
//   width: "500px",
//   maxWidth: "80%",
//   borderRadius: "16px",
//   transition: "transform 0.3s ease",
//   "&:hover": {
//     transform: "scale(1.05)",
//   },
// });

const WelcomeMessage = () => {
  return (
    <Wrapper>
      {/* <StyledImage src={Chat} alt="Start chatting" /> */}
      <QuickreplyIcon style={{ color: "white", width: "500px", height: "200px" }}/>
      <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
        Choose a conversation to start chatting!
      </Typography>
    </Wrapper>
  );
};

export default WelcomeMessage;
