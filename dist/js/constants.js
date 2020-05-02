"use strict";
// Create Context
const canvas = document.getElementById("board");
const context = canvas.getContext("2d");
const canvasNext = document.getElementById("next");
const contextNext = canvasNext.getContext("2d");
const columns = 15;
const rows = 40;
const blockSize = 40;
const gameOver = 0;
const nextLevel = 0;
// Scale Blocks
context.scale(blockSize, blockSize);
contextNext.scale(blockSize, blockSize);
/*const image = new Image();
image.src = "../images/space.jpg";*/
const audio = document.getElementById("audio1");
audio.volume = 0.5;

let requestId = 0;
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
