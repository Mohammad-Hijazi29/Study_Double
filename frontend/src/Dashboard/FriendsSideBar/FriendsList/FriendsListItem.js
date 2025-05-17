import React from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "../../../shared/components/Avatar";
import Typography from "@mui/material/Typography";
import OnlineIndicator from "./OnlineIndicator";
import { chatTypes, getActions } from "../../../store/actions/chatActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";

const FriendsListItem = ({ id, username, isOnline, setChosenChatDetails }) => {
  const history = useHistory();

  const handleChooseActiveConversation = () => {
    setChosenChatDetails({ id: id, name: username }, chatTypes.DIRECT);
  };

  const handleNavigateToProfile = () => {
    history.push(`/profile/${id}`);
  };

  return (
    <Box
      onClick={handleChooseActiveConversation}
      style={{
        width: "100%",
        height: "42px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        color: "black",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <Avatar username={username} />
      <Typography
        style={{
          marginLeft: "7px",
          fontWeight: 700,
          color: "#8e9297",
          flexGrow: 1,
        }}
        variant="subtitle1"
        align="left"
      >
        {username}
      </Typography>

      {isOnline && <OnlineIndicator />}

      <IconButton
        onClick={(e) => {
          e.stopPropagation(); 
          handleNavigateToProfile();
        }}
        style={{
          position: 'absolute',
          left: '150px',
        }}
      >
        <AccountCircleIcon />
      </IconButton>
      
    </Box>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(FriendsListItem);
