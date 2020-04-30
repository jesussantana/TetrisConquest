"use strict";
// Create Context
const canvas = document.getElementById("board");
const context = canvas.getContext("2d");
// Scale Blocks
context.scale(20, 20);

// Board 20X15
//const board = createMatrix(15, 20);
// Initialize Instances
//const block = new Blocks();

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
