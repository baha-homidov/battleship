import ShipFactory from "./ShipFactory";

test("shipFactory not Sunk test", () => {
  const ship = ShipFactory(4);
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  expect(ship.isSunk()).toBe(false);
});

test("shipFactory Sunk test", () => {
  const ship = ShipFactory(4);
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  ship.hit(3);

  expect(ship.isSunk()).toBe(true);
});
