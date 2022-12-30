function closeModal() {
  const boardToClone = document.querySelector(".placement-board");
  let clone = boardToClone.cloneNode(true);
  const playersBoard = document.querySelector(".player-board");
  playersBoard.insertAdjacentElement("afterend", clone)
  playersBoard.remove();
  const modalElement = document.querySelector(".modal");
  modalElement.remove();
}
export default closeModal;

