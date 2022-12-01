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
    direction: "horizontal",
    board: board,
    misses: 0,
    updateMiss() {
      this.misses++;
    },

    swapDirection() {
      if (this.direction === "horizontal") {
        this.direction = "vertical";
      } else if (this.direction === "vertical") {
        this.direction = "horizontal";
      }
    },
    //Places a ship input into the board array based on the length of the ship
    placeShips(row, column, length, type) {
      //Check if a horizontal ship is placed too far right
      if (column + length > 10 && this.direction === "horizontal") {
        console.log("Invalid board position");
        return;
      }
      //Check if a vertical ship is placed too far down
      if (row + length > 10 && this.direction === "vertical") {
        console.log("invalid board position");
        return;
      }
      //Lay ships on the grid to the right when direction is horizontal
      //Different letters are applied to the array based on the boat
      if (this.direction === "horizontal") {
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
      }
      //lay ships downwards when direction is vertical
      if (this.direction === "vertical") {
        for (let i = 0; i < length; i++) {
          if (type === "Carrier") {
            this.board[row][column] = "C";
            row++;
          } else if (type === "Battleship") {
            this.board[row][column] = "B";
            row++;
          } else if (type === "Destroyer") {
            this.board[row][column] = "D";
            row++;
          } else if (type === "Submarine") {
            this.board[row][column] = "S";
            row++;
          } else if (type === "Patrol Boat") {
            this.board[row][column] = "P";
            row++;
          }
        }
      }
    },

    receiveAttack(row, column) {
      if (this.board[row][column] === "O") {
      }
    },
  };
}
let battleship = Ship("Battleship", 4);
let playerBoard = Gameboard();
playerBoard.swapDirection();
playerBoard.placeShips(0, 0, 4, battleship.name);
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
function placeHorizontal() {}

function placeVertical() {}
