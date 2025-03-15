import "./style.css";
import { startGame } from "./gameplay";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { Ship } from "./ship";

// startGame();

const player1 = Player("real", "David");
const player2 = Player("computer", "Computer");
const ship1 = Ship(2);
const ship2 = Ship(3);
const ship3 = Ship(4);
const ship4 = Ship(2);
const ship5 = Ship(3);
const ship6 = Ship(4);

player1.gameboard.placeShip(ship1, [0, 0]);
player1.gameboard.placeShip(ship2, [0, 3]);
player1.gameboard.placeShip(ship3, [0, 5], "vertical");
console.log(player1.name);
console.log(player1.gameboard.getPlacedShips());

player2.gameboard.placeShip(ship4, [0, 0]);
player2.gameboard.placeShip(ship5, [0, 4]);
player2.gameboard.placeShip(ship6, [0, 5], "vertical");
console.log(player2.name);
console.log(player2.gameboard.getPlacedShips());

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

console.log(player1.gameboard.getPlacedShips()[0]);

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
    updateCellClass(board, miss, "attacked");
  });
}

function displayHits(player, board, boardSelector) {
  const hits = player.gameboard.getDirectHits();

  hits.forEach((hit) => {
    markCellWithX(hit, boardSelector);
    updateCellClass(board, hit, "attacked");
  });
}

function updateBoard(receivingPlayer, board, boardSelector) {
  displayShips(receivingPlayer, board);
  displayMisses(receivingPlayer, board, boardSelector);
  displayHits(receivingPlayer, board, boardSelector);
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

async function attack(receivingPlayer) {
  let boardClass = ".board2";
  if (receivingPlayer.type === "real") boardClass = ".board1";

  console.log("Waiting for user click...");
  const attackCoord = await waitForClick(boardClass);
  console.log("User clicked at:", attackCoord);
  return attackCoord;
}

function initializeBoard() {
  displayShips(player1, board1);
  displayShips(player2, board2);
}

async function playerTurn(receivingPlayer) {
  let boardSelector = ".board2";
  let board = board2;
  if (receivingPlayer.type === "real") {
    boardSelector = ".board1";
    board = board1;
  }
  let attackCoord = await attack(receivingPlayer);
  receivingPlayer.gameboard.receiveAttack(attackCoord);
  updateBoard(receivingPlayer, board, boardSelector);
  console.log(
    "Hits on",
    receivingPlayer.name,
    ": ",
    receivingPlayer.gameboard.getDirectHits()
  );
  if (receivingPlayer.gameboard.allShipsSunk()) console.log("Game over");
}

function gameRound() {}

initializeBoard();

playerTurn(player2);
playerTurn(player2);
playerTurn(player1);

//update misses or hits
//re-render board/ships
//all ships sunk?
//end game
//pass turn
//computer turn
//listen for click on board1
//update misses or hits
//re-render board/ships
//all ships sunk?
//end game
//pass turn
