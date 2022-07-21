import shipFactory from "./shipFactory";

test("ship Factory initial test", () => {
  expect(shipFactory(2).length).toBe(2);
});
