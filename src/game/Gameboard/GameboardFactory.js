import createArray from "../helperFunctions";

function GameboardFactory() {
  const shipArray = [];
  const gameboardArray = createArray(10, 10);
  for (let i = 0; i < 10; i++) {
    // initialize the array
    for (let j = 0; j < 10; j++) {
      gameboardArray[i][j] = { hitStatus: undefined, ship: undefined };
    }
  }

  function isOccupied(direction, base, ship) {
    if (direction === "vertical") {
      for (
        let i = base.x, j = base.y, currLength = 0;
        currLength < ship.getLength();
        i++, currLength++
      ) {
        if (gameboardArray[i][j].ship !== undefined) {
          return true;
        }
      }
    } else if (direction === "horizontal") {
      for (
        let i = base.x, j = base.y, currLength = 0;
        currLength < ship.getLength();
        j++, currLength++
      ) {
        if (gameboardArray[i][j].ship !== undefined) {
          return true;
        }
      }
    }
    return false;
  }

  function addShip(direction, base, ship) {
    // check if the ship is too long
    if (direction === "vertical") {
      if (base.x + ship.getLength() > 10) {
        console.log("too long!");
        return false;
      }
    } else if (base.y + ship.getLength() > 10) {
      console.log("too long!");
      return false;
    }
    // -----------------------------

    if (isOccupied(direction, base, ship)) {
      // check if cells are occupied by other ships
      console.log("occupied");
      return false;
    }

    if (direction === "vertical") {
      console.log("vertical called");
      shipArray.push(ship);
      const shipArrayIndex = shipArray.length - 1;
      let currLength = 0;
      for (
        let i = base.x, j = base.y;
        currLength < ship.getLength();
        i++, currLength++
      ) {
        gameboardArray[i][j].ship = {
          arrayIndex: shipArrayIndex,
          hitBox: currLength,
        };
      }
      return true;
    }
    if (direction === "horizontal") {
      console.log("horizontal called");
      shipArray.push(ship);
      const shipArrayIndex = shipArray.length - 1;
      let currLength = 0;
      for (
        let i = base.x, j = base.y;
        currLength < ship.getLength();
        j++, currLength++
      ) {
        gameboardArray[i][j].ship = {
          arrayIndex: shipArrayIndex,
          hitBox: currLength,
        };
      }
      return true;
    }
  }

  function recieveAttack(row, column) {
    const boardCell = gameboardArray[row][column];
    if (boardCell.hitStatus === undefined) {
      if (boardCell.ship === undefined) {
        boardCell.hitStatus = "miss";
      } else {
        // if there is a ship
        console.log("hit ship");

        boardCell.hitStatus = "hit";
        shipArray[boardCell.ship.arrayIndex].hit(boardCell.ship.hitBox);
      }
      return true;
    }
    return false;
  }

  function areAllShipsSunk() {
    if (shipArray.length === 0) {
      return false;
    }

    return shipArray.every((element) => element.isSunk());
  }

  function getGameBoardArray() {
    return gameboardArray;
  }

  function getShipArray() {
    return shipArray;
  }

  return {
    recieveAttack,
    addShip,
    areAllShipsSunk,
    getGameBoardArray,
    getShipArray,
  };
}

export default GameboardFactory;
