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
    setInformacoesV2PadraoZero
} from "../core/util/tabela-nutricional-utils";
import {
    splitLines,
    strokeAlignedText,
    TextAlign,
    writeFabricText,
} from "../core/util/text-utils";
import {
    IElementoTextoModelmultiplasLinhas,
    text,
} from "./text";
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

    // if (alimentoProntoParaConsumo(textBindings)) {
    //     porcao100g += "**";
    // }
    //
    // strokeAlignedText(
    //     ctx,
    //     fabricCanvas,
    //     larguraMaxima - 2,
    //     "Por " + (porcao100g + " ("),
    //     model.posicao.xMm + posicaoXPorcoesPorEmbalagem,
    //     yMm,
    //     mm,
    //     TextAlign.LEFT,
    //     degrees,
    // );
    //
    // ctx.font = `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    //
    // strokeAlignedText(
    //     ctx,
    //     fabricCanvas,
    //     larguraMaxima - 2,
    //     fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, textBindings),
    //     model.posicao.xMm + posicaoXPorcoesPorEmbalagem * 11,
    //     yMm,
    //     mm,
    //     TextAlign.LEFT,
    //     degrees,
    // );
    //
    // ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    //
    // strokeAlignedText(
    //     ctx,
    //     fabricCanvas,
    //     larguraMaxima - 2,
    //     ", " + getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario") + "): ",
    //     model.posicao.xMm + posicaoXPorcoesPorEmbalagem * 15,
    //     yMm,
    //     mm,
    //     TextAlign.LEFT,
    //     degrees,
    // );

    // const por100G = "Por " + porcao100g + " (" + model.informacoesNutricionais.textoQuantidadePorPorcao + ", " + getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario") + "): ";
    // const infosIndividuais: string[] = [];
    // const infosExtrasIndividuais: string[] = [];

    // if (model.informacoesNutricionais !== undefined && model.informacoesNutricionais.informacoesNutrientesTabelaNutricional !== undefined) {
    //     // nutrientes.forEach((nutriente: any) => {
    //     //     textoCabecalhoMedidas.map((obj: any) => {
    //     //         obj.id = model.informacoesNutricionais.informacoesNutrientesTabelaNutricional[nutriente];
    //     //         if (obj.id !== undefined) {
    //     //             yMm += alturaLinhaMm / 1.7;
    //     //             const nomeNutriente = getOrDefault(obj.id, "nome");
    //     //             if (!!fabricCanvas) {
    //     //                 writeFabricText(fabricCanvas, ctx, nomeNutriente, obj.xMm, yMm, larguraMaxima, mm, {degrees});
    //     //             } else {
    //     //                 ctx.strokeText(nomeNutriente, mm(obj.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
    //     //             }
    //     //             strokeAlignedText(ctx, fabricCanvas, larguraMaxima, fillTemplate(obj.id, textBindings),
    //     //                 model.posicao.xMm + obj.xMm, yMm, mm, TextAlign.LEFT, degrees);
    //     //             yMm += alturaLinhaMm / 3;
    //     //             desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 3.6), model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, ESPACAMENTO_100G_000G_VD / 2.2);
    //     //             desenharLinhaContornoVerticalEsquerda(ctx, model, yMm, model.posicao.xMm - 0.2, mm, ESPACAMENTO_100G_000G_VD / 1.8);
    //     //             // -----------------------------------------------------------------------------------------------------
    //     //         }
    //     //     });
    //     // });
    // } else {
    //     const parametrosPadroesNutricionalV2 = !!textBindings ? textBindings.parametrosPadroesNutricionalV2 : PARAMETROS_PADROES_NUTRICIONAL_V2;
    //     parametrosPadroesNutricionalV2.forEach((parametro: any, index: number, array: any) => {
    //         const matchArray: any[] = parametro.qtPorcao.match(/[0-9]/mg, "");
    //         const rotuloSemParenteses = parametro.rotulo.replace(/[{()}]/g, '');
    //         // let widthTotalAteIndexAtual = 0;
    //         // const maxWidth = larguraMaxima - 2;
    //
    //         if (!model.informacoesNutricionais.ocultarZerados || !matchArray.every((elemento: any) => elemento === "0")) {
    //             // console.log("parametro: " + JSON.stringify(parametro));
    //
    //             // let lines = wrapText(ctx, parametro, model.posicao.xMm + 24, yMm, larguraMaxima, alturaLinhaMm);
    //             // // console.log("wrappedText: " + wrappedText);
    //             // lines.forEach(elemento => {
    //             //     // console.log("elemento: " + elemento);
    //             //     ctx.fillText(<string>elemento[0], <number>elemento[1], <number>elemento[2]);
    //             // })
    //
    //             // console.log("array: " + JSON.stringify(array));
    //
    //             const rotuloWidth = rotuloSemParenteses + " ("
    //             const GWidth = rotuloSemParenteses === "Valor energético kcal"
    //                 ? parametro.qt100 + " kcal"
    //                 : parametro.qt100 + " g";
    //             const VDWidth = ", " + parametro.valorDiario + "%" + ")";
    //             // let widthConjuntoAtual = (index != 0 ? array[index - 1].length : 0) + (rotuloWidth.length + GWidth.length + VDWidth.length);
    //             //
    //             // widthTotalAteIndexAtual += widthConjuntoAtual;
    //
    //             infosIndividuais.push(rotuloWidth + GWidth + VDWidth);
    //
    //             // console.log("maxWidth: " + maxWidth);
    //             // console.log("widthDeUmConjunto: " + widthDeUmConjunto);
    //
    //             // console.log("infosIndividuais: " + infosIndividuais);
    //             // console.log("larguraTotalConjuntos: " + larguraTotalConjuntos);
    //
    //             // strokeAlignedText(
    //             //     ctx,
    //             //     fabricCanvas,
    //             //     larguraMaxima - 2,
    //             //     rotuloSemParenteses + " (",
    //             //     rotuloSemParenteses === "Valor energético kcal" ? model.posicao.xMm + por100G.length : model.posicao.xMm + widthTotalAteIndexAtual,
    //             //     verificaSePrecisaPularLinha(widthConjuntoAtual, widthTotalAteIndexAtual, maxWidth) ? yMm + index : yMm,
    //             //     mm,
    //             //     TextAlign.LEFT,
    //             //     degrees,
    //             // )
    //
    //             // ctx.font = `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    //
    //             //     strokeAlignedText(
    //             //         ctx,
    //             //         fabricCanvas,
    //             //         larguraMaxima - 2,
    //             //         rotuloSemParenteses === "Valor energético kcal"
    //             //             ? parametro.qt100 + " kcal"
    //             //             : parametro.qt100 + " g",
    //             //         model.posicao.xMm + 45.3 + (index * 32),
    //             //         yMm,
    //             //         mm,
    //             //         TextAlign.LEFT,
    //             //         degrees,
    //             //     )
    //             //
    //             //     ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    //             //
    //             //     strokeAlignedText(
    //             //         ctx,
    //             //         fabricCanvas,
    //             //         larguraMaxima - 2,
    //             //         ", " + parametro.valorDiario + "%" + ")",
    //             //         model.posicao.xMm + 54 + (index * 27),
    //             //         yMm,
    //             //         mm,
    //             //         TextAlign.LEFT,
    //             //         degrees,
    //             //     )
    //             // desenharQuadradoSeparador(ctx, model, yMm + 93, model.posicao.xMm + 485 + (index * 50));
    //
    //             //     strokeAlignedText(
    //             //         ctx,
    //             //         fabricCanvas,
    //             //         larguraMaxima - 2,
    //             //         rotuloSemParenteses + " (",
    //             //         model.posicao.xMm + 1 + index,
    //             //         yMm + 6,
    //             //         mm,
    //             //         TextAlign.LEFT,
    //             //         degrees,
    //             //     )
    //             //
    //             //     ctx.font = `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    //             //
    //             //     strokeAlignedText(
    //             //         ctx,
    //             //         fabricCanvas,
    //             //         larguraMaxima - 2,
    //             //         parametro.qt100 + " g",
    //             //         model.posicao.xMm + 45.3 + (index * 32),
    //             //         yMm + index + 3,
    //             //         mm,
    //             //         TextAlign.LEFT,
    //             //         degrees,
    //             //     )
    //             //
    //             //     ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    //             //
    //             //     strokeAlignedText(
    //             //         ctx,
    //             //         fabricCanvas,
    //             //         larguraMaxima - 2,
    //             //         ", " + parametro.valorDiario + "%" + ")",
    //             //         model.posicao.xMm + 54 + (index * 27),
    //             //         yMm + index + 3,
    //             //         mm,
    //             //         TextAlign.LEFT,
    //             //         degrees,
    //             //     )
    //             // }
    //             // desenharQuadradoSeparador(ctx, model, yMm + 93, model.posicao.xMm + 485 + (index * 50));
    //
    //             //     if (model.posicao.xMm + 54 + (index * 27) < larguraMaxima) {
    //             //         strokeAlignedText(
    //             //             ctx,
    //             //             fabricCanvas,
    //             //             larguraMaxima - 2,
    //             //             rotuloSemParenteses + " (",
    //             //             model.posicao.xMm + 24 + (index * 38),
    //             //             yMm,
    //             //             mm,
    //             //             TextAlign.LEFT,
    //             //             degrees,
    //             //         )
    //             //
    //             //         ctx.font = `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    //             //
    //             //         strokeAlignedText(
    //             //             ctx,
    //             //             fabricCanvas,
    //             //             larguraMaxima - 2,
    //             //             rotuloSemParenteses === "Valor energético kcal"
    //             //                 ? parametro.qt100 + " kcal"
    //             //                 : parametro.qt100 + " g",
    //             //             model.posicao.xMm + 45.3 + (index * 32),
    //             //             yMm,
    //             //             mm,
    //             //             TextAlign.LEFT,
    //             //             degrees,
    //             //         )
    //             //
    //             //         ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    //             //
    //             //         strokeAlignedText(
    //             //             ctx,
    //             //             fabricCanvas,
    //             //             larguraMaxima - 2,
    //             //             ", " + parametro.valorDiario + "%" + ")",
    //             //             model.posicao.xMm + 54 + (index * 27),
    //             //             yMm,
    //             //             mm,
    //             //             TextAlign.LEFT,
    //             //             degrees,
    //             //         )
    //             //     } else if (model.posicao.xMm + 54 + (index * 27) > larguraMaxima) {
    //             //         strokeAlignedText(
    //             //             ctx,
    //             //             fabricCanvas,
    //             //             larguraMaxima - 2,
    //             //             rotuloSemParenteses + " (",
    //             //             model.posicao.xMm + 1 + index,
    //             //             yMm + index++,
    //             //             mm,
    //             //             TextAlign.LEFT,
    //             //             degrees,
    //             //         )
    //             //
    //             //         ctx.font = `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    //             //
    //             //         strokeAlignedText(
    //             //             ctx,
    //             //             fabricCanvas,
    //             //             larguraMaxima - 2,
    //             //             rotuloSemParenteses === "Valor energético kcal"
    //             //                 ? parametro.qt100 + " kcal"
    //             //                 : parametro.qt100 + " g",
    //             //             model.posicao.xMm + 45.3 + (index * 32),
    //             //             yMm + index + 3,
    //             //             mm,
    //             //             TextAlign.LEFT,
    //             //             degrees,
    //             //         )
    //             //
    //             //         ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    //             //
    //             //         strokeAlignedText(
    //             //             ctx,
    //             //             fabricCanvas,
    //             //             larguraMaxima - 2,
    //             //             ", " + parametro.valorDiario + "%" + ")",
    //             //             model.posicao.xMm + 54 + (index * 27),
    //             //             yMm + index + 3,
    //             //             mm,
    //             //             TextAlign.LEFT,
    //             //             degrees,
    //             //         )
    //             //     }
    //             //     desenharQuadradoSeparador(ctx, model, yMm + 93, model.posicao.xMm + 485 + (index * 50));
    //         }
    //     });
    //
    //     infosIndividuais.forEach((informacao, index, array) => {
    //         let widthTotalAteIndexAtual = 0;
    //         const maxWidth = larguraMaxima - 2;
    //         let novaLinha = "";
    //
    //         informacao.trim();
    //
    //         const rotuloSemParenteses = informacao.split("(", 1);
    //         // console.log("rotuloSemParenteses: " + rotuloSemParenteses)
    //         // console.log("typeof rotuloSemParenteses: " + typeof rotuloSemParenteses)
    //
    //         let widthConjuntoAtual = (index != 0 ? array[index - 1].length : 0) + rotuloSemParenteses.length;
    //
    //         // for (let i = 0; i < array.length; i++) {
    //         //     widthTotalAteIndexAtual += widthConjuntoAtual;
    //         // }
    //
    //         console.log("widthTotalAteIndexAtual += widthConjuntoAtual: " + rotuloSemParenteses + (widthTotalAteIndexAtual += widthConjuntoAtual));
    //
    //         // model.posicao.xMm + 24 + (index * 38)
    //         // (por100G.length - (index * 2))
    //
    //         const verificaLinhaRotulo = verificaSePrecisaPularLinha(widthConjuntoAtual, widthTotalAteIndexAtual, maxWidth);
    //
    //         // strokeAlignedText(
    //         //     ctx,
    //         //     fabricCanvas,
    //         //     larguraMaxima - 2,
    //         //     rotuloSemParenteses + " (",
    //         //     calculaPosicaoX(model, widthConjuntoAtual, index, rotuloSemParenteses, verificaLinhaRotulo, por100G),
    //         //     verificaSePrecisaPularLinha(widthConjuntoAtual, widthTotalAteIndexAtual, maxWidth)
    //         //         ? yMm + (index * 3)
    //         //         : yMm,
    //         //     mm,
    //         //     TextAlign.LEFT,
    //         //     degrees,
    //         // )
    //         // let widthConjuntoAtual = index != 0 ? array[index - 1].length : 0 + rotuloSemParenteses.length;
    //         //
    //         // console.log("widthConjuntoAtual: " + widthConjuntoAtual);
    //         // console.log("widthTotalAteIndexAtual: " + widthTotalAteIndexAtual);
    //         //
    //         // widthTotalAteIndexAtual = widthTotalAteIndexAtual + widthConjuntoAtual;
    //         //
    //         // const valorPor100G = informacao.split(",", 1);
    //         // console.log("valorPor100G: " + valorPor100G)
    //         //
    //         // const valorVD = informacao.split(",", 1);
    //         // console.log("valorVD: " + valorVD)
    //         //
    //         // strokeAlignedText(
    //         //     ctx,
    //         //     fabricCanvas,
    //         //     larguraMaxima - 2,
    //         //     rotuloSemParenteses + " (",
    //         //     widthTotalAteIndexAtual > maxWidth
    //         //         ? model.posicao.xMm + 1
    //         //         : model.posicao.xMm + 24 + (index * 38),
    //         //     widthTotalAteIndexAtual > maxWidth
    //         //         ? yMm + 3
    //         //         : yMm,
    //         //     mm,
    //         //     TextAlign.LEFT,
    //         //     degrees,
    //         // )
    //
    //         // ctx.font = `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    //         //
    //         // strokeAlignedText(
    //         //     ctx,
    //         //     fabricCanvas,
    //         //     larguraMaxima - 2,
    //         //     informacao === "Valor energético kcal"
    //         //         ? parametro.qt100 + " kcal"
    //         //         : parametro.qt100 + " g",
    //         //     widthTotalAteIndexAtual > maxWidth
    //         //         ? model.posicao.xMm + 1
    //         //         : model.posicao.xMm + 45.3 + (index * 32),
    //         //     widthTotalAteIndexAtual > maxWidth
    //         //         ? yMm + 3
    //         //         : yMm,
    //         //     mm,
    //         //     TextAlign.LEFT,
    //         //     degrees,
    //         // )
    //         //
    //         // ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    //         //
    //         // strokeAlignedText(
    //         //     ctx,
    //         //     fabricCanvas,
    //         //     larguraMaxima - 2,
    //         //     ", " + parametro.valorDiario + "%" + ")",
    //         //     widthTotalAteIndexAtual > maxWidth
    //         //         ? model.posicao.xMm + 1
    //         //         : model.posicao.xMm + 54 + (index * 27),
    //         //     widthTotalAteIndexAtual > maxWidth
    //         //         ? yMm + 3
    //         //         : yMm,
    //         //     mm,
    //         //     TextAlign.LEFT,
    //         //     degrees,
    //         // )
    //         // desenharQuadradoSeparador(ctx, model, yMm + 93, model.posicao.xMm + 485 + (index * 50));
    //     });
    //
    //     // Parametros extras
    //     if (!!textBindings) {
    //         textBindings.parametrosExtrasNutricionalV2.forEach((parametro: any) => {
    //             const parametrosExtrasLength = textBindings.parametrosExtrasNutricionalV2.length;
    //             const rotuloSemParenteses = parametro.rotulo.replace(/[{()}]/g, '');
    //             porcao100g.includes("**")
    //                 ? desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 29)
    //                 : desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 28);
    //             porcao100g.includes("**")
    //                 ? desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, 29)
    //                 : desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, 28)
    //
    //             if (parametrosExtrasLength < 2) {
    //                 yMm += alturaLinhaMm * 1.5;
    //             } else if (parametrosExtrasLength < 5) {
    //                 yMm += alturaLinhaMm / 1.2;
    //             } else if (parametrosExtrasLength <= 8) {
    //                 yMm += alturaLinhaMm / 2.5;
    //             } else {
    //                 yMm += alturaLinhaMm / 2.8;
    //             }
    //
    //             // if (textBindings.parametrosExtrasNutricionalV2.length > 4) {
    //             //     for (let i = 4; textBindings.parametrosExtrasNutricionalV2.length > i; i+=4) {
    //             //     desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, i * 3.2);
    //             //     desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, i * 3.2);
    //             //     yMm += alturaLinhaMm / (i * 1.5);
    //             //     }
    //             // } else {
    //             //     desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 25);
    //             //     desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, 25);
    //             //     yMm += alturaLinhaMm / 2;
    //             // }
    //         });
    //         porcao100g.includes("**") ? yMm += alturaLinhaMm * 3 : yMm += alturaLinhaMm * 2;
    //         // -----------------------------------------------------------------------------------------------------
    //         desenharLinha(ctx, model, yMm, mm, ESPESSURA_ULTIMA_LINHA_NUTRIENTES_EM_PT);
    //         yMm += alturaLinhaMm / 1.5;
    //     }
    // }

    const infos: any = mountTextElement(
        model.posicao,
        model,
        mountTextTabelaNutricional(ctx, fabricCanvas, yMm, mm, larguraMaxima, alturaLinhaMm, model, textBindings),
    );

    // Monta texto com as informações em linha
    text.drawTextLinear(
        ctx,
        fabricCanvas,
        dpi,
        infos,
        textBindings,
    );

    ctx.restore();
};

const verificaSePrecisaPularLinha = (widthConjuntoAtual: number, widthTotalAteIndexAtual: number, maxWidth: number): boolean => {
    widthTotalAteIndexAtual += widthConjuntoAtual;

    return widthTotalAteIndexAtual > maxWidth;
}

const calculaPosicaoX = (model: IElementoTabelaNutricionalModel, widthConjuntoAtual: number, index: number, rotuloSemParenteses: string[], precisaPularLinha: boolean, por100G: string) => {
    if (rotuloSemParenteses.indexOf("Valor energético kcal ") !== -1) {
        widthConjuntoAtual += por100G.length;
        return model.posicao.xMm + (por100G.length - 20);
    } else if (precisaPularLinha) {
        return model.posicao.xMm + 1;
    } else {
        return model.posicao.xMm + (widthConjuntoAtual * (index * 1.5));
    }
}

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
            const rotuloSemParenteses = parametro.rotulo.replace(/[{()}]/g, '');
            if (!model.informacoesNutricionais.ocultarZerados || !matchArray.every((elemento: any) => elemento === "0")) {
                if (rotuloSemParenteses === "Valor energético kcal") {
                    informacoesNutricionais.push((rotuloSemParenteses + " (" + parametro.qt100 + " kcal" + ", " + parametro.valorDiario + "%") + ") ")
                } else if (rotuloSemParenteses === "Açúcares totais g") {
                    informacoesNutricionais.push(" dos quais " + rotuloSemParenteses + " (" + parametro.qt100 + " g" + ") ")
                } else if (rotuloSemParenteses === "Gorduras saturadas g") {
                    informacoesNutricionais.push((" das quais " + rotuloSemParenteses + " (" + parametro.qt100 + " g" + ", " + parametro.valorDiario + "%") + ") ")
                } else {
                    informacoesNutricionais.push((rotuloSemParenteses + " (" + parametro.qt100 + " g" + ", " + parametro.valorDiario + "%") + ") ")
                }
            }
        });

        // Parametros extras
        if (!!textBindings) {
            textBindings.parametrosExtrasNutricionalV2.forEach((parametro: any) => {
                const parametrosExtrasLength = textBindings.parametrosExtrasNutricionalV2.length;
                const rotuloSemParenteses = parametro.rotulo.replace(/[{()}]/g, '');
                informacoesNutricionais.push((rotuloSemParenteses + " (" + parametro.qt100 + " g" + ", " + parametro.valorDiario + "%") + ") ");
                porcao100g.indexOf("**") !== -1
                    ? desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 29)
                    : desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 28);
                porcao100g.indexOf("**") !== -1
                    ? desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, 29)
                    : desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, 28)

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

// const wrapText = function(ctx: CanvasRenderingContext2D, text: object, xMm: number, yMm: number, larguraMaxima: number, alturaDaLinha: number) {
//     debugger;
//     // First, start by splitting all of our text into words, but splitting it into an array split by spaces
//     let line = ""; // This will store the text of the current line
//     let testLine = ""; // This will store the text when we add a word, to test if it's too long
//     let lineArray = []; // This is an array of lines, which the function will return
//
//     // Lets iterate over each word
//     for(var n = 0; n < Object.keys(text).length; n++) {
//         console.log("line: " + line);
//         // Create a test line, and measure it..
//         testLine += text[n];
//         let metrics = ctx.measureText(testLine);
//         let testWidth = metrics.width;
//         // If the width of this test line is more than the max width
//         if (testWidth > larguraMaxima && n > 0) {
//             // Then the line is finished, push the current line into "lineArray"
//             lineArray.push([line, xMm, yMm]);
//             // Increase the line height, so a new line is started
//             yMm += alturaDaLinha;
//             // Update line and test line to use this word as the first word on the next line
//             line = text[n];
//             testLine = text[n];
//         }
//         else {
//             // If the test line is still less than the max width, then add the word to the current line
//             line += text[n];
//         }
//         // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
//         if(n === Object.keys(text).length - 1) {
//             lineArray.push([line, xMm, yMm]);
//         }
//     }
//     // Return the line array
//     return lineArray;
// }

export const tabelaNutricionalLinear = {drawTable};
