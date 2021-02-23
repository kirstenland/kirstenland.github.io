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

/***/ "./src/artist.js":
/*!***********************!*\
  !*** ./src/artist.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Artist\": () => (/* binding */ Artist)\n/* harmony export */ });\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ \"./src/canvas.js\");\n/* harmony import */ var _controls_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controls/tools */ \"./src/controls/tools.js\");\n\n\n\nclass Artist {\n    constructor(canvas) {\n        this.canvas = new _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas(canvas);\n    }\n    start(x, y) {\n        if (this.tool.start) {\n            this.tool.start(x, y);\n        }\n    }\n    end() {\n        if (this.tool.end) {\n            this.tool.end();\n        }\n    }\n    move(newX, newY) {\n        if (this.tool.move) {\n            this.tool.move(newX, newY);\n        }\n    }\n    setColour(colour) {\n        this.colour = colour;\n        if (this.tool && this.tool.setColour) {\n            this.tool.setColour(colour);\n        }\n    }\n    setStrokeSize(strokeSize) {\n        this.strokeSize = strokeSize;\n        if (this.tool && this.tool.setStrokeSize) {\n            this.tool.setStrokeSize(strokeSize);\n        }\n    }\n    setTool(toolName) {\n        this.tool = (0,_controls_tools__WEBPACK_IMPORTED_MODULE_1__.createTool)(toolName, this.canvas, this.colour);\n    }\n    click(x, y) {\n        if (this.tool.click) {\n            this.tool.click(x, y);\n        }\n    }\n    save() {\n        localStorage.setItem('lastImage', this.canvas.getDataUrl());\n    }\n    clear() {\n        this.canvas.clear();\n    }\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/artist.js?");

/***/ }),

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Canvas\": () => (/* binding */ Canvas)\n/* harmony export */ });\nclass Canvas {\n    constructor(canvas) {\n        this.canvas = canvas;\n        this.context = canvas.getContext(\"2d\");\n    }\n\n    startLine([x, y]) {\n        this.context.beginPath();\n        this.context.moveTo(x, y);\n    }\n\n    endLine() {\n        this.context.closePath();\n    }\n\n    midLine([x, y]) {\n        this.context.lineTo(x, y);\n        this.context.stroke();\n    }\n\n    drawCircle([x, y], r) {\n        this.context.beginPath();\n        this.context.arc(x, y, r, 0, 2 * Math.PI);\n        this.context.fill();\n    }\n\n    clear() {\n        this.context.save();\n        this.setColour(\"#FFFFFF\");\n        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);\n        this.context.restore();\n    }\n\n    setStrokeWidth(width) {\n        this.context.lineWidth = width;\n    }\n\n    setColour(colour) {\n        this.context.strokeStyle = colour;\n        this.context.fillStyle = colour;\n    }\n\n    getDataUrl() {\n        return this.canvas.toDataURL(\"image/png\");\n    }\n\n    width() {\n        return this.canvas.width;\n    }\n\n    height() {\n        return this.canvas.height;\n    }\n    \n    getImageData() {\n        return this.context.getImageData(0, 0, this.width(), this.height());\n    }\n\n    putImageData(data) {\n        return this.context.putImageData(data, 0, 0);\n    }\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/canvas.js?");

/***/ }),

/***/ "./src/controls/colourPalette.js":
/*!***************************************!*\
  !*** ./src/controls/colourPalette.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ColourPalette\": () => (/* binding */ ColourPalette)\n/* harmony export */ });\nconst colours = [\n    \"#000000\", \"#ff0000\", \"#00ff00\", \"#0000ff\", \"#ff9900\", \"#009933\", \"#9900cc\",\n    \"#66ccff\", \"#996633\", \"#ff33cc\", \"#ffff00\", \"#cc99ff\"\n];\nconst startingColour = \"#000000\"\n\n\nclass ColourPalette {\n    constructor(artist) {\n        this.colourSelectors = {};\n        this.artist = artist;\n        this.colourPalette = document.querySelector('.colour-palette');\n        colours.forEach(colour => this.createColour(colour));\n        this.setColour(startingColour);\n    }\n\n    createColour(colour) {\n        const circle = document.createElement('span');\n        circle.classList.add(\"selectable\");\n        circle.classList.add(\"dot\");\n        circle.style.backgroundColor = colour;\n        circle.addEventListener('click', () => this.setColour(colour));\n        this.colourPalette.appendChild(circle);\n        this.colourSelectors[colour] = circle;\n    }\n\n    setColour(colour) {\n        this.artist.setColour(colour);\n        Object.values(this.colourSelectors).forEach(circle => circle.classList.remove(\"selected\"))\n        this.colourSelectors[colour].classList.add(\"selected\");\n    }\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/controls/colourPalette.js?");

/***/ }),

/***/ "./src/controls/strokeSizes.js":
/*!*************************************!*\
  !*** ./src/controls/strokeSizes.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StrokeSizes\": () => (/* binding */ StrokeSizes)\n/* harmony export */ });\nconst sizes = [1, 2, 5, 10];\nconst startSize = 2;\n\nclass StrokeSizes {\n    constructor(artist) {\n        this.sizeSelectors = {};\n        this.artist = artist;\n        this.strokeSizes = document.querySelector('.stroke-sizes');\n        sizes.forEach(size => this.createSize(size));\n        this.setSize(startSize);\n    }\n\n    createSize(size) {\n        const circle = document.createElement('span');\n        circle.classList.add(\"outer-stroke-size-dot\");\n        circle.classList.add(\"selectable\");\n        circle.classList.add(\"dot\");\n\n        const innerCircle = document.createElement('span');\n        innerCircle.classList.add(\"dot\");\n        innerCircle.style.width = size+\"px\";\n        innerCircle.style.height = size+\"px\";\n        innerCircle.style.backgroundColor = \"black\";\n\n        circle.innerHTML = innerCircle.outerHTML;\n        circle.addEventListener('click', () => this.setSize(size));\n        this.strokeSizes.appendChild(circle);\n        this.sizeSelectors[size] = circle;\n    }\n\n    setSize(size) {\n        this.artist.setStrokeSize(size);\n        Object.values(this.sizeSelectors).forEach(circle => circle.classList.remove(\"selected\"))\n        this.sizeSelectors[size].classList.add(\"selected\");\n    }\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/controls/strokeSizes.js?");

/***/ }),

/***/ "./src/controls/tools.js":
/*!*******************************!*\
  !*** ./src/controls/tools.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Tools\": () => (/* binding */ Tools),\n/* harmony export */   \"createTool\": () => (/* binding */ createTool)\n/* harmony export */ });\n/* harmony import */ var _tools_pen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tools/pen */ \"./src/tools/pen.js\");\n/* harmony import */ var _tools_bucket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/bucket */ \"./src/tools/bucket.js\");\n/* harmony import */ var _tools_eraser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools/eraser */ \"./src/tools/eraser.js\");\n\n\n\n\nconst startingTool = \"pen\"\n\nclass Tools {\n    constructor(artist) {\n        this.toolSelectors = {};\n        this.artist = artist;\n        this.tools = document.querySelector('.tools');\n        this.createTool(\"pen\");\n        this.createTool(\"bucket\");\n        this.createTool(\"eraser\");\n        this.setTool(startingTool);\n    }\n\n    createTool(name) {\n        const item = document.createElement('span');\n        item.classList.add(\"selectable\");\n        item.classList.add(\"dot\");\n        item.style.backgroundImage = `url('resources/${name}.png')`;\n        item.addEventListener('click', () => this.setTool(name));\n        this.tools.appendChild(item);\n        this.toolSelectors[name] = item;\n    }\n\n    setTool(name) {\n        this.artist.setTool(name);\n        Object.values(this.toolSelectors).forEach(item => item.classList.remove(\"selected\"))\n        this.toolSelectors[name].classList.add(\"selected\");\n    }\n}\n\nfunction createTool(toolName, canvas, color) {\n    switch (toolName) {\n        case \"pen\":\n            return new _tools_pen__WEBPACK_IMPORTED_MODULE_0__.Pen(canvas, color);\n        case \"bucket\":\n            return new _tools_bucket__WEBPACK_IMPORTED_MODULE_1__.Bucket(canvas, color);\n        case \"eraser\":\n            return new _tools_eraser__WEBPACK_IMPORTED_MODULE_2__.Eraser(canvas, color);\n    }\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/controls/tools.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controls_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controls/tools */ \"./src/controls/tools.js\");\n/* harmony import */ var _controls_colourPalette__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controls/colourPalette */ \"./src/controls/colourPalette.js\");\n/* harmony import */ var _controls_strokeSizes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls/strokeSizes */ \"./src/controls/strokeSizes.js\");\n/* harmony import */ var _artist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./artist */ \"./src/artist.js\");\n\n\n\n\n\nwindow.onload = function() {\n    const canvasHolder = document.querySelector('.canvas-holder');\n    const canvas = document.querySelector('.canvas');\n    const artist = new _artist__WEBPACK_IMPORTED_MODULE_3__.Artist(canvas);\n\n    canvasHolder.addEventListener('mousemove', function(e) {\n        const [x, y] = relativeCoords(e.clientX, e.clientY);\n        artist.move(x, y);\n    });\n    \n    canvasHolder.addEventListener('mousedown', function(e) {\n        const [x, y] = relativeCoords(e.clientX, e.clientY);\n        artist.start(x, y);\n    });\n    \n    canvasHolder.addEventListener('mouseup', function() {\n        artist.end();\n    });\n    \n    canvasHolder.addEventListener('touchstart', function(e) {\n        const [x, y] = relativeCoords(e.changedTouches[0].clientX, e.changedTouches[0].clientY);\n        artist.start(x, y);\n    });\n    \n    canvasHolder.addEventListener('touchend', function() {\n        artist.end();\n    });\n    \n    canvasHolder.addEventListener('touchmove', function(e) {\n        const [x, y] = relativeCoords(e.changedTouches[0].clientX, e.changedTouches[0].clientY);\n        e.preventDefault();\n        artist.move(x, y);\n    });\n\n    canvasHolder.addEventListener('click', function(e) {\n        const [x, y] = relativeCoords(e.clientX, e.clientY);\n        e.preventDefault();\n        artist.click(x, y);\n    });\n\n    const colourPalette = new _controls_colourPalette__WEBPACK_IMPORTED_MODULE_1__.ColourPalette(artist);\n    const tools = new _controls_tools__WEBPACK_IMPORTED_MODULE_0__.Tools(artist);\n    const strokeSizes = new _controls_strokeSizes__WEBPACK_IMPORTED_MODULE_2__.StrokeSizes(artist);\n\n    canvas.setAttribute('height', canvasHolder.clientHeight - 4);\n    canvas.setAttribute('width', canvasHolder.clientWidth - 4);\n\n    document.getElementById('save-drawing').onclick = () => {\n        artist.save();\n        document.location.replace('./gallery.html')\n    }\n\n    function relativeCoords(x, y) {\n        return [x - canvasHolder.offsetLeft, y - canvasHolder.offsetTop]\n    }\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/index.js?");

/***/ }),

/***/ "./src/tools/bucket.js":
/*!*****************************!*\
  !*** ./src/tools/bucket.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Bucket\": () => (/* binding */ Bucket)\n/* harmony export */ });\n/* harmony import */ var _floodfill_floodfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./floodfill/floodfill */ \"./src/tools/floodfill/floodfill.js\");\n/* harmony import */ var _floodfill_colour__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./floodfill/colour */ \"./src/tools/floodfill/colour.js\");\n/* harmony import */ var _floodfill_layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./floodfill/layer */ \"./src/tools/floodfill/layer.js\");\n\r\n\r\n\r\n\r\nclass Bucket {\r\n    constructor(canvas, colour) {\r\n        this.canvas = canvas;\r\n        this.setColour(colour);\r\n    }\r\n  \r\n    click(startX, startY) {\r\n        const layer = new _floodfill_layer__WEBPACK_IMPORTED_MODULE_2__.Layer(this.canvas);\r\n        const newLayer = (0,_floodfill_floodfill__WEBPACK_IMPORTED_MODULE_0__.floodfill)(layer, startX, startY, this.colour);\r\n        this.canvas.putImageData(newLayer);\r\n    }\r\n\r\n    setColour(colour) {\r\n        const [r, g, b] = hexToRGB(colour);\r\n        this.colour = new _floodfill_colour__WEBPACK_IMPORTED_MODULE_1__.Colour(r, g, b, 255);\r\n    }\r\n}\r\n\r\nfunction hexToRGB(h) {\r\n    const r = \"0x\" + h[1] + h[2];\r\n    const g = \"0x\" + h[3] + h[4];\r\n    const b = \"0x\" + h[5] + h[6];\r\n    return [+r, +g, +b];\r\n}\r\n\n\n//# sourceURL=webpack://kirstenland.github.io/./src/tools/bucket.js?");

/***/ }),

/***/ "./src/tools/eraser.js":
/*!*****************************!*\
  !*** ./src/tools/eraser.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Eraser\": () => (/* binding */ Eraser)\n/* harmony export */ });\nclass Eraser {\r\n    constructor(canvas) {\r\n        this.canvas = canvas;\r\n        this.down = false;\r\n    }\r\n    start(x, y) {\r\n        this.down = true;\r\n        this.canvas.setColour(\"rgba(255, 255, 255, 255)\");\r\n        this.drawCircle(x, y);\r\n    }\r\n    end() {\r\n        this.down = false;\r\n    }\r\n    move(x, y) {\r\n        if (this.down) {\r\n            this.drawCircle(x, y);\r\n        }\r\n    }\r\n    drawCircle(x, y) {\r\n        this.canvas.drawCircle([x, y], 2);\r\n    }\r\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/tools/eraser.js?");

/***/ }),

/***/ "./src/tools/floodfill/colour.js":
/*!***************************************!*\
  !*** ./src/tools/floodfill/colour.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Colour\": () => (/* binding */ Colour)\n/* harmony export */ });\nclass Colour {\r\n    constructor(r, g, b, a) {\r\n        this.r = r;\r\n        this.g = g;\r\n        this.b = b;\r\n        this.a = a\r\n    }\r\n\r\n    matches(otherColour) {\r\n        return this.r == otherColour.r && this.g == otherColour.g && this.b == otherColour.b && this.a == otherColour.a;\r\n    }\r\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/tools/floodfill/colour.js?");

/***/ }),

/***/ "./src/tools/floodfill/floodfill.js":
/*!******************************************!*\
  !*** ./src/tools/floodfill/floodfill.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"floodfill\": () => (/* binding */ floodfill)\n/* harmony export */ });\nfunction floodfill(layer, startX, startY, fillColour) {\r\n    const canvasWidth = layer.width;\r\n    const canvasHeight = layer.height;\r\n    let pixelStack = [[startX, startY]];\r\n\r\n    const startColour = layer.getColourAt(startX, startY);\r\n\r\n    if (startColour.matches(fillColour)) {\r\n        return layer.layer;\r\n    }\r\n\r\n    const matchStartColour = (x, y) => (startColour.matches(layer.getColourAt(x, y)));\r\n\r\n    while(pixelStack.length) {\r\n        let [x,  y] = pixelStack.pop();\r\n        while(y > 0 && matchStartColour(x, y - 1)) {\r\n            y--;\r\n        }\r\n        let reachLeft = false;\r\n        let reachRight = false;\r\n        while(y < canvasHeight-1 && matchStartColour(x, y)) {\r\n            layer.colorPixel(x, y, fillColour);\r\n\r\n            if(x > 0) {\r\n                if(matchStartColour(x - 1, y)) {\r\n                    if(!reachLeft) {\r\n                        pixelStack.push([x - 1, y]);\r\n                        reachLeft = true;\r\n                    }\r\n                } else {\r\n                    reachLeft = false;\r\n                }\r\n            }\r\n        \r\n            if(x < canvasWidth-1) {\r\n                if(matchStartColour(x + 1, y)) {\r\n                    if(!reachRight) {\r\n                        pixelStack.push([x + 1, y]);\r\n                        reachRight = true;\r\n                    }\r\n                } else {\r\n                    reachRight = false;\r\n                }\r\n            }\r\n            y++;\r\n        }\r\n    }\r\n    return layer.layer;\r\n}\r\n\n\n//# sourceURL=webpack://kirstenland.github.io/./src/tools/floodfill/floodfill.js?");

/***/ }),

/***/ "./src/tools/floodfill/layer.js":
/*!**************************************!*\
  !*** ./src/tools/floodfill/layer.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Layer\": () => (/* binding */ Layer)\n/* harmony export */ });\n/* harmony import */ var _colour__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colour */ \"./src/tools/floodfill/colour.js\");\n\r\n\r\nclass Layer {\r\n    constructor(canvas) {\r\n        this.width = canvas.width();\r\n        this.height = canvas.height();\r\n        this.layer = canvas.getImageData();\r\n        this.data = this.layer.data;\r\n    }\r\n\r\n    getColourAt(x, y) {\r\n        const pixelPos = 4 * (x + y*this.width);\r\n        return new _colour__WEBPACK_IMPORTED_MODULE_0__.Colour(this.data[pixelPos], this.data[pixelPos + 1], this.data[pixelPos + 2], this.data[pixelPos + 3]);\r\n    }\r\n\r\n    colorPixel(x, y, fillColour) {\r\n        const pixelPos = 4 * (x + y*this.width);\r\n        this.data[pixelPos] = fillColour.r;\r\n        this.data[pixelPos + 1] = fillColour.g;\r\n        this.data[pixelPos + 2] = fillColour.b;\r\n        this.data[pixelPos + 3] = fillColour.a;\r\n    };\r\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/tools/floodfill/layer.js?");

/***/ }),

/***/ "./src/tools/pen.js":
/*!**************************!*\
  !*** ./src/tools/pen.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Pen\": () => (/* binding */ Pen)\n/* harmony export */ });\nclass Pen {\n    constructor(canvas, colour) {\n        this.canvas = canvas;\n        this.down = false;\n        if (colour) {\n            this.setColour(colour);\n        }\n    }\n    start(x, y) {\n        this.down = true;\n        this.canvas.startLine([x, y]);\n    }\n    end() {\n        this.down = false;\n        this.canvas.endLine();\n    }\n    move(x, y) {\n        if (this.down) {\n            this.canvas.midLine([x, y]);\n        }\n    }\n    setColour(colour) {\n        this.canvas.setColour(colour);\n    }\n    setStrokeSize(size) {\n        this.canvas.setStrokeWidth(size);\n    }\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/tools/pen.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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