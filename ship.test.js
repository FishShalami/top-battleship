import { Ship } from "./ship.js";

describe("Ship module exists?", () => {
  it("should import Ship successfully", () => {
    expect(Ship).toBeDefined();
    expect(typeof Ship).toBe("function");
  });
});

describe("Ship module returns an object with length, hits, and sunk status", () => {
  const shipObj = Ship();

  it("should return an object", () => {
    expect(typeof shipObj).toBe("object");
  });

  it("should have the right properties", () => {
    expect(shipObj).toHaveProperty("length");
    expect(shipObj).toHaveProperty("hitCount");
    // expect(shipObj).toHaveProperty("sunk");
    expect(typeof shipObj.hit).toEqual("function");
    expect(typeof shipObj.isSunk).toEqual("function");
  });

  it("should return the right length", () => {
    expect(Ship(3).length).toEqual(3);
  });

  it("should return length default of 1", () => {
    expect(Ship().length).toEqual(1);
  });

  it("should return sunk as false initially", () => {
    expect(Ship(3).isSunk()).toEqual(false);
  });
});

describe("Ship module behavior", () => {
  let ship;

  beforeEach(() => {
    ship = Ship(3);
  });

  it("should track the number of hits", () => {
    ship.hit();
    expect(ship.hitCount).toEqual(1);
  });

  it("should not be sunk if hit fewer times than length", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toEqual(false);
  });

  it("should be sunk if hits equals length", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toEqual(true);
  });
});
