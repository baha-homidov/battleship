function GameboardFactory() {
  function createArray(length) {
    // 2D array factory function

    // eslint-disable-next-line one-var
    // eslint-disable-next-line prefer-const
    let arr = new Array(length || 0);
    let i = length;

    if (arguments.length > 1) {
      // eslint-disable-next-line prefer-rest-params
      const args = Array.prototype.slice.call(arguments, 1);
      // eslint-disable-next-line no-plusplus
      while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
  }
  const shipArray = [];
  const gameboardArray = createArray(10, 10);
  for (let i = 0; i < 10; i++) {
    // initialize the array
    for (let j = 0; j < 10; j++) {
      gameboardArray[i][j] = { hitStatus: undefined, ship: undefined };
    }
  }

  function ifOccupied(direction, base, ship) {
    
  }

  function addShip(direction, base, ship) {
    if (base + ship.getLength() > 9) {
      return;
    }
    shipArray.push(ship);
    const shipArrayIndex = shipArray.length - 1;

    if (direction === "vertical") {
      for (let i = base, j = 0; j < ship.getLength(); i++, j++) {
        gameboardArray[i][base].ship = {
          arrayIndex: shipArrayIndex,
          hitBox: j,
        };
      }
    } else if (direction === "horizontal") {
      for (let i = base, j = 0; j < ship.getLength(); i++, j++) {
        gameboardArray[base][i].ship = {
          arrayIndex: shipArrayIndex,
          hitBox: j,
        };
      }
    }
  }

  function recieveAttack(row, column) {
    const boardCell = gameboardArray[row][column];
    if (boardCell.hitStatus === undefined) {
      if (boardCell.ship === undefined) {
        boardCell.hitStatus = "miss";
      } else {
        // if there is a ship
        boardCell.hitStatus = "hit";
        shipArray[boardCell.ship.arrayIndex].hit(boardCell.ship.hitBox);
      }
      return true;
    }
    return false;
  }

  function areAllShipsSunk() {
    return shipArray.every((element) => element.isSunk());
  }

  return { recieveAttack, addShip, areAllShipsSunk };
}

export default GameboardFactory;
