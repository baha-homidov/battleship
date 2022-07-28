/* eslint-disable no-use-before-define */
import uiManager from "../uiManager/uiManager";
import PlayerFactory from "../Player/PlayerFactory";
import ShipFactory from "../ShipFactory/ShipFactory";

const gameManager = (function gameManager() {
  // Cache DOM
  const restartButton = document.querySelector("button.reset");
  const player = PlayerFactory();
  const computer = PlayerFactory();

  (function init() {
    restartButton.addEventListener("click", () => {
      player.reset();
      computer.reset();
      uiManager.hideWinner();
      uiManager.updatePlayerOneBoard(player.getGameBoardArray());
      uiManager.updateComputerBoard(computer.getGameBoardArray());
    });

    uiManager.updateComputerBoard(computer.getGameBoardArray());
    uiManager.updatePlayerOneBoard(player.getGameBoardArray());
    uiManager.startShipPlacement("horizontal", 0);
  })();

  function startGame() {
    computer.placeShip("horizontal", { x: 0, y: 6 }, ShipFactory(3));
    computer.placeShip("horizontal", { x: 7, y: 4 }, ShipFactory(4));
    computer.placeShip("horizontal", { x: 8, y: 0 }, ShipFactory(2));
    computer.placeShip("vertical", { x: 1, y: 1 }, ShipFactory(5));
    computer.placeShip("vertical", { x: 2, y: 6 }, ShipFactory(3));

    uiManager.updatePlayerOneBoard(player.getGameBoardArray());
    uiManager.updateComputerBoard(computer.getGameBoardArray());
    updateCellsDom();
    computerCells.forEach((cell) => {
      cell.addEventListener("click", () => {
        makeMove(cell);
      });
    });
  }

  function makeMove(cell) {
    computer.receiveAttack(cell.getAttribute("x"), cell.getAttribute("y"));
    uiManager.updateComputerBoard(computer.getGameBoardArray());
    checkWinner();
    const computerMove = computer.randomMove();
    player.receiveAttack(computerMove.x, computerMove.y);
    uiManager.updatePlayerOneBoard(player.getGameBoardArray());
    checkWinner();
    updateCellsDom();
  }

  function checkWinner() {
    if (player.hasLost()) {
      uiManager.showWinner("computer");
    } else if (computer.hasLost()) {
      uiManager.showWinner("player");
    }
  }

  // cache DOM
  let computerCells = document.querySelectorAll(".board > *");

  

  function updateCellsDom() {
    computerCells = document.querySelectorAll(".player-two > .board > *");
    computerCells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (cell.classList.length > 1) {
          // prevent making a move on an already filled cell
          return;
        }
        makeMove(cell);
      });
    });
  }

  function placePlayerShip(direction, base, ship) {
    player.placeShip(direction, base, ship);
  }

  function getPlayerArray() {
    return player.getGameBoardArray();
  }
  return { startGame, placePlayerShip, getPlayerArray };
})();

export default gameManager;
