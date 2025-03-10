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

  it("should have its own gameboard", () => {
    const Player = Player("computer");
    expect(player.gameboard).toBeDefined();
    expect(typeof player.gameboard.placeShip).toBe("function");
  });
});
