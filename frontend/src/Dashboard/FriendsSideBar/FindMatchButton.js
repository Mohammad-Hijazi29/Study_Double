import React, { useState } from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import FindMatchDialog from "./FindMatchDialog";

const additionalStyles = {
  marginTop: "10px",
  marginLeft: "5px",
  width: "80%",
  height: "30px",
  background: "linear-gradient(135deg, rgb(100, 72, 255), rgb(0, 217, 173))",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease",
  borderRadius: "8px",
  "&:hover": {
    background: "linear-gradient(135deg, rgb(81, 59, 204), rgb(0, 167, 133))",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
    transform: "scale(1.03)",
  },
};

const FindMatch = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenAddFriendDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAddFriendDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <CustomPrimaryButton
        additionalStyles={additionalStyles}
        label="Find Match"
        onClick={handleOpenAddFriendDialog}
      />
      <FindMatchDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseAddFriendDialog}
      />
    </>
  );
};

export default FindMatch;
