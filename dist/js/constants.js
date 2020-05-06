"use strict";
// Create Context
const canvas = document.getElementById("board");
const context = canvas.getContext("2d");
const canvasNext = document.getElementById("next");
const contextNext = canvasNext.getContext("2d");
const canvasDefault = document.getElementById("default");
const contextDefault = canvasDefault.getContext("2d");

const columns = 15;
const rows = 40;
const blockSize = 40;
const gameOver = 0;
const nextLevel = 0;
let start = 0;

const imageGameOver = new Image();
imageGameOver.src =
  "https://portal.33bits.net/wp-content/uploads/2018/12/gameoverphrase.jpg";

const scaleImage = Math.min(
  canvasDefault.width / imageGameOver.width,
  canvasDefault.height / imageGameOver.height
);
const xImage = canvasDefault.width / 2 - (imageGameOver.width / 2) * scaleImage;
const yImage =
  canvasDefault.height / 2 - (imageGameOver.height / 2) * scaleImage;

// Scale Blocks
context.scale(blockSize, blockSize);
contextNext.scale(blockSize, blockSize);

/*const image = new Image();
image.src = "../images/space.jpg";*/
const audio = document.getElementById("audio");
audio.volume = 0.5;

const audio1 = document.getElementById("audio1");
audio1.volume = 0.6;

const audio2 = document.getElementById("audio2");
audio2.volume = 0.6;

let requestId = 0;
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
