"use strict";
// Create Context
const canvas = document.getElementById("board");
const context = canvas.getContext("2d");
const canvasNext = document.getElementById("next");
const contextNext = canvasNext.getContext("2d");
const canvasDefault = document.getElementById("default");
const contextDefault = canvasDefault.getContext("2d");

// Initialize Constants
const columns = 17;
const rows = 20;
const blockSize = 40;
const gameOver = 0;
const nextLevel = 0;

// Vars for buttons
let start = 0;
let music = 0;

// High Score
let highscore = localStorage.getItem("highscore") || 0;
highscore = +highscore;

// Image for Events
const imageStart = new Image();
imageStart.src = "dist/images/press-start.png";

const imageGo = new Image();
imageGo.src = "dist/images/go.png";

const imageGameOver = new Image();
imageGameOver.src = "dist/images/GAMEoVER.png";

const imageBackground = new Image();
imageBackground.src = "dist/images/Robert.png";

// Scale Blocks
context.scale(blockSize, blockSize);
contextNext.scale(blockSize, blockSize);

// Initialize Audios
const audioA = document.getElementById("audioA");
audioA.volume = 0.5;
audioA.loop = true;

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
