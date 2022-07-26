const uiManager = (function uiManager() {
  // cache DOM
  const playerBoard = document.querySelector(".player-one > .board");
  const computerBoard = document.querySelector(".player-two > .board");
  const endgameWindow = document.querySelector(".win-container");
  const playerWin = document.querySelector(".player-win");
  const computerWin = document.querySelector(".computer-win");
 
  function showWinner(winner) {
    endgameWindow.classList.remove("hide");
    if (winner === "player") {
      playerWin.classList.remove("hide");
    }
    else if (winner === "computer") {
      computerWin.classList.remove("hide");
    }
  }

  function hideWinner() {
    playerWin.classList.add("hide");
    computerWin.classList.add("hide");
    endgameWindow.classList.add("hide");
  }

 

  function updatePlayerOneBoard(gameboardArray) {
    playerBoard.textContent = "";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = gameboardArray[i][j];
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.setAttribute("x", i);
        cellDiv.setAttribute("y", j);

        if (cell.ship) {
          cellDiv.classList.add("ship");
        }
        if (cell.hitStatus === "hit") {
          cellDiv.classList.add("hit");
        } else if (cell.hitStatus === "miss") {
          cellDiv.classList.add("miss");
        }
        playerBoard.appendChild(cellDiv);
      }
    }
  }

  function updateComputerBoard(gameboardArray) {
    computerBoard.textContent = "";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = gameboardArray[i][j];
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.classList.add("cell");
        cellDiv.setAttribute("x", i);
        cellDiv.setAttribute("y", j);

        if (cell.hitStatus === "hit") {
          cellDiv.classList.add("hit");
        } else if (cell.hitStatus === "miss") {
          cellDiv.classList.add("miss");
        }

        computerBoard.appendChild(cellDiv);
      }
    }
  }
  return { updatePlayerOneBoard, updateComputerBoard, showWinner, hideWinner };
})();

export default uiManager;
