import * as Mustache from "mustache";
import { mmPartial } from "./mm";

interface IElementoTextoModelPosicao {
    xMm: number;
    yMm: number;
    align: string;
}
interface IElementoTextoModelDimensoes {
    larguraMaximaMm: number;
}
interface IElementoTextoModelFonte {
    nome: string;
    alturaMm: number;
    negrito?: boolean;
    forcaContorno?: number;
}
interface IElementoTextoModel {
    tipo: string;
    posicao: IElementoTextoModelPosicao;
    dimensoes: IElementoTextoModelDimensoes;
    fonte: IElementoTextoModelFonte;
    valor: string;
    fn: string;
}
const drawText = (ctx: CanvasRenderingContext2D, dpi: number, model: IElementoTextoModel, textBindings?: any) => {
    if(!isVariableBindingEmpty(model, textBindings)) {
        const mm = mmPartial(dpi);
        ctx.save();
        ctx.textAlign = model.posicao.align || "start";
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.font = `${model.fonte.negrito ? "bold" : ""} ${mm(model.fonte.alturaMm)}px ${model.fonte.nome}`;
        let renderedText = textBindings ? Mustache.render(model.valor, textBindings) : model.valor.replace("{{{", "<").replace("}}}", ">");
        if (textFunctions[model.fn] && textBindings) {
            renderedText = textFunctions[model.fn](renderedText);
        }
        ctx.lineWidth = model.fonte.forcaContorno || 0;
        ctx.strokeText(renderedText, mm(model.posicao.xMm), mm(model.posicao.yMm), mm(model.dimensoes.larguraMaximaMm));
        ctx.fillText(renderedText, mm(model.posicao.xMm), mm(model.posicao.yMm), mm(model.dimensoes.larguraMaximaMm));
        ctx.restore();
    }
};

const isVariableBindingEmpty = (model: IElementoTextoModel, textBindings?: any) => {
    let valor = model.valor;
    if(indexStartVariable(valor) > 0 && indexLastVariable(valor) > 0){
        let variable = valor.substr(indexStartVariable(valor), indexLastVariable(valor));
        return !Mustache.render(variable, textBindings);
    }
    return false;
};

const indexStartVariable = (valor: string) => {
    return valor.indexOf('{');
};

const indexLastVariable = (valor: string) => {
    return valor.lastIndexOf('}');
};

const textFunctions: any = {
  "caixaAlta": (text: string) => { return text.toUpperCase(); },
};

export const text = { drawText };
