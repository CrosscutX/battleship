"use strict";
module.exports = { Ship: Ship, Gameboard: Gameboard, Player: Player };
//factory functions-----------------------------------------------
function Ship(length) {
  return {
    length: length,
    hits: 0,
    sunk: false,

    hit() {
      this.hits++;
    },
    isSunk() {
      if (this.hits === this.length) {
        this.sunk = true;
      }
    },
  };
}

function Gameboard() {
  let board = [];
  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      board[i][j] = "O";
    }
  }

  return {
    board: board,
    misses: 0,
    updateMiss() {
      this.misses++;
    },
    //Places a ship input into the board array based on the length of the ship
    placeShips(row, column, length) {
      if (column + length > 10) {
        console.log("Invalid board position");
        return;
      }
      for (let i = 0; i < length; i++) {
        this.board[row][column] = "S";
        column++;
      }
    },
    receiveAttack() {},
  };
}
let ship1 = Gameboard();
ship1.placeShips(0, 0, 5);
console.log(ship1);

function Player() {
  return {
    name: "",
    turn: false,
    attack() {
      //Find out if the player is a bot, I can figure out how to attack.
      if (this.name === "Computer") {
      } else {
      }
    },
  };
}
//factory functions-------------------------------------------------------
