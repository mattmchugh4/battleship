function addShip(event) {
    let isInvalidMove = true;
    let shipSquares = [];
    for (let i = 1; i <= 100; i++) {
      let element = document.querySelector(`#A${i}`);
      let style = window.getComputedStyle(element);
      let background = style.getPropertyValue("background-color");
      if (background === "rgb(127, 255, 212)") {
        shipSquares.push(element);
        isInvalidMove = false;
      }
    }