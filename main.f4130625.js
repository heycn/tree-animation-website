// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
var angleIncrement = 30 * Math.PI / 180;
var startX = canvas.width / 2,
    startY = canvas.height - 120,
    height = canvas.height * 7 / 24;
var thickness = 2,
    maxDepth = 8,
    count = 0,
    branchPropagation = 5,
    color = '#fff';

var createRect = function createRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var drawLine = function drawLine(x1, y1, x2, y2, thickness, color) {
  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
};

var drawBranch = function drawBranch(x, y, height, thickness, angle, depth) {
  if (depth > maxDepth) return;
  var endX = x - height * Math.sin(angle),
      endY = y - height * Math.cos(angle),
      newHeight = height * 8 / 12,
      newThickness = thickness * 2 / 3,
      angleStart;
  drawLine(x, y, endX, endY, thickness, color);
  angleStart = branchPropagation % 2 === 0 ? angle - angleIncrement / 2 - (Math.trunc(branchPropagation / 2) - 1) * angleIncrement : angle - Math.trunc(branchPropagation / 2) * angleIncrement;

  for (var i = 0; i < branchPropagation; i++) {
    drawBranch(endX, endY, newHeight, newThickness, angleStart + i * angleIncrement, depth + 1);
  }
};

var drawTree = function drawTree() {
  createRect(0, 0, canvas.width, canvas.height, '#1b1b1b');
  angleIncrement -= 0.02;
  drawBranch(startX, startY, height, thickness, 0, Math.PI / 2);
  requestAnimationFrame(drawTree);
};

drawTree();
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.f4130625.js.map