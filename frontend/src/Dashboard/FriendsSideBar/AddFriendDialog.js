import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import { validateMail } from "../../shared/utils/validators";
import InputWithLabel from "../../shared/components/InputWithLabel";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/friendsActions";

const AddFriendDialog = ({
  isDialogOpen,
  closeDialogHandler,
  sendFriendInvitation = () => {},
}) => {
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSendInvitation = () => {
    sendFriendInvitation(
      {
        targetMailAddress: mail,
      },
      handleCloseDialog
    );
  };

  const handleCloseDialog = () => {
    closeDialogHandler();
    setMail("");
  };

  useEffect(() => {
    setIsFormValid(validateMail(mail));
  }, [mail]);

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleCloseDialog}
      PaperProps={{
        sx: {
          padding: "25px 20px",
          borderRadius: "16px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          minWidth: { xs: "90%", sm: "400px" },
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#333" }}>
          Invite a Friend
        </Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ marginBottom: "20px", color: "#666" }}>
          Please enter your friend's email address to send them an invitation.
        </DialogContentText>

        <InputWithLabel
          label="Email Address"
          type="text"
          value={mail}
          setValue={setMail}
          placeholder="example@email.com"
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", paddingBottom: "10px" }}>
        <CustomPrimaryButton
          onClick={handleSendInvitation}
          disabled={!isFormValid}
          label="Send Invitation"
          additionalStyles={{
            width: "100%",
            maxWidth: "300px",
            height: "40px",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

const mapActionsToProps = (dispatch) => ({
  ...getActions(dispatch),
});

export default connect(null, mapActionsToProps)(AddFriendDialog);
