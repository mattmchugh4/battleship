import "./style.css";
import createBoard from "./createBoard";
import boardEvents from "./boardEvents";
import createColorSquares from "./createColorSquares";
import openModal from "./openModal";
import { compShipPlacement, playerShipPlacement } from "./shipPlacement";
import closeModal from "./closeModal";
import { newGame } from "./newGame";

const playersBoard = document.querySelector(".player-board");
createBoard(playersBoard, "C");
const compBoard = document.querySelector(".computer-board");
createBoard(compBoard, "B");
const placementBoard = document.querySelector(".placement-board");
createBoard(placementBoard, "A");

openModal();

const playerShips = [];
const compShips = compShipPlacement();

function numberOfShipsToPlace() {
  return 4 - playerShips.length;
}

let isVertical = false;
setColoredSquares();

function setColoredSquares() {
  const greenFour = createColorSquares(
    "aquamarine",
    numberOfShipsToPlace(),
    isVertical
  );
  boardEvents(placementBoard, "mouseover", greenFour);

  const greyFour = createColorSquares(
    "rgb(221, 221, 221)",
    numberOfShipsToPlace(),
    isVertical
  );
  boardEvents(placementBoard, "mouseleave", greyFour);
}

const rotateButton = document.querySelector(".rotate-button");
rotateButton.addEventListener("click", () => {
  isVertical = !isVertical;
  setColoredSquares();
});

function shipPlacementDone() {
  closeModal();
  const makeGuess = newGame(playerShips, compShips);
  const compBoardChildren = compBoard.children;
  let compBoardSquaresArray = Array.from(compBoardChildren);
  for (const element of compBoardSquaresArray) {
    element.addEventListener("click", (event) => {
      makeGuess(event);
    });
  }
}

const allSquares = document.querySelectorAll(".placement-board");
for (const square of allSquares) {
  square.addEventListener("click", (event) => {
    let playerPlacement = playerShipPlacement(
      event,
      numberOfShipsToPlace() - 1,
      isVertical
    );
    if (playerPlacement !== undefined) {
      playerShips.push(playerPlacement);
    }
    if (numberOfShipsToPlace() <= 0) {
      shipPlacementDone();
    }
  });
}
