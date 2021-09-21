import React from "react";

function HistoryMoves({ moves }) {
  const { title, cow, bull } = moves;
  return (
    <div style={historyMoveStyle}>
      {title} = {bull}b : {cow}c
    </div>
  );
}

const historyMoveStyle = {
  borderBottom: "1px #282c34 dotted",
  borderRadius: "3px",
  margin: "0.25rem",
  padding: "0.25rem 1rem",
  color: "white",
};

export default HistoryMoves;
