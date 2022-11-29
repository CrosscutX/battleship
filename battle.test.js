const battle = require("./battle");

test("Create ship increments hits properly", () => {
  const newShip = battle.createShip(5);
  newShip.hit();
  newShip.isSunk();
  expect(newShip.sunk).toEqual(true);
  expect(newShip.hits).toEqual(1);
});
