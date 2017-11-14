var createCanvas = function (nomeElementoCanvas, larguraMm, alturaMm) {
    var oldCanvas = document.getElementById(nomeElementoCanvas);
    if (oldCanvas) {
        oldCanvas.remove();
    }
    var canvas = document.createElement("canvas");
    canvas.id = nomeElementoCanvas;
    canvas.width = larguraMm;
    canvas.height = alturaMm;
    canvas.style.width = (canvas.width) + "px";
    canvas.style.height = (canvas.height) + "px";
    return canvas;
};
var createContext = function (elementCanvas) {
    var ctx = elementCanvas.getContext("2d", { alpha: false });
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    return ctx;
};
var drawBackground = function (ctx, width, height) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
};
exports.canvasUtils = { createCanvas: createCanvas, createContext: createContext, drawBackground: drawBackground };
//# sourceMappingURL=canvas-utils.js.map