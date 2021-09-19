import React from "react";
import HistoryMoves from "./HistoryMoves";

function History({ history }) {
  return history.map((move) => <HistoryMoves key={move.id} moves={move} />);
}

export default History;
