import { Ship } from "./ship";

function Gameboard() {
  return {
    placedShips: [],
    placeShip(ship, originCoord, horizOrVert = "horizontal") {
      const shipLength = ship.length;
      let originCoordX = originCoord[0];
      let originCoordY = originCoord[1];
      let coordArray = [originCoord];

      if (horizOrVert === "horizontal") {
        for (
          let i = originCoordX + 1;
          i <= shipLength - 1 + originCoordX;
          i++
        ) {
          coordArray.push([i, originCoordY]);
        }
      } else if (horizOrVert === "vertical") {
        for (
          let i = originCoordY + 1;
          i <= shipLength - 1 + originCoordY;
          i++
        ) {
          coordArray.push([originCoordX, i]);
        }
      } else return "Ship orientation not provided";

      this.placedShips.push({ ship, coordArray });
    },
    getPlacedShips() {
      return this.placedShips;
    },
    getMissedAttacks() {},
    receiveAttack() {},
    allShipsSunk() {},
  };
}

export { Gameboard };
