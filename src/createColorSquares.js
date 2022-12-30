function createColorSquares(color, numSquares, vertical = false) {
  function addColor(elementArray) {
    for (const element of elementArray) {
      element.style.backgroundColor = color;
    }
  }
  if (vertical === false) {
    function colorSquares(element) {
      let elementArray = [element];
      let sibling = element.nextElementSibling;
      let elementClass = element.getAttribute("class");

      for (let i = 0; i < numSquares; i++) {
        if (sibling === null) {
          return;
        } else if (sibling.firstElementChild !== null) {
          return;
        } else if (elementClass !== sibling.getAttribute("class")) {
          return;
        } else if (sibling.style.backgroundColor === "rgb(68, 68, 68)") {
          return;
        }
        elementArray.push(sibling);
        sibling = sibling.nextElementSibling;
      }
      addColor(elementArray);
    }
    return colorSquares;
  } else if (vertical === true) {
    function verticalColorSquares(element) {
      let elementArray = [element];
      let id = element.getAttribute("id");
      let whichBoard = id[0];
      let parsed = id.match(/[0-9]/g).join("");
      for (let i = 0; i <= numSquares; i++) {
        let nextRow = document.querySelector(`#${whichBoard + parsed}`);
        if (nextRow === null) {
          return;
        }
        if (nextRow.style.backgroundColor === "rgb(68, 68, 68)") {
          return;
        }
        elementArray.push(nextRow);
        parsed = +parsed - 10;
        parsed = parsed.toString();
      }
      addColor(elementArray);
    }

    return verticalColorSquares;
  }
}

export default createColorSquares;
