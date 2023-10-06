import {fabric} from "fabric";
import {
    calculaTamanhoFonteByAlturaMMEFontePadraoPT,
    converterPTparaMM,
    converterPtParaPX,
} from "../core/util/conversor-utils";
import {fillTemplate, getOrDefault} from "../core/util/param-utils";
import {
    alimentoProntoParaConsumo,
    setInformacoesPadraoZero,
    setInformacoesV2PadraoZero,
} from "../core/util/tabela-nutricional-utils";
import {
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
import {
    IElementoTextoModelmultiplasLinhas,
    text,
} from "./text";

const _ = require("lodash");

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

export interface IElementoTabelaNutricionalModel {
    tipo: string;
    posicao: IElementoTabelaNutricionalModelPosicao;
    dimensoes: IElementoTabelaNutricionalModelDimensoes;
    fonte: IElementoTabelaNutricionalModelFonte;
    informacoesNutricionais: IElementoTabelaNutricionalModelInformacoesNutricionais;
    informacoesAdicionais: IElementoTabelaNutricionalInformacoesAdicionais;
    multiplasLinhas: IElementoTextoModelmultiplasLinhas;
    opcoes?: IElementoTabelaNutricionalOpcoes;
    larguraMaximaMm: number;
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
    const posicaoXPorcoesPorEmbalagem = 1;
    const textoCabecalhoMedidas = [
        {
            // @ts-ignore
            id: null,
            xMm: posicaoXPorcoesPorEmbalagem + 25,
        },
        {
            id: null,
            xMm: posicaoXPorcoesPorEmbalagem + 35,
        },
        {
            id: null,
            xMm: posicaoXPorcoesPorEmbalagem + 45,
        },
    ];
    const informacoesNutricionais: string[] = [];
    let porcao100g = getOrDefault(model.informacoesNutricionais, "textoQt100");

    if (alimentoProntoParaConsumo(textBindings)) {
        porcao100g += "**";
    }

    // Contorno de cima
    desenharLinhaContornoHorizontal(ctx, model, yMm, mm);
    yMm += alturaLinhaMm + 1;

    // Configurando fonte do Titulo
    ctx.font = `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_TITULO_EM_PT)}mm ${model.fonte.nome}`;

    // Titulo INFORMAÇÕES NUTRICIONAIS ---------------------------------------------------------------------------------
    strokeAlignedText(
        ctx,
        fabricCanvas,
        larguraMaxima,
        getOrDefault(model.informacoesNutricionais, "textoInformacaoNutricional"),
        model.posicao.xMm + 1,
        yMm,
        mm,
        TextAlign.LEFT,
        degrees,
    );

    // Linha normal ----------------------------------------------------------------------------------------------------
    yMm += alturaLinhaMm / 2.8;
    desenharLinha(ctx, model, yMm, mm, ESPESSURA_LINHA_PADRAO_EM_PT);
    desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_CONTORNO_TABELA_EM_PT * 6), model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 4);
    desenharLinhaContornoVerticalEsquerda(ctx, model, model.posicao.yMm, model.posicao.xMm - 0.2, mm, 4.8);
    yMm += alturaLinhaMm;

    // Configurando fonte de Informações e labels nutricionais
    ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;

    // -----------------------------------------------------------------------------------------------------------------
    const informacoesNutricionaisTextoPorcao = [
        {
            id: "Porções por embalagem: ",
            value: model.informacoesNutricionais.textoQuantidadeEmbalagem,
            caseira: null,
            xMm: posicaoXPorcoesPorEmbalagem,
        },
        {
            id: "Porção: ",
            value: model.informacoesNutricionais.textoQuantidadePorPorcao,
            caseira: model.informacoesNutricionais.textoPorcaoCaseira,
            xMm: posicaoXPorcoesPorEmbalagem + 30.5,
        },
    ].map((infos) => {
        strokeAlignedText(
            ctx,
            fabricCanvas,
            larguraMaxima,
            infos.id === "Porção: " ?
                (infos.id + fillTemplate(infos.value, textBindings)
                    + " (" + fillTemplate(infos.caseira, textBindings)) + ")"
                : (infos.id + fillTemplate(infos.value, textBindings)),
            model.posicao.xMm + infos.xMm,
            yMm,
            mm,
            TextAlign.LEFT,
            degrees,
        );
        desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 3.3, model.posicao.xMm - 0.2, mm, 5.4);
    });
    desenharQuadradoSeparador(ctx, model, yMm + 50, posicaoXPorcoesPorEmbalagem + 250);
    desenharLinhaContornoVerticalDireita(ctx, model, yMm - alturaLinhaMm, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 7.8);
    yMm += alturaLinhaMm / 1.4;

    // Linha grossa ----------------------------------------------------------------------------------------------------
    desenharLinhaGrossa(ctx, model, yMm, mm);
    yMm += alturaLinhaMm + 1;

    // -----------------------------------------------------------------------------------------------------------------
    // Informações nutricionais

    if (alimentoProntoParaConsumo(textBindings)) {
        porcao100g += "**";
    }

    strokeAlignedText(
        ctx,
        fabricCanvas,
        larguraMaxima - 2,
        "Por " + (porcao100g + " ("),
        model.posicao.xMm + posicaoXPorcoesPorEmbalagem,
        yMm,
        mm,
        TextAlign.LEFT,
        degrees,
    );

    ctx.font = `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;

    strokeAlignedText(
        ctx,
        fabricCanvas,
        larguraMaxima - 2,
        fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, textBindings),
        model.posicao.xMm + posicaoXPorcoesPorEmbalagem * 11,
        yMm,
        mm,
        TextAlign.LEFT,
        degrees,
    );

    ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;

    strokeAlignedText(
        ctx,
        fabricCanvas,
        larguraMaxima - 2,
        ", " + getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario") + "): ",
        model.posicao.xMm + posicaoXPorcoesPorEmbalagem * 15,
        yMm,
        mm,
        TextAlign.LEFT,
        degrees,
    );

    const por100G = "Por " + porcao100g + " (" + model.informacoesNutricionais.textoQuantidadePorPorcao + ", " + getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario") + "): ";
    const infosIndividuais: string[] = [];
    const infosExtrasIndividuais: string[] = [];

    if (model.informacoesNutricionais !== undefined && model.informacoesNutricionais.informacoesNutrientesTabelaNutricional !== undefined) {
        // nutrientes.forEach((nutriente: any) => {
        //     textoCabecalhoMedidas.map((obj: any) => {
        //         obj.id = model.informacoesNutricionais.informacoesNutrientesTabelaNutricional[nutriente];
        //         if (obj.id !== undefined) {
        //             yMm += alturaLinhaMm / 1.7;
        //             const nomeNutriente = getOrDefault(obj.id, "nome");
        //             if (!!fabricCanvas) {
        //                 writeFabricText(fabricCanvas, ctx, nomeNutriente, obj.xMm, yMm, larguraMaxima, mm, {degrees});
        //             } else {
        //                 ctx.strokeText(nomeNutriente, mm(obj.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
        //             }
        //             strokeAlignedText(ctx, fabricCanvas, larguraMaxima, fillTemplate(obj.id, textBindings),
        //                 model.posicao.xMm + obj.xMm, yMm, mm, TextAlign.LEFT, degrees);
        //             yMm += alturaLinhaMm / 3;
        //             desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 3.6), model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, ESPACAMENTO_100G_000G_VD / 2.2);
        //             desenharLinhaContornoVerticalEsquerda(ctx, model, yMm, model.posicao.xMm - 0.2, mm, ESPACAMENTO_100G_000G_VD / 1.8);
        //             // -----------------------------------------------------------------------------------------------------
        //         }
        //     });
        // });
    } else {
        let widthTotalAteIndexAtual = 0;
        let widthConjuntoAtual = 0;
        const parametrosPadroesNutricionalV2 = !!textBindings ? textBindings.parametrosPadroesNutricionalV2 : PARAMETROS_PADROES_NUTRICIONAL_V2;

        console.clear();

        let valorTotalDeCharsDentroDeUmaLinha = 100;
        let posicaoAtualCharNaLinha = 0;

        let yIncrementando = yMm;
        let xIncrementado = model.posicao.xMm - 17;

        console.log("Inicialmente", {xIncrementado}, {yIncrementando});

        // parametrosPadroesNutricionalV2.forEach((parametro: any, index: number, array: any) => {
        parametrosPadroesNutricionalV2.forEach((parametro: any, index: number, array: any) => {
            const rotuloSemParenteses = parametro.rotulo.replace(/[{()}]/g, "");
            const matchArray: any[] = parametro.qtPorcao.match(/[0-9]/mg, "");
            const maxWidth = larguraMaxima - 2;

            // console.log(array);
            if (!model.informacoesNutricionais.ocultarZerados || !matchArray.every((elemento: any) => elemento === "0")) {
                if (parametrosPadroesNutricionalV2.indexOf(parametro) > 0) {
                    xIncrementado += 10
                    valorTotalDeCharsDentroDeUmaLinha = por100G.length;
                }

                // console.log(maxWidth); // 84.4 = 100 (1,184)

                // martinho
                console.log("________");
                const valorNutricionalCompletoFormatado = montaStringInteira(parametro);
                console.log(valorNutricionalCompletoFormatado, valorNutricionalCompletoFormatado.length);
                const nomeNutrienteFormatado = montaApenasNomeNutriente(parametro);
                console.log(nomeNutrienteFormatado, nomeNutrienteFormatado.length);

                // Teste de mesa: Carboidratos 00 g (00g, 0%)
                // Nome tem length de 12
                // Valor Nutricional Completo tem 27 de length
                // posicaoAtualCharNaLinha = 0
                // valorTotalDeCharsDentroDeUmaLinha = 100

                /*
                * 0 + 27 < 100 ?
                * Escreve Carboidratos 00 g (00g, 0%)
                * posicaoAtualCharNaLinha += 27 (tamanho do valorNutricionalCompleto)
                *                 * 0 + 27 < 100 ?
                *
                * Escreve Carboidratos 00 g (00g, 0%)
                * posicaoAtualCharNaLinha += 27 (tamanho do valorNutricionalCompleto)
                * 27 + 27 < 100 ?
                * Escreve Carboidratos 00 g (00g, 0%)
                * posicaoAtualCharNaLinha += 27 (tamanho do valorNutricionalCompleto)
                * 54 + 27 < 100 ?
                * Escreve Carboidratos 00 g (00g, 0%)
                * posicaoAtualCharNaLinha += 27 (tamanho do valorNutricionalCompleto)
                * 81 + 27 < 100 ? NAOOOOOOO
                * verifica só o valor do nome
                * 81 + 12 < 100 ?
                * Escrever só Carboidratos
                * BREAK LINE
                * posicaoAtualCharNaLinha
                * 0 + o resto (15 de length) < 100 ?
                * escreve o resto: 00 g (00g, 0%)
                * posicaoAtualCharNaLinha += 15 (tamanho do resto)
                *
                * Vai fazer a verificacao para o proximo nutriente
                *
                * */


                // -----------------------------------------
                // TODO: verificar se o valor (length) do rotulo (método (montaApenasNomeNutriente)) + o valor inicial total da linha (que inicia em zero (em cada linha nova)) cabe dentro da linha (valorTotalDeChar)

                const tamanhoLengthValorNutricionalCompletoFormatado = valorNutricionalCompletoFormatado.length;
                const valorTotalNutrienteMaisPosicaoAtualChar = (posicaoAtualCharNaLinha + tamanhoLengthValorNutricionalCompletoFormatado);
                const tamanhoLengthNomeNutrienteFormatado = nomeNutrienteFormatado.length;
                const valorTotalNomeNutrienteMaisPOsicaoAtualChar = posicaoAtualCharNaLinha + tamanhoLengthNomeNutrienteFormatado;

                console.log({posicaoAtualCharNaLinha});
                console.log({valorTotalNutrienteMaisPosicaoAtualChar});
                console.log({yIncrementando});
                console.log({xIncrementado});

                if (valorTotalNutrienteMaisPosicaoAtualChar < valorTotalDeCharsDentroDeUmaLinha) {
                    console.log(`ValorTotal é menor que ${valorTotalDeCharsDentroDeUmaLinha}`);
                    strokeAlignedText(
                        ctx,
                        fabricCanvas,
                        larguraMaxima - 2,
                        valorNutricionalCompletoFormatado,
                        xIncrementado += tamanhoLengthValorNutricionalCompletoFormatado,
                        yIncrementando,
                        mm,
                        TextAlign.LEFT,
                        degrees,
                    )
                    posicaoAtualCharNaLinha += tamanhoLengthValorNutricionalCompletoFormatado;
                } else if (valorTotalNomeNutrienteMaisPOsicaoAtualChar < valorTotalDeCharsDentroDeUmaLinha) {
                    console.log(`Nome é menor que ${valorTotalDeCharsDentroDeUmaLinha}`);
                    strokeAlignedText(
                        ctx,
                        fabricCanvas,
                        larguraMaxima - 2,
                        nomeNutrienteFormatado,
                        xIncrementado += tamanhoLengthNomeNutrienteFormatado,
                        yIncrementando,
                        mm,
                        TextAlign.LEFT,
                        degrees,
                    )
                    posicaoAtualCharNaLinha += tamanhoLengthNomeNutrienteFormatado;
                    // BREAKLINE
                } else {
                    console.log("BREAAK *****************");
                    valorTotalDeCharsDentroDeUmaLinha = 100;
                    console.log(model.posicao.xMm);
                    xIncrementado = model.posicao.xMm;
                    strokeAlignedText(
                        ctx,
                        fabricCanvas,
                        larguraMaxima - 2,
                        // nomeNutrienteFormatado,
                        valorNutricionalCompletoFormatado,
                        xIncrementado + 1,
                        yIncrementando += 2.5,
                        mm,
                        TextAlign.LEFT,
                        degrees,
                    )
                    console.log(xIncrementado);
                    posicaoAtualCharNaLinha = 0;
                    console.log("***********");
                }

                // -----------------------------------------
            }
        });

        // Parametros extras
        if (!!textBindings) {
            textBindings.parametrosExtrasNutricionalV2.forEach((parametro: any) => {
                const parametrosExtrasLength = textBindings.parametrosExtrasNutricionalV2.length;
                const rotuloSemParenteses = parametro.rotulo.replace(/[{()}]/g, "");
                porcao100g.indexOf("**") !== -1
                    ? desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 29)
                    : desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 28);
                porcao100g.indexOf("**") !== -1
                    ? desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, 29)
                    : desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, 28);

                if (parametrosExtrasLength < 2) {
                    yMm += alturaLinhaMm * 1.5;
                } else if (parametrosExtrasLength < 5) {
                    yMm += alturaLinhaMm / 1.2;
                } else if (parametrosExtrasLength <= 8) {
                    yMm += alturaLinhaMm / 2.5;
                } else {
                    yMm += alturaLinhaMm / 2.8;
                }

                // if (textBindings.parametrosExtrasNutricionalV2.length > 4) {
                //     for (let i = 4; textBindings.parametrosExtrasNutricionalV2.length > i; i+=4) {
                //     desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, i * 3.2);
                //     desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, i * 3.2);
                //     yMm += alturaLinhaMm / (i * 1.5);
                //     }
                // } else {
                //     desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 25);
                //     desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, 25);
                //     yMm += alturaLinhaMm / 2;
                // }
            });
            porcao100g.indexOf("**") !== -1 ? yMm += alturaLinhaMm * 3 : yMm += alturaLinhaMm * 2;
            // -----------------------------------------------------------------------------------------------------
            desenharLinha(ctx, model, yMm, mm, ESPESSURA_ULTIMA_LINHA_NUTRIENTES_EM_PT);
            yMm += alturaLinhaMm / 1.5;
        }
    }

    // const infos: any = mountTextElement(
    //     model.posicao,
    //     model,
    //     mountTextTabelaNutricional(ctx, fabricCanvas, yMm, mm, larguraMaxima, alturaLinhaMm, model, textBindings),
    // );
    //
    // // Monta texto com as informações em linha
    // text.drawTextLinear(
    //     ctx,
    //     fabricCanvas,
    //     dpi,
    //     infos,
    //     textBindings,
    // );

    ctx.restore();
};

const verificaSePrecisaPularLinha = (widthTotalAteIndexAtual: number, maxWidth: number): boolean => {
   return widthTotalAteIndexAtual > maxWidth;
};

const calculaPosicaoX = (model: IElementoTabelaNutricionalModel, widthConjuntoAtual: number, index: number, rotuloSemParenteses: string, precisaPularLinha: boolean, por100G: string) => {
    if (rotuloSemParenteses.indexOf("Valor energético kcal") !== -1) {
        widthConjuntoAtual += por100G.length;
        return model.posicao.xMm + (por100G.length - 20);
    } else if (precisaPularLinha) {
        return model.posicao.xMm + 1;
    }
    else {
        return model.posicao.xMm + (widthConjuntoAtual * (index * 1.5));
    }
};

const desenharLinha = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, mm: any, espessuraLinha: number) => {
    ctx.textAlign = TextAlign.LEFT;
    ctx.lineWidth = converterPtParaPX(espessuraLinha);
    // x, y, largura e altura
    ctx.strokeRect(
        mm(model.posicao.xMm),
        mm(yMm),
        mm(model.dimensoes.larguraMaximaMm),
        1,
    );
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};

const desenharLinhaGrossa = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, mm: any) => {
    ctx.textAlign = TextAlign.LEFT;
    ctx.lineWidth = converterPtParaPX(ESPESSURA_LINHA_GROSSA_EM_PT);
    // x, y, largura e altura
    ctx.strokeRect(
        mm(model.posicao.xMm + 1),
        mm(yMm),
        mm(model.dimensoes.larguraMaximaMm - 1.8),
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

export const desenharQuadradoSeparador = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, xMm: number) => {
    ctx.fillRect((model.posicao.xMm + xMm), yMm, 5, 5);
};

const mountTextElement = (posicao: IElementoTabelaNutricionalModelPosicao, model: IElementoTabelaNutricionalModel, texto: string) => {
    return {
        "tipo": "texto",
        "posicao": {
            "xMm": posicao.xMm,
            "yMm": posicao.yMm,
        },
        "dimensoes": {
            "larguraMaximaMm": model.dimensoes.larguraMaximaMm,
        },
        "multiplasLinhas": model.multiplasLinhas,
        "fonte": model.fonte,
        "valor": texto,
    };
};

function mountTextTabelaNutricional(ctx: CanvasRenderingContext2D, fabricCanvas: fabric.Canvas, yMm: number, mm: any, larguraMaxima: number, alturaLinhaMm: number, model: IElementoTabelaNutricionalModel, textBindings?: any, degrees?: number) {
    const posicaoXPorcoesPorEmbalagem = 1;
    const textoCabecalhoMedidas = [
        {
            // @ts-ignore
            id: null,
            xMm: posicaoXPorcoesPorEmbalagem + 25,
        },
        {
            id: null,
            xMm: posicaoXPorcoesPorEmbalagem + 35,
        },
        {
            id: null,
            xMm: posicaoXPorcoesPorEmbalagem + 45,
        },
    ];
    const informacoesNutricionais: string[] = [];
    let porcao100g = getOrDefault(model.informacoesNutricionais, "textoQt100");

    if (alimentoProntoParaConsumo(textBindings)) {
        porcao100g += "**";
    }

    // informacoesNutricionais.push("Por " + (porcao100g + " ("));
    //
    // model.fonte.negrito = true;
    //
    // informacoesNutricionais.push(fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, textBindings));
    //
    // model.fonte.negrito = false;
    //
    // informacoesNutricionais.push(", " + getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario") + "): ");

    informacoesNutricionais.push("Por " + (porcao100g + " (" + fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, textBindings)
        + ", " + getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario")) + "): ");

    if (model.informacoesNutricionais !== undefined && model.informacoesNutricionais.informacoesNutrientesTabelaNutricional !== undefined) {
        nutrientes.forEach((nutriente: any) => {
            textoCabecalhoMedidas.map((obj: any) => {
                obj.id = model.informacoesNutricionais.informacoesNutrientesTabelaNutricional[nutriente];
                if (obj.id !== undefined) {
                    yMm += alturaLinhaMm / 1.7;
                    const nomeNutriente = getOrDefault(obj.id, "nome");
                    if (!!fabricCanvas) {
                        writeFabricText(fabricCanvas, ctx, nomeNutriente, obj.xMm, yMm, larguraMaxima, mm, {degrees});
                    } else {
                        ctx.strokeText(nomeNutriente, mm(obj.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                    }
                    strokeAlignedText(ctx, fabricCanvas, larguraMaxima, fillTemplate(obj.id, textBindings),
                        model.posicao.xMm + obj.xMm, yMm, mm, TextAlign.LEFT, degrees);
                    yMm += alturaLinhaMm / 3;
                    desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 3.6), model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, ESPACAMENTO_100G_000G_VD / 2.2);
                    desenharLinhaContornoVerticalEsquerda(ctx, model, yMm, model.posicao.xMm - 0.2, mm, ESPACAMENTO_100G_000G_VD / 1.8);
                    // -----------------------------------------------------------------------------------------------------
                }
            });
        });
    } else {
        const parametrosPadroesNutricionalV2 = !!textBindings ? textBindings.parametrosPadroesNutricionalV2 : PARAMETROS_PADROES_NUTRICIONAL_V2;
        parametrosPadroesNutricionalV2.forEach((parametro: any) => {
            const matchArray: any[] = parametro.qtPorcao.match(/[0-9]/mg, "");
            const rotuloSemParenteses = parametro.rotulo.replace(/[{()}]/g, "");
            if (!model.informacoesNutricionais.ocultarZerados || !matchArray.every((elemento: any) => elemento === "0")) {
                if (rotuloSemParenteses === "Valor energético kcal") {
                    informacoesNutricionais.push((rotuloSemParenteses + " (" + parametro.qt100 + " kcal" + ", " + parametro.valorDiario + "%") + ") ");
                } else if (rotuloSemParenteses === "Açúcares totais g") {
                    informacoesNutricionais.push(" dos quais " + rotuloSemParenteses + " (" + parametro.qt100 + " g" + ") ");
                } else if (rotuloSemParenteses === "Gorduras saturadas g") {
                    informacoesNutricionais.push((" das quais " + rotuloSemParenteses + " (" + parametro.qt100 + " g" + ", " + parametro.valorDiario + "%") + ") ");
                } else {
                    informacoesNutricionais.push((rotuloSemParenteses + " (" + parametro.qt100 + " g" + ", " + parametro.valorDiario + "%") + ") ");
                }
            }
        });

        // Parametros extras
        if (!!textBindings) {
            textBindings.parametrosExtrasNutricionalV2.forEach((parametro: any) => {
                const parametrosExtrasLength = textBindings.parametrosExtrasNutricionalV2.length;
                const rotuloSemParenteses = parametro.rotulo.replace(/[{()}]/g, "");
                informacoesNutricionais.push((rotuloSemParenteses + " (" + parametro.qt100 + " g" + ", " + parametro.valorDiario + "%") + ") ");
                porcao100g.indexOf("**") !== -1
                    ? desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 29)
                    : desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 28);
                porcao100g.indexOf("**") !== -1
                    ? desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, 29)
                    : desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, 28);

                if (parametrosExtrasLength < 2) {
                    yMm += alturaLinhaMm * 1.5;
                } else if (parametrosExtrasLength < 5) {
                    yMm += alturaLinhaMm / 1.2;
                } else if (parametrosExtrasLength <= 8) {
                    yMm += alturaLinhaMm / 2.5;
                } else {
                    yMm += alturaLinhaMm / 2.8;
                }

                // if (textBindings.parametrosExtrasNutricionalV2.length > 4) {
                //     for (let i = 4; textBindings.parametrosExtrasNutricionalV2.length > i; i+=4) {
                //     desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, i * 3.2);
                //     desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, i * 3.2);
                //     yMm += alturaLinhaMm / (i * 1.5);
                //     }
                // } else {
                //     desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 25);
                //     desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, 25);
                //     yMm += alturaLinhaMm / 2;
                // }
            });
            porcao100g.indexOf("**") !== -1 ? yMm += alturaLinhaMm * 3 : yMm += alturaLinhaMm * 2;
            // -----------------------------------------------------------------------------------------------------
            desenharLinha(ctx, model, yMm, mm, ESPESSURA_ULTIMA_LINHA_NUTRIENTES_EM_PT);
            yMm += alturaLinhaMm / 1.5;
        }
    }

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
            yMm += alturaLinhaMm / 4;
            strokeAlignedText(ctx, fabricCanvas, larguraMaxima, item, model.posicao.xMm  + ESPACAMENTO_CONTORNO_TABELA_EM_PT, yMm, mm, TextAlign.LEFT, degrees);
            desenharLinhaContornoVerticalDireita(ctx, model, yMm - 0.5, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, ESPACAMENTO_100G_000G_VD / 1.5);
            desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 3.1, model.posicao.xMm - 0.2, mm, ESPACAMENTO_100G_000G_VD / 1.4);
            yMm += alturaLinhaMm / 2;
        });
    });

    // Contorno de baixo
    desenharLinhaContornoHorizontal(ctx, model, yMm, mm);
    yMm += alturaLinhaMm / 3;

    return fillTemplate(informacoesNutricionais.join() + ".", textBindings);
}


// TODO: Deixar essa budega bonita depois
const montaStringInteira = (parametro: any) => {
    const nome = montaApenasNomeNutriente(parametro);
    const quantidade100 = parametro.qt100;
    const unidade = pegaUnidadeDoRotulo(parametro.rotulo);
    const parentesesInicial = "(";
    const parentesesFinal = ")";
    const valorPorcao = parametro.qtPorcao;
    const virgula = ", ";
    const valorDiario = parametro.valorDiario;
    const sinalPorcentagem = "%"
    const espaco = " ";

    return nome + espaco + quantidade100 + espaco + unidade + espaco + parentesesInicial + valorPorcao + espaco + unidade + virgula + espaco + valorDiario + sinalPorcentagem + parentesesFinal;
};


// TODO: Montar um na mesma lgica para pegar o resto das informações que não é o nutriente
const montaApenasNomeNutriente = (parametro: any) => {
    const regexEspacosEmBrancoAntesDoNome = /^\s+/;
    return pegaValorRotuloSemUnidade(parametro.rotulo.replace(regexEspacosEmBrancoAntesDoNome, ''));
}

const pegaUnidadeDoRotulo = (rotuloCompleto: string) => {
    const regexString = /\(([^()]+)\)/g;
    const regexParenteses = /[{()}]/g;
    return rotuloCompleto.match(regexString)[0].replace(regexParenteses, "");
};

const pegaValorRotuloSemUnidade = (rotuloCompleto: string) => {
    const regexString = /(.+?)\s*\(.+?\)/;
    return rotuloCompleto.match(regexString)[1];
}

export const tabelaNutricionalLinear = {drawTable};
