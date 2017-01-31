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
    forcaContorno?: number;
}
interface IElementoTextoModel {
    tipo: string;
    posicao: IelementoTextoModelPosicao;
    dimensoes: IelementoTextoModelDimensoes;
    fonte: IelementoTextoModelFonte;
    valor: string;
    fn: string;
}
const drawText = (ctx: CanvasRenderingContext2D, dpi: number, model: IElementoTextoModel, textBindings?: any) => {
    const mm = mmPartialOversampled(dpi);
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#000000";
    ctx.font = `${model.fonte.negrito ? "bold" : ""} ${mm(model.fonte.alturaMm)}px ${model.fonte.nome}`;
    let renderedText = textBindings ? Mustache.render(model.valor, textBindings) : model.valor;
    if (textFunctions[model.fn] && textBindings) {
        renderedText = textFunctions[model.fn](renderedText);
    }
    const originalLineWidth = ctx.lineWidth;
    ctx.lineWidth = model.fonte.forcaContorno || 0;
    ctx.strokeText(renderedText, mm(model.posicao.xMm), mm(model.posicao.yMm), mm(model.dimensoes.larguraMaximaMm));
    ctx.fillText(renderedText, mm(model.posicao.xMm), mm(model.posicao.yMm), mm(model.dimensoes.larguraMaximaMm));
    ctx.lineWidth = originalLineWidth;
};

const textFunctions: any = {
  "caixaAlta": (text: string) => { return text.toUpperCase(); },
};

export const text = { drawText };
