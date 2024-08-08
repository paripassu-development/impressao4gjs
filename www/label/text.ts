import * as Mustache from "mustache";
import {
    CanvasTextAlign,
    ocultaCampoTextoComBaseNoValor,
    splitLines,
    splitLinesAutoSize,
    strokeAlignedText,
    writeFabricText
} from "../core/util/text-utils";
import {ValidateModelUtils} from "../core/util/validate-model-utils";
import {mmPartial} from "./mm";
import {Canvas} from "fabric/fabric-impl";
import {calculaTamanhoFonteByAlturaMMEFontePadraoPT} from "../core/util/conversor-utils";
import {TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT} from "../default";

interface IElementoTextoModelPosicao {
    xMm: number;
    yMm: number;
    alinhar: string;
    rotacao: number;
}

interface IElementoTextoModelDimensoes {
    larguraMaximaMm: number;
}
export interface IElementoTextoModelmultiplasLinhas {
    numeroMaximoDeLinhas: number;
    alturaMinimaFonteMm: number;
    alinhamento: string;
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

const drawText = (ctx: CanvasRenderingContext2D, fabricCanvas: Canvas, dpi: number, model: IElementoTextoModel, textBindings?: any) => {
    if (!isVariableBindingEmpty(model, textBindings)) {
        const mm = mmPartial(dpi);
        const degrees = model.posicao.rotacao || 0;
        ctx.save();
        ctx.textAlign = model.posicao.alinhar as CanvasTextAlign || "start" as CanvasTextAlign;
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.rotate(degrees * Math.PI / 180);
        ctx.font = `${model.fonte.negrito ? "bold" : ""} ${Math.round(mm(model.fonte.alturaMm))}px ${model.fonte.nome}`;
        let renderedText = textBindings ? Mustache.render(model.valor, textBindings) : model.valor.replace("{{{", "<").replace("}}}", ">");
        if (textFunctions[model.fn] && textBindings) {
            renderedText = textFunctions[model.fn](renderedText);
        }
        renderedText = ocultaCampoTextoComBaseNoValor(renderedText);
        ctx.lineWidth = model.fonte.forcaContorno || 0;

        if (!!model.multiplasLinhas) {
            let yMm = model.posicao.yMm;
            const alturaLinhaMm = model.fonte.alturaMm;
            const larguraMaxima = model.dimensoes.larguraMaximaMm;
            const maximoNumeroDeLinhas = model.multiplasLinhas.numeroMaximoDeLinhas || -1;
            const alturaMinimaFonteMm = model.multiplasLinhas.alturaMinimaFonteMm ? model.multiplasLinhas.alturaMinimaFonteMm : ALTURA_MINIMA_FONT_MM;
            const linhas = getMultiplasLinhas(ctx, model, renderedText, larguraMaxima, maximoNumeroDeLinhas, alturaMinimaFonteMm, dpi);
            let alinhamento = model.multiplasLinhas.alinhamento || "left";
            let contaLinha = 0;

            linhas.forEach((linha: string) => {
                if (contaLinha === linhas.length - 1 && alinhamento === "justify") {
                    alinhamento = "left";
                }
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, linha, model.posicao.xMm, yMm, mm, alinhamento, degrees);
                yMm += alturaLinhaMm;
                contaLinha++;
            });
        } else {
            if (!!fabricCanvas) {
                writeFabricText(fabricCanvas, ctx, renderedText, model.posicao.xMm, model.posicao.yMm, model.dimensoes.larguraMaximaMm, mm, {degrees});
            } else {
                ctx.strokeText(renderedText, mm(model.posicao.xMm), mm(model.posicao.yMm), mm(model.dimensoes.larguraMaximaMm));
                ctx.fillText(renderedText, mm(model.posicao.xMm), mm(model.posicao.yMm), mm(model.dimensoes.larguraMaximaMm));
            }
        }

        ctx.restore();
    }

};

function getMultiplasLinhas(context: CanvasRenderingContext2D, model: IElementoTextoModel, texto: string,
                            larguraMaxima: number, maximoNumeroDeLinhas: number, alturaMinimaFonteMm: number, dpi: number): string[] {
    if (maximoNumeroDeLinhas > 0) {
        return splitLinesAutoSize(context, model, texto, larguraMaxima, maximoNumeroDeLinhas, alturaMinimaFonteMm, dpi);
    } else {
        return splitLines(texto, larguraMaxima);
    }
}

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
    "caixaAlta": (text: string) => {
        return text.toUpperCase();
    },
};

const ALTURA_MINIMA_FONT_MM = 1.2;

export const text = { drawText };
