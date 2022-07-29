/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
import { random } from "lodash";
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
      uiManager.showChangeDirectionButton();
      uiManager.startShipPlacement("vertical", 0);
    });

    uiManager.updateComputerBoard(computer.getGameBoardArray());
    uiManager.updatePlayerOneBoard(player.getGameBoardArray());
    uiManager.startShipPlacement("horizontal", 0);
  })();

  function placeRandomShip() {
    const shipArray = [
      ShipFactory(5),
      ShipFactory(4),
      ShipFactory(3),
      ShipFactory(3),
      ShipFactory(2),
    ];
    const directions = ["horizontal", "vertical"];

    for (let i = 0; i < shipArray.length; i++) {
      while (computer.getShipArray().length < i + 1) {
        const index = random(0, 1);
        const x = random(0, 9);
        const y = random(0, 9);
        computer.placeShip(directions[index], { x, y }, shipArray[i]);
      }
    }
  }

  function startGame() {
    placeRandomShip();
    uiManager.updatePlayerOneBoard(player.getGameBoardArray());
    uiManager.updateComputerBoard(computer.getGameBoardArray());
    updateCellsDom();
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
