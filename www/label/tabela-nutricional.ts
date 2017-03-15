import * as Mustache from "mustache";
import { mmPartial } from "./mm";
import LeftHandSideExpression = ts.LeftHandSideExpression;

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
interface IElementoTabelaNutricionalModelInformacoesNutricionais {
    [key: string]: {nome: string, qtPorcao: string, valDiario: string};
    textoInformacaoNutricional: string;
    textoQuantidadePorPorcao: string;
    textoAbreviadoValorDiario: string;
    textoPorcaoCaseira: string;
    textoProporcaoCalorias: string;
    textoInformacoesAdicionais: string;
}

const nutrientes = [
    valorEnergetico,
    sodio,
    proteinas,
    gordurasTotais,
    gorduraTrans,
    gorduraSaturada,
    fibraAlimentar,
    carboidratos,
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
    ctx.font = `${model.fonte.negrito ? "bold" : ""} ${mm(model.fonte.alturaMm)}px ${model.fonte.nome}`;
    ctx.lineWidth = model.fonte.forcaContorno || 0;
    ctx.textAlign = TextAlign.CENTER;
    let yMm = model.posicao.yMm;
    const alturaLinhaMm = model.fonte.alturaMm;

    ctx.strokeText(model.informacoesNutricionais.textoInformacaoNutricional,
        mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
    yMm += alturaLinhaMm;
    ctx.strokeText(model.informacoesNutricionais.textoPorcaoCaseira,
        mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
    yMm += alturaLinhaMm;
    ctx.textAlign = TextAlign.LEFT;
    ctx.strokeText(model.informacoesNutricionais.textoQuantidadePorPorcao,
        mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
    yMm += alturaLinhaMm;
    ctx.strokeRect(mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm), 1);
    ctx.textAlign = TextAlign.RIGHT;
    ctx.strokeText(model.informacoesNutricionais.textoAbreviadoValorDiario,
        mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
    nutrientes.forEach((nutriente: any) => {
        const informacoesNutriente = model.informacoesNutricionais[nutriente];
        if ( informacoesNutriente !== undefined ) {
            ctx.textAlign = TextAlign.LEFT;
            ctx.strokeText(informacoesNutriente.nome,
                mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
            ctx.textAlign = TextAlign.RIGHT;
            ctx.strokeText(informacoesNutriente.qtPorcao,
                mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm - 20));
            ctx.strokeText(informacoesNutriente.valDiario,
                mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
            yMm += alturaLinhaMm;
            ctx.strokeRect(mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm), 1);
        }
    });
    ctx.restore();
};

const BLACK = "#000000";

const TextAlign = {
    LEFT: "left",
    RIGHT: "right",
    CENTER: "center",
}

export const tabelaNutricional = { drawTable };
