import { mmPartial } from "./mm";

const create = (id: string, model: any) => {
    const oldCanvas = document.getElementById("etiqueta-canvas");
    if (oldCanvas) {
        oldCanvas.remove();
    }
    const el = document.getElementById(id);
    const canvas = document.createElement("canvas");
    canvas.id     = "etiqueta-canvas";
    const mm = mmPartial(model.dimensoes.resolucaoDpi);
    canvas.width  = mm(model.dimensoes.larguraMm);
    canvas.height = mm(model.dimensoes.alturaMm);
    el.appendChild(canvas);

    drawBackground(canvas);

    drawText(canvas, "20px Consolas, sans serif", "Hello World!", 30, 60);
    drawText(canvas, "20px Telegrama-Render, sans serif", "Hello World!", 30, 90);
    drawText(canvas, "20px DejaVuSansMono, sans serif", "Hello World!", 30, 120);
    drawText(canvas, "20px DejaVuSansMono-Bold, sans serif", "Hello World!", 30, 150);

    return canvas;
};

const drawBackground = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const drawText = (canvas: HTMLCanvasElement, font: string, text: string, x: number, y: number) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.font = font;
    ctx.fillText(text, x, y);
};

export const etiqueta = {create};
