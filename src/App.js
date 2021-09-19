import React, { useState, useEffect } from "react";
import History from "./components/History";
import { v4 as uuid } from "uuid";
import "./App.css";

const disabledBtn = () => {
  const btn = document.querySelector(".submitBtn");
  if (btn.disabled === true) {
    btn.style.cursor = "not-allowed";
  }
};

function App() {
  // USESTATES
  const [random, setRandom] = useState(0);
  const [guess, setGuess] = useState("");
  const [cowCtr, setCowCtr] = useState(0);
  const [bullCtr, setBullCtr] = useState(0);
  const [history, setHistory] = useState([]);

  // USEEFFECT
  useEffect(() => {
    // ensures all numbers are unique
    const isValidCombination = () => {
      // generate 4 digit number
      const generate = Math.floor(1000 + Math.random() * 9000);
      // generates a new number if it has duplicate numbers
      if (!/(.).*?\1/.test(generate)) {
        return generate;
      }
      return isValidCombination();
    };

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
      title: document.querySelector(".inputGuess").value,
      cow: cowCtr,
      bull: bullCtr,
    };
    // pushes move into history, most recent on top
    setHistory((history) => [newMove, ...history]);
  };

  // disables submitBtn, show winning message, reveal number
  const winner = () => {
    const winCeleb = document.querySelector(".winCelebration");
    const numberX = document.querySelector(".numberX");
    const greeting = document.querySelector(".greeting");
    const submit = document.querySelector(".submitBtn");
    greeting.innerHTML = "CONGRATS! YOU WON!";
    numberX.innerHTML = random;
    submit.disabled = true;
    winCeleb.classList.add("show");
    submit.classList.add("disabled");
    disabledBtn();
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
      <div className="MainApp">
        <div className="topBtns">
          <button>x</button>
          <button
            className="restartBtn"
            onClick={reloadThis}
            style={{ cursor: "pointer", backgroundColor: "red", color: "red" }}
          >
            x
          </button>
        </div>
        <div className="Top">
          <h1 className="greeting">GUESS THE NUMBER:</h1>
          <h1 className="numberX">----</h1>
        </div>
        <div className="historyContainer">
          <History history={history} />
        </div>
        <div className="Inputs">
          <input
            className="inputGuess"
            onFocus={handleFocus}
            value={guess}
            type="text"
            pattern="\d*"
            onChange={setMyGuess}
            maxLength="4"
            placeholder="Input 4 digit number..."
          />
          <button
            className="submitBtn"
            onClick={submitGuess}
            style={{ cursor: "pointer" }}
          >
            Submit
          </button>
        </div>
      </div>
      <p>
        {bullCtr} 🐂 | {cowCtr} 🐄
      </p>
    </div>
  );
}

export default App;
