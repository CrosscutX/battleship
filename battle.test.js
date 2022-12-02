"use strict";
const battle = require("./battle");
//Ship function tests
test("Create ship increments hits properly", () => {
  const newShip = battle.Ship(5);
  newShip.hit();
  expect(newShip.hits).toEqual(1);
});
test("Ship calculates being sunk properly", () => {
  const newShip = battle.Ship("Patrol Boat", 2);
  newShip.hit();
  newShip.hit();
  newShip.isSunk();
  expect(newShip.sunk).toEqual(true);
});
//Gameboard tests
test("Gameboard places carrier ships properly", () => {
  const playerBoard = battle.Gameboard();
  const playerCarrier = battle.Ship("Carrier", 5);
  playerBoard.placeShips(0, 0, 5, playerCarrier);
  expect(playerBoard.board).toEqual([
    ["C", "C", "C", "C", "C", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
  ]);
});

test("Gameboard places battleships properly", () => {
  const playerBoard = battle.Gameboard();
  const battleship = battle.Ship("Battleship", 4);
  playerBoard.placeShips(0, 0, battleship.length, battleship);
  expect(playerBoard.board).toEqual([
    ["B", "B", "B", "B", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
  ]);
});

test("Board doesn't place ships that are too long", () => {
  const playerBoard = battle.Gameboard();
  playerBoard.placeShips(0, 7, 4, "Battleship");
  expect(playerBoard.board).toEqual([
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
  ]);
});

test("Vertical placement works", () => {
  const playerBoard = battle.Gameboard();
  const battleship = battle.Ship("Battleship", 4);
  playerBoard.swapDirection();
  playerBoard.placeShips(0, 0, battleship.length, battleship);
  expect(playerBoard.board).toEqual([
    ["B", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["B", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["B", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["B", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
  ]);
});

test("Ships don't place when overlapping", () => {
  const battleship = battle.Ship("Battleship", 4);
  const carrier = battle.Ship("Carrier", 5);
  const playerBoard = battle.Gameboard();
  playerBoard.placeShips(2, 0, battleship.length, battleship);
  playerBoard.swapDirection();
  playerBoard.placeShips(0, 0, carrier.length, carrier);
  expect(playerBoard.board).toEqual([
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["B", "B", "B", "B", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
  ]);
});

test("Missed attacks register", () => {
  const playerBoard = battle.Gameboard();
  playerBoard.receiveAttack(0, 0);
  expect(playerBoard.board).toEqual([
    ["M", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
  ]);
});
