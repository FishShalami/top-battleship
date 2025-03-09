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
  });

  it("should have the right properties", () => {
    expect(typeof gameObj.placeShip).toEqual("function");
    expect(typeof gameObj.getPlacedShips).toEqual("function");
    expect(typeof gameObj.getMissedAttacks).toEqual("function");
    expect(typeof gameObj.receiveAttack).toEqual("function");
    expect(typeof gameObj.allShipsSunk).toEqual("function");
  });
});

describe("Gameboard behavior", () => {});
