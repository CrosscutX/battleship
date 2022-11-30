"use strict";
module.exports = { Ship: Ship, Gameboard: Gameboard, Player: Player };
//factory functions-----------------------------------------------
function Ship(name, length) {
  return {
    name: name,
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
    placeShips(row, column, length, type) {
      if (column + length > 10) {
        console.log("Invalid board position");
        return;
      }
      for (let i = 0; i < length; i++) {
        if (type === "Carrier") {
          this.board[row][column] = "C";
          column++;
        } else if (type === "Battleship") {
          this.board[row][column] = "B";
          column++;
        } else if (type === "Destroyer") {
          this.board[row][column] = "D";
          column++;
        } else if (type === "Submarine") {
          this.board[row][column] = "S";
          column++;
        } else if (type === "Patrol Boat") {
          this.board[row][column] = "P";
          column++;
        }
      }
    },
    receiveAttack(row, column) {},
  };
}
let battleship = Ship("Battleship", 4);
let playerBoard = Gameboard();
playerBoard.placeShips(0, 6, 4, battleship.name);
console.log(playerBoard);

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
