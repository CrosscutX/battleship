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
const fireBtn = document.querySelector(".fire-button");
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
  gameStart();
});

rotateBtn.addEventListener("click", () => {
  playerBoard.swapDirection();
});

//Button click events end--------------------------------------

//Game Start, Start-------------------------------------------------
function gameStart() {
  //Reveal the game page, get the value on the textbox and display it above
  //the player's ship. Info text is applied.
  namePage.style.display = "none";
  gamePage.classList.add("show");

  playerName = document.querySelector(".name").value;
  if (!playerName) {
    playerName = "Commander";
  }
  //Populating the dom/objects that I'll be using to play the game
  playerBoardName.textContent = playerName + "'s" + " Fleet";
  infoText.textContent = "Place Your Carrier";
  infoText.classList.add("carrier-text");
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
  shipSetup();
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
    infoText.textContent = "You cannot station your ship there " + playerName;
    infoText.classList.remove(
      "carrier-text",
      "battleship-text",
      "destroyer-text",
      "submarine-text",
      "boat-text"
    );
    infoText.classList.add("invalid-text");
    return false;
  } else {
    return true;
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
  //If valid, adds the ship with the addShipClass function
  addShipClass();
  //Deselect current click event listeners
  playerBoardSpaces.forEach((space) => {
    space.removeEventListener("click", placeCarrier);
  });

  infoText.textContent = "Place Your Battleship";
  infoText.classList.add("battleship-text");
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
  infoText.classList.add("destroyer-text");
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
  infoText.classList.add("submarine-text");
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
  infoText.classList.add("boat-text");
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
  //Prep infotext for actual game
  infoText.textContent = "ATTACK";
  infoText.classList.remove(
    "invalid-text",
    "carrier-text",
    "battleship-text",
    "destroyer-text",
    "submarine-text",
    "boat-text"
  );
  infoText.classList.add("attack-text");
  currentShip = "attack";
  rotateBtn.style.display = "none";
  fireBtn.style.display = "flex";
  //Add placeholder text to first space to help inform player of the game state
  const firstSpace = document.querySelector(
    ".computer-board .right-container [data-c='0'][data-r='0']"
  );
  firstSpace.classList.add("selected");
  //Get rid of hover event listener for player board
  playerBoardSpaces.forEach((space) => {
    space.removeEventListener("mouseover", addHoverClass);
  });
  //Have the bot randomly place ships
  placeBotShips();
  //Start next game phase
  attackStart();
}

function placeBotShips() {
  const computerDirection = ["horizontal", "vertical"];
  const computerCarrier = Ship("Carrier", 5);
  const computerBattleship = Ship("Battleship", 4);
  const computerDestroyer = Ship("Destroyer", 3);
  const computerSubmarine = Ship("Submarine", 3);
  const computerBoat = Ship("Patrol Boat", 2);
  //Randomly pick whether the ship is placed horizontal or vertically
  //Then check if the ship spot is valid and then place it
  computerBoard.direction = computerDirection[Math.floor(Math.random() * 2)];
  checkBotShips(
    randomNum(),
    randomNum(),
    computerCarrier.length,
    computerCarrier
  );

  computerBoard.direction = computerDirection[Math.floor(Math.random() * 2)];
  checkBotShips(
    randomNum(),
    randomNum(),
    computerBattleship.length,
    computerBattleship
  );

  computerBoard.direction = computerDirection[Math.floor(Math.random() * 2)];
  checkBotShips(
    randomNum(),
    randomNum(),
    computerDestroyer.length,
    computerDestroyer
  );

  computerBoard.direction = computerDirection[Math.floor(Math.random() * 2)];
  checkBotShips(
    randomNum(),
    randomNum(),
    computerSubmarine.length,
    computerSubmarine
  );

  computerBoard.direction = computerDirection[Math.floor(Math.random() * 2)];
  checkBotShips(randomNum(), randomNum(), computerBoat.length, computerBoat);
  console.log(computerBoard.board);
}
//random number 0-9 for ship placement
function randomNum() {
  return Math.floor(Math.random() * 10);
}
//Recursive function to check if a position is invalid, and if it is then to
//call the function again.
function checkBotShips(row, column, length, ship) {
  if (
    computerBoard.placeShips(row, column, length, ship) !==
    "Invalid board position"
  ) {
    return;
  } else {
    checkBotShips(randomNum(), randomNum(), length, ship);
  }
}

/*
When hoving on an element this function identifies an board space when the user
mouses inside, and then adds the placement class to that element and it's sister
elements based on which ship is currently being placed in the "currentShip" variable
*/
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
    space1.classList.add("ship-space-carrier");
    space2.classList.add("ship-space-carrier");
    space3.classList.add("ship-space-carrier");
    space4.classList.add("ship-space-carrier");
    space5.classList.add("ship-space-carrier");
  }

  if (currentShip === "battleship") {
    space1.classList.add("ship-space-battleship");
    space2.classList.add("ship-space-battleship");
    space3.classList.add("ship-space-battleship");
    space4.classList.add("ship-space-battleship");
  }

  if (currentShip === "destroyer") {
    space1.classList.add("ship-space-destroyer");
    space2.classList.add("ship-space-destroyer");
    space3.classList.add("ship-space-destroyer");
  }

  if (currentShip === "submarine") {
    space1.classList.add("ship-space-submarine");
    space2.classList.add("ship-space-submarine");
    space3.classList.add("ship-space-submarine");
  }

  if (currentShip === "patrol boat") {
    space1.classList.add("ship-space-boat");
    space2.classList.add("ship-space-boat");
  }
}

//Ship Setup End-------------------------------------------------

//Attack Start----------------------------------------------------

function attackStart() {
  selectCompBoardForAttack();
}
//Globally declare enemyBoardSpaces so that I can tamper with the spaces easily
let enemyBoardSpaces = "";
function selectCompBoardForAttack() {
  enemyBoardSpaces = document.querySelectorAll(
    ".computer-board .row .board-space:not(.board-space-label)"
  );

  enemyBoardSpaces.forEach((space) => {
    space.removeEventListener("click", selectComputerCoordinates);
  });

  enemyBoardSpaces.forEach((space) => {
    space.addEventListener("click", selectComputerCoordinates);
  });
}

let enemyCoordinates = [0, 0];
//Select the coordinates for the fireBtn event listener
function selectComputerCoordinates(e) {
  //Remove the selected class from the space, so that only one space can
  //turn yellow at a time.
  enemyBoardSpaces.forEach((space) => {
    space.classList.remove("selected");
  });
  const space = e.target;
  let row = space.attributes["data-r"].value;
  let column = space.attributes["data-c"].value;
  //Convert the data attributes to numbers so placeShips() works
  row = Number(row);
  column = Number(column);
  enemyCoordinates[0] = row;
  enemyCoordinates[1] = column;
  //Give a class to visually represent selection
  space.classList.add("selected");
}
//Launches the attack on the selected computer board space
fireBtn.addEventListener("click", playerAttack);
//Remove the selected class from the space after fireing, so it doesn't
//conflict with the other color classes

function playerAttack() {
  //Get rid of potential old classes as to not disrupt new ones
  infoText.classList.remove("invalid-text");

  enemyBoardSpaces.forEach((space) => {
    space.classList.remove("selected");
  });
  //Grab the current selected row and column
  const row = enemyCoordinates[0];
  const column = enemyCoordinates[1];
  //Grab the space before we launch an attack so that we can display sunk
  //ships properly later
  const spaceBeforeAttack = player.enemyBoard.board[row][column];

  if (player.attack(row, column) === "INVALID SPACE") {
    return;
  } else {
    //Select the current space from the row and column
    const currentSpace = document.querySelector(
      ".computer-board .right-container [data-c=" +
        CSS.escape(column) +
        "]" +
        "[data-r=" +
        CSS.escape(row) +
        "]"
    );
    //Check whether the ship is hit or not
    if (player.enemyBoard.board[row][column] === "H") {
      currentSpace.classList.add("hit");
      const sunkResult = checkSunk(
        player,
        spaceBeforeAttack,
        player.enemyBoard.ships
      );
      //If the sunk result returns text, display it in infotext
      //else add the brace text for computer turn
      if (sunkResult) {
        infoText.textContent = sunkResult;
        infoText.classList.remove("brace-text", "attack-text");
        infoText.classList.add("sunk-text");
      } else {
        infoText.textContent = "BRACE";
        infoText.classList.add("brace-text");
      }
    } else if (player.enemyBoard.board[row][column] === "M") {
      currentSpace.classList.add("miss");
      infoText.textContent = "BRACE";
      infoText.classList.add("brace-text");
    }
  }
  //Deselect the board while the timeout occurs so the player
  //has to wait for the computer
  enemyBoardSpaces.forEach((space) => {
    space.removeEventListener("click", selectComputerCoordinates);
  });
  setTimeout(computerAttack, 1200);
}

function computerAttack() {
  const row = randomNum();
  const column = randomNum();
  const spaceBeforeAttack = computer.enemyBoard.board[row][column];
  if (computer.attack(row, column) === "INVALID SPACE") {
    computerAttack(row, column);
  } else {
    //Select the current space from the row and column
    const currentSpace = document.querySelector(
      ".left-container .player-board  [data-c=" +
        CSS.escape(column) +
        "]" +
        "[data-r=" +
        CSS.escape(row) +
        "]"
    );

    //Check whether the ship is hit or not
    if (computer.enemyBoard.board[row][column] === "H") {
      currentSpace.classList.add("hit");
      const sunkResult = checkSunk(
        computer,
        spaceBeforeAttack,
        computer.enemyBoard.ships
      );
      //If the sunk result returns text, display it in infotext
      //else add the brace text for computer turn
      if (sunkResult) {
        infoText.textContent = sunkResult;
        infoText.classList.remove("brace-text", "attack-text");
        infoText.classList.add("sunk-text");
      } else {
        infoText.textContent = "ATTACK";
        infoText.classList.remove("brace-text", "sunk-text");
        infoText.classList.add("attack-text");
      }
    } else if (computer.enemyBoard.board[row][column] === "M") {
      currentSpace.classList.add("miss");
      infoText.classList.remove("brace-text", "sunk-text");
      infoText.classList.add("attack-text");
      infoText.textContent = "ATTACK";
    }

    selectCompBoardForAttack();
  }
}
//Checks if the previous space had a ship on it, and then references that tile
//with enemy's ship array to see if a ship was sunk during that turn
function checkSunk(player, ship, shipArray) {
  //Create varibles for each ship
  let carrier = "";
  let battleship = "";
  let destroyer = "";
  let submarine = "";
  let boat = "";
  //assign said ships based on name of object
  shipArray.forEach((element) => {
    if (element.name === "Carrier") {
      carrier = element;
    } else if (element.name === "Battleship") {
      battleship = element;
    } else if (element.name === "Destroyer") {
      destroyer = element;
    } else if (element.name === "Submarine") {
      submarine = element;
    } else if (element.name === "Patrol Boat") {
      boat = element;
    }
  });

  if (player.enemyBoard.checkGameEnd() === true) {
    gameEnd(player);
  } else if (ship === "C" && carrier.sunk === true) {
    return "CARRIER SUNK";
  } else if (ship === "B" && battleship.sunk === true) {
    return "BATTLESHIP SUNK";
  } else if (ship === "D" && destroyer.sunk === true) {
    return "DESTROYER SUNK";
  } else if (ship === "S" && submarine.sunk === true) {
    return "SUBMARINE SUNK";
  } else if (ship === "P" && boat.sunk === true) {
    return "PATROL BOAT SUNK";
  } else {
    return null;
  }
}
//Attack End------------------------------------------------------

//GAME END-------------------------------------------------
function gameEnd(player) {
  gamePage.style.display = "none";
  const winScreen = document.querySelector(".finish-screen-win");
  const winText = document.querySelector(".win-text");
  const loseScreen = document.querySelector(".finish-screen-lose");
  //Code to display a winner
  if (player.name === "Computer") {
    loseScreen.style.display = "flex";
    loseScreen.classList.add("show");
  } else {
    winScreen.style.display = "flex";
    winText.textContent = "Well Done " + player.name;
    winScreen.classList.add("show");
  }
}
