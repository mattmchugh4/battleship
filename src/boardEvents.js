function boardEvents(board, listener, callback) {
  const squares = board.children;
  const rotateButton = document.querySelector(".rotate-button");
  function addFunction() {
    callback(this);
  }
  function click() {
    for (const element of squares) {
      element.removeEventListener(listener, addFunction);
    }
  }

  for (const element of squares) {
    let elementColor = element.style.backgroundColor;
    if (elementColor === "rgb(68, 68, 68)" || elementColor === "aquamarine")
      continue;
    element.addEventListener(listener, addFunction);
    element.addEventListener("click", click);
    rotateButton.addEventListener("click", click);
  }
}

export default boardEvents;
