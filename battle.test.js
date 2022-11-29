"use strict";
const battle = require("./battle");
//Ship function tests
test("Create ship increments hits properly", () => {
  const newShip = battle.Ship(5);
  newShip.hit();
  expect(newShip.hits).toEqual(1);
});
test("Ship calculates being sunk properly", () => {
  const newShip = battle.Ship(2);
  newShip.hit();
  newShip.hit();
  newShip.isSunk();
  expect(newShip.sunk).toEqual(true);
});
//Gameboard tests
