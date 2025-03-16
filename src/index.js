import "./style.css";
import { startGame } from "./gameplay";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { Ship } from "./ship";

// startGame();

function makePlayers() {
  const playerName = prompt("What is your name?");
  const player1 = Player("real", playerName);
  const player2 = Player("computer", "Computer");
  return { player1, player2 };
}
const { player1, player2 } = makePlayers();
let attacker = player1.type;

//place five ships 2, 3, 3, 4, 5 in length

// const ship4 = Ship(2);
// const ship5 = Ship(3);
// const ship6 = Ship(4);

// player2.gameboard.placeShip(ship4, [0, 0]);
// player2.gameboard.placeShip(ship5, [0, 4]);
// player2.gameboard.placeShip(ship6, [0, 5], "vertical");
// console.log(player2.name);
// console.log(player2.gameboard.getPlacedShips());

//display player names
const p1Selector = document.querySelector(".player1");
const p1Name = document.createElement("h2");
p1Name.innerText = player1.name;
p1Selector.appendChild(p1Name);

const p2Selector = document.querySelector(".player2");
const p2Name = document.createElement("h2");
p2Name.innerText = player2.name;
p2Selector.appendChild(p2Name);

//display player boards
const b1Selector = document.querySelector(".board1");
const b1Row = player1.gameboard.boardDimensions.rows;
const b2Selector = document.querySelector(".board2");
const b2Row = player2.gameboard.boardDimensions.rows;

function makeGrid(container, rows, cols) {
  // Set CSS variables for the grid layout
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);

  // Create the 2D array to store the cells, with grid[y][x]
  const grid = [];

  // Loop through each row (y-axis)
  for (let y = 0; y < rows; y++) {
    const rowArray = [];
    // Loop through each column in the current row (x-axis)
    for (let x = 0; x < cols; x++) {
      let cell = document.createElement("div");
      // Label the cell with its [x,y] coordinate for clarity
      cell.innerText = `${x},${y}`;
      (cell.dataset.x = x),
        (cell.dataset.y = y),
        (cell.className = "grid-item");
      container.appendChild(cell);
      // Store the cell in the row array
      rowArray.push(cell);
    }
    // Add the completed row to the grid array
    grid.push(rowArray);
  }
  return grid;
}

const board1 = makeGrid(b1Selector, b1Row, b1Row);
const board2 = makeGrid(b2Selector, b2Row, b2Row);

function waitForShipPlacementClick(boardSelector) {
  return new Promise((resolve) => {
    const board = document.querySelector(boardSelector);
    function clickHandler(e) {
      if (e.target.matches(".grid-item")) {
        const x = parseInt(e.target.dataset.x, 10);
        const y = parseInt(e.target.dataset.y, 10);
        // Check for Shift key to determine orientation.
        const orientation = e.shiftKey ? "vertical" : "horizontal";
        board.removeEventListener("click", clickHandler);
        resolve({ coordinate: [x, y], orientation });
      }
    }
    board.addEventListener("click", clickHandler);
  });
}

async function dropShip() {
  console.log("Waiting for user click for ship origin point...");
  const { coordinate, orientation } = await waitForShipPlacementClick(
    ".board1"
  );
  console.log("User clicked at:", coordinate, "with orientation:", orientation);
  return { coordinate, orientation };
}

async function pickShipCoord() {
  const shipLengths = [2, 3, 3, 4, 5];
  const shipsArr = shipLengths.map((length) => Ship(length));

  for (const ship of shipsArr) {
    let validPlacement = false;
    while (!validPlacement) {
      console.log(
        "Waiting for user pick of ship origin for ship of length:",
        ship.length
      );
      const { coordinate, orientation } = await dropShip();
      validPlacement = player1.gameboard.placeShip(
        ship,
        coordinate,
        orientation
      );
      if (!validPlacement) {
        console.log(
          `Invalid placement for ship of length ${ship.length} at ${coordinate} with orientation ${orientation}. Please select a new location.`
        );
      } else {
        console.log(`Ship of length ${ship.length} placed at ${coordinate}`);
        displayShips(player1, board1);
      }
    }
  }
  console.log("All ships placed:", player1.gameboard.getPlacedShips());
}

function getAllCoordinates(rows, cols) {
  let allCoords = [];

  // Loop through each row (y-axis)
  for (let y = 0; y < rows; y++) {
    const rowArray = [];
    // Loop through each column in the current row (x-axis)
    for (let x = 0; x < cols; x++) {
      allCoords.push([x, y]);
    }
  }
  return allCoords;
}

function getComputerShipCoord() {
  //need array of all coordinates
  let b2Rows = player2.gameboard.boardDimensions.rows;
  let b2Cols = player2.gameboard.boardDimensions.cols;

  function getRandomCoord(arr) {
    if (arr.length === 0) {
      return undefined; // Return undefined for empty arrays
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  return getRandomCoord(getAllCoordinates(b2Rows, b2Cols));
}

function placeComputerShips() {
  //temp disable alerts from overlapping ships
  const originalAlert = window.alert;
  window.alert = () => {};

  const shipLengths = [2, 3, 3, 4, 5];
  const shipsArr = shipLengths.map((length) => Ship(length));

  for (const ship of shipsArr) {
    let validPlacement = false;
    while (!validPlacement) {
      console.log("Computer picking location");
      let compCoord = getComputerShipCoord();
      let orientation = Math.random() < 0.5 ? "vertical" : "horizontal";
      validPlacement = player2.gameboard.placeShip(
        ship,
        compCoord,
        orientation
      );
      if (!validPlacement) {
        console.log(
          `Invalid placement for ship of length ${ship.length} at ${compCoord} with orientation ${orientation}. Retrying...`
        );
      } else {
        console.log(`Ship of length ${ship.length} placed at ${compCoord}`);
        displayShips(player2, board2);
      }
    }
  }
  console.log("All ships placed:", player2.gameboard.getPlacedShips());

  // Restore the original alert function.
  window.alert = originalAlert;
}

function updateCellClass(board, coordinate, className) {
  // Destructure coordinate as [x, y] (x: column, y: row)
  const [x, y] = coordinate;

  // Access the cell at grid[y][x] and add the CSS class
  if (board[y] && board[y][x]) {
    board[y][x].classList.add(className);
  }
}

function displayShips(player, board) {
  player.gameboard.getPlacedShips().forEach((ship) => {
    ship.coordArray.forEach((coordinate) => {
      updateCellClass(board, coordinate, "ship-present");
    });
  });
}

function markCellWithX(coordinate, boardSelector) {
  const [x, y] = coordinate;
  const boardElement = document.querySelector(boardSelector);
  const cell = boardElement.querySelector(`[data-x="${x}"][data-y="${y}"]`);
  if (cell) {
    cell.innerText = "X";
  }
}

function displayMisses(player, board, boardSelector) {
  const misses = player.gameboard.getMissedAttacks();
  misses.forEach((miss) => {
    markCellWithX(miss, boardSelector);
    updateCellClass(board, miss, "missed");
  });
}

function displayHits(player, board, boardSelector) {
  const hits = player.gameboard.getDirectHits();

  hits.forEach((hit) => {
    markCellWithX(hit, boardSelector);
    updateCellClass(board, hit, "attacked");
  });
}

function updateBoard(defender, board, boardSelector) {
  // displayShips(defender, board);
  displayMisses(defender, board, boardSelector);
  displayHits(defender, board, boardSelector);
}

function waitForClick(boardSelector) {
  return new Promise((resolve) => {
    const board = document.querySelector(boardSelector);

    function clickHandler(e) {
      if (e.target.matches(".grid-item")) {
        const x = parseInt(e.target.dataset.x, 10);
        const y = parseInt(e.target.dataset.y, 10);
        // Remove the event listener after a valid click to prevent multiple triggers.
        board.removeEventListener("click", clickHandler);
        console.log("Clicked cell coordinates:", x, y);
        resolve([x, y]);
      }
    }
    board.addEventListener("click", clickHandler);
  });
}

async function attack(defender) {
  if (defender.type === "real") {
    return computerCoordPick();
  }

  console.log("Waiting for user click...");
  const attackCoord = await waitForClick(".board2");
  console.log("User clicked at:", attackCoord);
  return attackCoord;
}

function initializeBoard() {
  displayShips(player1, board1);
  // displayShips(player2, board2);
}

function computerCoordPick() {
  const missedAttacks = player1.gameboard.getMissedAttacks();
  const directHits = player1.gameboard.getDirectHits();
  const allAttacks = [...missedAttacks, ...directHits];

  const gridSize = 10;
  const availCoordinates = [];

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      availCoordinates.push([x, y]);
    }
  }

  const availAttacks = availCoordinates.filter(
    (coord1) =>
      !allAttacks.some(
        (coord2) => coord1[0] === coord2[0] && coord1[1] === coord2[1]
      )
  );

  function getRandomCoord(arr) {
    if (arr.length === 0) {
      return undefined; // Return undefined for empty arrays
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  return getRandomCoord(availAttacks);
}

async function playerTurn(defender, attacker) {
  let boardSelector = ".board2";
  let board = board2;
  if (defender.type === "real") {
    boardSelector = ".board1";
    board = board1;
  }

  let valid = false;
  let attackCoord;

  while (!valid) {
    attackCoord = await attack(defender);
    valid = defender.gameboard.receiveAttack(attackCoord);
  }

  updateBoard(defender, board, boardSelector);
  console.log(
    "Hits on",
    defender.name,
    ": ",
    defender.gameboard.getDirectHits()
  );
}

async function gameLoop(attacker, defender) {
  while (
    !defender.gameboard.allShipsSunk() &&
    !attacker.gameboard.allShipsSunk()
  ) {
    await playerTurn(defender, attacker);
    // Check if the defender's board is sunk:
    if (defender.gameboard.allShipsSunk()) break;
    // Swap roles
    [attacker, defender] = [defender, attacker];
  }
  // console.log(`${attacker.name} wins!`);
  alert(`${attacker.name} wins!`);
}

(async function startGameSequence() {
  alert(`Pick locations for five ships (lengths 2, 3, 3, 4, and 5). 
    Hold shift key when selecting to make ship vertical`);
  await pickShipCoord();
  placeComputerShips();
  initializeBoard();
  alert("Time to play! Pick an attack location on the computer's board");
  gameLoop(player1, player2);
})();
