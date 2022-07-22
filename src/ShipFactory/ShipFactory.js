function ShipFactory(length) {
  const shipArr = new Array(length).fill("");

  function hit(pos) {
    // hit only valid position
    if (pos < shipArr.length && pos >= 0) {
      shipArr[pos] = "hit";
    }
  }

  function isSunk() {
    return shipArr.every((element) => element === "hit");
  }

  function getLength() {
    return length;
  }

  return { hit, isSunk, getLength };
}

export default ShipFactory;
