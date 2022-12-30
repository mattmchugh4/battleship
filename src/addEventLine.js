function addPlayerEventLine(shipName) {
  const event = document.createElement("p");
  event.innerHTML = `You sank the enemy <u>${shipName}!</u>`;
  const playerEvent = document.querySelector(".player-events");
  const children = playerEvent.children;
  for (const child of children) {
    child.style.color = "rgba(0, 0, 0, 0.5)";
  }
  playerEvent.prepend(event);
}

function addCompEventLine(shipName) {
  const event = document.createElement("p");
  event.innerHTML = `The enemy sank your <u>${shipName}!</u>`;
  const compEvent = document.querySelector(".comp-events");
  const children = compEvent.children;
  for (const child of children) {
    child.style.color = "rgba(0, 0, 0, 0.5)";
  }
  compEvent.prepend(event);
}

export { addPlayerEventLine, addCompEventLine };
