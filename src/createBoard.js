function createBoard(board, index) {
  let id = 1;
  let row = "1";
  let count = 1;

  for (let i = 0; i < 100; i++) {
    if (count > 10) {
      row = +row + 1;
      row.toString();
      count = 1;
    }
    let div = document.createElement("div");
    div.classList.add("square");
    div.classList.add(`${row}`);
    id = id.toString();
    div.setAttribute("id", index + id);
    count++;
    id++;
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    board.appendChild(div);
  }
}
export default createBoard;
