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
  return {
    misses: 0,
    updateMiss() {
      this.misses++;
    },
    placeShips() {},
    receiveAttack() {},
  };
}

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
