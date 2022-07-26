import ShipFactory from "../ShipFactory/ShipFactory";
import PlayerFactory from "./PlayerFactory";

test("Player empty gameboard test", () => {
  expect(PlayerFactory().hasLost()).toBe(false);
});

test("Player empty gameboard test", () => {
  const player = PlayerFactory();
  player.placeShip("horizontal", { x: 0, y: 0 }, ShipFactory(1));
  player.receiveAttack(0, 0);

  expect(player.hasLost()).toBe(true);
});

test("Player random move test", () => {
  const player = PlayerFactory();
  const movesArray = [];
  for (let i = 0; i < 100; i++) {
    movesArray.push(player.randomMove());
  }
  let result = false;
  for (let i = 1; i < 100; i++) {
    result =
      movesArray[i].x === movesArray[i - 1].x &&
      movesArray[i].y === movesArray[i - 1].y;
  }
  expect(result).toBe(false);
});
