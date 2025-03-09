function Ship(length = 1) {
  return {
    length: length,
    hitCount: 0,
    // sunk: false,
    hit() {
      this.hitCount++;
    },
    isSunk() {
      return this.hitCount >= this.length;
    },
  };
}

export { Ship };
