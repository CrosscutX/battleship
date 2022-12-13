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
//Define the players that we'll be using for the game
const player = Player();
const computer = Player();
const playerBoard = Gameboard();
const computerBoard = Gameboard();

restartBtn.addEventListener("click", () => {
  location.reload();
});

startBtn.addEventListener("click", () => {
  gameLoop();
});

//Controls the flow of the game, from start to finish
function gameLoop() {
  gameStart();
  shipSetup();
}
//Game Loop End-----------------------------------------------------
//Game Start, Start-------------------------------------------------
function gameStart() {
  //Reveal the game page, get the value on the textbox and display it above
  //the player's ship. Info text is applied.
  namePage.style.display = "none";
  gamePage.style.display = "flex";
  playerName = document.querySelector(".name").value;
  if (!playerName) {
    playerName = "Commander";
  }
  //Populating the dom/objects that I'll be using to play the game
  playerBoardName.textContent = playerName + "'s" + " Fleet";
  infoText.textContent = "Place Your Carrier";
  //Player objects
  player.name = playerName;
  player.myboard = playerBoard;
  player.enemyBoard = computerBoard;

  computer.name = "Computer";

  computer.myboard = computerBoard;
  computer.enemyBoard = playerBoard;
  computer.bot = true;
  //Board Objects
  playerBoard.player = playerName;
  computerBoard.player = "Computer";
}

//Game Start End--------------------------------------------------

//Ship setup--------------------------------------------------------
let currentShip = "Carrier";
let playerBoardSpaces = "";
function shipSetup() {
  selectPlayerBoardForCarrier();
}

function selectPlayerBoardForCarrier() {
  playerBoardSpaces = document.querySelectorAll(
    ".player-board .row .board-space"
  );
  //Remove original click event listeners before adding them again to avoid
  //duplicate event listeners
  playerBoardSpaces.forEach((space) => {
    space.removeEventListener("click", placeCarrier);
  });

  playerBoardSpaces.forEach((space) => {
    space.addEventListener("click", placeCarrier);
  });
}
//Click event function for ship placement
function placeCarrier(e) {
  const playerCarrier = Ship("Carrier", 5);
  const space = e.target;
  let row = e.target.attributes["data-r"].value;
  let column = e.target.attributes["data-c"].value;
  //Convert the data attributes to numbers so placeShips() works
  row = Number(row);
  column = Number(column);

  playerBoard.placeShips(row, column, playerCarrier.length, playerCarrier);
}

function placeBattleship() {}

function placeDestroyer() {}

function placeSubmarine() {}

function placeBoat() {}

function placeBotShips() {}

//Ship Setup End-------------------------------------------------

function gameEnd(player) {
  if (player.enemyBoard.checkGameEnd() === true) {
    //Code to display a winner
    console.log(player.name + " is the winner!");
  }
}
//GAME END-------------------------------------------------
