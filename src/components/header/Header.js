import React from "react";

function Header({ bullCtr, random }) {
  const win = () => {
    if (bullCtr === 4) {
      document.querySelector(".greeting").innerHTML = "CONGRATS! YOU WON!";
      document.querySelector(".numberX").innerHTML = random;
    }
  };
  win();

  return (
    <div style={headerStyle}>
      <h1 className="greeting">GUESS THE NUMBER: </h1>
      <h1 className="numberX">----</h1>
    </div>
  );
}

const headerStyle = {
  fontSize: "1rem",
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: "white",
  color: "#333",
  lineHeight: "15px",
  marginTop: "0.2rem",
  marginLeft: "1rem",
  marginRight: "1rem",
  borderRadius: "5px 5px 0 0",
};
export default Header;
