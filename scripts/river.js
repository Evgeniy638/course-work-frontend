const canvas = document.getElementById("river_canvas");
const ctx = canvas.getContext("2d");

const drawWave = (ctx, xBegin, xMax, yBegin, r, color) => {
    ctx.beginPath();

    ctx.fillStyle = color;

    let x = xBegin + r;
    const y = yBegin;

    while (x - 2 * r  < xMax) {
        ctx.arc(x, y, r, -Math.PI, 0);
        x += 2 * r;
    }

    ctx.fill();
}

const drawWater = () => {
    canvas.width = document.documentElement.getBoundingClientRect().width;

    const canvasWidth = canvas.getBoundingClientRect().width;

    const radius = 50;

    ctx.fillStyle = "#1a9a89";
    ctx.fillRect(0, radius * 1.2, canvasWidth, radius);

    drawWave(ctx, 0, canvasWidth, radius, radius, "#196fa5");
    drawWave(ctx, -radius, canvasWidth, radius * 1.4, radius, "#197ba5");
    drawWave(ctx, 0, canvasWidth, radius * 1.8, radius, "#1992a5");
    drawWave(ctx, -radius, canvasWidth, radius * 2.2, radius, "#19968a");
}

window.addEventListener("load", drawWater);

window.addEventListener("resize", drawWater);