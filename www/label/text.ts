import * as Mustache from "mustache";
import {splitLines, splitLinesAutoSize, strokeAlignedText, TextAlign} from "../core/util/text-utils";
import { mmPartial } from "./mm";

interface IElementoTextoModelPosicao {
    xMm: number;
    yMm: number;
    alinhar: string;
    rotacao: number;
}
interface IElementoTextoModelDimensoes {
    larguraMaximaMm: number;
}
interface IElementoTextoModelmultiplasLinhas {
    numeroMaximoDeLinhas: number;
    alturaMinimaFonteMm: number;
}
interface IElementoTextoModelFonte {
    nome: string;
    alturaMm: number;
    alturaMinimaMm: number;
    negrito?: boolean;
    forcaContorno?: number;
}
interface IElementoTextoModel {
    tipo: string;
    posicao: IElementoTextoModelPosicao;
    dimensoes: IElementoTextoModelDimensoes;
    fonte: IElementoTextoModelFonte;
    multiplasLinhas: IElementoTextoModelmultiplasLinhas;
    maxLinhas: number;
    valor: string;
    fn: string;
}

const drawText = (ctx: CanvasRenderingContext2D, dpi: number, model: IElementoTextoModel, textBindings?: any) => {
    if (!isVariableBindingEmpty(model, textBindings)) {
        const mm = mmPartial(dpi);
        const degrees = model.posicao.rotacao || 0;
        ctx.save();
        ctx.textAlign = model.posicao.alinhar || "start";
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.rotate(degrees * Math.PI / 180);
        ctx.font = `${model.fonte.negrito ? "bold" : ""} ${mm(model.fonte.alturaMm)}px ${model.fonte.nome}`;
        let renderedText = textBindings ? Mustache.render(model.valor, textBindings) : model.valor.replace("{{{", "<").replace("}}}", ">");
        if (textFunctions[model.fn] && textBindings) {
            renderedText = textFunctions[model.fn](renderedText);
        }
        ctx.lineWidth = model.fonte.forcaContorno || 0;

        if (!!model.multiplasLinhas) {
            let yMm = model.posicao.yMm;
            const alturaLinhaMm = model.fonte.alturaMm;
            const larguraMaxima = model.dimensoes.larguraMaximaMm;
            const maximoNumeroDeLinhas = model.multiplasLinhas.numeroMaximoDeLinhas || -1;
            const alturaMinimaFonteMm = model.multiplasLinhas.alturaMinimaFonteMm ? model.multiplasLinhas.alturaMinimaFonteMm : ALTURA_MINIMA_FONT_MM;
            let linhas = getMultiplasLinhas(ctx, model, renderedText, larguraMaxima, maximoNumeroDeLinhas, alturaMinimaFonteMm, dpi);
            linhas = justify(ctx, mm(larguraMaxima), linhas);
            linhas.forEach((linha: string) => {
                ctx.strokeText(linha, mm(model.posicao.xMm), mm(yMm), mm(larguraMaxima));
                ctx.fillText(linha, mm(model.posicao.xMm), mm(yMm), mm(larguraMaxima));
                yMm += alturaLinhaMm;
            });
        } else {
            ctx.strokeText(renderedText, mm(model.posicao.xMm), mm(model.posicao.yMm), mm(model.dimensoes.larguraMaximaMm));
            ctx.fillText(renderedText, mm(model.posicao.xMm), mm(model.posicao.yMm), mm(model.dimensoes.larguraMaximaMm));
        }

        ctx.restore();
    }

    function justify(context: CanvasRenderingContext2D, maxLen: number, lines: string[]) {
        if (lines.length > 1) {
            let numWords;
            let spaceLength;
            let numOfSpaces;
            let num;
            let filler;
            const delimiter = "\u200A";
            for (let i = 0; i < lines.length - 1; i++) {
                numWords = lines[i].trim().split(/\s+/).length;
                if (numWords <= 1) {
                    continue;
                }

                lines[i] = lines[i].trim().split(/\s+/).join(delimiter);
                spaceLength = context.measureText(delimiter).width;
                numOfSpaces = (maxLen - context.measureText(lines[i]).width) / spaceLength;
                num = numOfSpaces / (numWords - 1);
                filler = "";

                for (let j = 0; j < num; j++) {
                    filler += delimiter;
                }
                lines[i] = lines[i].trim().split(delimiter).join(filler);
            }
        }
        return lines;
    }

    function getMultiplasLinhas(context: CanvasRenderingContext2D, model: IElementoTextoModel, texto: string,
                                larguraMaxima: number, maximoNumeroDeLinhas: number, alturaMinimaFonteMm: number, dpi: number): string[] {
        if (maximoNumeroDeLinhas > 0) {
            return splitLinesAutoSize(context, model, texto, larguraMaxima, maximoNumeroDeLinhas, alturaMinimaFonteMm, dpi);
        } else {
            return splitLines(texto, larguraMaxima);
        }
    }
};

const isVariableBindingEmpty = (model: IElementoTextoModel, textBindings?: any) => {
    const valor = model.valor;
    if (textBindings && indexStartVariable(valor) > 0 && indexLastVariable(valor) > 0) {
        const variable = valor.substr(indexStartVariable(valor), indexLastVariable(valor));
        return !Mustache.render(variable, textBindings);
    }
    return false;
};

const indexStartVariable = (valor: string) => {
    return valor.indexOf("{");
};

const indexLastVariable = (valor: string) => {
    return valor.lastIndexOf("}");
};

const textFunctions: any = {
  "caixaAlta": (text: string) => { return text.toUpperCase(); },
};

const ALTURA_MINIMA_FONT_MM = 1.2;

export const text = { drawText };
