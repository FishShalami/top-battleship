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
    expect(shipObj).toHaveProperty("sunk");
  });
});

// describe("No Ship object is found", () => {
//   it("should have addition", () => {
//     expect(calculator.add).toBeDefined();
//     expect(typeof calculator.add).toBe("function");
//   });

//   it("should have subtraction", () => {
//     expect(calculator.subtract).toBeDefined();
//     expect(typeof calculator.subtract).toBe("function");
//   });

//   it("should have multiplication", () => {
//     expect(calculator.multiply).toBeDefined();
//     expect(typeof calculator.multiply).toBe("function");
//   });

//   it("should have division", () => {
//     expect(calculator.divide).toBeDefined();
//     expect(typeof calculator.divide).toBe("function");
//   });

//   it("2 + 2 is 4", () => {
//     expect(calculator.add(2, 2)).toEqual(4);
//   });

//   it("2-2 is 0", () => {
//     expect(calculator.subtract(2, 2)).toEqual(0);
//   });

//   it("3*3 is 9", () => {
//     expect(calculator.multiply(3, 3)).toEqual(9);
//   });

//   it("12 / 3 is 4", () => {
//     expect(calculator.divide(12, 3)).toEqual(4);
//   });

//   it("24 / 3 + 2 is 10", () => {
//     expect(calculator.add(calculator.divide(24, 3), 2)).toEqual(10);
//   });
// });

// describe("Odin Project Caeser Cipher", function () {
//   test("it doesn't shift the string", function () {
//     expect(caesarCipher("a", 3)).toBe("d");
//   });

//   test("it doesn't handle letters at the end of the alphabet", () => {
//     expect(caesarCipher("z", 3)).toBe("c");
//   });

//   test("it doesn't handle multiple words", function () {
//     expect(caesarCipher("abc xyz", 3)).toBe("def abc");
//   });

//   test("it doesn't handle multiple words", function () {
//     expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
//   });

//   test("it doesn't handle puncuation and non-letters words", function () {
//     expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
//   });
// });

// describe("Odin Project Analyze Array", function () {
//   test("it doesn't return an object", function () {
//     expect(analyzeArray([1, 8, 3, 4, 2, 6])).toBeInstanceOf(Object);
//   });

//   it("should return an object with the correct average, min, max, and length", () => {
//     const result = analyzeArray([1, 8, 3, 4, 2, 6]);
//     const expected = {
//       average: 4,
//       min: 1,
//       max: 8,
//       length: 6,
//     };
//     expect(result).toEqual(expected);
//   });
// });
