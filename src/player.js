import { Gameboard } from "./gameboard";

function Player(type = "real", name) {
  if (type !== "real" && type !== "computer") {
    throw new Error("Incorrect Player type");
  }

  return {
    type: type,
    name: name,
    gameboard: Gameboard(),
  };
}

export { Player };
