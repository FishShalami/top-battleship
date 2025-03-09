import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

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

describe("Gameboard behavior", () => {
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
