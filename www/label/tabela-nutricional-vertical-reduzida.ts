import {fabric} from "fabric";
import {
    calculaTamanhoFonteByAlturaMMEFontePadraoPT,
    converterPTparaMM,
    converterPtParaPX
} from "../core/util/conversor-utils";
import {fillTemplate, getOrDefault} from "../core/util/param-utils";
import {setInformacoesV2PadraoZero} from "../core/util/tabela-nutricional-utils";
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
    TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT,
    TAMANHO_FONTE_REDUZIDA_TITULO_EM_PT,
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
    // Altura 3.8mm
    const alturaLinhaMm = model.fonte.alturaMm * 1.46;
    // 3?
    const lineStrokeGap = alturaLinhaMm / 3;

    // Contorno de cima
    desenharLinhaContornoHorizontal(ctx, model, yMm, mm);
    yMm += alturaLinhaMm;

    // Configurando fonte do Titulo
    ctx.font = `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_TITULO_EM_PT)}mm ${model.fonte.nome}`;

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
    desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_CONTORNO_TABELA_EM_PT * 6.2), ESPACAMENTO_100G_000G_VD, mm, 4.8);
    desenharLinhaContornoVerticalEsquerda(ctx, model, model.posicao.yMm, model.posicao.xMm, mm, 4.8);
    yMm += alturaLinhaMm / 1.5;

    // Configurando fonte de Informações e labels nutricionais
    ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;

    // -----------------------------------------------------------------------------------------------------------------
    const informacoesNutricionaisTextoPorcao = [
        {
            id: "Porções por embalagem: ",
            value: model.informacoesNutricionais.textoQuantidadeEmbalagem,
            caseira: null,
        },
        {
            id: "Porção: ",
            value: model.informacoesNutricionais.textoQuantidadePorPorcao,
            caseira: model.informacoesNutricionais.textoPorcaoCaseira,
        },
    ].map((infos) => {
        strokeAlignedText(
            ctx,
            fabricCanvas,
            larguraMaxima,
            infos.id === "Porção: " ?
             (infos.id + fillTemplate(infos.value, textBindings)
                 + "(" + fillTemplate(infos.caseira, textBindings)) + ")"
            : (infos.id + fillTemplate(infos.value, textBindings)),
            model.posicao.xMm + ESPACAMENTO_CONTORNO_TABELA_EM_PT,
            yMm,
            mm,
            TextAlign.LEFT,
            degrees,
        );
        yMm += alturaLinhaMm / 1.5;
        // TODO Verificar como deixar responsivas as linhas verticais
        desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - ESPACAMENTO_100G_000G_VD, model.posicao.xMm, mm, ESPACAMENTO_100G_000G_VD);
    });

    desenharLinhaContornoVerticalDireita(ctx, model, yMm - (alturaLinhaMm * 1.6), ESPACAMENTO_100G_000G_VD, mm, ESPACAMENTO_100G_000G_VD + 1.6);

    // Linha grossa ----------------------------------------------------------------------------------------------------
    desenharLinhaGrossa(ctx, model, yMm, mm);
    yMm += alturaLinhaMm / 1.2;

    // -----------------------------------------------------------------------------------------------------------------
    // 100 g 000 g e %VD*
    ctx.font = `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;

    // TODO: deixar na formatação correta, fazer calculo para dar certo
    ctx.textAlign = TextAlign.RIGHT;
    const textoCabecalhoMedidas = [
        {
            // @ts-ignore
            id: null,
            value: getOrDefault(model.informacoesNutricionais, "textoQt100"),
            xMm: model.posicao.xMm  - (alturaLinhaMm * 5.5),
        },
        {
            id: null,
            value: fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, textBindings),
            xMm: model.posicao.xMm - (alturaLinhaMm * 3.5),
        },
        {
            id: null,
            value: getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario"),
            xMm: model.posicao.xMm - (alturaLinhaMm * 1.2),
        },
    ];

    textoCabecalhoMedidas.map((medida) => {
        // TODO Verificar como deixar responsivas as linhas verticais
        const inicioLinhaVertical = converterPTparaMM((TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT * 2));
        const alturaLinhaVertical = converterPTparaMM(TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT) + alturaLinhaMm / 1.5;
        const distanciaEixoXLinhaVertical = converterPTparaMM(TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT);
        if (!!fabricCanvas) {
            writeFabricText(fabricCanvas, ctx, medida.value, medida.xMm, yMm, larguraMaxima, mm, {degrees});
        } else {
            strokeAlignedText(ctx, fabricCanvas, larguraMaxima, medida.value, medida.xMm, yMm, mm, TextAlign.RIGHT, degrees);
        }
        desenharLinhaVertical(ctx, model, model.posicao.yMm + ESPACAMENTO_100G_000G_VD * 2.5, medida.xMm - 1, mm, alturaLinhaVertical - 1);
        desenharLinhaContornoVerticalDireita(ctx, model, model.posicao.yMm + ESPACAMENTO_100G_000G_VD * 2.4, ESPACAMENTO_100G_000G_VD, mm, alturaLinhaVertical - 0.2);
        desenharLinhaContornoVerticalEsquerda(ctx, model, model.posicao.yMm + ESPACAMENTO_100G_000G_VD * 2.1, model.posicao.xMm, mm, alturaLinhaVertical - 0.2);
    });
    ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    yMm += lineStrokeGap;
    desenharLinha(ctx, model, yMm, mm);
    // -----------------------------------------------------------------------------------------------------------------

    // Informações nutricionais
    if (model.informacoesNutricionais !== undefined && model.informacoesNutricionais.informacoesNutrientesTabelaNutricional !== undefined) {
        nutrientes.forEach((nutriente: any) => {
            textoCabecalhoMedidas.map((obj: any) => {
                // TODO Verificar como deixar responsivas as linhas verticais
                const inicioLinhaVertical = converterPTparaMM((TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT * 3) + TAMANHO_FONTE_REDUZIDA_TITULO_EM_PT) + (alturaLinhaMm / 1.5) + lineStrokeGap;
                const alturaLinhaVertical = converterPTparaMM(TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT) + lineStrokeGap;
                const distanciaEixoXLinhaVertical = converterPTparaMM(TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT);
                obj.id = model.informacoesNutricionais.informacoesNutrientesTabelaNutricional[nutriente];
                if (obj.id !== undefined) {
                        yMm += alturaLinhaMm / 1.7;
                        ctx.textAlign = TextAlign.LEFT;

                        const nomeNutriente = getOrDefault(obj.id, "nome");
                        if (!!fabricCanvas) {
                            writeFabricText(fabricCanvas, ctx, nomeNutriente, obj.xMm, yMm, larguraMaxima, mm, {degrees});
                        } else {
                            ctx.strokeText(nomeNutriente, mm(obj.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                        }
                        strokeAlignedText(ctx, fabricCanvas, larguraMaxima, fillTemplate(obj.id, textBindings),
                            obj.xMm, yMm, mm, TextAlign.RIGHT, degrees);
                        yMm += lineStrokeGap;
                        desenharLinhaVertical(ctx, model, yMm - 2, obj.xMm - 1, mm, alturaLinhaVertical);
                        desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 3.6), ESPACAMENTO_100G_000G_VD, mm, ESPACAMENTO_100G_000G_VD / 1.8);
                        desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 1.8), model.posicao.xMm, mm, ESPACAMENTO_100G_000G_VD / 1.8);
                        desenharLinha(ctx, model, yMm, mm);
                        // -----------------------------------------------------------------------------------------------------
                }
            });
        });
    } else {
        const parametrosPadroesNutricionalV2 = !!textBindings ? textBindings.parametrosPadroesNutricionalV2 : PARAMETROS_PADROES_NUTRICIONAL_V2;
        parametrosPadroesNutricionalV2.forEach((parametro: any) => {
                // TODO Verificar como deixar responsivas as linhas verticais
                const alturaLinhaVertical = converterPTparaMM(TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT) + lineStrokeGap;
                const distanciaEixoXLinhaVertical = converterPTparaMM(TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT);
                const matchArray: any[] = parametro.qtPorcao.match(/[0-9]/mg, "");
                if (!model.informacoesNutricionais.ocultarZerados || !matchArray.every((elemento: any) => elemento === "0")) {
                    yMm += alturaLinhaMm / 1.7;
                    ctx.textAlign = TextAlign.LEFT;
                    if (!!fabricCanvas) {
                        writeFabricText(fabricCanvas, ctx, parametro.rotulo, model.posicao.xMm, yMm, larguraMaxima, mm, {degrees});
                    } else {
                        ctx.strokeText(parametro.rotulo, mm(model.posicao.xMm + ESPACAMENTO_CONTORNO_TABELA_EM_PT), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                    }
                    strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qt100, model.posicao.xMm - (alturaLinhaMm * 5.5),
                        yMm, mm, TextAlign.RIGHT, degrees);
                    strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, model.posicao.xMm - (alturaLinhaMm * 3.5),
                        yMm, mm, TextAlign.RIGHT, degrees);
                    strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.valorDiario, model.posicao.xMm - (alturaLinhaMm * 1.2),
                        yMm, mm, TextAlign.RIGHT, degrees);
                    yMm += lineStrokeGap;
                    textoCabecalhoMedidas.map((obj: any) => {
                        desenharLinhaVertical(ctx, model, yMm - 2, obj.xMm - 1, mm, alturaLinhaVertical);
                        desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 3.6), ESPACAMENTO_100G_000G_VD, mm, ESPACAMENTO_100G_000G_VD / 1.8);
                        desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 1.8), model.posicao.xMm, mm, ESPACAMENTO_100G_000G_VD / 1.8);
                        desenharLinha(ctx, model, yMm, mm);
                    });

                    // -----------------------------------------------------------------------------------------------------
                }
        });

        // -----------------------------------------------------------------------------------------------------------------

        // Parametros extras
        if (!!textBindings) {
            textBindings.parametrosExtrasNutricionalV2.forEach((parametro: any) => {
                // TODO Verificar como deixar responsivas as linhas verticais
                yMm += alturaLinhaMm / 1.7;
                ctx.textAlign = TextAlign.LEFT;

                if (!!fabricCanvas) {
                    writeFabricText(fabricCanvas, ctx, parametro.rotulo, model.posicao.xMm, yMm, larguraMaxima, mm, {degrees});
                } else {
                    ctx.strokeText(parametro.rotulo, mm(model.posicao.xMm + ESPACAMENTO_CONTORNO_TABELA_EM_PT), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                }
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qt100, model.posicao.xMm - (alturaLinhaMm * 5.5),
                    yMm, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, model.posicao.xMm - (alturaLinhaMm * 3.5),
                    yMm, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.valorDiario, model.posicao.xMm - (alturaLinhaMm * 1.2),
                    yMm, mm, TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                textoCabecalhoMedidas.map((obj: any) => {
                    desenharLinhaVertical(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 3), obj.xMm - 1, mm, (ESPACAMENTO_100G_000G_VD / 1.8));
                    desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 3.6), ESPACAMENTO_100G_000G_VD, mm, ESPACAMENTO_100G_000G_VD / 1.8);
                    desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 1.8), model.posicao.xMm, mm, ESPACAMENTO_100G_000G_VD / 1.8);
                });
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

    yMm += alturaLinhaMm / 2;

    // -----------------------------------------------------------------------------------------------------------------
    // Rodapé (informações adicionais)

    ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_INFORMACOES_ADICIONAIS_EM_PT)}mm ${model.fonte.nome}`;

    const informacoesAdicionais = [
        {
           id: "linhasInformacoesPercentual",
           value: splitLines(model.informacoesAdicionais.texto, model.informacoesAdicionais.caracteresPorLinha)
        },
        {
            id: "linhasInformacaoAlimentoProntoParaConsumo",
            value: splitLines(model.informacoesAdicionais.textoAlimentoProntoParaConsumo, model.informacoesAdicionais.caracteresPorLinha)
        },
    ].map((info) => {
        info.value.forEach((item) => {
            strokeAlignedText(ctx, fabricCanvas, larguraMaxima, item, model.posicao.xMm  + ESPACAMENTO_CONTORNO_TABELA_EM_PT, yMm, mm, TextAlign.LEFT, degrees);
            desenharLinhaContornoVerticalDireita(ctx, model, yMm + 0.7, ESPACAMENTO_100G_000G_VD, mm, ESPACAMENTO_100G_000G_VD / 1.7);
            desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 1.8, model.posicao.xMm, mm, ESPACAMENTO_100G_000G_VD / 1.7);
            yMm += alturaLinhaMm / 2;
        });
    });
    // if (!model.informacoesAdicionais.texto) {
    //     strokeAlignedText(ctx, fabricCanvas, larguraMaxima, "<informacoesAdicionais.texto>", model.posicao.xMm, yMm, mm, TextAlign.LEFT, degrees);
    // } else {
    //     const linhasInformacoesPercentual = splitLines(model.informacoesAdicionais.texto, model.informacoesAdicionais.caracteresPorLinha);
    //     linhasInformacoesPercentual.forEach((linha: string) => {
    //         strokeAlignedText(ctx, fabricCanvas, larguraMaxima, linha, model.posicao.xMm, yMm, mm, TextAlign.LEFT, degrees);
    //         yMm += alturaLinhaMm;
    //     });
    //     // TODO: Adicionar Validação para quando mostrar ou não
    //     const linhasInformacaoAlimentoProntoParaConsumo = splitLines(model.informacoesAdicionais.textoAlimentoProntoParaConsumo, model.informacoesAdicionais.caracteresPorLinha);
    //     linhasInformacaoAlimentoProntoParaConsumo.forEach((linha: string) => {
    //         strokeAlignedText(ctx, fabricCanvas, larguraMaxima, linha, model.posicao.xMm, yMm, mm, TextAlign.LEFT, degrees);
    //         yMm += alturaLinhaMm / 2;
    //     });
    // }

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
        mm(model.posicao.xMm + 0.3),
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
        mm(model.posicao.xMm),
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

export const tabelaNutricionalVerticalReduzida = {drawTable};
