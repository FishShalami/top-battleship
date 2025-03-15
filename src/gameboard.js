import { Ship } from "./ship";

function Gameboard(dimensions = { rows: 10, cols: 10 }) {
  return {
    //storage units
    boardDimensions: dimensions,
    placedShips: [],
    missedAttacks: [],
    directHits: [],

    //Methods
    placeShip(ship, originCoord, horizOrVert = "horizontal") {
      const shipLength = ship.length;
      let originCoordX = originCoord[0];
      let originCoordY = originCoord[1];
      let coordArray = [originCoord];

      //origin coordinates must be within range
      if (
        originCoordX >= this.boardDimensions.cols ||
        originCoordY >= this.boardDimensions.rows ||
        originCoordX < 0 ||
        originCoordY < 0
      ) {
        throw new Error("Origin Coordinates out of bounds");
      }

      if (horizOrVert === "horizontal") {
        if (originCoordX + shipLength - 1 > this.boardDimensions.cols) {
          throw new Error("Ship will not fit on board");
        }
        for (
          let i = originCoordX + 1;
          i <= shipLength - 1 + originCoordX;
          i++
        ) {
          coordArray.push([i, originCoordY]);
        }
      } else if (horizOrVert === "vertical") {
        if (originCoordY + shipLength - 1 > this.boardDimensions.rows) {
          throw new Error("Ship will not fit on board");
        }
        for (
          let i = originCoordY + 1;
          i <= shipLength - 1 + originCoordY;
          i++
        ) {
          coordArray.push([originCoordX, i]);
        }
      } else throw new Error("Ship orientation not provided");

      //verify not overlapping
      const duplicates = [];

      //create a single array of all ship coordinates
      const placedCoords = this.placedShips.reduce((acc, placement) => {
        return acc.concat(placement.coordArray);
      }, []);
      //convert all coordinates to strings for easy comparison
      const arr2Set = new Set(placedCoords.map((item) => JSON.stringify(item)));

      //for each new proposed coordinate, ensure it's not already used
      for (let i = 0; i < coordArray.length; i++) {
        const key = JSON.stringify(coordArray[i]);
        if (arr2Set.has(key)) {
          duplicates.push(coordArray[i]);
        }
      }

      if (duplicates.length !== 0)
        throw new Error("Position already occupied!");

      this.placedShips.push({ ship, coordArray });
    },
    getPlacedShips() {
      return this.placedShips;
    },
    getDirectHits() {
      return this.directHits;
    },
    getMissedAttacks() {
      return this.missedAttacks;
    },
    receiveAttack(attackCoord) {
      let attackCoordX = attackCoord[0];
      let attackCoordY = attackCoord[1];

      //origin coordinates must be within range
      if (
        attackCoordX >= this.boardDimensions.cols ||
        attackCoordY >= this.boardDimensions.rows ||
        attackCoordX < 0 ||
        attackCoordY < 0
      ) {
        throw new Error("Origin Coordinates out of bounds");
      }

      //for attacks that are a direct hit
      for (const placedShip of this.placedShips) {
        for (const coord of placedShip.coordArray) {
          if (coord[0] === attackCoordX && coord[1] === attackCoordY) {
            placedShip.ship.hit();
            this.directHits.push(attackCoord);
            return;
          }
        }
      }
      for (const missCoord of this.missedAttacks) {
        if (missCoord[0] === attackCoordX && missCoord[1] === attackCoordY) {
          throw new Error("This coordinate was already attacked");
        }
      }

      this.missedAttacks.push(attackCoord);
    },
    allShipsSunk() {
      for (const placedShip of this.placedShips) {
        if (!placedShip.ship.isSunk()) {
          return false;
        }
      }
      return true;
    },
  };
}

export { Gameboard };
