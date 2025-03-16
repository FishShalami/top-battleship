/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nfunction Gameboard(dimensions = { rows: 10, cols: 10 }) {\n  return {\n    //storage units\n    boardDimensions: dimensions,\n    placedShips: [],\n    missedAttacks: [],\n    directHits: [],\n\n    //Methods\n    placeShip(ship, originCoord, horizOrVert = \"horizontal\") {\n      const shipLength = ship.length;\n      let originCoordX = originCoord[0];\n      let originCoordY = originCoord[1];\n\n      // Ensure the origin itself is within bounds\n      if (\n        originCoordX < 0 ||\n        originCoordX >= this.boardDimensions.cols ||\n        originCoordY < 0 ||\n        originCoordY >= this.boardDimensions.rows\n      ) {\n        alert(\"Origin Coordinates out of bounds\");\n        return false;\n      }\n\n      let coordArray = [];\n\n      if (horizOrVert === \"horizontal\") {\n        // If the ship would extend past the right edge, adjust the starting x-coordinate.\n        if (originCoordX + shipLength > this.boardDimensions.cols) {\n          originCoordX = this.boardDimensions.cols - shipLength;\n        }\n        // Build the coordinate array from the (possibly adjusted) origin.\n        for (let i = originCoordX; i < originCoordX + shipLength; i++) {\n          coordArray.push([i, originCoordY]);\n        }\n      } else if (horizOrVert === \"vertical\") {\n        // If the ship would extend past the bottom edge, adjust the starting y-coordinate.\n        if (originCoordY + shipLength > this.boardDimensions.rows) {\n          originCoordY = this.boardDimensions.rows - shipLength;\n        }\n        for (let i = originCoordY; i < originCoordY + shipLength; i++) {\n          coordArray.push([originCoordX, i]);\n        }\n      } else {\n        alert(\"Ship orientation not provided\");\n        return false;\n      }\n\n      // Verify that no coordinates overlap with already placed ships.\n      const placedCoords = this.placedShips.reduce(\n        (acc, placement) => acc.concat(placement.coordArray),\n        []\n      );\n      const arr2Set = new Set(placedCoords.map((item) => JSON.stringify(item)));\n\n      for (let i = 0; i < coordArray.length; i++) {\n        const key = JSON.stringify(coordArray[i]);\n        if (arr2Set.has(key)) {\n          alert(\"Position already occupied!\");\n          return false;\n        }\n      }\n\n      this.placedShips.push({ ship, coordArray });\n      return true;\n    },\n\n    getPlacedShips() {\n      return this.placedShips;\n    },\n    getDirectHits() {\n      return this.directHits;\n    },\n    getMissedAttacks() {\n      return this.missedAttacks;\n    },\n    receiveAttack(attackCoord) {\n      let attackCoordX = attackCoord[0];\n      let attackCoordY = attackCoord[1];\n\n      //origin coordinates must be within range\n      if (\n        attackCoordX >= this.boardDimensions.cols ||\n        attackCoordY >= this.boardDimensions.rows ||\n        attackCoordX < 0 ||\n        attackCoordY < 0\n      ) {\n        throw new Error(\"Origin Coordinates out of bounds\");\n      }\n\n      // Check if this coordinate was already attacked (either a hit or a miss)\n      const alreadyAttacked =\n        this.directHits.some(\n          (coord) => coord[0] === attackCoordX && coord[1] === attackCoordY\n        ) ||\n        this.missedAttacks.some(\n          (coord) => coord[0] === attackCoordX && coord[1] === attackCoordY\n        );\n\n      if (alreadyAttacked) {\n        alert(\"This coordinate was already attacked!\");\n        return false;\n      }\n\n      // Process potential hit on any ship\n      for (const placedShip of this.placedShips) {\n        for (const coord of placedShip.coordArray) {\n          if (coord[0] === attackCoordX && coord[1] === attackCoordY) {\n            placedShip.ship.hit();\n            this.directHits.push(attackCoord);\n            return true;\n          }\n        }\n      }\n\n      // If no ship was hit, record it as a miss\n      this.missedAttacks.push(attackCoord);\n      return true;\n    },\n    allShipsSunk() {\n      for (const placedShip of this.placedShips) {\n        if (!placedShip.ship.isSunk()) {\n          return false;\n        }\n      }\n      return true;\n    },\n  };\n}\n\n\n\n\n//# sourceURL=webpack://top-battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/gameplay.js":
/*!*************************!*\
  !*** ./src/gameplay.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gameLoop: () => (/* binding */ gameLoop),\n/* harmony export */   initializeBoard: () => (/* binding */ initializeBoard),\n/* harmony export */   pickShipCoord: () => (/* binding */ pickShipCoord),\n/* harmony export */   placeComputerShips: () => (/* binding */ placeComputerShips),\n/* harmony export */   player1: () => (/* binding */ player1),\n/* harmony export */   player2: () => (/* binding */ player2),\n/* harmony export */   updateTurnMessage: () => (/* binding */ updateTurnMessage)\n/* harmony export */ });\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _gameplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameplay */ \"./src/gameplay.js\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\n\n\n\n\n// startGame();\n\nfunction makePlayers() {\n  const playerName = prompt(\"What is your name?\");\n  const player1 = (0,_player__WEBPACK_IMPORTED_MODULE_3__.Player)(\"real\", playerName);\n  const player2 = (0,_player__WEBPACK_IMPORTED_MODULE_3__.Player)(\"computer\", \"Computer\");\n  return { player1, player2 };\n}\nconst { player1, player2 } = makePlayers();\nlet attacker = player1.type;\n\n//display player names\nconst p1Selector = document.querySelector(\".player1\");\nconst p1Name = document.createElement(\"h2\");\np1Name.innerText = player1.name;\np1Selector.appendChild(p1Name);\n\nconst p2Selector = document.querySelector(\".player2\");\nconst p2Name = document.createElement(\"h2\");\np2Name.innerText = player2.name;\np2Selector.appendChild(p2Name);\n\n//display player boards\nconst b1Selector = document.querySelector(\".board1\");\nconst b1Row = player1.gameboard.boardDimensions.rows;\nconst b2Selector = document.querySelector(\".board2\");\nconst b2Row = player2.gameboard.boardDimensions.rows;\n\nfunction makeGrid(container, rows, cols) {\n  // Set CSS variables for the grid layout\n  container.style.setProperty(\"--grid-rows\", rows);\n  container.style.setProperty(\"--grid-cols\", cols);\n\n  // Create the 2D array to store the cells, with grid[y][x]\n  const grid = [];\n\n  // Loop through each row (y-axis)\n  for (let y = 0; y < rows; y++) {\n    const rowArray = [];\n    // Loop through each column in the current row (x-axis)\n    for (let x = 0; x < cols; x++) {\n      let cell = document.createElement(\"div\");\n      // Label the cell with its [x,y] coordinate for clarity\n      cell.innerText = `${x},${y}`;\n      (cell.dataset.x = x),\n        (cell.dataset.y = y),\n        (cell.className = \"grid-item\");\n      container.appendChild(cell);\n      // Store the cell in the row array\n      rowArray.push(cell);\n    }\n    // Add the completed row to the grid array\n    grid.push(rowArray);\n  }\n  return grid;\n}\n\nconst board1 = makeGrid(b1Selector, b1Row, b1Row);\nconst board2 = makeGrid(b2Selector, b2Row, b2Row);\n\nfunction waitForShipPlacementClick(boardSelector) {\n  return new Promise((resolve) => {\n    const board = document.querySelector(boardSelector);\n    function clickHandler(e) {\n      if (e.target.matches(\".grid-item\")) {\n        const x = parseInt(e.target.dataset.x, 10);\n        const y = parseInt(e.target.dataset.y, 10);\n        // Check for Shift key to determine orientation.\n        const orientation = e.shiftKey ? \"vertical\" : \"horizontal\";\n        board.removeEventListener(\"click\", clickHandler);\n        resolve({ coordinate: [x, y], orientation });\n      }\n    }\n    board.addEventListener(\"click\", clickHandler);\n  });\n}\n\nasync function dropShip() {\n  console.log(\"Waiting for user click for ship origin point...\");\n  const { coordinate, orientation } = await waitForShipPlacementClick(\n    \".board1\"\n  );\n  console.log(\"User clicked at:\", coordinate, \"with orientation:\", orientation);\n  return { coordinate, orientation };\n}\n\nasync function pickShipCoord() {\n  const shipLengths = [2, 3, 3, 4, 5];\n  const shipsArr = shipLengths.map((length) => (0,_ship__WEBPACK_IMPORTED_MODULE_4__.Ship)(length));\n\n  for (const ship of shipsArr) {\n    let validPlacement = false;\n    while (!validPlacement) {\n      console.log(\n        \"Waiting for user pick of ship origin for ship of length:\",\n        ship.length\n      );\n      const { coordinate, orientation } = await dropShip();\n      validPlacement = player1.gameboard.placeShip(\n        ship,\n        coordinate,\n        orientation\n      );\n      if (!validPlacement) {\n        console.log(\n          `Invalid placement for ship of length ${ship.length} at ${coordinate} with orientation ${orientation}. Please select a new location.`\n        );\n      } else {\n        console.log(`Ship of length ${ship.length} placed at ${coordinate}`);\n        displayShips(player1, board1);\n      }\n    }\n  }\n  console.log(\"All ships placed:\", player1.gameboard.getPlacedShips());\n}\n\nfunction getAllCoordinates(rows, cols) {\n  let allCoords = [];\n\n  // Loop through each row (y-axis)\n  for (let y = 0; y < rows; y++) {\n    const rowArray = [];\n    // Loop through each column in the current row (x-axis)\n    for (let x = 0; x < cols; x++) {\n      allCoords.push([x, y]);\n    }\n  }\n  return allCoords;\n}\n\nfunction getComputerShipCoord() {\n  //need array of all coordinates\n  let b2Rows = player2.gameboard.boardDimensions.rows;\n  let b2Cols = player2.gameboard.boardDimensions.cols;\n\n  function getRandomCoord(arr) {\n    if (arr.length === 0) {\n      return undefined; // Return undefined for empty arrays\n    }\n    const randomIndex = Math.floor(Math.random() * arr.length);\n    return arr[randomIndex];\n  }\n\n  return getRandomCoord(getAllCoordinates(b2Rows, b2Cols));\n}\n\nfunction placeComputerShips() {\n  //temp disable alerts from overlapping ships\n  const originalAlert = window.alert;\n  window.alert = () => {};\n\n  const shipLengths = [2, 3, 3, 4, 5];\n  const shipsArr = shipLengths.map((length) => (0,_ship__WEBPACK_IMPORTED_MODULE_4__.Ship)(length));\n\n  for (const ship of shipsArr) {\n    let validPlacement = false;\n    while (!validPlacement) {\n      console.log(\"Computer picking location\");\n      let compCoord = getComputerShipCoord();\n      let orientation = Math.random() < 0.5 ? \"vertical\" : \"horizontal\";\n      validPlacement = player2.gameboard.placeShip(\n        ship,\n        compCoord,\n        orientation\n      );\n      if (!validPlacement) {\n        console.log(\n          `Invalid placement for ship of length ${ship.length} at ${compCoord} with orientation ${orientation}. Retrying...`\n        );\n      } else {\n        console.log(`Ship of length ${ship.length} placed at ${compCoord}`);\n        // displayShips(player2, board2);\n      }\n    }\n  }\n  console.log(\"All ships placed:\", player2.gameboard.getPlacedShips());\n\n  // Restore the original alert function.\n  window.alert = originalAlert;\n}\n\nfunction updateCellClass(board, coordinate, className) {\n  // Destructure coordinate as [x, y] (x: column, y: row)\n  const [x, y] = coordinate;\n\n  // Access the cell at grid[y][x] and add the CSS class\n  if (board[y] && board[y][x]) {\n    board[y][x].classList.add(className);\n  }\n}\n\nfunction displayShips(player, board) {\n  player.gameboard.getPlacedShips().forEach((ship) => {\n    ship.coordArray.forEach((coordinate) => {\n      updateCellClass(board, coordinate, \"ship-present\");\n    });\n  });\n}\n\nfunction markCellWithX(coordinate, boardSelector) {\n  const [x, y] = coordinate;\n  const boardElement = document.querySelector(boardSelector);\n  const cell = boardElement.querySelector(`[data-x=\"${x}\"][data-y=\"${y}\"]`);\n  if (cell) {\n    cell.innerText = \"X\";\n  }\n}\n\nfunction displayMisses(player, board, boardSelector) {\n  const misses = player.gameboard.getMissedAttacks();\n  misses.forEach((miss) => {\n    markCellWithX(miss, boardSelector);\n    updateCellClass(board, miss, \"missed\");\n  });\n}\n\nfunction displayHits(player, board, boardSelector) {\n  const hits = player.gameboard.getDirectHits();\n\n  hits.forEach((hit) => {\n    markCellWithX(hit, boardSelector);\n    updateCellClass(board, hit, \"attacked\");\n  });\n}\n\nfunction updateBoard(defender, board, boardSelector) {\n  // displayShips(defender, board);\n  displayMisses(defender, board, boardSelector);\n  displayHits(defender, board, boardSelector);\n}\n\nfunction waitForClick(boardSelector) {\n  return new Promise((resolve) => {\n    const board = document.querySelector(boardSelector);\n\n    function clickHandler(e) {\n      if (e.target.matches(\".grid-item\")) {\n        const x = parseInt(e.target.dataset.x, 10);\n        const y = parseInt(e.target.dataset.y, 10);\n        // Remove the event listener after a valid click to prevent multiple triggers.\n        board.removeEventListener(\"click\", clickHandler);\n        console.log(\"Clicked cell coordinates:\", x, y);\n        resolve([x, y]);\n      }\n    }\n    board.addEventListener(\"click\", clickHandler);\n  });\n}\n\nasync function attack(defender) {\n  if (defender.type === \"real\") {\n    return computerCoordPick();\n  }\n\n  console.log(\"Waiting for user click...\");\n  const attackCoord = await waitForClick(\".board2\");\n  console.log(\"User clicked at:\", attackCoord);\n  return attackCoord;\n}\n\nfunction initializeBoard() {\n  displayShips(player1, board1);\n  // displayShips(player2, board2);\n}\n\nfunction computerCoordPick() {\n  const missedAttacks = player1.gameboard.getMissedAttacks();\n  const directHits = player1.gameboard.getDirectHits();\n  const allAttacks = [...missedAttacks, ...directHits];\n\n  const gridSize = 10;\n  const availCoordinates = [];\n\n  for (let x = 0; x < gridSize; x++) {\n    for (let y = 0; y < gridSize; y++) {\n      availCoordinates.push([x, y]);\n    }\n  }\n\n  const availAttacks = availCoordinates.filter(\n    (coord1) =>\n      !allAttacks.some(\n        (coord2) => coord1[0] === coord2[0] && coord1[1] === coord2[1]\n      )\n  );\n\n  function getRandomCoord(arr) {\n    if (arr.length === 0) {\n      return undefined; // Return undefined for empty arrays\n    }\n    const randomIndex = Math.floor(Math.random() * arr.length);\n    return arr[randomIndex];\n  }\n\n  return getRandomCoord(availAttacks);\n}\n\nasync function playerTurn(defender, attacker) {\n  let boardSelector = \".board2\";\n  let board = board2;\n  if (defender.type === \"real\") {\n    boardSelector = \".board1\";\n    board = board1;\n  }\n\n  let valid = false;\n  let attackCoord;\n\n  while (!valid) {\n    attackCoord = await attack(defender);\n    valid = defender.gameboard.receiveAttack(attackCoord);\n  }\n\n  updateBoard(defender, board, boardSelector);\n  console.log(\n    \"Hits on\",\n    defender.name,\n    \": \",\n    defender.gameboard.getDirectHits()\n  );\n}\n\nfunction updateTurnMessage(playerName, message = \"\") {\n  const statusElement = document.querySelector(\".status\");\n  if (message !== \"\" && statusElement) {\n    statusElement.innerText = message;\n  } else {\n    statusElement.innerText = `It is ${playerName}'s turn to attack!`;\n  }\n}\n\nasync function gameLoop(attacker, defender) {\n  while (\n    !defender.gameboard.allShipsSunk() &&\n    !attacker.gameboard.allShipsSunk()\n  ) {\n    updateTurnMessage(attacker.name);\n    await playerTurn(defender, attacker);\n    // Check if the defender's board is sunk:\n    if (defender.gameboard.allShipsSunk()) break;\n    // Swap roles\n    [attacker, defender] = [defender, attacker];\n  }\n  // console.log(`${attacker.name} wins!`);\n  // Optionally clear the message or announce the winner.\n  alert(`${attacker.name} wins!`);\n  updateTurnMessage(\"\", `${attacker.name} wins!`);\n}\n\n\n\n\n//# sourceURL=webpack://top-battleship/./src/gameplay.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameplay */ \"./src/gameplay.js\");\n\n\n(async function startGameSequence() {\n  alert(`Pick locations for five ships (lengths 2, 3, 3, 4, and 5). \n    Hold shift key when selecting to make ship vertical`);\n  (0,_gameplay__WEBPACK_IMPORTED_MODULE_0__.updateTurnMessage)(\"\", \"Pick ship locations\");\n  await (0,_gameplay__WEBPACK_IMPORTED_MODULE_0__.pickShipCoord)();\n  (0,_gameplay__WEBPACK_IMPORTED_MODULE_0__.placeComputerShips)();\n  (0,_gameplay__WEBPACK_IMPORTED_MODULE_0__.initializeBoard)();\n  alert(\"Time to play! Pick an attack location on the computer's board\");\n  (0,_gameplay__WEBPACK_IMPORTED_MODULE_0__.gameLoop)(_gameplay__WEBPACK_IMPORTED_MODULE_0__.player1, _gameplay__WEBPACK_IMPORTED_MODULE_0__.player2);\n})();\n\n\n//# sourceURL=webpack://top-battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\n\nfunction Player(type = \"real\", name) {\n  if (type !== \"real\" && type !== \"computer\") {\n    throw new Error(\"Incorrect Player type\");\n  }\n\n  return {\n    type: type,\n    name: name,\n    gameboard: (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)(),\n  };\n}\n\n\n\n\n//# sourceURL=webpack://top-battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nfunction Ship(length = 1) {\n  return {\n    length: length,\n    hitCount: 0,\n    // sunk: false,\n    hit() {\n      this.hitCount++;\n    },\n    isSunk() {\n      return this.hitCount >= this.length;\n    },\n  };\n}\n\n\n\n\n//# sourceURL=webpack://top-battleship/./src/ship.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://top-battleship/./src/style.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;