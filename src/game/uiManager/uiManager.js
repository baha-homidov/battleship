import gameManager from "../gameManager/gameManager";
import ShipFactory from "../ShipFactory/ShipFactory";

const uiManager = (function uiManager() {
  // cache DOM
  const playerBoard = document.querySelector(".player-one > .board");
  const computerBoard = document.querySelector(".player-two > .board");
  const endgameWindow = document.querySelector(".win-container");
  const playerWin = document.querySelector(".player-win");
  const computerWin = document.querySelector(".computer-win");
  const changeDirectionButton = document.querySelector("button.direction");
  const placeShipDiv = document.querySelector("div.place-ship");
  const computerWindow = document.querySelector("div.player-two");
  let cellArray;
  const shipArray = [
    ShipFactory(5),
    ShipFactory(4),
    ShipFactory(3),
    ShipFactory(3),
    ShipFactory(2),
  ];

  function showWinner(winner) {
    endgameWindow.classList.remove("hide");
    if (winner === "player") {
      playerWin.classList.remove("hide");
    } else if (winner === "computer") {
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

  function convertIndex(index) {
    // converts 1d array index to 2d array index
    const numberOfCOlumns = 10;
    return {
      x: Math.floor(index / numberOfCOlumns),
      y: index % numberOfCOlumns,
    };
  }

  function startShipPlacement(shipOrientation, currentShipIndex) {
    cellArray = document.querySelectorAll(".player-one > .board > .cell");
    const shipLength = shipArray[currentShipIndex].getLength();
    let shipValidity = false;
    let basePosition;
    cellArray.forEach((element) => {
      element.addEventListener("mouseover", () => {
        let index;
        for (let i = 0; i < 100; i++) {
          // get specific index of the target element
          if (element === cellArray[i]) {
            index = i;
            break;
          }
        }
        basePosition = convertIndex(index);

        if (shipOrientation === "vertical") {
          // check if there are other ship on the board
          let cellOccupied = false;
          for (
            let i = basePosition.x, j = basePosition.y, length = 0;
            length < shipLength;
            length++, i++
          ) {
            const convertedIndex = i * 10 + j;
            if (cellArray[convertedIndex] !== undefined) {
              if (cellArray[convertedIndex].classList.contains("ship")) {
                cellOccupied = true;
              }
            }
          }

          let className;
          if (cellOccupied === false && basePosition.x + shipLength <= 10) {
            className = "hover";
            shipValidity = true;
          } else {
            className = "invalid";
            shipValidity = false;
          }

          console.log(basePosition.x + shipLength);
          for (
            let i = basePosition.x, j = basePosition.y, length = 0;
            length < shipLength;
            length++, i++
          ) {
            const convertedIndex = i * 10 + j;
            if (cellArray[convertedIndex] !== undefined) {
              cellArray[convertedIndex].classList.toggle(className);
            }
          }
        } else if (shipOrientation === "horizontal") {
          // check if there are other ship on the board
          let cellOccupied = false;
          for (
            let i = basePosition.x, j = basePosition.y, length = 0;
            length < shipLength;
            length++, j++
          ) {
            const convertedIndex = i * 10 + j;
            if (cellArray[convertedIndex] !== undefined) {
              if (cellArray[convertedIndex].classList.contains("ship")) {
                cellOccupied = true;
              }
            }
          }

          let className;
          if (cellOccupied === false && basePosition.y + shipLength <= 10) {
            className = "hover";
            shipValidity = true;
          } else {
            className = "invalid";
            shipValidity = false;
          }
          

          for (
            let i = basePosition.x, j = basePosition.y, length = 0;
            length < shipLength;
            length++, j++
          ) {
            const convertedIndex = i * 10 + j;
            if (cellArray[convertedIndex] !== undefined && j < 10) {
              cellArray[convertedIndex].classList.toggle(className);
            }
          }
        }
      });
    });

    // remove hover class when mouse is not on the cell
    cellArray.forEach((element) => {
      element.addEventListener("mouseleave", () => {
        cellArray.forEach((elem) => {
          elem.classList.remove("hover");
          elem.classList.remove("invalid");
        });
      });
    });

    cellArray.forEach((element) => {
      element.addEventListener("click", () => {
        if (shipValidity) {
          gameManager.placePlayerShip(
            shipOrientation,
            basePosition,
            ShipFactory(shipLength)
          );
          updatePlayerOneBoard(gameManager.getPlayerArray());
          if (currentShipIndex < 4) {
            startShipPlacement("vertical", currentShipIndex + 1);
          }
          else {
            console.log("START GAME");
            placeShipDiv.classList.toggle("hide");
            computerWindow.classList.toggle("hide");
            gameManager.startGame();
          }
        }
      });
    });
  }

  return {
    updatePlayerOneBoard,
    updateComputerBoard,
    showWinner,
    hideWinner,
    startShipPlacement,
  };
})();

export default uiManager;
