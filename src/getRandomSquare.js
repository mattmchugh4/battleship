function randomSquare() {
  while (1) {
    let randomNum = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    if (randomNum % 2 !== 0) {
      if (randomNum > 90) return randomNum + 1;
      else if (randomNum > 70 && randomNum < 80) return randomNum + 1;
      else if (randomNum > 50 && randomNum < 60) return randomNum + 1;
      else if (randomNum > 30 && randomNum < 40) return randomNum + 1;
      else if (randomNum > 10 && randomNum < 20) return randomNum + 1;
      return randomNum;
    }
  }
}

export default randomSquare;
