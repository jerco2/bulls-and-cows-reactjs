import React, { useState, useEffect } from "react";
import History from "./components/history/History";
import Header from "./components/header/Header";
import Button from "./components/button/Button";
import Input from "./components/input/Input";
import { v4 as uuid } from "uuid";
import "./App.css";

function App() {
  // USESTATES
  const [random, setRandom] = useState(0);
  const [guess, setGuess] = useState("");
  const [cowCtr, setCowCtr] = useState(0);
  const [bullCtr, setBullCtr] = useState(0);
  const [history, setHistory] = useState([]);
  const [isDisabled, setDisable] = useState(false);
  const [greeting, setGreeting] = useState("GUESS THE NUMBER: ");
  const [hidden, setHidden] = useState("----");

  // USEEFFECT
  useEffect(() => {
    isValidCombination();
    setRandom(isValidCombination());
  }, []);

  // FUNCTIONS
  const submitGuess = () => {
    // check if guess input is empty or less than 4 digits
    if (guess === "" || guess.length < 4) {
      return;
    }
    const toBeGuessed = random.toString();
    let cowCtr = 0;
    let bullCtr = 0;
    // check if numbers match
    for (let i = 0; i < toBeGuessed.length; i++) {
      // check if numbers are on the same index
      if (guess.includes(toBeGuessed[i]) && toBeGuessed[i] === guess[i]) {
        bullCtr++;
      } else if (guess.includes(toBeGuessed[i])) {
        cowCtr++;
      }
      setBullCtr(bullCtr);
      setCowCtr(cowCtr);
      // check for win, if bull = 4 invoke winner function
      if (bullCtr === 4) {
        winner();
      }
    }
    console.log(cowCtr + "cow/s");
    console.log(bullCtr + "bull/s");

    // creates new move and stores into history
    const newMove = {
      id: uuid(),
      title: guess,
      cow: cowCtr,
      bull: bullCtr,
    };
    // pushes move into history, most recent on top
    setHistory((history) => [newMove, ...history]);
  };

  // disables submitBtn, show winning message, reveal number
  const winner = () => {
    const winCeleb = document.querySelector(".winCelebration");
    setHidden(random);
    setGreeting("CONGRATS! YOU WON!");
    setDisable(true);
    winCeleb.classList.add("show");
  };

  // set the guess state, also input allows only numbers
  const setMyGuess = (e) => {
    setGuess(e.target.value.replace(/\D/g, ""));
  };

  // this function highlight all text in input
  const handleFocus = (event) => event.target.select();

  // refreshes page for new game
  const reloadThis = () => {
    window.location.reload();
  };

  // RENDER
  console.log(random);

  return (
    <div className="App-header">
      <div className="winCelebration"></div>
      <div className="MainApp" data-testid="mainAppTestID">
        <div className="topBtns">
          <button>x</button>
          <Button
            className="restartBtn"
            onClick={reloadThis}
            text={"x"}
            style={restartButtonStyle}
          />
        </div>
        <Header greeting={greeting} hidden={hidden} />
        <div className="historyContainer">
          <History history={history} />
        </div>
        <div className="Inputs">
          <Input
            className="inputGuess"
            onFocus={handleFocus}
            onChange={setMyGuess}
            value={guess}
            disabled={isDisabled}
          />
          <Button
            className="submitBtn"
            onClick={submitGuess}
            text={"SUBMIT"}
            style={submitButtonStyle}
            disabled={isDisabled}
          />
        </div>
      </div>
      <p>
        {bullCtr} 🐂 | {cowCtr} 🐄
      </p>
    </div>
  );
}

// button styles
const restartButtonStyle = {
  marginLeft: "0.25rem",
  marginBottom: "0B5rem",
  backgroundColor: "red",
  color: "red",
  cursor: "pointer",
};
const submitButtonStyle = {
  cursor: "pointer",
};

export default App;

// ensures all numbers are unique
// generate 4 digit number
// generates a new number if it has duplicate numbers
const isValidCombination = () => {
  const combination = Math.floor(1000 + Math.random() * 9000);
  return isUnique(combination) ? combination : isValidCombination();
};

const isUnique = (combination) => {
  return !/(.).*?\1/.test(combination);
};

export { isValidCombination, isUnique };
