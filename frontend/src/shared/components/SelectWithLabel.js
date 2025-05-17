import React from "react";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  marginBottom: "15px",
  maxWidth: "800px",
});

const Label = styled("p")({
  color: "black",
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "16px",
});

const Select = styled("select")({
  flexGrow: 1,
  height: "40px",
  border: "1px solid black",
  borderRadius: "5px",
  color: "black",
  background: "white",
  margin: 0,
  fontSize: "16px",
  padding: "0 5px",
});

const Option = styled("option")({
  color: "black",
  background: "white",
});

const SelectWithLabel = ({ value, setValue, label, options }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Select value={value} onChange={handleChange}>
        <Option value="" disabled>Select {label.toLowerCase()}</Option>
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </Wrapper>
  );
};

export default SelectWithLabel;
