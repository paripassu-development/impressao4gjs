import {fabric} from "fabric";
import {fillTemplate, getOrDefault} from "../core/util/param-utils";
import {setInformacoesPadraoZero} from "../core/util/tabela-nutricional-utils";
import {
    splitLines,
    strokeAlignedText,
    TextAlign,
    writeFabricText,
} from "../core/util/text-utils";
import {PARAMETROS_PADROES_NUTRICIONAL} from "../default";
import {mmPartial} from "./mm";

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
    ocultarZerados: boolean;
    parametrosPadroes: [any];
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

const drawTable = (ctx: CanvasRenderingContext2D, fabricCanvas: fabric.Canvas, dpi: number, model: IElementoTabelaNutricionalModel, textBindings?: any) => {
    setInformacoesPadraoZero(textBindings);
    const mm = mmPartial(dpi);
    ctx.save();
    const degrees = model.posicao.rotacao || 0;
    ctx.rotate(degrees * Math.PI / 180);
    ctx.fillStyle = BLACK;
    ctx.strokeStyle = BLACK;
    ctx.lineWidth = model.fonte.forcaContorno || 0;
    const larguraMaxima = model.dimensoes.larguraMaximaMm;
    let yMm = model.posicao.yMm;
    const alturaLinhaMm = model.fonte.alturaMm * 1.2;
    const lineStrokeGap = alturaLinhaMm / 3;

    ctx.font = `${model.fonte.negrito ? "bold" : ""} ${mm(model.fonte.alturaMm * 1.5)}px ${model.fonte.nome}`;
    strokeAlignedText(ctx, fabricCanvas, larguraMaxima, getOrDefault(model.informacoesNutricionais, "textoInformacaoNutricional"),
        model.posicao.xMm, yMm, mm, TextAlign.CENTER, degrees);
    yMm += alturaLinhaMm * 1.1;

    ctx.font = `${model.fonte.negrito ? "bold" : ""} ${mm(model.fonte.alturaMm)}px ${model.fonte.nome}`;

    strokeAlignedText(ctx, fabricCanvas, larguraMaxima, fillTemplate(model.informacoesNutricionais.textoPorcaoCaseira, textBindings),
        model.posicao.xMm, yMm, mm, TextAlign.CENTER, degrees);

    yMm += lineStrokeGap;
    drawLine(ctx, model, yMm, mm);
    yMm += alturaLinhaMm;

    strokeAlignedText(ctx, fabricCanvas, larguraMaxima, getOrDefault(model.informacoesNutricionais, "textoQuantidadePorPorcao"),
        model.posicao.xMm, yMm, mm, TextAlign.LEFT, degrees);

    ctx.textAlign = TextAlign.RIGHT;
    const textoValorDiario = getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario");
    if (!!fabricCanvas) {
        writeFabricText(fabricCanvas, ctx, textoValorDiario, model.posicao.xMm + model.dimensoes.larguraMaximaMm,
            yMm, larguraMaxima, mm, {degrees});
    } else {
        ctx.strokeText(textoValorDiario,
            mm(model.posicao.xMm + model.dimensoes.larguraMaximaMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
    }

    yMm += lineStrokeGap;
    drawLine(ctx, model, yMm, mm);
    if (model.informacoesNutricionais !== undefined && model.informacoesNutricionais.informacoesNutrientesTabelaNutricional !== undefined) {
        nutrientes.forEach((nutriente: any) => {
            const informacoesNutriente = model.informacoesNutricionais.informacoesNutrientesTabelaNutricional[nutriente];
            if (informacoesNutriente !== undefined) {
                yMm += alturaLinhaMm;
                ctx.textAlign = TextAlign.LEFT;

                const nomeNutriente = getOrDefault(informacoesNutriente, "nome");
                if (!!fabricCanvas) {
                    writeFabricText(fabricCanvas, ctx, nomeNutriente, model.posicao.xMm, yMm, larguraMaxima, mm, {degrees});
                } else {
                    ctx.strokeText(nomeNutriente,
                        mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                }

                if (nutriente === "valorEnergetico") {
                    strokeAlignedText(ctx, fabricCanvas, larguraMaxima, fillTemplate(model.informacoesNutricionais.textoProporcaoCalorias, textBindings),
                        model.posicao.xMm - (alturaLinhaMm * 4.5), yMm, mm, TextAlign.RIGHT, degrees);
                } else {
                    strokeAlignedText(ctx, fabricCanvas, larguraMaxima, fillTemplate(informacoesNutriente.qtPorcao, textBindings),
                        model.posicao.xMm - (alturaLinhaMm * 7), yMm, mm, TextAlign.RIGHT, degrees);
                }
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, fillTemplate(informacoesNutriente.valDiario, textBindings),
                    model.posicao.xMm - alturaLinhaMm / 2, yMm, mm, TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                drawLine(ctx, model, yMm, mm);
            }
        });
    } else {
        const parametrosPadroes = !!textBindings ? textBindings.parametrosPadroes : PARAMETROS_PADROES_NUTRICIONAL;
        parametrosPadroes.forEach((parametro: any) => {
            const matchArray: any[] = parametro.qtPorcao.match(/[0-9]/mg, "");
            if (!model.informacoesNutricionais.ocultarZerados || !matchArray.every((elemento: any) => elemento === "0")) {
                yMm += alturaLinhaMm;
                ctx.textAlign = TextAlign.LEFT;
                if (!!fabricCanvas) {
                    writeFabricText(fabricCanvas, ctx, parametro.rotulo, model.posicao.xMm, yMm, larguraMaxima, mm, {degrees});
                } else {
                    ctx.strokeText(parametro.rotulo, mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                }
                if (parametro.rotulo === "Valor Energético") {
                    strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, model.posicao.xMm - (alturaLinhaMm * 4.5),
                        yMm, mm, TextAlign.RIGHT, degrees);
                } else {
                    strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, model.posicao.xMm - (alturaLinhaMm * 7),
                        yMm, mm, TextAlign.RIGHT, degrees);
                }
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.valorDiario, model.posicao.xMm - alturaLinhaMm / 2,
                    yMm, mm, TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                drawLine(ctx, model, yMm, mm);
            }
        });

        if (!!textBindings) {
            textBindings.parametrosExtras.forEach((parametro: any) => {
                yMm += alturaLinhaMm;
                ctx.textAlign = TextAlign.LEFT;

                if (!!fabricCanvas) {
                    writeFabricText(fabricCanvas, ctx, parametro.rotulo, model.posicao.xMm, yMm, larguraMaxima, mm, {degrees});
                } else {
                    ctx.strokeText(parametro.rotulo, mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                }
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, model.posicao.xMm - (alturaLinhaMm * 7),
                    yMm, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.valorDiario, model.posicao.xMm - alturaLinhaMm / 2,
                    yMm, mm, TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                drawLine(ctx, model, yMm, mm);
            });
            let texto = "* NÃO CONTÉM QUANTIDADES SIGNIFICATIVAS DE ";
            if (model.informacoesNutricionais.ocultarZerados && !possuiAvisoNutricionaisZerados(model.informacoesAdicionais.texto, texto)) {
                const naoVisiveis = textBindings.parametrosPadroes.filter((parametro: any) =>
                    parametro.qtPorcao.match(/[0-9]/mg, "").every((elemento: any) => elemento === "0"),
                );
                if (naoVisiveis.length > 0) {
                    texto = texto.concat(naoVisiveis.map((parametro: any) => {
                        return parametro.rotulo.toUpperCase();
                    }).join(", ")).concat(". ");
                    model.informacoesAdicionais.texto = texto.concat(model.informacoesAdicionais.texto);
                }
            }
        }
    }

    yMm += alturaLinhaMm;

    if (!model.informacoesAdicionais.texto) {
        strokeAlignedText(ctx, fabricCanvas, larguraMaxima, "<informacoesAdicionais.texto>", model.posicao.xMm, yMm, mm, TextAlign.CENTER, degrees);
    } else {
        const linhasInformacoesAdicionais = splitLines(model.informacoesAdicionais.texto, model.informacoesAdicionais.caracteresPorLinha);
        linhasInformacoesAdicionais.forEach((linha: string) => {
            strokeAlignedText(ctx, fabricCanvas, larguraMaxima, linha, model.posicao.xMm, yMm, mm, TextAlign.CENTER, degrees);
            yMm += alturaLinhaMm;
        });
    }
    ctx.restore();
};

const possuiAvisoNutricionaisZerados = (textoInformacoesAdicionais: string, texto: string) => {
    return _.includes(textoInformacoesAdicionais, texto);
};

const drawLine = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, mm: any) => {
    if (model.opcoes != null && model.opcoes.ocultarLinhas) {
        return;
    }
    ctx.textAlign = TextAlign.LEFT;
    ctx.strokeRect(mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm), 1);
};

export const tabelaNutricional = {drawTable};
