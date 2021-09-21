import React from "react";

function Input({ onFocus, value, onChange, disabled }) {
  return (
    <input
      onFocus={onFocus}
      onChange={onChange}
      value={value}
      type="text"
      pattern="\d*"
      maxLength="4"
      placeholder="Input 4 digit number..."
      style={inputStyle}
      disabled={disabled}
    />
  );
}

const inputStyle = {
  border: "0",
  backgroundColor: "#adadad",
  width: "73%",
  height: "40px",
  outline: "0",
  fontSize: "30px",
  paddingLeft: "1rem",
  borderRadius: "5px",
};
export default Input;
