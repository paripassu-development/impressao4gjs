import * as Mustache from "mustache";
import { mmPartialOversampled } from "./mm";

interface IelementoTextoModelPosicao {
    xMm: number;
    yMm: number;
}
interface IelementoTextoModelDimensoes {
    larguraMaximaMm: number;
}
interface IelementoTextoModelFonte {
    nome: string;
    alturaMm: number;
    negrito?: boolean;
}
interface IElementoTextoModel {
    tipo: string;
    posicao: IelementoTextoModelPosicao;
    dimensoes: IelementoTextoModelDimensoes;
    fonte: IelementoTextoModelFonte;
    valor: string;
    fn: string;
}
const drawText = (canvas: HTMLCanvasElement, dpi: number, model: IElementoTextoModel, textBindings?: any) => {
    const mm = mmPartialOversampled(dpi);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    /* style | variant | weight | stretch | size/line-height | family */
    ctx.font = `normal normal ${model.fonte.negrito ? "900" : ""} normal ${mm(model.fonte.alturaMm)}px ${model.fonte.nome}`;
    let renderedText = textBindings ? Mustache.render(model.valor, textBindings) : model.valor;
    if (textFunctions[model.fn] && textBindings) {
        renderedText = textFunctions[model.fn](renderedText);
    }
    ctx.fillText(renderedText, mm(model.posicao.xMm), mm(model.posicao.yMm), mm(model.dimensoes.larguraMaximaMm));
};

const textFunctions: any = {
  "caixaAlta": (text: string) => { return text.toUpperCase(); },
};

export const text = { drawText };
