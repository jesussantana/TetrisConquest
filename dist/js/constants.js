"use strict";
// Create Context
const canvas = document.getElementById("board");
const context = canvas.getContext("2d");
const canvasNext = document.getElementById("next");
const contextNext = canvasNext.getContext("2d");
const canvasDefault = document.getElementById("default");
const contextDefault = canvasDefault.getContext("2d");
// Initialize Constants
const columns = 15;
const rows = 40;
const blockSize = 40;
const gameOver = 0;
const nextLevel = 0;
let start = 0;
let music = 0;

// IMage for Events
const imageStart = new Image();
imageStart.src =
  "https://cdn130.picsart.com/235986056050212.png?type=webp&to=min&r=1024";

const imageGo = new Image();
imageGo.src = "http://esmarketingdigital.com/images/go.png";

const imageGameOver = new Image();
imageGameOver.src = "http://esmarketingdigital.com/images/GAMEoVER.png";

/*function scaleImage(image) {
  Math.min(canvasDefault.width / image.width, canvasDefault.height / image.height);
}

function xImage(image, scale) {
  canvasDefault.width / 2 - (image.width / 2) * scale;
}
function yImage(image, scale) {
  canvasDefault.height / 2 - (image.height / 2) * scale;
}*/

const scaleImageStart = Math.min(
  canvasDefault.width / imageStart.width,
  canvasDefault.height / imageStart.height
);
const scaleImageGo = Math.min(
  canvasDefault.width / imageGo.width,
  canvasDefault.height / imageGo.height
);

const scaleImageGameOver = Math.min(
  canvasDefault.width / imageGameOver.width,
  canvasDefault.height / imageGameOver.height
);

const xImageStart =
  canvasDefault.width / 2 - (imageStart.width / 2) * scaleImageStart;

const yImageStart =
  canvasDefault.height / 2 - (imageStart.height / 2) * scaleImageStart;

const xImageGo = canvasDefault.width / 2 - (imageGo.width / 2) * scaleImageGo;
const yImageGo = canvasDefault.height / 2 - (imageGo.height / 2) * scaleImageGo;

const xImageGameOver =
  canvasDefault.width / 2 - (imageGameOver.width / 2) * scaleImageGameOver;
const yImageGameOver =
  canvasDefault.height / 2 - (imageGameOver.height / 2) * scaleImageGameOver;

// Scale Blocks
context.scale(blockSize, blockSize);
contextNext.scale(blockSize, blockSize);

// Initialize Audios
const audioA = document.getElementById("audioA");
audioA.volume = 0.5;

const audioB = document.getElementById("audioB");
audioB.volume = 0.5;

const audio1 = document.getElementById("audio1");
audio1.volume = 0.6;

const audio2 = document.getElementById("audio2");
audio2.volume = 0.6;

const audio3 = document.getElementById("audio3");
audio3.volume = 0.6;

// Initialize Counters
let requestId = 0;
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
