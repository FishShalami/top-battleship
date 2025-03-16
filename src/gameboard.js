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

      // Origin coordinates must be within range
      if (
        originCoordX >= this.boardDimensions.cols ||
        originCoordY >= this.boardDimensions.rows ||
        originCoordX < 0 ||
        originCoordY < 0
      ) {
        alert("Origin Coordinates out of bounds");
        return false;
      }

      if (horizOrVert === "horizontal") {
        if (originCoordX + shipLength - 1 > this.boardDimensions.cols) {
          alert("Ship will not fit on board");
          return false;
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
          alert("Ship will not fit on board");
          return false;
        }
        for (
          let i = originCoordY + 1;
          i <= shipLength - 1 + originCoordY;
          i++
        ) {
          coordArray.push([originCoordX, i]);
        }
      } else {
        alert("Ship orientation not provided");
        return false;
      }

      // Verify not overlapping
      const duplicates = [];
      const placedCoords = this.placedShips.reduce((acc, placement) => {
        return acc.concat(placement.coordArray);
      }, []);
      const arr2Set = new Set(placedCoords.map((item) => JSON.stringify(item)));

      // Check each new proposed coordinate to ensure it's not already used
      for (let i = 0; i < coordArray.length; i++) {
        const key = JSON.stringify(coordArray[i]);
        if (arr2Set.has(key)) {
          duplicates.push(coordArray[i]);
        }
      }

      if (duplicates.length !== 0) {
        alert("Position already occupied!");
        return false;
      }

      this.placedShips.push({ ship, coordArray });
      return true;
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

      // Check if this coordinate was already attacked (either a hit or a miss)
      const alreadyAttacked =
        this.directHits.some(
          (coord) => coord[0] === attackCoordX && coord[1] === attackCoordY
        ) ||
        this.missedAttacks.some(
          (coord) => coord[0] === attackCoordX && coord[1] === attackCoordY
        );

      if (alreadyAttacked) {
        alert("This coordinate was already attacked!");
        return false;
      }

      // Process potential hit on any ship
      for (const placedShip of this.placedShips) {
        for (const coord of placedShip.coordArray) {
          if (coord[0] === attackCoordX && coord[1] === attackCoordY) {
            placedShip.ship.hit();
            this.directHits.push(attackCoord);
            return true;
          }
        }
      }

      // If no ship was hit, record it as a miss
      this.missedAttacks.push(attackCoord);
      return true;
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
