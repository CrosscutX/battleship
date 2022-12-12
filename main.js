"use strict";
import { Ship, Gameboard, Player } from "./battle.js";
//GAME START--------------------------------------------------------------
let coordinates = [null, null];
let infoText = document.querySelector(".info-text");
let playerName = document.querySelector(".name");
const namePage = document.querySelector(".name-screen");
const gamePage = document.querySelector(".game-screen");
const restartBtn = document.querySelector(".restart-button");
const startBtn = document.querySelector(".start-button");

gameLoop();
//Controls the flow of the game, from start to finish
function gameLoop() {
  gameStart();
}

function gameStart() {
  restartBtn.addEventListener("click", () => {
    location.reload();
  });

  startBtn.addEventListener("click", () => {
    namePage.style.display = "none";
    gamePage.style.display = "flex";
    playerName = document.querySelector(".name");
    infoText.textContent = "Place Your Ships";
  });
}

function shipSetup() {}

function gameEnd(player) {
  if (player.enemyBoard.checkGameEnd() === true) {
    //Code to display a winner
    console.log(player.name + " is the winner!");
  }
}
//GAME END-------------------------------------------------
