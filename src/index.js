import {
  player1,
  player2,
  updateTurnMessage,
  pickShipCoord,
  placeComputerShips,
  initializeBoard,
  gameLoop,
} from "./gameplay";

(async function startGameSequence() {
  alert(`Pick locations for five ships (lengths 2, 3, 3, 4, and 5). 
    Hold shift key when selecting to make ship vertical`);
  updateTurnMessage("", "Pick ship locations");
  await pickShipCoord();
  placeComputerShips();
  initializeBoard();
  alert("Time to play! Pick an attack location on the computer's board");
  gameLoop(player1, player2);
})();
