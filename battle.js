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
  //create an array that mimics battleship board.
  let board = [];
  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      board[i][j] = "O";
    }
  }

  return {
    ships: [],
    direction: "horizontal",
    board: board,
    addShipToBoard(ship) {
      this.ships.push(ship);
    },
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
    placeShips(row, column, length, ship) {
      //Add the ship that's passed to the ships array
      this.ships.push(ship);
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

      let shipCheck = checkForShip(
        this.board,
        row,
        column,
        length,
        this.direction
      );
      //Lay ships on the grid to the right when direction is horizontal
      //Different letters are applied to the array based on the boat
      if (this.direction === "horizontal" && shipCheck === true) {
        for (let i = 0; i < length; i++) {
          if (ship.name === "Carrier") {
            this.board[row][column] = "C";
            column++;
          } else if (ship.name === "Battleship") {
            this.board[row][column] = "B";
            column++;
          } else if (ship.name === "Destroyer") {
            this.board[row][column] = "D";
            column++;
          } else if (ship.name === "Submarine") {
            this.board[row][column] = "S";
            column++;
          } else if (ship.name === "Patrol Boat") {
            this.board[row][column] = "P";
            column++;
          }
        }
      }
      //lay ships downwards when direction is vertical
      if (this.direction === "vertical" && shipCheck === true) {
        for (let i = 0; i < length; i++) {
          if (ship.name === "Carrier") {
            this.board[row][column] = "C";
            row++;
          } else if (ship.name === "Battleship") {
            this.board[row][column] = "B";
            row++;
          } else if (ship.name === "Destroyer") {
            this.board[row][column] = "D";
            row++;
          } else if (ship.name === "Submarine") {
            this.board[row][column] = "S";
            row++;
          } else if (ship.name === "Patrol Boat") {
            this.board[row][column] = "P";
            row++;
          }
        }
      }
      console.log(this.board);
    },
    //Need to figure out implementation for hitting the right ship,
    //probably need to pass the entire ship objects as arguments
    //for the place ships, and add them to an array.
    receiveAttack(row, column) {
      if (this.board[row][column] === "O") {
      }
    },
  };
}
const battleship = Ship("Battleship", 4);
const carrier = Ship("Carrier", 5);
const playerBoard = Gameboard();
playerBoard.placeShips(2, 0, battleship.length, battleship);
playerBoard.swapDirection();
playerBoard.placeShips(0, 0, carrier.length, carrier);

function Player() {
  return {
    name: "",
    turn: false,
    attack() {
      //Find out if the player is a bot, I can figure out how to attack.
    },
  };
}
//factory functions-------------------------------------------------------
function checkForShip(grid, row, column, length, direction) {
  let flag = true;
  if (direction === "horizontal") {
    for (let i = 0; i < length; i++) {
      if (grid[row][column] === "O") {
        flag = true;
        column++;
      } else if (grid[row][column] !== "O") {
        console.log("Check for ship is false");
        flag = false;
        return;
      }
    }
  }
  if (direction === "vertical") {
    for (let i = 0; i < length; i++) {
      if (grid[row][column] === "O") {
        flag = true;
        row++;
      } else if (grid[row][column] !== "O") {
        console.log("Check for ship is false");
        flag = false;
        return;
      }
    }
  }

  console.log("Check for ship is true");
  return flag;
}
function gameStart() {}
