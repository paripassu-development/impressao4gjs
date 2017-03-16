import * as Mustache from "mustache";
import { mmPartial } from "./mm";

interface IElementoTabelaNutricionalModelPosicao {
    xMm: number;
    yMm: number;
}
interface IElementoTabelaNutricionalModelDimensoes {
    larguraMaximaMm: number;
}
interface IElementoTabelaNutricionalModelFonte {
    nome: string;
    alturaMm: number;
    negrito?: boolean;
    forcaContorno?: number;
}
interface IInformacoesNutriente {
    nome: string;
    qtPorcao: string;
    valDiario: string;
}
interface IInformacoesNutrientesTabelaNutricional {
    [key: string]: IInformacoesNutriente;
}
interface IElementoTabelaNutricionalInformacoesAdicionais {
    texto: string;
    caracteresPorLinha: number;
}
interface IElementoTabelaNutricionalModelInformacoesNutricionais {
    textoInformacaoNutricional: string;
    textoQuantidadePorPorcao: string;
    textoAbreviadoValorDiario: string;
    textoPorcaoCaseira: string;
    textoProporcaoCalorias: string;
    informacoesNutrientesTabelaNutricional: IInformacoesNutrientesTabelaNutricional;
}

interface IElementoTabelaNutricionalOpcoes {
    ocultarLinhas?: boolean;
}

const nutrientes = [
    "valorEnergetico",
    "sodio",
    "proteinas",
    "gordurasTotais",
    "gorduraTrans",
    "gorduraSaturada",
    "fibraAlimentar",
    "carboidratos",
]

interface IElementoTabelaNutricionalModel {
    tipo: string;
    posicao: IElementoTabelaNutricionalModelPosicao;
    dimensoes: IElementoTabelaNutricionalModelDimensoes;
    fonte: IElementoTabelaNutricionalModelFonte;
    informacoesNutricionais: IElementoTabelaNutricionalModelInformacoesNutricionais;
    informacoesAdicionais: IElementoTabelaNutricionalInformacoesAdicionais;
    opcoes?: IElementoTabelaNutricionalOpcoes;
}

const drawTable = (ctx: CanvasRenderingContext2D, dpi: number, model: IElementoTabelaNutricionalModel) => {
    const mm = mmPartial(dpi);
    ctx.save();
    ctx.fillStyle = BLACK;
    ctx.strokeStyle = BLACK;
    ctx.lineWidth = model.fonte.forcaContorno || 0;
    let yMm = model.posicao.yMm;
    const alturaLinhaMm = model.fonte.alturaMm * 1.2;
    const lineStrokeGap = alturaLinhaMm / 3;

    ctx.font = `${model.fonte.negrito ? "bold" : ""} ${mm(model.fonte.alturaMm * 1.5)}px ${model.fonte.nome}`;
    strokeText(ctx, model, getOrDefault(model.informacoesNutricionais, "textoInformacaoNutricional"), model.posicao.xMm, yMm, mm, TextAlign.CENTER);
    yMm += alturaLinhaMm * 1.1;

    ctx.font = `${model.fonte.negrito ? "bold" : ""} ${mm(model.fonte.alturaMm)}px ${model.fonte.nome}`;

    strokeText(ctx, model, getOrDefault(model.informacoesNutricionais, "textoPorcaoCaseira"), model.posicao.xMm, yMm, mm, TextAlign.CENTER);

    yMm += lineStrokeGap;
    drawLine(ctx, model, yMm, mm);
    yMm += alturaLinhaMm;

    strokeText(ctx, model, getOrDefault(model.informacoesNutricionais, "textoQuantidadePorPorcao"), model.posicao.xMm, yMm, mm, TextAlign.LEFT);

    ctx.textAlign = TextAlign.RIGHT;
    ctx.strokeText(getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario"),
        mm(model.posicao.xMm + model.dimensoes.larguraMaximaMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));

    yMm += lineStrokeGap;
    drawLine(ctx, model, yMm, mm);
    nutrientes.forEach((nutriente: any) => {
        const informacoesNutriente = model.informacoesNutricionais.informacoesNutrientesTabelaNutricional[nutriente];
        if ( informacoesNutriente !== undefined ) {
            yMm += alturaLinhaMm;
            ctx.textAlign = TextAlign.LEFT;
            ctx.strokeText(getOrDefault(informacoesNutriente, "nome"),
                mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));

            if (nutriente === "valorEnergetico") {
                strokeText(ctx, model, getOrDefault(model.informacoesNutricionais, "textoProporcaoCalorias"), model.posicao.xMm - (alturaLinhaMm * 3.2), yMm, mm, TextAlign.RIGHT);
            } else {
                strokeText(ctx, model, getOrDefault(informacoesNutriente, "qtPorcao"), model.posicao.xMm - (alturaLinhaMm * 6), yMm, mm, TextAlign.RIGHT);
            }
            strokeText(ctx, model, getOrDefault(informacoesNutriente, "valDiario"), model.posicao.xMm - alturaLinhaMm / 2, yMm, mm, TextAlign.RIGHT);
            yMm += lineStrokeGap;
            drawLine(ctx, model, yMm, mm);
        }
    });
    yMm += alturaLinhaMm;

    if (!model.informacoesAdicionais.texto) {
        strokeText(ctx, model, "<informacoesAdicionais.texto>", model.posicao.xMm, yMm, mm, TextAlign.CENTER);
    } else {
        const linhasInformacoesAdicionais = splitLines(model.informacoesAdicionais.texto, model.informacoesAdicionais.caracteresPorLinha);
        linhasInformacoesAdicionais.forEach((linha: string) => {
            strokeText(ctx, model, linha, model.posicao.xMm, yMm, mm, TextAlign.CENTER);
            yMm += alturaLinhaMm;
        });
    }
    ctx.restore();
};

function getOrDefault(object: any, param: string): string{
    return object[param] ? object[param] : "<" + param + ">";
}

const strokeText = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, text: string, xMm: number, yMm: number, mm: any, textAlign: string) => {
    let x = xMm;
    if (textAlign === TextAlign.CENTER) {
        x = xMm + model.dimensoes.larguraMaximaMm / 2;
    } else if (textAlign === TextAlign.RIGHT) {
        x = xMm + model.dimensoes.larguraMaximaMm;
    }
    ctx.textAlign = textAlign;
    ctx.strokeText(text, mm(x), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
    ctx.fillText(text, mm(x), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
};

function splitLines(texto: string, caracteresPorLinha: number): string[]  {
    if (texto == null || texto === "") {
        return [texto];
    }
    const linhas: string[] = [];
    let linhaAtual = "";
    const palavras: string[] = texto.split(" ");
    palavras.forEach((palavra: string, index: number) => {
        if (linhaAtual === "") {
            linhaAtual += palavra;
        } else if ((linhaAtual.length + palavra.length + 1) <= caracteresPorLinha) {
            linhaAtual += " " + palavra;
        } else {
            linhas.push(linhaAtual);
            linhaAtual = palavra;
        }
        if (!palavras[index + 1] && linhaAtual) {
            linhas.push(linhaAtual);
        }
    });
    return linhas;
}

const drawLine = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, mm: any) => {
    if (model.opcoes != null && model.opcoes.ocultarLinhas) {
        return;
    }
    ctx.textAlign = TextAlign.LEFT;
    ctx.strokeRect(mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm), 1);
};

const BLACK = "#000000";

const TextAlign = {
    LEFT: "left",
    RIGHT: "right",
    CENTER: "center",
}

export const tabelaNutricional = { drawTable };
