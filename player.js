import { Gameboard } from "./gameboard";

function Player(type = "real") {
  if (type !== "real" && type !== "computer") {
    throw new Error("Incorrect Player type");
  }

  return {
    type: type,
    gameboard: Gameboard(),
  };
}

export { Player };
