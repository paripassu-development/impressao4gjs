import { mmPartial } from "./mm";

interface IElementoTextoModel {
    tipo: string;
    fonte: string;
    alturaMm: number;
    xMm: number;
    yMm: number;
    valor: string;
}
const drawText = (canvas: HTMLCanvasElement, dpi: number, model: IElementoTextoModel) => {
    const mm = mmPartial(dpi);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.font = `${mm(model.alturaMm)}px ${model.fonte}`;
    ctx.fillText(model.valor, mm(model.xMm), mm(model.yMm));
};

export const text = { drawText };
