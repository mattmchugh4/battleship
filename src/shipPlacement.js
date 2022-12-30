import createColorSquares from "./createColorSquares";
import getRandomSquare from "./getRandomSquare";
import mouseClick from "./mouseClick";
import createShip from "./createShip";

function playerShipPlacement(event, numClick, isVertical) {
  let playerShipPositions = getShipPositions("A");

  let newPlayerShip;

  if (playerShipPositions.length === 0) {
    mouseClick(event, numClick + 1, isVertical);
  } else {
    let shipName;
    switch (numClick) {
      case 3:
        shipName = "Cruiser";
        break;
      case 2:
        shipName = "Submarine";
        break;
      case 1:
        shipName = "Detroyer";
        break;
      default:
        shipName = "";
        break;
    }
    mouseClick(event, numClick, isVertical);
    newPlayerShip = createShip(playerShipPositions);
    addShipColor(playerShipPositions);
    const instructions = document.querySelector(".place-ship-instructions");
    let newInstructions = document.createElement("h3");
    newInstructions.innerHTML = `Please place your <u>${shipName}.</u>`;
    instructions.replaceChildren(newInstructions);
  }
  return newPlayerShip;
}

function compShipPlacement() {
  let compShips = [];
  let arrayCompShipPositions = [];
  for (let i = 4; i > 0; ) {
    let element = document.querySelector(`#B${getRandomSquare()}`);
    let isVertical;
    let randomVerticalNum = Math.floor(Math.random() * (2 - 1 + 1) + 1);
    if (randomVerticalNum === 2) isVertical = true;
    else isVertical = false;
    let greenFour = createColorSquares("aquamarine", i, isVertical);
    greenFour(element);
    let compShipPositions = getShipPositions("B");

    if (compShipPositions.length !== 0) {
      let newCompShip = createShip(compShipPositions);
      addShipColor(compShipPositions);
      arrayCompShipPositions.push(...compShipPositions);
      compShips.push(newCompShip);
      i--;
    }
  }
  removeShipColor(arrayCompShipPositions);
  return compShips;
}

function getShipPositions(board) {
  let shipPosition = [];
  for (let i = 1; i <= 100; i++) {
    let element = document.querySelector(`#${board}${i}`);
    let style = window.getComputedStyle(element);
    let background = style.getPropertyValue("background-color");
    if (background === "rgb(127, 255, 212)") {
      shipPosition.push(element);
    }
  }
  return shipPosition;
}

function addShipColor(arrayOfPositions) {
  for (const element of arrayOfPositions) {
    element.style.backgroundColor = "rgb(68, 68, 68)";
  }
}
function removeShipColor(arrayOfPositions) {
  for (const element of arrayOfPositions) {
    element.style.backgroundColor = "rgb(221, 221, 221)";
  }
}

export { compShipPlacement, playerShipPlacement };
