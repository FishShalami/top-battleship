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

// ship placement tests
describe("Gameboard behavior for ship placement", () => {
  let board;
  let ship;

  beforeEach(() => {
    board = Gameboard({ rows: 10, cols: 10 });
    ship = Ship(3);
  });

  describe("Placing ships on board", () => {
    it("placeShip should provide coordinates of horizontal ship", () => {
      expect(board.placeShip(ship, [0, 0], "horizontal")).toBe(true);
      expect(board.getPlacedShips()[0].coordArray).toEqual([
        [0, 0],
        [1, 0],
        [2, 0],
      ]);
    });

    it("placeShip should provide coordinates of vertical ship", () => {
      expect(board.placeShip(ship, [0, 0], "vertical")).toBe(true);
      expect(board.getPlacedShips()[0].coordArray).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
      ]);
    });

    it("should not allow overlapping ships", () => {
      board.placeShip(ship, [0, 0], "vertical");
      expect(board.placeShip(ship, [0, 0], "vertical")).toBe(false);
    });

    it("should not allow overlapping ships (scenario 2)", () => {
      board.placeShip(ship, [2, 2], "horizontal");
      expect(board.placeShip(ship, [2, 1], "vertical")).toBe(false);
    });

    it("should not allow overlapping ships (scenario 3)", () => {
      board.placeShip(ship, [2, 2], "horizontal");
      board.placeShip(ship, [1, 1], "horizontal");
      expect(board.placeShip(ship, [2, 1], "vertical")).toBe(false);
    });
  });

  describe("Ships auto-adjust when extending off board", () => {
    it("should auto-adjust horizontal ships that extend off the board", () => {
      // For a ship of length 3 on a 10-column board, starting at [9, 0]
      // the origin will adjust to [7, 0] so that the ship spans [7,0], [8,0], [9,0]
      expect(board.placeShip(ship, [9, 0], "horizontal")).toBe(true);
      expect(board.getPlacedShips()[0].coordArray).toEqual([
        [7, 0],
        [8, 0],
        [9, 0],
      ]);
    });

    it("should auto-adjust vertical ships that extend off the board", () => {
      // For a ship of length 3 on a 10-row board, starting at [0, 9]
      // the origin will adjust to [0, 7] so that the ship spans [0,7], [0,8], [0,9]
      expect(board.placeShip(ship, [0, 9], "vertical")).toBe(true);
      expect(board.getPlacedShips()[0].coordArray).toEqual([
        [0, 7],
        [0, 8],
        [0, 9],
      ]);
    });
  });

  describe("Origin coordinates in bounds", () => {
    it("should prevent origin coordinates out of range", () => {
      expect(board.placeShip(ship, [12, 0], "horizontal")).toBe(false);
    });

    it("should prevent vertical ships with origin out of range", () => {
      expect(board.placeShip(ship, [0, 12], "vertical")).toBe(false);
    });

    it("should prevent negative origin coordinates", () => {
      expect(board.placeShip(ship, [-1, 0], "vertical")).toBe(false);
    });
  });
});

// receive attacks tests remain unchanged
describe("Gameboard behavior for receive attacks", () => {
  let board;
  let ship;

  beforeEach(() => {
    board = Gameboard({ rows: 10, cols: 10 });
    ship = Ship(3);
    board.placeShip(ship, [0, 0], "horizontal");
  });

  it("should have attack coordinates within bounds", () => {
    expect(() => board.receiveAttack([12, 0])).toThrow();
  });

  it("should update the getMissedAttacks for a single miss", () => {
    board.receiveAttack([5, 5]);
    expect(board.getMissedAttacks()).toContainEqual([5, 5]);
  });

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

  it("should not record a hit as a miss", () => {
    board.receiveAttack([1, 0]);
    expect(board.getMissedAttacks()).toEqual([]);
  });

  it("should prevent duplicate attacks on a miss", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    board.receiveAttack([5, 5]);
    const result = board.receiveAttack([5, 5]);
    expect(result).toBe(false);
    expect(alertSpy).toHaveBeenCalledWith(
      "This coordinate was already attacked!"
    );
    alertSpy.mockRestore();
  });

  it("should prevent duplicate attacks on a direct hit", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    board.receiveAttack([0, 0]);
    const result = board.receiveAttack([0, 0]);
    expect(result).toBe(false);
    expect(alertSpy).toHaveBeenCalledWith(
      "This coordinate was already attacked!"
    );
  });

  describe("When an attack is on a ship coordinate", () => {
    it("should call the ship's hit() method", () => {
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
