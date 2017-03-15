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
interface IElementoTabelaNutricionalModelInformacoesNutricionais {
    textoInformacaoNutricional: string;
    textoQuantidadePorPorcao: string;
    textoAbreviadoValorDiario: string;
    textoPorcaoCaseira: string;
    textoProporcaoCalorias: string;
    textoInformacoesAdicionais: string;
    informacoesNutrientesTabelaNutricional: IInformacoesNutrientesTabelaNutricional;
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
}

const drawTable = (ctx: CanvasRenderingContext2D, dpi: number, model: IElementoTabelaNutricionalModel) => {
    const mm = mmPartial(dpi);
    ctx.save();
    ctx.fillStyle = BLACK;
    ctx.strokeStyle = BLACK;
    ctx.lineWidth = model.fonte.forcaContorno || 0;
    let yMm = model.posicao.yMm;
    const posicaoCentralizada = model.dimensoes.larguraMaximaMm / 2;
    const alturaLinhaMm = model.fonte.alturaMm * 1.2;
    const lineStrokeGap = alturaLinhaMm / 3;

    ctx.font = `${model.fonte.negrito ? "bold" : ""} ${mm(model.fonte.alturaMm * 1.5)}px ${model.fonte.nome}`;

    ctx.textAlign = TextAlign.CENTER;
    ctx.strokeText(model.informacoesNutricionais.textoInformacaoNutricional,
        mm(model.posicao.xMm + posicaoCentralizada), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
    yMm += alturaLinhaMm * 1.1;

    ctx.font = `${model.fonte.negrito ? "bold" : ""} ${mm(model.fonte.alturaMm)}px ${model.fonte.nome}`;

    ctx.strokeText(model.informacoesNutricionais.textoPorcaoCaseira,
        mm(model.posicao.xMm + posicaoCentralizada), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
    yMm += lineStrokeGap;
    drawLine(ctx, model, yMm, mm);
    yMm += alturaLinhaMm;
    ctx.textAlign = TextAlign.LEFT;
    ctx.strokeText(model.informacoesNutricionais.textoQuantidadePorPorcao,
        mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
    ctx.textAlign = TextAlign.RIGHT;
    ctx.strokeText(model.informacoesNutricionais.textoAbreviadoValorDiario,
        mm(model.dimensoes.larguraMaximaMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
    yMm += lineStrokeGap;
    drawLine(ctx, model, yMm, mm);
    nutrientes.forEach((nutriente: any) => {
        const informacoesNutriente = model.informacoesNutricionais.informacoesNutrientesTabelaNutricional[nutriente];
        if ( informacoesNutriente !== undefined ) {
            yMm += alturaLinhaMm;
            ctx.textAlign = TextAlign.LEFT;
            ctx.strokeText(informacoesNutriente.nome,
                mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
            ctx.textAlign = TextAlign.RIGHT;
            if (nutriente === "valorEnergetico") {
                ctx.strokeText(model.informacoesNutricionais.textoProporcaoCalorias,
                    mm(model.dimensoes.larguraMaximaMm - (alturaLinhaMm * 3.2)), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
            }else{
                ctx.strokeText(informacoesNutriente.qtPorcao,
                    mm(model.dimensoes.larguraMaximaMm - (alturaLinhaMm * 6)), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
            }
            ctx.strokeText(informacoesNutriente.valDiario,
                mm(model.dimensoes.larguraMaximaMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
            yMm += lineStrokeGap;
            drawLine(ctx, model, yMm, mm);
        }
    });
    ctx.restore();
};

const drawLine = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, mm: any) => {
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
