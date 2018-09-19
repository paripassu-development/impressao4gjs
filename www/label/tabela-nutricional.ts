import {
    splitLines,
    strokeAlignedText,
    TextAlign
} from "./../core/util/text-utils";
import {mmPartial} from "./mm";
import {
    fillTemplate,
    getOrDefault
} from "../core/util/param-utils";
import {setInformacoesPadraoZero} from "../core/util/tabela-nutricional-utils";

const BLACK = "#000000";

interface IElementoTabelaNutricionalModelPosicao {
    xMm: number;
    yMm: number;
    rotacao: number;
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
    "carboidratos",
    "proteinas",
    "gordurasTotais",
    "gorduraSaturada",
    "gorduraTrans",
    "fibraAlimentar",
    "sodio",
];

interface IElementoTabelaNutricionalModel {
    tipo: string;
    posicao: IElementoTabelaNutricionalModelPosicao;
    dimensoes: IElementoTabelaNutricionalModelDimensoes;
    fonte: IElementoTabelaNutricionalModelFonte;
    informacoesNutricionais: IElementoTabelaNutricionalModelInformacoesNutricionais;
    informacoesAdicionais: IElementoTabelaNutricionalInformacoesAdicionais;
    opcoes?: IElementoTabelaNutricionalOpcoes;
}

const drawTable = (ctx: CanvasRenderingContext2D, dpi: number, model: IElementoTabelaNutricionalModel, textBindings?: any) => {
    setInformacoesPadraoZero(textBindings);
    const mm = mmPartial(dpi);
    ctx.save();
    let degrees = model.posicao.rotacao || 0;
    ctx.rotate(degrees * Math.PI / 180);
    ctx.fillStyle = BLACK;
    ctx.strokeStyle = BLACK;
    ctx.lineWidth = model.fonte.forcaContorno || 0;
    const larguraMaxima = model.dimensoes.larguraMaximaMm;
    let yMm = model.posicao.yMm;
    const alturaLinhaMm = model.fonte.alturaMm * 1.2;
    const lineStrokeGap = alturaLinhaMm / 3;

    ctx.font = `${model.fonte.negrito ? "bold" : ""} ${mm(model.fonte.alturaMm * 1.5)}px ${model.fonte.nome}`;
    strokeAlignedText(ctx, larguraMaxima, getOrDefault(model.informacoesNutricionais, "textoInformacaoNutricional"), model.posicao.xMm, yMm, mm, TextAlign.CENTER);
    yMm += alturaLinhaMm * 1.1;

    ctx.font = `${model.fonte.negrito ? "bold" : ""} ${mm(model.fonte.alturaMm)}px ${model.fonte.nome}`;

    strokeAlignedText(ctx, larguraMaxima, fillTemplate(model.informacoesNutricionais.textoPorcaoCaseira, textBindings), model.posicao.xMm, yMm, mm, TextAlign.CENTER);

    yMm += lineStrokeGap;
    drawLine(ctx, model, yMm, mm);
    yMm += alturaLinhaMm;

    strokeAlignedText(ctx, larguraMaxima, getOrDefault(model.informacoesNutricionais, "textoQuantidadePorPorcao"), model.posicao.xMm, yMm, mm, TextAlign.LEFT);

    ctx.textAlign = TextAlign.RIGHT;
    ctx.strokeText(getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario"),
        mm(model.posicao.xMm + model.dimensoes.larguraMaximaMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));

    yMm += lineStrokeGap;
    drawLine(ctx, model, yMm, mm);
    if (model.informacoesNutricionais.informacoesNutrientesTabelaNutricional) {
        nutrientes.forEach((nutriente: any) => {
            const informacoesNutriente = model.informacoesNutricionais.informacoesNutrientesTabelaNutricional[nutriente];
            if (informacoesNutriente !== undefined) {
                yMm += alturaLinhaMm;
                ctx.textAlign = TextAlign.LEFT;
                ctx.strokeText(getOrDefault(informacoesNutriente, "nome"),
                    mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));

                if (nutriente === "valorEnergetico") {
                    strokeAlignedText(ctx, larguraMaxima, fillTemplate(model.informacoesNutricionais.textoProporcaoCalorias, textBindings), model.posicao.xMm - (alturaLinhaMm * 3), yMm, mm, TextAlign.RIGHT);
                } else {
                    strokeAlignedText(ctx, larguraMaxima, fillTemplate(informacoesNutriente.qtPorcao, textBindings), model.posicao.xMm - (alturaLinhaMm * 6), yMm, mm, TextAlign.RIGHT);
                }
                strokeAlignedText(ctx, larguraMaxima, fillTemplate(informacoesNutriente.valDiario, textBindings), model.posicao.xMm - alturaLinhaMm / 2, yMm, mm, TextAlign.RIGHT);
                yMm += lineStrokeGap;
                drawLine(ctx, model, yMm, mm);
            }
        });
    }
    else {
        textBindings.parametrosPadroes.forEach((parametro: any) => {
            yMm += alturaLinhaMm;
            ctx.textAlign = TextAlign.LEFT;
            ctx.strokeText(parametro.rotulo, mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
            if (parametro.nome === "Valor Energético") {
                strokeAlignedText(ctx, larguraMaxima, fillTemplate(model.informacoesNutricionais.textoProporcaoCalorias, textBindings), model.posicao.xMm - (alturaLinhaMm * 3), yMm, mm, TextAlign.RIGHT);
            } else {
                strokeAlignedText(ctx, larguraMaxima, fillTemplate(parametro.qtPorcao, textBindings), model.posicao.xMm - (alturaLinhaMm * 6), yMm, mm, TextAlign.RIGHT);
            }
            strokeAlignedText(ctx, larguraMaxima, fillTemplate(parametro.valorDiario, textBindings), model.posicao.xMm - alturaLinhaMm / 2, yMm, mm, TextAlign.RIGHT);
            yMm += lineStrokeGap;
            drawLine(ctx, model, yMm, mm);
        });

        textBindings.parametrosExtras.forEach((parametro: any) => {
            yMm += alturaLinhaMm;
            ctx.textAlign = TextAlign.LEFT;
            ctx.strokeText(parametro.nome, mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
            strokeAlignedText(ctx, larguraMaxima, parametro.qtPorcao, model.posicao.xMm - (alturaLinhaMm * 6), yMm, mm, TextAlign.RIGHT);
            strokeAlignedText(ctx, larguraMaxima, fillTemplate(parametro.valorDiario, textBindings), model.posicao.xMm - alturaLinhaMm / 2, yMm, mm, TextAlign.RIGHT);
            yMm += lineStrokeGap;
            drawLine(ctx, model, yMm, mm);
        });
    }

    yMm += alturaLinhaMm;

    if (!model.informacoesAdicionais.texto) {
        strokeAlignedText(ctx, larguraMaxima, "<informacoesAdicionais.texto>", model.posicao.xMm, yMm, mm, TextAlign.CENTER);
    } else {
        const linhasInformacoesAdicionais = splitLines(model.informacoesAdicionais.texto, model.informacoesAdicionais.caracteresPorLinha);
        linhasInformacoesAdicionais.forEach((linha: string) => {
            strokeAlignedText(ctx, larguraMaxima, linha, model.posicao.xMm, yMm, mm, TextAlign.CENTER);
            yMm += alturaLinhaMm;
        });
    }
    ctx.restore();
};

const drawLine = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, mm: any) => {
    if (model.opcoes != null && model.opcoes.ocultarLinhas) {
        return;
    }
    ctx.textAlign = TextAlign.LEFT;
    ctx.strokeRect(mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm), 1);
};

export const tabelaNutricional = {drawTable};
