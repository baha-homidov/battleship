import { random } from "lodash";
import GameboardFactory from "../Gameboard/GameboardFactory";
import createArray from "../helperFunctions";

function PlayerFactory() {
  let gameboard = GameboardFactory();
  let moveTrackerArray = [];


  function reset() {
    gameboard = GameboardFactory();
    moveTrackerArray = [];
  }

  function hasLost() {
    return gameboard.areAllShipsSunk();
  }

  function placeShip(direction, base, ship) {
    gameboard.addShip(direction, base, ship);
  }

  function receiveAttack(x, y) {
    gameboard.recieveAttack(x, y);
  }

  function logBoard() {
    gameboard.logBoard();
  }

  function ifIncludes(move) {
    let result = false;
    for (let i = 0; i < moveTrackerArray.length; i++) {
      if (move.x === moveTrackerArray[i].x && move.y === moveTrackerArray[i].y) {
        result = true;
      }
    }
    return result;
  }

  function randomMove() {
    let result = {};
    let x = random(0, 9);
    let y = random(0, 9);
    result = { x, y };
    while (ifIncludes(result)) {
      x = random(0, 9);
      y = random(0, 9);
      result = { x, y };
    }
    moveTrackerArray.push(result);

    return result;
  }

  function getGameBoardArray() {
    return gameboard.getGameBoardArray();
  }

  return {
    hasLost,
    placeShip,
    receiveAttack,
    logBoard,
    randomMove,
    getGameBoardArray,
    reset,
  };
}

export default PlayerFactory;
