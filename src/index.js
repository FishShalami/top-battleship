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

function makeRows(container, rows) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", rows);
  for (let c = 0; c < rows ** 2; c++) {
    let cell = document.createElement("div");
    cell.innerText = c + 1;
    container.appendChild(cell).className = "grid-item";
  }
}

makeRows(b1Selector, b1Row);
makeRows(b2Selector, b2Row);
