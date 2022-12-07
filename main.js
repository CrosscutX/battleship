"use strict";
import { Ship, Gameboard, Player } from "./battle.js";
//GAME START--------------------------------------------------------------
const namePage = document.querySelector(".name-screen");
const restartBtn = document.querySelector(".restart-button");
const startBtn = document.querySelector(".start-button");
console.log("HI");
restartBtn.addEventListener("click", () => {
  location.reload();
});
gameLoop();
function gameLoop() {
  gameStart();
}

function gameStart() {
  console.log("gamestart is working");
}

function gameEnd(player) {
  if (player.enemyBoard.checkGameEnd() === true) {
    //Code to display a winner
    console.log(player.name + " is the winner!");
  }
}
//GAME END-------------------------------------------------
