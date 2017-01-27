import * as Mustache from "mustache";
import { mmPartial } from "./mm";

interface IElementoTextoModel {
    tipo: string;
    fonte: string;
    alturaMm: number;
    tamanhoMaximoMm: number;
    xMm: number;
    yMm: number;
    valor: string;
    fn: string;
}
const drawText = (canvas: HTMLCanvasElement, dpi: number, model: IElementoTextoModel, textBindings?: any) => {
    const mm = mmPartial(dpi);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.font = `${mm(model.alturaMm)}px ${model.fonte}`;
    let renderedText = textBindings ? Mustache.render(model.valor, textBindings) : model.valor;
    if (textFunctions[model.fn]) {
        renderedText = textFunctions[model.fn](renderedText);
    }
    ctx.fillText(renderedText, mm(model.xMm), mm(model.yMm), mm(model.tamanhoMaximoMm));
};

const textFunctions: any = {
  "caixaAlta": (text: string) => { return text.toUpperCase(); }
};

export const text = { drawText };
