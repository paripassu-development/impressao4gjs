const createCanvas = (nomeElementoCanvas: string, larguraMm: number, alturaMm: number) => {
    const oldCanvas = document.getElementById(nomeElementoCanvas);
    if (oldCanvas) {
        oldCanvas.remove();
    }
    const canvas = document.createElement("canvas");
    canvas.id = nomeElementoCanvas;
    canvas.width = larguraMm;
    canvas.height = alturaMm;
    canvas.style.width = (canvas.width) + "px";
    canvas.style.height = (canvas.height) + "px";
    return canvas;
};

const createContext = (elementCavnas: HTMLCanvasElement) => {
    const ctx: any = elementCavnas.getContext("2d", {alpha: false});
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    return ctx;
};

const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
};

export const canvasUtils = { createCanvas, createContext, drawBackground };