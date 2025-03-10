import { Gameboard } from "./gameboard";
import { Player } from "./player";

describe("PLayer factory", () => {
  it("should create a player object", () => {
    const player = Player("real");
    expect(typeof player).toBe("object");
  });

  it("should have a type property", () => {
    const player = Player("real");
    expect(player.type).toBe("real");
  });

  it("type should only be real or computer", () => {
    expect(() => Player("bananna")).toThrow();
  });

  it("should have its own gameboard", () => {
    const playerC = Player("computer");
    expect(playerC.gameboard).toBeDefined();
    expect(typeof playerC.gameboard.placeShip).toBe("function");
  });
});
