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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Artist\": () => (/* binding */ Artist)\n/* harmony export */ });\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ \"./src/canvas.js\");\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools */ \"./src/tools.js\");\n\n\n\nclass Artist {\n  constructor(fullCanvas, tempCanvas) {\n      this.fullCanvas = new _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas(fullCanvas);\n      this.tempCanvas = new _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas(tempCanvas);\n  }\n  start(x, y) {\n      if (this.tool.start) {\n        this.tool.start(x,  y);\n      }\n  }\n  end() {\n    if (this.tool.end) {\n        this.tool.end();\n    }\n  }\n  move(newX, newY) {\n      if (this.tool.move) {\n          this.tool.move(newX, newY);\n      }\n  }\n  setColour(colour) {\n      if (this.tool && this.tool.setColour) {\n        this.colour = colour;\n        this.tool.setColour(colour);\n      }\n  }\n\n  setTool(toolName) {\n    this.tool = (0,_tools__WEBPACK_IMPORTED_MODULE_1__.createTool)(toolName, this.fullCanvas, this.tempCanvas, this.colour);\n  }\n  click(x, y) {\n    if (this.tool.click) {\n      this.tool.click(x,  y);\n    }\n  }\n  save() {\n      localStorage.setItem('lastImage', this.fullCanvas.getDataUrl());\n  }\n  clear() {\n      this.fullCanvas.clear();\n      this.tempCanvas.clear();\n  }\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/artist.js?");

/***/ }),

/***/ "./src/bucket.js":
/*!***********************!*\
  !*** ./src/bucket.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Bucket\": () => (/* binding */ Bucket)\n/* harmony export */ });\nclass Bucket {\n  constructor(fullCanvas, tempCanvas, colour) {\n    this.fullCanvas = fullCanvas;\n  }\n\n  click(startX, startY) {\n    this.colorLayer = this.fullCanvas.getImageData();\n    const canvasWidth = this.fullCanvas.width();\n    const canvasHeight = this.fullCanvas.height();\n    let pixelStack = [[startX, startY]];\n    \n    this.startR = this.colorLayer.data[(startY*canvasWidth + startX) * 4];\n    this.startG = this.colorLayer.data[(startY*canvasWidth + startX) * 4 + 1];\n    this.startB = this.colorLayer.data[(startY*canvasWidth + startX) * 4 + 2];\n    this.startO = this.colorLayer.data[(startY*canvasWidth + startX) * 4 + 3];\n\n    this.fillColorR = 100;\n    this.fillColorG = 0;\n    this.fillColorB = 0;\n    this.fillColorO = 255;\n\n    while(pixelStack.length)\n    {\n      let [x,  y] = pixelStack.pop();\n      let pixelPos = (y*canvasWidth + x) * 4;\n      while(y-- >= 0 && this.matchStartColor(pixelPos)) {\n        pixelPos -= canvasWidth * 4;\n      }\n      pixelPos += canvasWidth * 4;\n      ++y;\n      let reachLeft = false;\n      let reachRight = false;\n      while(y++ < canvasHeight-1 && this.matchStartColor(pixelPos)) {\n        this.colorPixel(pixelPos);\n\n        if(x > 0)\n        {\n          if(this.matchStartColor(pixelPos - 4))\n          {\n            if(!reachLeft){\n              pixelStack.push([x - 1, y]);\n              reachLeft = true;\n            }\n          }\n          else if(reachLeft)\n          {\n            reachLeft = false;\n          }\n        }\n      \n        if(x < canvasWidth-1)\n        {\n          if(this.matchStartColor(pixelPos + 4))\n          {\n            if(!reachRight)\n            {\n              pixelStack.push([x + 1, y]);\n              reachRight = true;\n            }\n          }\n          else if(reachRight)\n          {\n            reachRight = false;\n          }\n        }\n          \n        pixelPos += canvasWidth * 4;\n      }\n    }\n    this.fullCanvas.putImageData(this.colorLayer);\n  }\n\n  matchStartColor(pixelPos) {\n    const r = this.colorLayer.data[pixelPos];\t\n    const g = this.colorLayer.data[pixelPos+1];\t\n    const b = this.colorLayer.data[pixelPos+2];\n    const o = this.colorLayer.data[pixelPos+3];\n\n    return (r == this.startR && g == this.startG && b == this.startB && o == this.startO);\n  }\n\n  colorPixel(pixelPos) {\n    this.colorLayer.data[pixelPos] = this.fillColorR;\n    this.colorLayer.data[pixelPos+1] = this.fillColorB;\n    this.colorLayer.data[pixelPos+2] = this.fillColorG;\n    this.colorLayer.data[pixelPos+3] = this.fillColorO;\n  }\n}\n\n\n\n//# sourceURL=webpack://kirstenland.github.io/./src/bucket.js?");

/***/ }),

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Canvas\": () => (/* binding */ Canvas)\n/* harmony export */ });\nclass Canvas {\n    constructor(canvas) {\n        this.canvas = canvas;\n        this.context = canvas.getContext(\"2d\");\n    }\n\n    drawLine([x, y], [newX, newY]) {\n        this.context.beginPath();\n        this.context.moveTo(x, y);\n        this.context.lineTo(newX, newY);\n        this.context.stroke();\n        this.context.closePath();\n    }\n\n    drawSpline(pts, t) {\n        var cp = [];\n        var n = pts.length;\n        for(var i=0;i<n-4;i+=2){\n            cp=cp.concat(this.getControlPoints(pts[i],pts[i+1],pts[i+2],pts[i+3],pts[i+4],pts[i+5],t));\n        }\n        for(var i=2;i<pts.length-5;i+=2){\n            this.context.beginPath();\n            this.context.moveTo(pts[i],pts[i+1]);\n            this.context.bezierCurveTo(cp[2*i-2],cp[2*i-1],cp[2*i],cp[2*i+1],pts[i+2],pts[i+3]);\n            this.context.stroke();\n            this.context.closePath();\n        }\n        this.context.beginPath();\n        this.context.moveTo(pts[0],pts[1]);\n        this.context.quadraticCurveTo(cp[0],cp[1],pts[2],pts[3]);\n        this.context.stroke();\n        this.context.closePath();\n        \n        this.context.beginPath();\n        this.context.moveTo(pts[n-2],pts[n-1]);\n        this.context.quadraticCurveTo(cp[2*n-10],cp[2*n-9],pts[n-4],pts[n-3]);\n        this.context.stroke();\n        this.context.closePath();\n    }\n\n    getControlPoints(x0,y0,x1,y1,x2,y2,t){\n        const d01=Math.sqrt(Math.pow(x1-x0,2)+Math.pow(y1-y0,2));\n        const d12=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));\n       \n        const fa=t*d01/(d01+d12);\n        const fb=t-fa;\n      \n        const p1x=x1+fa*(x0-x2);\n        const p1y=y1+fa*(y0-y2);\n    \n        const p2x=x1-fb*(x0-x2);\n        const p2y=y1-fb*(y0-y2);  \n        \n        return [p1x,p1y,p2x,p2y];\n    }\n\n    clear() {\n        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    }\n\n    setStrokeWidth(width) {\n        this.context.lineWidth = width;\n    }\n\n    setColour(colour) {\n        this.context.strokeStyle = colour;\n    }\n\n    getDataUrl() {\n        return this.canvas.toDataURL(\"image/png\");\n    }\n\n    width() {\n        return this.canvas.width;\n    }\n\n    height() {\n        return this.canvas.height;\n    }\n    \n    getImageData() {\n        return this.context.getImageData(0, 0, this.width(), this.height());\n    }\n\n    putImageData(data) {\n        return this.context.putImageData(data, 0, 0);\n    }\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/canvas.js?");

/***/ }),

/***/ "./src/colourPalette.js":
/*!******************************!*\
  !*** ./src/colourPalette.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ColourPalette\": () => (/* binding */ ColourPalette)\n/* harmony export */ });\nconst colours = [\n    \"#000000\", \"#ff0000\", \"#00ff00\", \"#0000ff\", \"#ff9900\", \"#009933\", \"#9900cc\",\n    \"#66ccff\", \"#996633\", \"#ff33cc\", \"#ffff00\", \"#cc99ff\"\n];\nconst startingColour = \"#000000\"\n\n\nclass ColourPalette {\n    constructor(artist) {\n        this.colourSelectors = {};\n        this.artist = artist;\n        this.colourPalette = document.querySelector('.colour-palette');\n        colours.forEach(colour => this.createColour(colour));\n        this.setColour(startingColour);\n    }\n\n    createColour(colour) {\n        const circle = document.createElement('span');\n        circle.classList.add(\"dot\");\n        circle.style.backgroundColor = colour;\n        circle.addEventListener('click', () => this.setColour(colour));\n        this.colourPalette.appendChild(circle);\n        this.colourSelectors[colour] = circle;\n    }\n\n    setColour(colour) {\n        this.artist.setColour(colour);\n        Object.values(this.colourSelectors).forEach(circle => circle.classList.remove(\"selected\"))\n        this.colourSelectors[colour].classList.add(\"selected\");\n    }\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/colourPalette.js?");

/***/ }),

/***/ "./src/loading.js":
/*!************************!*\
  !*** ./src/loading.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ \"./src/tools.js\");\n/* harmony import */ var _colourPalette__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colourPalette */ \"./src/colourPalette.js\");\n/* harmony import */ var _artist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./artist */ \"./src/artist.js\");\n\n\n\n\nwindow.onload = function() {\n    const canvasHolder = document.querySelector('.canvas-holder');\n    const fullCanvas = document.querySelector('.canvas.full');\n    const tempCanvas = document.querySelector('.canvas.temp');\n    const artist = new _artist__WEBPACK_IMPORTED_MODULE_2__.Artist(fullCanvas, tempCanvas);\n\n    canvasHolder.addEventListener('mousemove', function(e) {\n        const [x, y] = relativeCoords(e.clientX, e.clientY);\n        artist.move(x, y);\n    });\n    \n    canvasHolder.addEventListener('mousedown', function(e) {\n        const [x, y] = relativeCoords(e.clientX, e.clientY);\n        artist.start(x, y);\n    });\n    \n    canvasHolder.addEventListener('mouseup', function() {\n        artist.end();\n    });\n    \n    canvasHolder.addEventListener('touchstart', function(e) {\n        const [x, y] = relativeCoords(e.changedTouches[0].clientX, e.changedTouches[0].clientY);\n        artist.start(x, y);\n    });\n    \n    canvasHolder.addEventListener('touchend', function() {\n        artist.end();\n    });\n    \n    canvasHolder.addEventListener('touchmove', function(e) {\n        const [x, y] = relativeCoords(e.changedTouches[0].clientX, e.changedTouches[0].clientY);\n        e.preventDefault();\n        artist.move(x, y);\n    });\n\n    canvasHolder.addEventListener('click', function(e) {\n        const [x, y] = relativeCoords(e.clientX, e.clientY);\n        e.preventDefault();\n        artist.click(x, y);\n    });\n\n    const colourPalette = new _colourPalette__WEBPACK_IMPORTED_MODULE_1__.ColourPalette(artist);\n    const tools = new _tools__WEBPACK_IMPORTED_MODULE_0__.Tools(artist);\n\n    [fullCanvas, tempCanvas].forEach(canvas => {\n        canvas.setAttribute('height', canvasHolder.clientHeight - 4);\n        canvas.setAttribute('width', canvasHolder.clientWidth - 4);\n    });\n\n    document.getElementById('save-drawing').onclick = () => {\n        artist.save();\n        document.location.replace('./gallery.html')\n    }\n\n    function relativeCoords(x, y) {\n        return [x - canvasHolder.offsetLeft, y - canvasHolder.offsetTop]\n    }\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/loading.js?");

/***/ }),

/***/ "./src/pen.js":
/*!********************!*\
  !*** ./src/pen.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Pen\": () => (/* binding */ Pen)\n/* harmony export */ });\nclass Pen {\n    constructor(fullCanvas, tempCanvas, colour) {\n        this.fullCanvas = fullCanvas;\n        this.tempCanvas = tempCanvas;\n        this.down = false;\n        if (colour) {\n            this.setColour(colour);\n        }\n    }\n    start(x, y) {\n        this.down = true;\n        this.x = x;\n        this.y = y;\n        this.points = [x, y];\n    }\n    end() {\n        this.down = false;\n        this.tempCanvas.clear();\n        this.fullCanvas.setStrokeWidth(2);\n        this.fullCanvas.drawSpline(this.points, 0.2);\n    }\n    move(newX, newY) {\n        if (this.down) {\n            this.tempCanvas.drawLine([this.x, this.y], [newX, newY]);\n            this.x = newX;\n            this.y = newY;\n            this.points = this.points.concat(newX, newY)\n        }\n    }\n    setColour(colour) {\n        this.fullCanvas.setColour(colour);\n        this.tempCanvas.setColour(colour);\n    }\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/pen.js?");

/***/ }),

/***/ "./src/tools.js":
/*!**********************!*\
  !*** ./src/tools.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Tools\": () => (/* binding */ Tools),\n/* harmony export */   \"createTool\": () => (/* binding */ createTool)\n/* harmony export */ });\n/* harmony import */ var _pen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pen */ \"./src/pen.js\");\n/* harmony import */ var _bucket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bucket */ \"./src/bucket.js\");\n\n\n\nconst startingTool = \"pen\"\n\nclass Tools {\n    constructor(artist) {\n        this.toolSelectors = {};\n        this.artist = artist;\n        this.tools = document.querySelector('.tools');\n        this.createTool(\"pen\");\n        this.createTool(\"bucket\");\n        this.setTool(startingTool);\n    }\n\n    createTool(name) {\n        const item = document.createElement('div');\n        item.innerHTML = name;\n        item.addEventListener('click', () => this.setTool(name));\n        this.tools.appendChild(item);\n        this.toolSelectors[name] = item;\n    }\n\n    setTool(name) {\n        this.artist.setTool(name);\n        Object.values(this.toolSelectors).forEach(item => item.classList.remove(\"selected\"))\n        this.toolSelectors[name].classList.add(\"selected\");\n    }\n}\n\nfunction createTool(toolName, fullCanvas, tempCanvas, color) {\n    switch (toolName) {\n        case \"pen\":\n            return new _pen__WEBPACK_IMPORTED_MODULE_0__.Pen(fullCanvas, tempCanvas, color);\n        case \"bucket\":\n            return new _bucket__WEBPACK_IMPORTED_MODULE_1__.Bucket(fullCanvas, tempCanvas, color);\n    }\n}\n\n//# sourceURL=webpack://kirstenland.github.io/./src/tools.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/loading.js");
/******/ 	
/******/ })()
;