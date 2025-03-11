import { Gameboard } from "./gameboard";
import { Player } from "./player";

function startGame() {
  const player1 = Player("real", "David");
  const player2 = Player("computer", "Computer");

  player1.gameboard.placeShip(2, [0, 0]);
  player1.gameboard.placeShip(3, [0, 3]);
  player1.gameboard.placeShip(4, [0, 5], "vertical");
  console.log(player1.name);
  console.log(player1.gameboard.getPlacedShips());

  player2.gameboard.placeShip(2, [0, 0]);
  player2.gameboard.placeShip(3, [0, 4]);
  player2.gameboard.placeShip(4, [0, 5], "vertical");
  console.log(player2.name);
  console.log(player2.gameboard.getPlacedShips());
}

export { startGame };
