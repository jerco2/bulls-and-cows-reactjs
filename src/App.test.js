import { render, screen } from "@testing-library/react";
import App, { isValidCombination } from "./App";

// TEST RENDERS FOR APP
describe("Should render the ff:", () => {
  test("Main container", () => {
    render(<App />);
    const mainContainer = screen.getByTestId(/mainAppTestID/);
    expect(mainContainer).toBeInTheDocument();
  });
  test("Header", () => {
    render(<App />);
    const header = screen.getByTestId(/headerTestID/);
    expect(header).toBeInTheDocument();
  });
  test("Submit-button", () => {
    render(<App />);
    const submitBtn = screen.getByTestId(/submitButtonTestID/);
    expect(submitBtn).toBeInTheDocument();
  });
  test("Refresh-button", () => {
    render(<App />);
    const refreshBtn = screen.getByTestId(/refreshBtnTestID/);
    expect(refreshBtn).toBeInTheDocument();
  });
  test("Answer-box", () => {
    render(<App />);
    const answerBox = screen.getByTestId(/answerBoxTestID/);
    expect(answerBox).toBeInTheDocument();
  });
});

// TEST RANDOM NUMBER GENERATOR
describe("Number generator:", () => {
  it("should generate a random number", () => {
    const generateNumber = isValidCombination();
    expect(generateNumber).not.toBe(null);
  });
  it("should have 4 digits", () => {
    const generateNumber = isValidCombination();
    expect(generateNumber.toString().length).toBe(4);
  });
});
