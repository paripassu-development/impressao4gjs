import {fabric} from "fabric";
import {
    calculaTamanhoFonteByAlturaMMEFontePadraoPT,
    converterPTparaMM,
    converterPtParaPX,
} from "../core/util/conversor-utils";
import {fillTemplate, getOrDefault} from "../core/util/param-utils";
import {
    alimentoProntoParaConsumo,
    calcularPosicaoCentralizadaTabelaNutricional,
    calcularPosicaoCentralizadaTextoQuantidadePorcao,
    extraiNutrientesVazios,
    setInformacoesV2PadraoZero, nutrienteZerado,
} from "../core/util/tabela-nutricional-utils";
import {
    adicionarEspacoEntreNumeroELetra,
    splitLines,
    strokeAlignedText,
    TextAlign,
    writeFabricText,
} from "../core/util/text-utils";
import {
    BLACK,
    ESPACAMENTO_100G_000G_VD,
    ESPACAMENTO_CONTORNO_TABELA_EM_PT, ESPESSURA_LINHA_CONTORNO_EM_PT,
    ESPESSURA_LINHA_GROSSA_EM_PT,
    ESPESSURA_LINHA_PADRAO_EM_PT,
    ESPESSURA_ULTIMA_LINHA_NUTRIENTES_EM_PT,
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

    // TODO remover os console log depois
    console.clear();
    console.log("Model da tabela reduzia: ", model);

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
    const posicaoX100g = model.posicao.xMm  - (alturaLinhaMm * 5.5);
    const posicaoX000g = model.posicao.xMm  - (alturaLinhaMm * 3);
    const posicaoXValorDiario = model.posicao.xMm - (alturaLinhaMm / 2.5);
    const valorEspacamentoYMmRotulos = 0.28; // Alterar esse valor para alinhamento vertical dos rotulos nutricionais
    const valorEspacamentoYMmValores = 0.43; // Alterar esse valor para alinhamento vertical dos valores nutricionais
    let nutrientesZerados: any[] = [];

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
    desenharLinha(ctx, model, yMm, mm, ESPESSURA_LINHA_PADRAO_EM_PT);
    // TODO Verificar como deixar responsivas as linhas verticais
    desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_CONTORNO_TABELA_EM_PT * 4), model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 4);
    desenharLinhaContornoVerticalEsquerda(ctx, model, model.posicao.yMm, model.posicao.xMm - 0.2, mm, 4);
    yMm += alturaLinhaMm / 1.5;

    // Configurando fonte de Informações e labels nutricionais
    ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;

    // -----------------------------------------------------------------------------------------------------------------
    const informacoesNutricionaisTextoPorcao = [
        {
            id: 0,
            titulo: "Porções por embalagem: ",
            value: model.informacoesNutricionais.textoQuantidadeEmbalagem,
            caseira: null,
        },
        {
            id: 1,
            titulo: "Porção: ",
            value: model.informacoesNutricionais.textoQuantidadePorPorcao,
            caseira: model.informacoesNutricionais.textoPorcaoCaseira,
        },
    ].map((infos) => {
        const textoPorcao = fillTemplate(infos.value, textBindings);
        strokeAlignedText(
            ctx,
            fabricCanvas,
            larguraMaxima,
            infos.id === 1 ?
                (infos.titulo + adicionarEspacoEntreNumeroELetra(textoPorcao)
                    + " " + "(" + fillTemplate(infos.caseira, textBindings)) + ")"
                : (infos.titulo + adicionarEspacoEntreNumeroELetra(textoPorcao)),
            model.posicao.xMm + ESPACAMENTO_CONTORNO_TABELA_EM_PT,
            infos.id === 0 ? yMm + 0.4 // ternário para espaçamento entre porcao p embalagem e porcao: 15 g (2 xícaras)
            : yMm + 0.9,
            mm,
            TextAlign.LEFT,
            degrees,
        );
        yMm += alturaLinhaMm / 1.5;
        // TODO Verificar como deixar responsivas as linhas verticais
        desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 4, model.posicao.xMm - 0.2, mm, 4);
    });

    desenharLinhaContornoVerticalDireita(ctx, model, yMm - (alturaLinhaMm * 1.6), model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, ESPACAMENTO_100G_000G_VD + 0.5);

    // Linha grossa ----------------------------------------------------------------------------------------------------
    desenharLinha(ctx, model, yMm, mm, ESPESSURA_LINHA_GROSSA_EM_PT);
    yMm += alturaLinhaMm / 1.2;

    // -----------------------------------------------------------------------------------------------------------------
    // 100 g 000 g e %VD*
    ctx.font = `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;

    let porcao100g = getOrDefault(model.informacoesNutricionais, "textoQt100");
    if (alimentoProntoParaConsumo(textBindings)) {
        porcao100g += "**";
    }
    ctx.textAlign = TextAlign.RIGHT;
    const textoCabecalhoMedidas = [
        {
            // @ts-ignore
            id: 1,
            value: porcao100g,
            xMm: posicaoX100g,
        },
        {
            id: 2,
            value: adicionarEspacoEntreNumeroELetra(fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, textBindings)),
            xMm: posicaoX000g,
        },
        {
            id: 3,
            value: getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario"),
            xMm: posicaoXValorDiario,
        },
    ];

    textoCabecalhoMedidas.map((medida) => {
        // TODO Verificar como deixar responsivas as linhas verticais
        // Ternario utilizado para centralizar o cabeçalho das colunas
        const alturaLinhaVertical = converterPTparaMM(TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT) + alturaLinhaMm / 1.5;
        if (!!fabricCanvas) {
            writeFabricText(fabricCanvas, ctx, medida.value, medida.xMm, yMm, larguraMaxima, mm, {degrees});
        } else {
            strokeAlignedText(
                ctx,
                fabricCanvas,
                medida.id === 2
                    ? calcularPosicaoCentralizadaTextoQuantidadePorcao("v2Reduzida", larguraMaxima, medida.value) // 15 g
                    : medida.value === porcao100g.replace("**", "")
                        ? larguraMaxima - 0.1 // 100 g
                        : medida.id === 3
                            ? larguraMaxima + 0.68 // %VD
                            : larguraMaxima + 0.68, // 100 g**
                adicionarEspacoEntreNumeroELetra(medida.value),
                medida.xMm,
                yMm + 0.3,
                mm,
                TextAlign.RIGHT,
                degrees);
        }
        desenharLinhaVertical(ctx, model, model.posicao.yMm + ESPACAMENTO_100G_000G_VD * 2, medida.value === porcao100g ? medida.xMm - 1.5 : medida.xMm, mm, alturaLinhaVertical - 1);
        desenharLinhaContornoVerticalDireita(ctx, model, model.posicao.yMm + ESPACAMENTO_100G_000G_VD * 1.9, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, alturaLinhaVertical - 0.5);
        desenharLinhaContornoVerticalEsquerda(ctx, model, model.posicao.yMm + ESPACAMENTO_100G_000G_VD * 1.7, model.posicao.xMm - 0.2, mm, alturaLinhaVertical - 1);
    });
    ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    yMm += lineStrokeGap;
    desenharLinha(ctx, model, yMm, mm, ESPESSURA_LINHA_PADRAO_EM_PT);
    // -----------------------------------------------------------------------------------------------------------------

    // Informações nutricionais
    if (model.informacoesNutricionais !== undefined && model.informacoesNutricionais.informacoesNutrientesTabelaNutricional !== undefined) {
        nutrientes.forEach((nutriente: any) => {
            textoCabecalhoMedidas.map((obj: any) => {
                // TODO Verificar como deixar responsivas as linhas verticais
                const alturaLinhaVertical = converterPTparaMM(TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT) + lineStrokeGap;
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
                        desenharLinhaVertical(ctx, model, yMm - 1.5, obj.value === porcao100g ? obj.xMm - 1.5 : obj.xMm, mm, alturaLinhaVertical - 0.4);
                        desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 3.6), model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, ESPACAMENTO_100G_000G_VD / 2.2);
                        desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 1.8), model.posicao.xMm - 0.2, mm, ESPACAMENTO_100G_000G_VD / 1.8);
                        desenharLinha(ctx, model, yMm, mm, ESPESSURA_LINHA_PADRAO_EM_PT);
                        // -----------------------------------------------------------------------------------------------------
                }
            });
        });
    } else {
        const parametrosPadroesNutricionalV2 = !!textBindings ? textBindings.parametrosPadroesNutricionalV2 : PARAMETROS_PADROES_NUTRICIONAL_V2;
        parametrosPadroesNutricionalV2.forEach((nutriente: any) => {
                // TODO Verificar como deixar responsivas as linhas verticais
                const alturaLinhaVertical = converterPTparaMM(TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT) + lineStrokeGap;
                const matchArray: any[] = nutriente.qtPorcao ? nutriente.qtPorcao.match(/[0-9]/mg, "") : "";
                if (!model.informacoesNutricionais.ocultarZerados || (matchArray && !matchArray.every((elemento: any) => elemento === "0" || !elemento))) {
                    yMm += alturaLinhaMm / 1.7;
                    const yMmValores = yMm + valorEspacamentoYMmValores;
                    const yMmTextoRotulo = yMm + valorEspacamentoYMmRotulos;
                    ctx.textAlign = TextAlign.LEFT;
                    if (!!fabricCanvas) {
                        writeFabricText(fabricCanvas, ctx, nutriente.rotulo, model.posicao.xMm, yMm, larguraMaxima, mm, {degrees});
                    } else {
                        ctx.strokeText(nutriente.rotulo, mm(model.posicao.xMm + ESPACAMENTO_CONTORNO_TABELA_EM_PT), mm(yMmTextoRotulo), mm(model.dimensoes.larguraMaximaMm));
                    }
                    strokeAlignedText(ctx, fabricCanvas, larguraMaxima, nutriente.qt100, calcularPosicaoCentralizadaTabelaNutricional("v2Reduzida", "qt100", posicaoX100g, nutriente.qt100),
                        yMmValores, mm, TextAlign.RIGHT, degrees);
                    strokeAlignedText(ctx, fabricCanvas, larguraMaxima, nutriente.qtPorcao, calcularPosicaoCentralizadaTabelaNutricional("v2Reduzida", "qtPorcao", posicaoX000g, nutriente.qtPorcao),
                        yMmValores, mm, TextAlign.RIGHT, degrees);
                    strokeAlignedText(ctx, fabricCanvas, larguraMaxima, nutriente.valorDiario, calcularPosicaoCentralizadaTabelaNutricional("v2Reduzida", "valorDiario", posicaoXValorDiario, nutriente.valorDiario),
                        yMmValores, mm, TextAlign.RIGHT, degrees);
                    yMm += lineStrokeGap;
                    textoCabecalhoMedidas.map((obj: any) => {
                        desenharLinhaVertical(ctx, model, yMm - 1.5, obj.value === porcao100g ? obj.xMm - 1.5 : obj.xMm, mm, alturaLinhaVertical - 0.4);
                        desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 3.6), model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, ESPACAMENTO_100G_000G_VD / 2.2);
                        desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 1.8), model.posicao.xMm - 0.2, mm, 2.7);
                        desenharLinha(ctx, model, yMm, mm, ESPESSURA_LINHA_PADRAO_EM_PT);
                    });

                    // -----------------------------------------------------------------------------------------------------
                }
        });

        // TODO: continuar aqui, fazer as linhas, separar em um método
        if (model.informacoesNutricionais.ocultarZerados) {
            nutrientesZerados = extraiNutrientesVazios(parametrosPadroesNutricionalV2);
            // TODO: remover o console log depois
            console.log(nutrientesZerados);
        }
        // -----------------------------------------------------------------------------------------------------------------

        // Parametros extras
        if (!!textBindings) {
            textBindings.parametrosExtrasNutricionalV2.forEach((parametro: any) => {
                yMm += alturaLinhaMm / 1.7;
                const yMmValores = yMm + valorEspacamentoYMmValores;
                const yMmTextoRotulo = yMm + valorEspacamentoYMmRotulos;
                ctx.textAlign = TextAlign.LEFT;

                if (!!fabricCanvas) {
                    writeFabricText(fabricCanvas, ctx, parametro.rotulo, model.posicao.xMm, yMm, larguraMaxima, mm, {degrees});
                } else {
                    ctx.strokeText(parametro.rotulo, mm(model.posicao.xMm + ESPACAMENTO_CONTORNO_TABELA_EM_PT), mm(yMmTextoRotulo), mm(model.dimensoes.larguraMaximaMm));
                }
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qt100, calcularPosicaoCentralizadaTabelaNutricional("v2Reduzida", "qt100", posicaoX100g, parametro.qt100),
                    yMmValores, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, calcularPosicaoCentralizadaTabelaNutricional("v2Reduzida", "qtPorcao", posicaoX000g, parametro.qtPorcao),
                    yMmValores, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.valorDiario, calcularPosicaoCentralizadaTabelaNutricional("v2Reduzida", "valorDiario", posicaoXValorDiario, parametro.valorDiario),
                    yMmValores, mm, TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                textoCabecalhoMedidas.map((obj: any) => {
                    desenharLinhaVertical(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 3), obj.value === porcao100g ? obj.xMm - 1.5 : obj.xMm, mm, (ESPACAMENTO_100G_000G_VD / 1.7));
                    desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 3.6), model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, ESPACAMENTO_100G_000G_VD / 1.6);
                    desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 1.8), model.posicao.xMm - 0.2, mm, ESPACAMENTO_100G_000G_VD / 1.8);
                    desenharLinha(ctx, model, yMm, mm, ESPESSURA_LINHA_PADRAO_EM_PT);
                    // -----------------------------------------------------------------------------------------------------
                });
               });
            desenharLinha(ctx, model, yMm, mm, ESPESSURA_ULTIMA_LINHA_NUTRIENTES_EM_PT);
            let texto = "";
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
           value: splitLines(model.informacoesAdicionais.texto, model.informacoesAdicionais.caracteresPorLinha),
        },
        {
            id: "linhasInformacaoAlimentoProntoParaConsumo",
            value: splitLines(model.informacoesAdicionais.textoAlimentoProntoParaConsumo, model.informacoesAdicionais.caracteresPorLinha),
        },
    ].map((info) => {
        if (!alimentoProntoParaConsumo(textBindings) && info.id === "linhasInformacaoAlimentoProntoParaConsumo") {
            return;
        }
        info.value.forEach((item) => {
            yMm += lineStrokeGap;
            strokeAlignedText(ctx, fabricCanvas, larguraMaxima, item, model.posicao.xMm  + ESPACAMENTO_CONTORNO_TABELA_EM_PT, yMm, mm, TextAlign.LEFT, degrees);
            desenharLinhaContornoVerticalDireita(ctx, model, yMm - 0.5, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, ESPACAMENTO_100G_000G_VD / 1.5);
            desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 3.1, model.posicao.xMm - 0.2, mm, ESPACAMENTO_100G_000G_VD / 1.4);
            yMm += alturaLinhaMm / 2;
        });
    });

    // Contorno de baixo
    desenharLinhaContornoHorizontal(ctx, model, yMm, mm);
    yMm += lineStrokeGap;

    ctx.restore();
};

const possuiAvisoNutricionaisZerados = (textoInformacoesAdicionais: string, texto: string) => {
    return _.includes(textoInformacoesAdicionais, texto);
};

const desenharLinha = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, mm: any, espessuraLinha: number) => {
    ctx.textAlign = TextAlign.LEFT;
    ctx.lineWidth = converterPtParaPX(espessuraLinha);
    // x, y, largura e altura
    ctx.strokeRect(
        mm(model.posicao.xMm + 0.45), // posiciona linha horizontal eixo x
        mm(yMm),
        mm(model.dimensoes.larguraMaximaMm - 0.8), // define tamanho linha horizontal para não encostar nas bordas
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
    ctx.lineWidth = converterPtParaPX(ESPESSURA_LINHA_CONTORNO_EM_PT);

    // x, y, largura e altura
    ctx.strokeRect(
        mm((xMm + (model.dimensoes.larguraMaximaMm - TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT))),
        mm(yMm) - (model.fonte.alturaMm * TAMANHO_FONTE_REDUZIDA_TITULO_EM_PT),
        1,
        mm(alturaLinhaVertical),
    );
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};

const desenharLinhaContornoVerticalEsquerda = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, xMm: number, mm: any, alturaLinhaVertical: number) => {
    ctx.textAlign = TextAlign.LEFT;
    ctx.lineWidth = converterPtParaPX(ESPESSURA_LINHA_CONTORNO_EM_PT);

    // x, y, largura e altura
    ctx.strokeRect(
        mm(xMm),
        mm(yMm) - (model.fonte.alturaMm - alturaLinhaVertical),
        1,
        mm(alturaLinhaVertical),
    );
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};

const desenharLinhaVertical = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, xMm: number, mm: any, alturaLinhaVertical: number) => {
    ctx.textAlign = TextAlign.LEFT;
    ctx.lineWidth = converterPtParaPX(ESPESSURA_LINHA_CONTORNO_EM_PT);

    // x, y, largura e altura
    ctx.strokeRect(
        mm((xMm + (model.dimensoes.larguraMaximaMm - TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT))),
        mm(yMm) - (model.fonte.alturaMm * TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT),
        1,
        mm(alturaLinhaVertical),
    );
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};

export const tabelaNutricionalVerticalReduzida = {drawTable};
