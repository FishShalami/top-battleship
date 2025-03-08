function Ship(length = 1) {
  return {
    length: length,
    hitCount: 0,
    sunk: false,
    hit() {},
    isSunk() {},
  };
}

export { Ship };
