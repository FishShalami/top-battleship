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

      // Ensure the origin itself is within bounds
      if (
        originCoordX < 0 ||
        originCoordX >= this.boardDimensions.cols ||
        originCoordY < 0 ||
        originCoordY >= this.boardDimensions.rows
      ) {
        alert("Origin Coordinates out of bounds");
        return false;
      }

      let coordArray = [];

      if (horizOrVert === "horizontal") {
        // If the ship would extend past the right edge, adjust the starting x-coordinate.
        if (originCoordX + shipLength > this.boardDimensions.cols) {
          originCoordX = this.boardDimensions.cols - shipLength;
        }
        // Build the coordinate array from the (possibly adjusted) origin.
        for (let i = originCoordX; i < originCoordX + shipLength; i++) {
          coordArray.push([i, originCoordY]);
        }
      } else if (horizOrVert === "vertical") {
        // If the ship would extend past the bottom edge, adjust the starting y-coordinate.
        if (originCoordY + shipLength > this.boardDimensions.rows) {
          originCoordY = this.boardDimensions.rows - shipLength;
        }
        for (let i = originCoordY; i < originCoordY + shipLength; i++) {
          coordArray.push([originCoordX, i]);
        }
      } else {
        alert("Ship orientation not provided");
        return false;
      }

      // Verify that no coordinates overlap with already placed ships.
      const placedCoords = this.placedShips.reduce(
        (acc, placement) => acc.concat(placement.coordArray),
        []
      );
      const arr2Set = new Set(placedCoords.map((item) => JSON.stringify(item)));

      for (let i = 0; i < coordArray.length; i++) {
        const key = JSON.stringify(coordArray[i]);
        if (arr2Set.has(key)) {
          alert("Position already occupied!");
          return false;
        }
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
