function createShip(arrayOfElements) {
  let shipLength = arrayOfElements.length;
  let shipPosition = [];
  const newShip = {
    shipPosition: shipPosition,
    shipLength: shipLength,
    numberOfHits: 0,
    hit() {
      this.numberOfHits++;
    },
    isSunk() {
      if (this.numberOfHits >= this.shipLength) return true;
      else return false;
    },
  };
  switch (shipLength) {
    case 5:
      newShip.shipName = "Battleship";
      break;
    case 4:
      newShip.shipName = "Cruiser";
      break;
    case 3:
      newShip.shipName = "Submarine";
      break;
    case 2:
      newShip.shipName = "Destroyer";
      break;
  }
  for (const element of arrayOfElements) {
    shipPosition.push(element.getAttribute("id"));
  }
  return newShip;
}
export default createShip;
