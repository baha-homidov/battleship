import GameboardFactory from "./GameboardFactory";
import ShipFactory from "../ShipFactory/ShipFactory";

test("GameboardFactory hit success test", () => {
  const gameboard = GameboardFactory();
  let attackResult;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      attackResult = gameboard.recieveAttack(i, j);
    }
  }
  expect(attackResult).toBe(true);
});

test("GameboardFactory hit fail test", () => {
  const gameboard = GameboardFactory();
  gameboard.recieveAttack(0, 0);
  const attackResult = gameboard.recieveAttack(0, 0);
  expect(attackResult).toBe(false);
});

test("GameBoardFactory add ship test", () => {
  const gameboard = GameboardFactory();
  gameboard.addShip("vertical", { x: 1, y: 1 }, ShipFactory(5));
  gameboard.recieveAttack(1, 1);
  gameboard.recieveAttack(2, 1);
  gameboard.recieveAttack(3, 1);
  gameboard.recieveAttack(4, 1);
  gameboard.recieveAttack(5, 1);
  expect(gameboard.areAllShipsSunk()).toBe(true);
});

test("GameBoardFactory add ship test", () => {
  const gameboard = GameboardFactory();
  gameboard.addShip("vertical", { x: 3, y: 2 }, ShipFactory(3));
  expect(gameboard.areAllShipsSunk()).toBe(false);
});

test("GameBoardFactory empty board test", () => {
  const gameboard = GameboardFactory();

  expect(gameboard.areAllShipsSunk()).toBe(false);
});
