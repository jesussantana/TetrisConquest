"use strict";
// Create Context
const canvas = document.getElementById("board");
const context = canvas.getContext("2d");
const canvasNext = document.getElementById("next");
const contextNext = canvasNext.getContext("2d");
const columns = 15;
const rows = 20;
const blockSize = 20;
// Scale Blocks
context.scale(blockSize, blockSize);
contextNext.scale(blockSize, blockSize);
const image = new Image();
image.src = "../images/space.jpg";
// Board 20X15
//const board = createMatrix(15, 20);
// Initialize Instances
//const block = new Blocks();

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

/*const _shapes = [
    [],
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
    [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
    [[4, 4], [4, 4]],
    [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
    [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
    [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
  ];

  const _colors = [
      null,
      "cyan",
      "blue",
      "orange",
      "yellow",
      "green",
      "purple",
      "red",
    ];*/
