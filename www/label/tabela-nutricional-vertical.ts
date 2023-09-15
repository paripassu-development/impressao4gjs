import {fabric} from "fabric";
import {
    calculaTamanhoFonteByAlturaMMEFontePadraoPT,
    converterPTparaMM,
    converterPtParaPX,
} from "../core/util/conversor-utils";
import {fillTemplate, getOrDefault} from "../core/util/param-utils";
import {alimentoProntoParaConsumo, setInformacoesV2PadraoZero} from "../core/util/tabela-nutricional-utils";
import {
    splitLines,
    strokeAlignedText,
    TextAlign,
    writeFabricText,
} from "../core/util/text-utils";
import {
    BLACK,
    ESPACAMENTO_100G_000G_VD,
    ESPACAMENTO_CONTORNO_TABELA_EM_PT,
    EXPESSURA_LINHA_GROSSA_EM_PT,
    PARAMETROS_PADROES_NUTRICIONAL_V2,
    TAMANHO_FONTE_INFORMACOES_ADICIONAIS_EM_PT,
    TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT,
    TAMANHO_FONTE_PADRAO_TITULO_EM_PT,
    TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT, TAMANHO_FONTE_REDUZIDA_TITULO_EM_PT,
    TAMANHO_LINHA_PADRAO_TABELA_VERTICAL_EM_PT,
} from "../default";
import {mmPartial} from "./mm";

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
    qt100: string;
    valDiario: string;
}

interface IInformacoesNutrientesTabelaNutricional {
    [key: string]: IInformacoesNutriente;
}

// TODO: alterar interface para suportar o ** além de *
interface IElementoTabelaNutricionalInformacoesAdicionais {
    texto: string;
    textoAlimentoProntoParaConsumo: string;
    caracteresPorLinha: number;
}

interface IElementoTabelaNutricionalModelInformacoesNutricionais {
    textoInformacaoNutricional: string;
    textoQuantidadePorPorcao: string;
    porcaoNutricionalV2: string;
    textoQuantidadeEmbalagem: string;
    textoPorcaoCaseira: string;
    textoQt100: string;
    textoAbreviadoValorDiario: string;
    textoProporcaoCalorias: string;
    informacoesNutrientesTabelaNutricional: IInformacoesNutrientesTabelaNutricional;
    ocultarZerados: boolean;
    parametrosPadroesNutricionalV2: [any];
}

interface IElementoTabelaNutricionalOpcoes {
    ocultarLinhas?: boolean;
}

const nutrientes = [
    "valorEnergetico",
    "carboidratos",
    "acucaresTotais",
    "acucaresAdicionados",
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
    setInformacoesV2PadraoZero(textBindings);
    const mm = mmPartial(dpi);
    ctx.save();
    const degrees = model.posicao.rotacao || 0;
    ctx.rotate(degrees * Math.PI / 180);
    ctx.fillStyle = BLACK;
    ctx.strokeStyle = BLACK;
    ctx.lineWidth = model.fonte.forcaContorno || 0;
    const larguraMaxima = model.dimensoes.larguraMaximaMm;
    let yMm = model.posicao.yMm;
    // Por que 1.2?
    const alturaLinhaMm = model.fonte.alturaMm * 1.2;
    // 3?
    const lineStrokeGap = alturaLinhaMm / 3;

    // Contorno de cima
    desenharLinhaContornoHorizontal(ctx, model, yMm, mm);
    yMm += lineStrokeGap;
    yMm += alturaLinhaMm;

    // Configurando fonte do Titulo
    ctx.font = `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_PADRAO_TITULO_EM_PT)}mm ${model.fonte.nome}`;

    // Titulo INFORMAÇÕES NUTRICIONAIS ---------------------------------------------------------------------------------
    strokeAlignedText(
        ctx,
        fabricCanvas,
        larguraMaxima,
        getOrDefault(model.informacoesNutricionais, "textoInformacaoNutricional"),
        model.posicao.xMm,
        yMm,
        mm,
        TextAlign.CENTER,
        degrees,
    );

    // Linha normal ----------------------------------------------------------------------------------------------------
    yMm += lineStrokeGap;
    desenharLinha(ctx, model, yMm, mm);
    // TODO Verificar como deixar responsivas as linhas verticais
    desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_CONTORNO_TABELA_EM_PT * 4.5), ESPACAMENTO_100G_000G_VD + 8.1, mm, 4.8);
    desenharLinhaContornoVerticalEsquerda(ctx, model, model.posicao.yMm, 7.8, mm, 4.8);
    yMm += alturaLinhaMm;

    // Configurando fonte de Informações e labels nutricionais
    ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;

    // -----------------------------------------------------------------------------------------------------------------
    // Porções por embalagem:
    strokeAlignedText(
        ctx,
        fabricCanvas,
        larguraMaxima,
        ("Porções por embalagem: " + fillTemplate(model.informacoesNutricionais.textoQuantidadeEmbalagem, textBindings)),
        model.posicao.xMm,
        yMm,
        mm,
        TextAlign.LEFT,
        degrees,
    );

    yMm += lineStrokeGap;
    yMm += alturaLinhaMm;

    // Porção: ()
    strokeAlignedText(
        ctx,
        fabricCanvas,
        larguraMaxima,
        ("Porção: " + fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, textBindings)
            + "(" + fillTemplate(model.informacoesNutricionais.textoPorcaoCaseira, textBindings)) + ")",
        model.posicao.xMm,
        yMm,
        mm,
        TextAlign.LEFT,
        degrees,
    );

    desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - ESPACAMENTO_100G_000G_VD, 7.8, mm, ESPACAMENTO_100G_000G_VD);
    desenharLinhaContornoVerticalDireita(ctx, model, yMm - (alturaLinhaMm * 1.4), ESPACAMENTO_100G_000G_VD + 8.1, mm, ESPACAMENTO_100G_000G_VD + 1.5);
    // Linha grossa ----------------------------------------------------------------------------------------------------
    yMm += lineStrokeGap;
    desenharLinhaGrossa(ctx, model, yMm, mm);
    // Espaço maior pós linha grossa
    yMm += (2 * alturaLinhaMm);
    // yMm += alturaLinhaMm;

    // -----------------------------------------------------------------------------------------------------------------
    // 100 g 000 g e %VD*
    ctx.font = `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;

    ctx.textAlign = TextAlign.RIGHT;
    const textoValorDiario = getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario");
    const porcao = fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, textBindings);
    let porcao100g = getOrDefault(model.informacoesNutricionais, "textoQt100");

    if (alimentoProntoParaConsumo(textBindings)) {
        porcao100g += "**";
    }

    if (!!fabricCanvas) {
        writeFabricText(fabricCanvas, ctx, porcao100g, model.posicao.xMm  - (alturaLinhaMm * 7),
            yMm, larguraMaxima, mm, {degrees});

        writeFabricText(fabricCanvas, ctx, porcao, model.posicao.xMm - (alturaLinhaMm * 3.5),
            yMm, larguraMaxima, mm, {degrees});

        writeFabricText(fabricCanvas, ctx, textoValorDiario, model.posicao.xMm - (alturaLinhaMm / 2),
            yMm, larguraMaxima, mm, {degrees});
    } else {
        strokeAlignedText(ctx, fabricCanvas, larguraMaxima, porcao100g, model.posicao.xMm - (alturaLinhaMm * 7),
            yMm, mm, TextAlign.RIGHT, degrees);
        strokeAlignedText(ctx, fabricCanvas, larguraMaxima, porcao, model.posicao.xMm - (alturaLinhaMm * 3.5),
            yMm, mm, TextAlign.RIGHT, degrees);
        strokeAlignedText(ctx, fabricCanvas, larguraMaxima, textoValorDiario, model.posicao.xMm - (alturaLinhaMm / 2),
            yMm, mm, TextAlign.RIGHT, degrees);
    }

    const inicioLinhaVertical = converterPTparaMM((TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT * 2) + TAMANHO_FONTE_REDUZIDA_TITULO_EM_PT) + (alturaLinhaMm / 1.5);
    const alturaLinhaVertical = converterPTparaMM(TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT) + lineStrokeGap;
    const distanciaEixoXLinhaVertical = converterPTparaMM(TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT);

    desenharLinhaVertical(ctx, model, model.posicao.yMm + 17, (model.posicao.xMm - (alturaLinhaMm * 7)) + distanciaEixoXLinhaVertical, mm, alturaLinhaVertical);
    desenharLinhaVertical(ctx, model, model.posicao.yMm + 17, (model.posicao.xMm - (alturaLinhaMm * 3.5)) + distanciaEixoXLinhaVertical, mm, alturaLinhaVertical);
    desenharLinhaVertical(ctx, model, model.posicao.yMm + 17, (model.posicao.xMm - (alturaLinhaMm / 2)) + distanciaEixoXLinhaVertical, mm, alturaLinhaVertical);
    desenharLinhaContornoVerticalDireita(ctx, model, model.posicao.yMm + inicioLinhaVertical, ESPACAMENTO_100G_000G_VD + 8.1, mm, alturaLinhaVertical);
    desenharLinhaContornoVerticalEsquerda(ctx, model, model.posicao.yMm + inicioLinhaVertical, 7.8, mm, alturaLinhaVertical);

    ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    yMm += lineStrokeGap;
    desenharLinha(ctx, model, yMm, mm);
    // -----------------------------------------------------------------------------------------------------------------

    // Informações nutricionais
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
                    ctx.strokeText(nomeNutriente, mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                }
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, fillTemplate(informacoesNutriente.qt100, textBindings),
                    model.posicao.xMm - (alturaLinhaMm * 7), yMm, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, fillTemplate(informacoesNutriente.qtPorcao, textBindings),
                    model.posicao.xMm - (alturaLinhaMm * 3.5), yMm, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, fillTemplate(informacoesNutriente.valDiario, textBindings),
                    model.posicao.xMm - alturaLinhaMm / 2, yMm, mm, TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                desenharLinhaContornoVerticalDireita(ctx, model, yMm + inicioLinhaVertical, ESPACAMENTO_100G_000G_VD + 8.1, mm, ESPACAMENTO_100G_000G_VD / 1.8);
                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm + inicioLinhaVertical, 7.8, mm, ESPACAMENTO_100G_000G_VD / 1.8);
                desenharLinhaVertical(ctx, model, yMm, model.posicao.xMm - (alturaLinhaMm * 7), mm, (ESPACAMENTO_100G_000G_VD / 2));
                desenharLinhaVertical(ctx, model, yMm, model.posicao.xMm - (alturaLinhaMm * 3.5), mm, (ESPACAMENTO_100G_000G_VD / 2));
                desenharLinhaVertical(ctx, model, yMm, model.posicao.xMm - (alturaLinhaMm / 2), mm, (ESPACAMENTO_100G_000G_VD / 2));
                desenharLinha(ctx, model, yMm, mm);
                // -----------------------------------------------------------------------------------------------------
            }
        });
    } else {
        const parametrosPadroesNutricionalV2 = !!textBindings ? textBindings.parametrosPadroesNutricionalV2 : PARAMETROS_PADROES_NUTRICIONAL_V2;
        parametrosPadroesNutricionalV2.forEach((parametro: any) => {
            const matchArray: any[] = parametro.qtPorcao.match(/[0-9]/mg, "");
            if (!model.informacoesNutricionais.ocultarZerados || !matchArray.every((elemento: any) => elemento === "0")) {
                yMm += alturaLinhaMm;
                ctx.textAlign = TextAlign.LEFT;
                if (!!fabricCanvas) {
                    writeFabricText(fabricCanvas, ctx, parametro.rotulo, model.posicao.xMm, yMm, larguraMaxima, mm, {degrees});
                } else {
                    ctx.strokeText(parametro.rotulo, mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                }
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qt100, model.posicao.xMm - (alturaLinhaMm * 7),
                    yMm, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, model.posicao.xMm - (alturaLinhaMm * 3.5),
                    yMm, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.valorDiario, model.posicao.xMm - alturaLinhaMm / 2,
                    yMm, mm, TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 4), ESPACAMENTO_100G_000G_VD + 8.1, mm, ESPACAMENTO_100G_000G_VD / 1.8);
                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 2), 7.8, mm, ESPACAMENTO_100G_000G_VD / 1.8);
                desenharLinha(ctx, model, yMm, mm);
                // -----------------------------------------------------------------------------------------------------
            }
        });

        // -----------------------------------------------------------------------------------------------------------------

        // Parametros extras
        if (!!textBindings) {
            textBindings.parametrosExtrasNutricionalV2.forEach((parametro: any) => {
                yMm += alturaLinhaMm;
                ctx.textAlign = TextAlign.LEFT;

                if (!!fabricCanvas) {
                    writeFabricText(fabricCanvas, ctx, parametro.rotulo, model.posicao.xMm, yMm, larguraMaxima, mm, {degrees});
                } else {
                    ctx.strokeText(parametro.rotulo, mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                }
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qt100, model.posicao.xMm - (alturaLinhaMm * 7),
                    yMm, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, model.posicao.xMm - (alturaLinhaMm * 3.5),
                    yMm, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.valorDiario, model.posicao.xMm - alturaLinhaMm / 2,
                    yMm, mm, TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 4), ESPACAMENTO_100G_000G_VD + 8.1, mm, ESPACAMENTO_100G_000G_VD / 1.8);
                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 2), 7.8, mm, ESPACAMENTO_100G_000G_VD / 1.8);
                desenharLinha(ctx, model, yMm, mm);
                // -----------------------------------------------------------------------------------------------------
            });
            let texto = "NÃO CONTÉM QUANTIDADES SIGNIFICATIVAS DE ";
            if (model.informacoesNutricionais.ocultarZerados && !possuiAvisoNutricionaisZerados(model.informacoesAdicionais.texto, texto)) {
                const naoVisiveis = textBindings.parametrosPadroesNutricionalV2.filter((parametro: any) =>
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

    // -----------------------------------------------------------------------------------------------------------------
    // Rodapé (informações adicionais)

    ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_INFORMACOES_ADICIONAIS_EM_PT)}mm ${model.fonte.nome}`;

    if (!model.informacoesAdicionais.texto) {
        strokeAlignedText(ctx, fabricCanvas, larguraMaxima, "<informacoesAdicionais.texto>", model.posicao.xMm, yMm, mm, TextAlign.LEFT, degrees);
    } else {
        const linhasInformacoesPercentual = splitLines(model.informacoesAdicionais.texto, model.informacoesAdicionais.caracteresPorLinha);
        linhasInformacoesPercentual.forEach((linha: string) => {
            strokeAlignedText(ctx, fabricCanvas, larguraMaxima, linha, model.posicao.xMm, yMm, mm, TextAlign.LEFT, degrees);
            desenharLinhaContornoVerticalDireita(ctx, model, yMm + 0.2, ESPACAMENTO_100G_000G_VD + 8.1, mm, ESPACAMENTO_100G_000G_VD / 1.8);
            desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 3), 7.8, mm, ESPACAMENTO_100G_000G_VD / 1.8);
            yMm += alturaLinhaMm;
        });

        if (alimentoProntoParaConsumo(textBindings)) {
            const linhasInformacaoAlimentoProntoParaConsumo = splitLines(model.informacoesAdicionais.textoAlimentoProntoParaConsumo, model.informacoesAdicionais.caracteresPorLinha);
            linhasInformacaoAlimentoProntoParaConsumo.forEach((linha: string) => {
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, linha, model.posicao.xMm, yMm, mm, TextAlign.LEFT, degrees);
                yMm += alturaLinhaMm / 2;
            });
        }
    }

    // Contorno de baixo
    desenharLinhaContornoHorizontal(ctx, model, yMm, mm);
    yMm += lineStrokeGap;

    ctx.restore();
};

const possuiAvisoNutricionaisZerados = (textoInformacoesAdicionais: string, texto: string) => {
    return _.includes(textoInformacoesAdicionais, texto);
};

const desenharLinha = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, mm: any) => {
    ctx.textAlign = TextAlign.LEFT;

    // x, y, largura e altura
    ctx.strokeRect(
        mm(model.posicao.xMm),
        mm(yMm),
        mm(model.dimensoes.larguraMaximaMm),
        1,
    );
};

const desenharLinhaGrossa = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, mm: any) => {
    ctx.textAlign = TextAlign.LEFT;
    ctx.lineWidth = converterPtParaPX(EXPESSURA_LINHA_GROSSA_EM_PT);
    // x, y, largura e altura
    ctx.strokeRect(
        mm(model.posicao.xMm),
        mm(yMm),
        mm(model.dimensoes.larguraMaximaMm),
        1,
    );
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};

const desenharLinhaContornoHorizontal = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, mm: any) => {
    const espacoDireitaEEsquerda = 2;
    const espacoMargemInterna = converterPTparaMM(ESPACAMENTO_CONTORNO_TABELA_EM_PT);
    const tamanhoLinhaContornoTotalMM = model.dimensoes.larguraMaximaMm + (espacoDireitaEEsquerda * espacoMargemInterna);

    ctx.textAlign = TextAlign.LEFT;

    // x, y, largura e altura
    ctx.strokeRect(
        mm(model.posicao.xMm - espacoMargemInterna), // Começa antes da linha da tabela
        mm(yMm),
        mm(tamanhoLinhaContornoTotalMM),
        1,
    );
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};

const desenharLinhaContornoVerticalDireita = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, xMm: number, mm: any, alturaLinhaVertical: number) => {
    ctx.textAlign = TextAlign.LEFT;

    // x, y, largura e altura
    ctx.strokeRect(
        mm((xMm + (model.dimensoes.larguraMaximaMm - TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT))),
        mm(yMm) - (model.fonte.alturaMm * TAMANHO_FONTE_REDUZIDA_TITULO_EM_PT),
        1,
        mm(alturaLinhaVertical),
    );
};

const desenharLinhaContornoVerticalEsquerda = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, xMm: number, mm: any, alturaLinhaVertical: number) => {
    ctx.textAlign = TextAlign.LEFT;

    // x, y, largura e altura
    ctx.strokeRect(
        mm(xMm),
        mm(yMm) - (model.fonte.alturaMm - alturaLinhaVertical),
        1,
        mm(alturaLinhaVertical),
    );
};

const desenharLinhaVertical = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, xMm: number, mm: any, alturaLinhaVertical: number) => {
    ctx.textAlign = TextAlign.LEFT;

    // x, y, largura e altura
    ctx.strokeRect(
        mm((xMm + (model.dimensoes.larguraMaximaMm - TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT))),
        mm(yMm) - (model.fonte.alturaMm * TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT),
        1,
        mm(alturaLinhaVertical),
    );
};

export const tabelaNutricionalVertical = {drawTable};
