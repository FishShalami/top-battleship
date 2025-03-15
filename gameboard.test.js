import { Gameboard } from "./src/gameboard.js";
import { Ship } from "./src/ship.js";

describe("Gameboard module exists?", () => {
  it("should import Gameboard successfully", () => {
    expect(Gameboard).toBeDefined();
    expect(typeof Gameboard).toBe("function");
  });
});

describe("Gameboard initialization", () => {
  const gameObj = Gameboard();

  it("should return an object", () => {
    expect(typeof gameObj).toBe("object");
    expect(gameObj.boardDimensions).toEqual({ rows: 10, cols: 10 });
  });

  it("should have the right properties", () => {
    expect(typeof gameObj.placeShip).toBe("function");
    expect(typeof gameObj.getPlacedShips).toBe("function");
    expect(typeof gameObj.getMissedAttacks).toBe("function");
    expect(typeof gameObj.receiveAttack).toBe("function");
    expect(typeof gameObj.allShipsSunk).toBe("function");
  });

  describe("Gameboard should be empty of ships and attacks at start", () => {
    it("gameboard should have no ships", () => {
      expect(gameObj.getPlacedShips()).toEqual([]);
      expect(gameObj.getMissedAttacks()).toEqual([]);
    });
  });
});

//ship placement

describe("Gameboard behavior for ship placement", () => {
  let board;
  let ship;

  beforeEach(() => {
    board = Gameboard({ rows: 10, cols: 10 });
    ship = Ship(3);
  });

  describe("Placing ships on board", () => {
    it("placeShip should provide coordinates of horizontal ship", () => {
      board.placeShip(ship, [0, 0], "horizontal");
      expect(board.getPlacedShips()[0].coordArray).toEqual([
        [0, 0],
        [1, 0],
        [2, 0],
      ]);
    });

    it("placeShip should provide coordinates of vertical ship", () => {
      board.placeShip(ship, [0, 0], "vertical");
      expect(board.getPlacedShips()[0].coordArray).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
      ]);
    });

    it("should not allow overlapping ships", () => {
      board.placeShip(ship, [0, 0], "vertical");
      expect(() => board.placeShip(ship, [0, 0], "vertical")).toThrow();
    });

    it("should not allow overlapping ships", () => {
      board.placeShip(ship, [2, 2], "horizontal");
      expect(() => board.placeShip(ship, [2, 1], "vertical")).toThrow();
    });

    it("should not allow overlapping ships", () => {
      board.placeShip(ship, [2, 2], "horizontal");
      board.placeShip(ship, [1, 1], "horizontal");
      expect(() => board.placeShip(ship, [2, 1], "vertical")).toThrow();
    });
  });

  describe("Ships going off board", () => {
    it("should prevent horizontal ships from extending off the board", () => {
      expect(() => board.placeShip(ship, [9, 0], "horizontal")).toThrow();
    });

    it("should prevent vertical ships from extending off the board", () => {
      expect(() => board.placeShip(ship, [0, 9], "vertical")).toThrow();
    });
  });

  describe("Origin coordinates in bounds", () => {
    it("should prevent origin coordinates out of range", () => {
      expect(() => board.placeShip(ship, [12, 0], "horizontal")).toThrow();
    });

    it("should prevent vertical ships from extending off the board", () => {
      expect(() => board.placeShip(ship, [0, 12], "vertical")).toThrow();
    });

    it("should prevent negaitve origin coordinates", () => {
      expect(() => board.placeShip(ship, [-1, 0], "vertical")).toThrow();
    });
  });
});

//receive attacks from opponent
describe("Gameboard behavior for receive attacks", () => {
  let board;
  let ship;

  beforeEach(() => {
    board = Gameboard({ rows: 10, cols: 10 });
    ship = Ship(3);
    board.placeShip(ship, [0, 0], "horizontal");
  });

  //provided coordinates are within the bounds of the board
  it("should have attack coordinates within bounds", () => {
    expect(() => board.receiveAttack([12, 0])).toThrow();
  });

  //if an attack is a miss the getMissedAttacks is updated
  it("should update the getMissedAttacks for a single miss", () => {
    board.receiveAttack([5, 5]);
    expect(board.getMissedAttacks()).toContainEqual([5, 5]);
  });

  //the getMissedAttacks stores multiple misses updated
  it("should record multiple missed attacks", () => {
    board.receiveAttack([5, 5]);
    board.receiveAttack([4, 4]);
    expect(board.getMissedAttacks()).toEqual(
      expect.arrayContaining([
        [5, 5],
        [4, 4],
      ])
    );
  });

  //hits are not stored in the getMissedAttacks
  it("should not record a hit as a miss", () => {
    board.receiveAttack([1, 0]);
    expect(board.getMissedAttacks()).toEqual([]);
  });

  //prevent duplicate attack that is a miss
  it("should prevent duplicate attacks on a miss", () => {
    board.receiveAttack([5, 5]);
    expect(() => board.receiveAttack([5, 5])).toThrow();
  });

  it("should prevent duplicate attacks on a direct hit", () => {
    board.receiveAttack([0, 0]);
    expect(() => board.receiveAttack([0, 0])).toThrow();
  });

  //hits are stored in the ship object
  describe("When an attack is on a ship coordinate", () => {
    it("should call the ship's hit() method", () => {
      // Use jest.spyOn to monitor ship.hit
      const hitSpy = jest.spyOn(ship, "hit");
      board.receiveAttack([0, 0]);
      expect(hitSpy).toHaveBeenCalled();
    });
  });
});

describe("Assessing if all ships are sunk", () => {
  let board;
  let ship;

  beforeEach(() => {
    board = Gameboard({ rows: 10, cols: 10 });
    ship = Ship(3);
    board.placeShip(ship, [0, 0], "horizontal");
  });

  it("allShipsSunk should report true if all ships are sunk", () => {
    board.receiveAttack([0, 0]);
    board.receiveAttack([1, 0]);
    board.receiveAttack([2, 0]);
    expect(board.allShipsSunk()).toEqual(true);
  });
});
