/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Position = function () {
    function Position(row, column) {
        _classCallCheck(this, Position);

        this.itsRow = row;
        this.itsColumn = column;
    }

    _createClass(Position, [{
        key: "toString",
        value: function toString() {
            return this.row + "," + this.column;
        }
    }, {
        key: "equals",
        value: function equals(other) {
            return other.itsColumn === this.itsColumn && other.itsRow === this.itsRow;
        }
    }, {
        key: "neighbour",
        value: function neighbour(direction) {
            if ('u' === direction) {
                return pos(this.row - 1, this.column);
            }
            if ('d' === direction) {
                return pos(this.row + 1, this.column);
            }
            if ('l' === direction) {
                return pos(this.row, this.column - 1);
            }
            if ('r' === direction) {
                return pos(this.row, this.column + 1);
            }
        }
    }, {
        key: "row",
        get: function get() {
            return this.itsRow;
        }
    }, {
        key: "column",
        get: function get() {
            return this.itsColumn;
        }
    }]);

    return Position;
}();

exports.Position = Position;
function pos(row, column) {
    return new Position(row, column);
}
exports.pos = pos;
//# sourceMappingURL=Position.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(9);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Browser_1 = __webpack_require__(3);
window.document.addEventListener('DOMContentLoaded', function (event) {
    new Browser_1.default(window, event.target).init();
});
//# sourceMappingURL=main.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(4);
var SnakeMap_1 = __webpack_require__(7);
var Painter_1 = __webpack_require__(8);

var Browser = function () {
    function Browser(window, document) {
        _classCallCheck(this, Browser);

        this.window = window;
        this.document = document;
    }

    _createClass(Browser, [{
        key: "init",
        value: function init() {
            this.game = Game_1.default.start(new SnakeMap_1.default(['x xxxxxxxx', 'xd       x', 'x        x', 'x        x', 'x        x', 'x        x', 'x        x', 'x        x', 'x        x', 'x xxxxxxxx']), Game_1.default.randomPillPlacer);
            this.painter = new Painter_1.default(this.document.getElementById('game'));
            this.window.setInterval(this.heartbeat.bind(this), 175);
            this.document.body.addEventListener('keydown', this.onKeyDown.bind(this));
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(event) {
            var codes = [];
            codes[37] = 'l';
            codes[38] = 'u';
            codes[39] = 'r';
            codes[40] = 'd';
            var direction = codes[event.keyCode];
            if (direction) {
                this.game = this.game.turn(direction);
            }
        }
    }, {
        key: "heartbeat",
        value: function heartbeat() {
            this.game = this.game.step();
            this.painter.paint(this.game);
        }
    }]);

    return Browser;
}();

exports.default = Browser;
//# sourceMappingURL=Browser.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Position_1 = __webpack_require__(0);
var State_1 = __webpack_require__(5);

var Game = function () {
    _createClass(Game, null, [{
        key: "start",
        value: function start(map, pillPlacer) {
            return new Game(State_1.default.init(map, null), pillPlacer);
        }
    }, {
        key: "randomPillPlacer",
        value: function randomPillPlacer(game) {
            var rand = function rand(max) {
                return Math.floor(Math.random() * max) + 1;
            };
            return Position_1.pos(rand(game.map.height), rand(game.map.width));
        }
    }]);

    function Game(state, pillPlacer) {
        _classCallCheck(this, Game);

        this.itsState = state;
        this.pillPlacer = pillPlacer;
    }

    _createClass(Game, [{
        key: "isFree",
        value: function isFree(position) {
            if ('x' === this.itsState.map.cell(position)) {
                return false;
            }
            if (this.itsState.snake.positions.find(function (needle) {
                return needle.equals(position);
            }) !== undefined) {
                return false;
            }
            return true;
        }
    }, {
        key: "step",
        value: function step() {
            if (this.end) {
                return this;
            }
            var turns = this.itsState.turns;
            var direction = 0 === turns.length ? this.itsState.direction : turns[0];
            var next = this.snake.head.neighbour(direction);
            var end = !(this.isFree(next) || this.itsState.snake.tail.equals(next) && 0 === this.itsState.growth);
            if (0 === next.row) {
                next = Position_1.pos(this.map.height, next.column);
            }
            if (this.map.height + 1 === next.row) {
                next = Position_1.pos(1, next.column);
            }
            if (0 === next.column) {
                next = Position_1.pos(next.row, this.map.width);
            }
            if (this.map.width + 1 === next.column) {
                next = Position_1.pos(next.row, 1);
            }
            var growth = this.itsState.pill && this.itsState.pill.equals(next) ? this.itsState.growth + 3 : this.itsState.growth;
            var snake = end ? this.itsState.snake : 0 === growth ? this.itsState.snake.move(next) : this.itsState.snake.grow(next);
            var pill = null === this.pill || this.itsState.pill.equals(next) ? this.pillPlacer(this) : this.pill;
            while (!this.isFree(pill)) {
                pill = this.pillPlacer(this);
            }
            return new Game(this.itsState.transform({
                direction: direction,
                snake: snake,
                growth: Math.max(0, growth - 1),
                turns: this.itsState.turns.slice(1),
                end: end,
                pill: pill
            }), this.pillPlacer);
        }
    }, {
        key: "turn",
        value: function turn(direction) {
            var turns = direction === this.itsState.turns.pop() || this.opposite(direction) ? this.itsState.turns : this.itsState.turns.concat([direction]);
            return new Game(this.itsState.transform({
                direction: this.itsState.direction,
                snake: this.itsState.snake,
                growth: this.itsState.growth,
                turns: turns,
                end: this.itsState.end,
                pill: this.itsState.pill
            }), this.pillPlacer);
        }
    }, {
        key: "opposite",
        value: function opposite(direction) {
            var current = 0 === this.itsState.turns.length ? this.direction : this.itsState.turns.pop();
            return 'l' === direction && 'r' === current || 'r' === direction && 'l' === current || 'u' === direction && 'd' === current || 'd' === direction && 'u' === current;
        }
    }, {
        key: "snake",
        get: function get() {
            return this.itsState.snake;
        }
    }, {
        key: "map",
        get: function get() {
            return this.itsState.map;
        }
    }, {
        key: "direction",
        get: function get() {
            return this.itsState.direction;
        }
    }, {
        key: "growth",
        get: function get() {
            return this.itsState.growth;
        }
    }, {
        key: "end",
        get: function get() {
            return this.itsState.end;
        }
    }, {
        key: "pill",
        get: function get() {
            return this.itsState.pill;
        }
    }]);

    return Game;
}();

exports.default = Game;
//# sourceMappingURL=Game.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Snake_1 = __webpack_require__(6);

var State = function () {
    _createClass(State, null, [{
        key: "init",
        value: function init(map, pill) {
            return new State(map, new Snake_1.Snake([map.startingPosition]), map.startingDirection, 4, [], false, pill);
        }
    }]);

    function State(map, snake, direction, growth, turns, end, pill) {
        _classCallCheck(this, State);

        this.itsMap = map;
        this.itsSnake = snake;
        this.itsDirection = direction;
        this.itsGrowth = growth;
        this.itsTurns = turns;
        this.itsEnd = end;
        this.itsPill = pill;
    }

    _createClass(State, [{
        key: "transform",
        value: function transform(attributes) {
            return new State(this.itsMap, attributes.snake, attributes.direction, attributes.growth, attributes.turns, attributes.end, attributes.pill);
        }
    }, {
        key: "map",
        get: function get() {
            return this.itsMap;
        }
    }, {
        key: "snake",
        get: function get() {
            return this.itsSnake;
        }
    }, {
        key: "growth",
        get: function get() {
            return this.itsGrowth;
        }
    }, {
        key: "direction",
        get: function get() {
            return this.itsDirection;
        }
    }, {
        key: "turns",
        get: function get() {
            return [].concat(_toConsumableArray(this.itsTurns));
        }
    }, {
        key: "end",
        get: function get() {
            return this.itsEnd;
        }
    }, {
        key: "pill",
        get: function get() {
            return this.itsPill;
        }
    }]);

    return State;
}();

exports.default = State;
//# sourceMappingURL=State.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Snake = function () {
    function Snake(positions) {
        _classCallCheck(this, Snake);

        this.itsPositions = positions;
    }

    _createClass(Snake, [{
        key: "equals",
        value: function equals(other) {
            if (other.itsPositions.length !== this.itsPositions.length) {
                return false;
            }
            var result = true;
            this.itsPositions.forEach(function (position, idx) {
                if (!position.equals(other.itsPositions[idx])) {
                    result = false;
                }
            });
            return result;
        }
    }, {
        key: "grow",
        value: function grow(next) {
            var positions = [].concat(_toConsumableArray(this.itsPositions));
            positions.push(next);
            return new Snake(positions);
        }
    }, {
        key: "move",
        value: function move(next) {
            var positions = this.itsPositions.slice(1);
            positions.push(next);
            return new Snake(positions);
        }
    }, {
        key: "length",
        get: function get() {
            return this.itsPositions.length;
        }
    }, {
        key: "head",
        get: function get() {
            return [].concat(_toConsumableArray(this.itsPositions)).pop();
        }
    }, {
        key: "tail",
        get: function get() {
            return this.itsPositions[0];
        }
    }, {
        key: "positions",
        get: function get() {
            return [].concat(_toConsumableArray(this.itsPositions));
        }
    }]);

    return Snake;
}();

exports.Snake = Snake;
//# sourceMappingURL=Snake.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Position_1 = __webpack_require__(0);

var SnakeMap = function () {
    function SnakeMap(spec) {
        var _this = this;

        _classCallCheck(this, SnakeMap);

        this.cells = new Map();
        this.itsHeight = spec.length;
        this.itsWidth = spec[0].length;
        spec.forEach(function (line, rowIdx) {
            if (_this.itsWidth !== line.length) {
                throw new Error('Invalid map format');
            }
            line.split('').forEach(function (elem, colIdx) {
                var position = Position_1.pos(rowIdx + 1, colIdx + 1);
                if ('x' === elem) {
                    _this.cells.set(position.toString(), 'x');
                    return;
                }
                if (['u', 'd', 'l', 'r'].find(function (needle) {
                    return elem === needle;
                }) !== undefined) {
                    _this.itsStartingPosition = position;
                    _this.itsStartingDirection = elem;
                }
                _this.cells.set(position.toString(), ' ');
            });
        });
    }

    _createClass(SnakeMap, [{
        key: "cell",
        value: function cell(position) {
            return this.cells.get(position.toString());
        }
    }, {
        key: "height",
        get: function get() {
            return this.itsHeight;
        }
    }, {
        key: "width",
        get: function get() {
            return this.itsWidth;
        }
    }, {
        key: "startingPosition",
        get: function get() {
            return this.itsStartingPosition;
        }
    }, {
        key: "startingDirection",
        get: function get() {
            return this.itsStartingDirection;
        }
    }]);

    return SnakeMap;
}();

exports.default = SnakeMap;
//# sourceMappingURL=SnakeMap.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Position_1 = __webpack_require__(0);

var Painter = function () {
    function Painter(canvas) {
        _classCallCheck(this, Painter);

        canvas.setAttribute('width', '800');
        canvas.setAttribute('height', '800');
        this.context = canvas.getContext('2d');
    }

    _createClass(Painter, [{
        key: "paint",
        value: function paint(game) {
            this.paintMap(game);
            this.paintPill(game);
            this.paintSnake(game);
        }
    }, {
        key: "paintMap",
        value: function paintMap(game) {
            for (var row = 1; row <= game.map.height; ++row) {
                for (var col = 1; col <= game.map.width; ++col) {
                    this.context.fillStyle = 'x' === game.map.cell(Position_1.pos(row, col)) ? '#900' : '#000';
                    this.context.fillRect((col - 1) * 35, (row - 1) * 35, 35, 35);
                }
            }
        }
    }, {
        key: "paintPill",
        value: function paintPill(game) {
            if (game.pill) {
                this.context.fillStyle = '#199';
                this.context.arc((game.pill.column - 1) * 35 + 17.5, (game.pill.row - 1) * 35 + 17.5, 13, 0, 2 * Math.PI);
                this.context.fill();
            }
        }
    }, {
        key: "paintSnake",
        value: function paintSnake(game) {
            var _this = this;

            game.snake.positions.forEach(function (position) {
                _this.context.fillStyle = '#191';
                _this.context.beginPath();
                _this.context.arc((position.column - 1) * 35 + 17.5, (position.row - 1) * 35 + 17.5, 16.5, 0, 2 * Math.PI);
                _this.context.fill();
            });
        }
    }]);

    return Painter;
}();

exports.default = Painter;
//# sourceMappingURL=Painter.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);