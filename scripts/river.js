"use strict";

var canvas = document.getElementById("river_canvas");
var ctx = canvas.getContext("2d");

function drawWave(ctx, xBegin, xMax, yBegin, r, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  var x = xBegin + r;
  var y = yBegin;

  while (x - 2 * r < xMax) {
    ctx.arc(x, y, r, -Math.PI, 0);
    x += 2 * r;
  }

  ctx.fill();
}

function drawWater() {
  canvas.width = document.documentElement.getBoundingClientRect().width;
  var canvasWidth = canvas.getBoundingClientRect().width;
  
  var radius = 50;

  ctx.fillStyle = "#1a9a89";
  ctx.fillRect(0, radius * 1.2, canvasWidth, radius);

  drawWave(ctx, 0, canvasWidth, radius, radius, "#196fa5");
  drawWave(ctx, -radius, canvasWidth, radius * 1.4, radius, "#197ba5");
  drawWave(ctx, 0, canvasWidth, radius * 1.8, radius, "#1992a5");
  drawWave(ctx, -radius, canvasWidth, radius * 2.2, radius, "#19968a");
}

drawWater();
window.addEventListener("resize", drawWater);