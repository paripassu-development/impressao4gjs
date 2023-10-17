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
        const parametrosPadroesNutricionalV2 = !!textBindings ? textBindings.parametrosPadroesNutricionalV2 : PARAMETROS_PADROES_NUTRICIONAL_V2;

        // variáveis de posicionamento na etiqueta
        let valorMaximoPosicaoX = larguraMaxima;
        let posicaoAtualCharNaLinha = 0;
        let yIncrementado = yMm;
        let xIncrementado = model.posicao.xMm + 1;

        // variáveis de texto das informações nutricionais
        let unidadeDoRotulo: string;
        let parametroExtraUnidade: string;
        let espaco: string = montaApenasEspaco();
        let parentesesInicial: string = montaApenasParentesesInicial();
        let virgula: string = montaApenasVirgula();
        let sinalPorcentagem: string = montaApenasSinalPorcentagem() + espaco;
        let parentesesFinal: string = montaApenasParentesesFinal();
        let quadradoVirtual = " ";

        let isBold = false;

        const por100GFormatado = "Por " + porcao100g + espaco + parentesesInicial + fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, textBindings) + virgula + espaco + getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario") + parentesesFinal + ": ";

        let informacoesNutricionaisDivididas: string[] = [];
        informacoesNutricionaisDivididas.push(por100GFormatado);

        parametrosPadroesNutricionalV2.forEach((parametro: any, index: number, array: any) => {
            const matchArray: any[] = parametro.qtPorcao.match(/[0-9]/mg, "");

            if (!model.informacoesNutricionais.ocultarZerados || !matchArray.every((elemento: any) => elemento === "0")) {

                const nomeNutrienteFormatado = montaApenasNomeNutriente(parametro) + espaco;
                const quantidade100 = montaApenasQuantidade100(parametro);
                unidadeDoRotulo = montaApenasUnidadeDoRotulo(parametro);
                const quantidadePorcao = montaApenasQuantidadePorcao(parametro) + espaco;
                const valorDiario = montaApenasValorDiario(parametro);

                informacoesNutricionaisDivididas.push(nomeNutrienteFormatado);
                informacoesNutricionaisDivididas.push(quantidade100);
                informacoesNutricionaisDivididas.push(unidadeDoRotulo + espaco);
                informacoesNutricionaisDivididas.push(parentesesInicial);
                informacoesNutricionaisDivididas.push("_" + quantidadePorcao + "_");
                informacoesNutricionaisDivididas.push("_" + unidadeDoRotulo + "_");
                informacoesNutricionaisDivididas.push(virgula);
                informacoesNutricionaisDivididas.push(valorDiario);
                informacoesNutricionaisDivididas.push(sinalPorcentagem);
                informacoesNutricionaisDivididas.push(parentesesFinal);
                informacoesNutricionaisDivididas.push(quadradoVirtual);
            }
        })

        // Parametros extras
        if (!!textBindings) {
            textBindings.parametrosExtrasNutricionalV2.forEach((parametro: any) => {
                // const parametrosExtrasLength = textBindings.parametrosExtrasNutricionalV2.length;
                const nomeParametroExtra = montaApenasNomeNutriente(parametro) + espaco;
                const parametroExtraQuantidade100 = montaApenasQuantidade100(parametro);
                parametroExtraUnidade = montaApenasUnidadeDoRotulo(parametro);
                const parametroExtraQuantidadePorcao = montaApenasQuantidadePorcao(parametro) + espaco;
                const parametroExtraValorDiario = montaApenasValorDiario(parametro);

                desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 28);
                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, 28);

                informacoesNutricionaisDivididas.push(nomeParametroExtra);
                informacoesNutricionaisDivididas.push(parametroExtraQuantidade100);
                informacoesNutricionaisDivididas.push(parametroExtraUnidade + espaco);
                informacoesNutricionaisDivididas.push(parentesesInicial);
                informacoesNutricionaisDivididas.push("_" + parametroExtraQuantidadePorcao + "_");
                informacoesNutricionaisDivididas.push("_" + parametroExtraUnidade + "_");
                informacoesNutricionaisDivididas.push(virgula);
                informacoesNutricionaisDivididas.push(parametroExtraValorDiario);
                informacoesNutricionaisDivididas.push(sinalPorcentagem);
                informacoesNutricionaisDivididas.push(parentesesFinal);
                informacoesNutricionaisDivididas.push(quadradoVirtual);

                if (textBindings.parametrosExtrasNutricionalV2.length > 3 && textBindings.parametrosExtrasNutricionalV2.length < 9) {
                    desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 33.5);
                    desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, 32.5);
                } else if (textBindings.parametrosExtrasNutricionalV2.length > 9) {
                    desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 36);
                    desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, 35);
                } else {
                    desenharLinhaContornoVerticalDireita(ctx, model, yMm - 15, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 32);
                    desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 20, model.posicao.xMm - 0.2, mm, 31);
                }
            });
        }

        console.clear();

        // Monta as informações nutricionais de forma linear
        informacoesNutricionaisDivididas.forEach((elemento: string, index: number, array: string[]) => {
            let tamanhoLengthCadaObjeto = elemento.length;
            let espacoEmBranco = 3;

            console.log("______________________________________________")
            console.log(elemento);
            console.log(index);

            if (verificaSeCabeNaLinha(posicaoAtualCharNaLinha, tamanhoLengthCadaObjeto, valorMaximoPosicaoX)) {

                if (verificaSeDesenhaQuadradoSeparador(elemento, index, array, quadradoVirtual)) {
                    desenharQuadradoSeparadorElementos(ctx, mm, model, yIncrementado - 0.9, posicaoAtualCharNaLinha + espacoEmBranco);
                } else if (verificaSeEhAcucaresTotais(index) || verificaSeEhGordurasTotais(index)) {
                    espacoEmBranco = 2.5;
                    strokeAlignedText(
                        ctx,
                        fabricCanvas,
                        valorMaximoPosicaoX,
                        verificaSeEhAcucaresTotais(index)
                            ? ", dos quais "
                            : ", das quais ",
                        posicaoAtualCharNaLinha + espacoEmBranco,
                        yIncrementado,
                        mm,
                        TextAlign.LEFT,
                        degrees,
                    )
                    posicaoAtualCharNaLinha += (tamanhoLengthCadaObjeto + 8.5);
                    // posicaoAtualCharNaLinha += tamanhoLengthCadaObjeto;
                } else if (elemento !== quadradoVirtual) {

                    if (elemento === parentesesInicial) {
                        espacoEmBranco = 3.5;
                    }

                    if (retiraVirgulaDosAcucaresTotais(index) || retiraPorcentagemDosAcucaresTotais(index)) {
                        elemento = elemento.slice(1, -1);
                    }

                    if (index === 38) {
                        espacoEmBranco = -5;
                    }

                    if (elemento.indexOf("_") !== -1 && elemento.indexOf("_") !== -1) {
                        elemento = elemento.slice(1, -1);
                        isBold = true;
                    } else {
                        isBold = false;
                    }

                    if (elemento === unidadeDoRotulo || elemento === parametroExtraUnidade) {
                        console.log("entrei aqui");
                        espacoEmBranco = 0.5;
                    }

                    if (elemento === virgula) {
                        espacoEmBranco = 0.5;
                    }

                    ctx.font = isBold
                        ? `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`
                        : `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;

                    strokeAlignedText(
                        ctx,
                        fabricCanvas,
                        valorMaximoPosicaoX,
                        elemento,
                        posicaoAtualCharNaLinha + espacoEmBranco,
                        yIncrementado,
                        mm,
                        TextAlign.LEFT,
                        degrees,
                    )
                }
                posicaoAtualCharNaLinha += 0.35;
                posicaoAtualCharNaLinha += tamanhoLengthCadaObjeto;
            } else {
                // Pula linha quando atingir a largura máxima
                valorMaximoPosicaoX = larguraMaxima;
                xIncrementado = model.posicao.xMm + 1;
                posicaoAtualCharNaLinha = 0;
                yIncrementado = yMm += 2.5;

                strokeAlignedText(
                    ctx,
                    fabricCanvas,
                    valorMaximoPosicaoX,
                    elemento,
                    xIncrementado,
                    yIncrementado,
                    mm,
                    TextAlign.LEFT,
                    degrees,
                )

                posicaoAtualCharNaLinha += tamanhoLengthCadaObjeto;
            }
        });

        yMm += lineStrokeGap;
        // -----------------------------------------------------------------------------------------------------
        desenharLinha(ctx, model, yMm, mm, ESPESSURA_ULTIMA_LINHA_NUTRIENTES_EM_PT);
        yMm += alturaLinhaMm / 1.5;

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
    }

    ctx.restore();
};

const verificaSeDesenhaQuadradoSeparador = (elemento: string, index: number, array: string[], quadradoVirtual: string) => {
    return elemento === quadradoVirtual
           && verificaSeEhUltimoElemento(index, array)
           && !verificaSeEhAcucaresTotais(index)
           && !verificaSeEhGordurasTotais(index);
}

const verificaSeEhUltimoElemento = (index: number, array: string[]) => {
    return index !== array.length - 1;
}

const verificaSeEhAcucaresTotais = (index: number) => {
    return index === 32;
}

const verificaSeEhGordurasTotais = (index: number) => {
    return index === 66;
}

const retiraVirgulaDosAcucaresTotais = (index: number) => {
    return index === 29;
}

const retiraPorcentagemDosAcucaresTotais = (index: number) => {
    return index === 31;
}

const verificaSeCabeNaLinha = (valorTotalAtual: number, valorDoProximoElemento: number, valorMaximoPosicaoX: number): boolean => {
    return (valorTotalAtual + valorDoProximoElemento) < valorMaximoPosicaoX;
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

export const desenharQuadradoSeparadorElementos = (ctx: CanvasRenderingContext2D, mm: any,  model: IElementoTabelaNutricionalModel, yMm: number, xMm: number) => {
    ctx.fillRect(mm(xMm), mm(yMm), 5, 5);
};

// TODO: Deixar essa budega bonita depois
const montaStringInteira = (parametro: any) => {
    const nome = montaApenasNomeNutriente(parametro);
    const quantidade100 = parametro.qt100;
    const unidade = pegaUnidadeDoRotulo(parametro.rotulo);
    const parentesesInicial = "(";
    const parentesesFinal = ")";
    const valorPorcao = parametro.qtPorcao;
    const virgula = ",";
    const valorDiario = parametro.valorDiario;
    const sinalPorcentagem = "%"
    const espaco = " ";

    return nome + espaco + quantidade100 + espaco + unidade + espaco + parentesesInicial + valorPorcao + espaco + unidade + virgula + espaco + valorDiario + sinalPorcentagem + parentesesFinal;
};

const montaApenasNomeNutriente = (parametro: any) => {
    const regexEspacosEmBrancoAntesDoNome = /^\s+/;
    return pegaValorRotuloSemUnidade(parametro.rotulo.replace(regexEspacosEmBrancoAntesDoNome, ''));
}

const montaApenasQuantidade100 = (parametro: any) => {
    return parametro.qt100 + montaApenasEspaco();
}

const montaApenasUnidadeDoRotulo = (parametro: any) => {
    return pegaUnidadeDoRotulo(parametro.rotulo);
}

const montaApenasParentesesInicial = () => {
    return "(";
}

const montaApenasQuantidadePorcao = (parametro: any) => {
    return parametro.qtPorcao;
}

const montaApenasVirgula = () => {
    return ",";
}

const montaApenasValorDiario = (parametro: any) => {
    return parametro.valorDiario;
}

const montaApenasSinalPorcentagem = () => {
    return "%";
}

const montaApenasParentesesFinal = () => {
    return ")";
}

const montaApenasEspaco = () => {
    return " ";
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
