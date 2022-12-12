"use strict";
import { Ship, Gameboard, Player } from "./battle.js";
//GAME START--------------------------------------------------------------
let coordinates = [null, null];
let playerName = document.querySelector(".name");
const infoText = document.querySelector(".info-text");
const namePage = document.querySelector(".name-screen");
const gamePage = document.querySelector(".game-screen");
const restartBtn = document.querySelector(".restart-button");
const startBtn = document.querySelector(".start-button");
const playerBoardName = document.querySelector(".left-container h2");

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
    //Reveal the game page, get the value on the textbox and display it above
    //the player's ship. Info text is applied.
    namePage.style.display = "none";
    gamePage.style.display = "flex";
    playerName = document.querySelector(".name").value;
    if (!playerName) {
      playerName = "Commander";
    }

    playerBoardName.textContent = playerName + "'s" + " Fleet";
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
