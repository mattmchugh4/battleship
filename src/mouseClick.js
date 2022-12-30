import boardEvents from "./boardEvents";
import createColorSquares from "./createColorSquares";

function mouseClick(event, numSquares, isVertical) {
  const placementBoard = document.querySelector(".placement-board");

  const turnGreen = createColorSquares("aquamarine", numSquares, isVertical);
  boardEvents(placementBoard, "mouseover", turnGreen);

  const turnGrey = createColorSquares(
    "rgb(221, 221, 221)",
    numSquares,
    isVertical
  );
  boardEvents(placementBoard, "mouseleave", turnGrey);
}
export default mouseClick;
