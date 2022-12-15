"use strict";
import { Ship, Gameboard, Player } from "./battle.js";
//GAME START--------------------------------------------------------------
let coordinates = [null, null];
let playerName = document.querySelector(".name");
let infoText = document.querySelector(".info-text");
const namePage = document.querySelector(".name-screen");
const gamePage = document.querySelector(".game-screen");
const restartBtn = document.querySelector(".restart-button");
const startBtn = document.querySelector(".start-button");
const rotateBtn = document.querySelector(".rotate-button");
const playerBoardName = document.querySelector(".left-container h2");
//Define the players that we'll be using for the game
const player = Player();
const computer = Player();
const playerBoard = Gameboard();
const computerBoard = Gameboard();
//Button click events------------------------------------------
restartBtn.addEventListener("click", () => {
  location.reload();
});

startBtn.addEventListener("click", () => {
  gameLoop();
});

rotateBtn.addEventListener("click", () => {
  console.log("in rotate button");
  playerBoard.swapDirection();
});

//Button click events end--------------------------------------

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
//CurrentShip controls the flow of the game during setup
let currentShip = "carrier";
let playerBoardSpaces = "";

function shipSetup() {
  addShipHover();
  selectPlayerBoardForShip(placeCarrier);
}

function addShipHover() {
  playerBoardSpaces = document.querySelectorAll(
    ".player-board .row .board-space:not(.board-space-label)"
  );

  playerBoardSpaces.forEach((space) => {
    space.addEventListener("mouseover", addHoverClass);
  });

  playerBoardSpaces.forEach((space) => {
    space.addEventListener("mouseleave", removeHoverClass);
  });
}

function selectPlayerBoardForShip(func) {
  playerBoardSpaces = document.querySelectorAll(
    ".player-board .row .board-space:not(.board-space-label)"
  );
  //Click event listeners to add each specific ship click function
  playerBoardSpaces.forEach((space) => {
    space.removeEventListener("click", func);
  });

  playerBoardSpaces.forEach((space) => {
    space.addEventListener("click", func);
  });
}
//Checks if ship can't be placed, and then reselects it for placement
function checkInvalidSpace(board, row, column, length, ship, func) {
  if (
    board.placeShips(row, column, length, ship) === "Invalid board position"
  ) {
    selectPlayerBoardForShip(func);
    infoText.textContent = "Invalid Space";
    return false;
  } else {
    console.log(playerBoard);
  }
}
//Click event function for ship placement
function placeCarrier(e) {
  const playerCarrier = Ship("Carrier", 5);
  const space = e.target;
  let row = space.attributes["data-r"].value;
  let column = space.attributes["data-c"].value;
  //Convert the data attributes to numbers so placeShips() works
  row = Number(row);
  column = Number(column);
  //Check if the space is valid
  if (
    checkInvalidSpace(
      playerBoard,
      row,
      column,
      playerCarrier.length,
      playerCarrier,
      placeCarrier
    ) === false
  ) {
    return;
  }

  addShipClass();
  //Deselect current click event listeners
  playerBoardSpaces.forEach((space) => {
    space.removeEventListener("click", placeCarrier);
  });

  infoText.textContent = "Place Your Battleship";
  currentShip = "battleship";
  selectPlayerBoardForShip(placeBattleship);
}

function placeBattleship(e) {
  const playerBattleship = Ship("Battleship", 4);
  const space = e.target;
  let row = space.attributes["data-r"].value;
  let column = space.attributes["data-c"].value;
  //Convert the data attributes to numbers so placeShips() works
  row = Number(row);
  column = Number(column);
  //Check if the space is valid
  if (
    checkInvalidSpace(
      playerBoard,
      row,
      column,
      playerBattleship.length,
      playerBattleship,
      placeBattleship
    ) === false
  ) {
    return;
  }

  addShipClass();
  //Deselect current click event listeners
  playerBoardSpaces.forEach((space) => {
    space.removeEventListener("click", placeBattleship);
  });

  infoText.textContent = "Place Your Destroyer";
  currentShip = "destroyer";
  selectPlayerBoardForShip(placeDestroyer);
}

function placeDestroyer(e) {
  const playerDestroyer = Ship("Destroyer", 3);
  const space = e.target;
  let row = space.attributes["data-r"].value;
  let column = space.attributes["data-c"].value;
  //Convert the data attributes to numbers so placeShips() works
  row = Number(row);
  column = Number(column);
  //Check if the space is valid
  if (
    checkInvalidSpace(
      playerBoard,
      row,
      column,
      playerDestroyer.length,
      playerDestroyer,
      placeDestroyer
    ) === false
  ) {
    return;
  }

  addShipClass();
  //Deselect current click event listeners
  playerBoardSpaces.forEach((space) => {
    space.removeEventListener("click", placeDestroyer);
  });

  infoText.textContent = "Place Your Submarine";
  currentShip = "submarine";
  selectPlayerBoardForShip(placeSubmarine);
}

function placeSubmarine(e) {
  const playerSubmarine = Ship("Submarine", 3);
  const space = e.target;
  let row = space.attributes["data-r"].value;
  let column = space.attributes["data-c"].value;
  //Convert the data attributes to numbers so placeShips() works
  row = Number(row);
  column = Number(column);
  //Check if the space is valid
  if (
    checkInvalidSpace(
      playerBoard,
      row,
      column,
      playerSubmarine.length,
      playerSubmarine,
      placeSubmarine
    ) === false
  ) {
    return;
  }

  addShipClass();
  //Deselect current click event listeners
  playerBoardSpaces.forEach((space) => {
    space.removeEventListener("click", placeSubmarine);
  });

  infoText.textContent = "Place Your Patrol Boat";
  currentShip = "patrol boat";
  selectPlayerBoardForShip(placeBoat);
}

function placeBoat(e) {
  const playerBoat = Ship("Patrol Boat", 2);
  const space = e.target;
  let row = space.attributes["data-r"].value;
  let column = space.attributes["data-c"].value;
  //Convert the data attributes to numbers so placeShips() works
  row = Number(row);
  column = Number(column);
  //Check if the space is valid
  if (
    checkInvalidSpace(
      playerBoard,
      row,
      column,
      playerBoat.length,
      playerBoat,
      placeBoat
    ) === false
  ) {
    return;
  }

  addShipClass();
  //Deselect current click event listeners
  playerBoardSpaces.forEach((space) => {
    space.removeEventListener("click", placeBoat);
  });

  infoText.textContent = "Attack";
  currentShip = "attack";
}

function placeBotShips() {}

/*
When hoving on an element this function identifies an board space when the user
mouses inside, and then adds the placement class to that element and it's sister
elements based on which ship is currently being placed in the "currentShip" variable
*/
let space1 = "";
let space2 = "";
let space3 = "";
let space4 = "";
let space5 = "";
function addHoverClass(e) {
  space1 = e.target;
  space1.classList.add("placement");
  let row = space1.getAttribute("data-r");
  let column = space1.getAttribute("data-c");
  row = Number(row);
  column = Number(column);

  //Check for horizontal or vertical, and select the squares appropriately
  if (playerBoard.direction === "horizontal") {
    space2 = document.querySelector(
      "[data-c=" +
        CSS.escape(column + 1) +
        "]" +
        "[data-r=" +
        CSS.escape(row) +
        "]"
    );
    space3 = document.querySelector(
      "[data-c=" +
        CSS.escape(column + 2) +
        "]" +
        "[data-r=" +
        CSS.escape(row) +
        "]"
    );
    space4 = document.querySelector(
      "[data-c=" +
        CSS.escape(column + 3) +
        "]" +
        "[data-r=" +
        CSS.escape(row) +
        "]"
    );
    space5 = document.querySelector(
      "[data-c=" +
        CSS.escape(column + 4) +
        "]" +
        "[data-r=" +
        CSS.escape(row) +
        "]"
    );
  } else if (playerBoard.direction === "vertical") {
    space2 = document.querySelector(
      "[data-c=" +
        CSS.escape(column) +
        "]" +
        "[data-r=" +
        CSS.escape(row + 1) +
        "]"
    );
    space3 = document.querySelector(
      "[data-c=" +
        CSS.escape(column) +
        "]" +
        "[data-r=" +
        CSS.escape(row + 2) +
        "]"
    );
    space4 = document.querySelector(
      "[data-c=" +
        CSS.escape(column) +
        "]" +
        "[data-r=" +
        CSS.escape(row + 3) +
        "]"
    );
    space5 = document.querySelector(
      "[data-c=" +
        CSS.escape(column) +
        "]" +
        "[data-r=" +
        CSS.escape(row + 4) +
        "]"
    );
  }
  //Adds the class if there is something in the variable
  if (currentShip === "carrier") {
    if (space2 != null) {
      space2.classList.add("placement");
    }
    if (space3 != null) {
      space3.classList.add("placement");
    }
    if (space4 != null) {
      space4.classList.add("placement");
    }
    if (space5 != null) {
      space5.classList.add("placement");
    }
  } else if (currentShip === "battleship") {
    if (space2 != null) {
      space2.classList.add("placement");
    }
    if (space3 != null) {
      space3.classList.add("placement");
    }
    if (space4 != null) {
      space4.classList.add("placement");
    }
  } else if (currentShip === "destroyer") {
    if (space2 != null) {
      space2.classList.add("placement");
    }
    if (space3 != null) {
      space3.classList.add("placement");
    }
  } else if (currentShip === "submarine") {
    if (space2 != null) {
      space2.classList.add("placement");
    }
    if (space3 != null) {
      space3.classList.add("placement");
    }
  } else if (currentShip === "patrol boat") {
    if (space2 != null) {
      space2.classList.add("placement");
    }
  }
}
//removes the class if there's something in the variable, space1 will always be filled
function removeHoverClass() {
  space1.classList.remove("placement");

  if (space2 != null) {
    space2.classList.remove("placement");
  }

  if (space3 != null) {
    space3.classList.remove("placement");
  }

  if (space4 != null) {
    space4.classList.remove("placement");
  }

  if (space5 != null) {
    space5.classList.remove("placement");
  }
}

function addShipClass() {
  if (currentShip === "carrier") {
    space1.classList.add("ship-space");
    space2.classList.add("ship-space");
    space3.classList.add("ship-space");
    space4.classList.add("ship-space");
    space5.classList.add("ship-space");
  }

  if (currentShip === "battleship") {
    space1.classList.add("ship-space");
    space2.classList.add("ship-space");
    space3.classList.add("ship-space");
    space4.classList.add("ship-space");
  }

  if (currentShip === "destroyer") {
    space1.classList.add("ship-space");
    space2.classList.add("ship-space");
    space3.classList.add("ship-space");
  }

  if (currentShip === "submarine") {
    space1.classList.add("ship-space");
    space2.classList.add("ship-space");
    space3.classList.add("ship-space");
  }

  if (currentShip === "patrol boat") {
    space1.classList.add("ship-space");
    space2.classList.add("ship-space");
  }
}

//Ship Setup End-------------------------------------------------

function gameEnd(player) {
  if (player.enemyBoard.checkGameEnd() === true) {
    //Code to display a winner
    console.log(player.name + " is the winner!");
  }
}
//GAME END-------------------------------------------------
