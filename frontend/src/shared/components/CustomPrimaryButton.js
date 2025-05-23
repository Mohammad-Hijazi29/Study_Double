import React from "react";
import Button from "@mui/material/Button";

const CustomPrimaryButton = ({
  label,
  additionalStyles,
  disabled,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        // bgcolor: "#5865F2",
        bgcolor: '#5F8575',
        color: "white",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: 500,
        width: "100%",
        height: "40px",
        "&:hover": {
          backgroundColor: "#088F8F", 
        },
      }}
      style={additionalStyles ? additionalStyles : {}}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomPrimaryButton;
