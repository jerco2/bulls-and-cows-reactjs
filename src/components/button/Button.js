import React from "react";

function Button({ text, onClick, style, disabled }) {
  return (
    <button style={style} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;
