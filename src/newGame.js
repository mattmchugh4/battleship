import getRandomSquare from "./getRandomSquare";
import { addPlayerEventLine, addCompEventLine } from "./addEventLine";
function newGame(playerShips, compShips) {
  let compHits = 0;
  let playerHits = 0;
  const allPlayerGuesses = [];
  const allCompGuesses = [];
  let positionCompShips = [];
  let positionPlayerShips = [];
  for (const ship of playerShips) {
    positionPlayerShips.push(...ship.shipPosition);
  }
  for (const ship of compShips) {
    positionCompShips.push(...ship.shipPosition);
  }

  function checkWinner() {
    if (playerHits >= 14 || compHits >= 14) {
      declareWinner();
    }
  }
  function declareWinner() {
    let winner;
    if (playerHits > compHits) {
      winner = "You won! Game over";
    } else {
      winner = "Sorry, you lost. Game over.";
    }
    let h1Selector = document.querySelector("h1");
    let playAgainButton = document.querySelector(".play");
    playAgainButton.innerHTML = "Play again?";
    playAgainButton.addEventListener("click", () => location.reload());
    h1Selector.textContent = winner;
    h1Selector.style.fontSize = "40px";
  }
  let previousCompHitsReversed = false;
  let previousCompHits = [];
  function compGuessLogic() {
    let compBestGuessId;
    while (5) {
      if (previousCompHits.length === 1) {
        compBestGuessId = randomGuessAroundASquare();
      } else {
        compBestGuessId = guessAlongShipLine();

        if (!positionPlayerShips.includes(`A${compBestGuessId}`)) {
          if (previousCompHitsReversed === false) {
            previousCompHitsReversed = true;
            previousCompHits.reverse();
          } else {
            previousCompHits.pop();
          }
        }
      }

      let compBestGuess = document.querySelector(`#A${compBestGuessId}`);

      if (compBestGuess && !allCompGuesses.includes(compBestGuess)) {
        return compBestGuess;
      }
    }

    function guessAlongShipLine() {
      switch (+previousCompHits[1]) {
        case +previousCompHits[0] + 10:
          return +previousCompHits[0] - 10;
        case +previousCompHits[0] - 10:
          return +previousCompHits[0] + 10;
        case +previousCompHits[0] - 1:
          return +previousCompHits[0] + 1;
        case +previousCompHits[0] + 1:
          return +previousCompHits[0] - 1;
      }
    }

    function randomGuessAroundASquare() {
      let searchForShip = Math.floor(Math.random() * (4 - 1 + 1) + 1);

      switch (searchForShip) {
        case 1:
          return +previousCompHits[0] + 1;
        case 2:
          return +previousCompHits[0] - 1;
        case 3:
          return +previousCompHits[0] + 10;
        case 4:
          return +previousCompHits[0] - 10;
      }
    }
  }

  function compGuess() {
    let isValid = false;
    let guessElement;
    while (isValid === false) {
      if (previousCompHits[0] !== undefined) {
        guessElement = compGuessLogic();
      } else {
        guessElement = document.querySelector(`#A${getRandomSquare()}`);
      }
      let guessElementId = guessElement.getAttribute("id");
      if (!allCompGuesses.includes(guessElement)) {
        isValid = true;
        allCompGuesses.push(guessElement);

        if (positionPlayerShips.includes(guessElementId)) {
          compHits++;
          if (guessElementId.length === 3) {
            previousCompHits.unshift(guessElementId.slice(-2));
          } else if (guessElementId.length === 2) {
            previousCompHits.unshift(guessElementId.slice(-1));
          }

          guessElement.style.backgroundColor = "red";
          let isShipSunk = addCompHitToShip(guessElementId);
          if (isShipSunk) {
            previousCompHits = [];
            previousCompHitsReversed = false;
          }
        } else guessElement.style.backgroundColor = "aqua";
      }
      if (allCompGuesses.length > 100) break;
    }
  }
  function addCompHitToShip(position) {
    for (const ship of playerShips) {
      if (ship.shipPosition.includes(position)) {
        ship.hit();
        if (ship.isSunk()) {
          addCompEventLine(ship.shipName);
        }
        return ship.isSunk();
      }
    }
  }

  function playerGuess(event) {
    let element = event.srcElement;
    let elementId = element.getAttribute("id");
    if (allPlayerGuesses.includes(elementId)) return;
    allPlayerGuesses.push(elementId);
    if (positionCompShips.includes(elementId)) {
      playerHits++;
      addPlayerHitToShip(elementId);
      element.style.backgroundColor = "red";
    } else element.style.backgroundColor = "aqua";
    compGuess();
    checkWinner();
  }
  return playerGuess;

  function addPlayerHitToShip(elementId) {
    for (const ship of compShips) {
      if (ship.shipPosition.includes(elementId)) {
        ship.hit();
        if (ship.isSunk()) {
          addPlayerEventLine(ship.shipName);
        }
      }
    }
  }
}
export { newGame };
