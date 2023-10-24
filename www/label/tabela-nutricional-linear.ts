import {fabric} from "fabric";
import {
    calculaTamanhoFonteByAlturaMMEFontePadraoPT,
    converterPTparaMM,
    converterPtParaPX,
} from "../core/util/conversor-utils";
import {fillTemplate, getOrDefault} from "../core/util/param-utils";
import {
    alimentoProntoParaConsumo,
    setInformacoesV2PadraoZero,
} from "../core/util/tabela-nutricional-utils";
import {
    splitLines,
    strokeAlignedText,
    TextAlign, writeFabricText,
} from "../core/util/text-utils";
import {
    ACUCARES,
    ACUCARES_TOTAIS,
    ADICIONADOS,
    ALIMENTARES,
    BLACK,
    E_COMERCIAL,
    ESPACAMENTO_100G_000G_VD,
    ESPACAMENTO_CONTORNO_TABELA_EM_PT,
    ESPESSURA_LINHA_CONTORNO_EM_PT,
    ESPESSURA_LINHA_GROSSA_EM_PT,
    ESPESSURA_LINHA_PADRAO_EM_PT,
    ESPESSURA_ULTIMA_LINHA_NUTRIENTES_EM_PT,
    FIBRAS,
    GORDURAS,
    PARAMETROS_EXTRAS_PADROES_NUTRICIONAL_V2,
    PARAMETROS_PADROES_NUTRICIONAL_V2,
    SATURADAS,
    TAMANHO_FONTE_INFORMACOES_ADICIONAIS_EM_PT,
    TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT,
    TAMANHO_FONTE_REDUZIDA_TITULO_EM_PT,
    TOTAIS,
    TRANS,
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
    parametrosPadroesNutricionalV2: [any];
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
    const alturaLinhaMm = model.fonte.alturaMm * 1.46;
    const lineStrokeGap = alturaLinhaMm / 3;
    const posicaoXPorcoesPorEmbalagem = 1;
    let porcaoLength: number = "Porções por embalagem: ".length + (model.informacoesNutricionais.textoQuantidadeEmbalagem).length;
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
            xMm: (porcaoLength / 1.6) + 2,
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
        desenharLinhaContornoVerticalDireita(ctx, model, yMm - alturaLinhaMm, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 7.8);
        desenharQuadradoSeparador(ctx, mm, yMm - 1, model.posicao.xMm + (porcaoLength / 1.6));
    });

    yMm += alturaLinhaMm / 1.4;

    // Linha grossa ----------------------------------------------------------------------------------------------------
    desenharLinhaGrossa(ctx, model, yMm, mm);
    yMm += alturaLinhaMm + 1;

    // -----------------------------------------------------------------------------------------------------------------

    // Informações nutricionais
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
        const parametrosExtrasNutricionalV2 = !!textBindings ? textBindings.parametrosExtrasNutricionalV2 : PARAMETROS_EXTRAS_PADROES_NUTRICIONAL_V2;

        // variáveis de posicionamento na etiqueta
        let valorMaximoPosicaoX: number = larguraMaxima - 4;
        let posicaoAtualCharNaLinha: number = model.posicao.xMm + 1;
        let yIncrementado: number = yMm;
        let contadorIndex: number = 0;
        let contadorPulaLinhas: number = 0;

        // negrito
        let isBold: boolean = false;

        let informacoesNutricionaisDivididas: string[] = [];
        let parametrosExtrasDivididos: string[] = [];

        const elementosTextuais = {
            espaco: montaApenasEspaco(),
            parentesesInicial: montaApenasParentesesInicial(),
            virgula: montaApenasVirgula(),
            sinalPorcentagem: montaApenasSinalPorcentagem(),
            parentesesFinal: montaApenasParentesesFinal(),
            quadradoVirtual: montaApenasEspaco()
        }

        const por100GFormatado: string = "Por " + porcao100g + elementosTextuais.espaco + elementosTextuais.parentesesInicial +
            fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, textBindings) + elementosTextuais.virgula + elementosTextuais.espaco +
            getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario") + elementosTextuais.parentesesFinal + ": ";

        informacoesNutricionaisDivididas.push(por100GFormatado);

        parametrosPadroesNutricionalV2.forEach((parametro: any) => {
            montarInformacoesNutricionais(parametro, elementosTextuais, informacoesNutricionaisDivididas);

            if (parametrosExtrasNutricionalV2.length === 0) {
                desenharLinhaContornoVerticalDireita(ctx, model, yMm - 2, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 18);
                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 8, model.posicao.xMm - 0.2, mm, 21);
            }
        })

        parametrosExtrasNutricionalV2.forEach((parametro: any) => {
            montarInformacoesNutricionais(parametro, elementosTextuais, parametrosExtrasDivididos);
            montarInformacoesNutricionais(parametro, elementosTextuais, informacoesNutricionaisDivididas);

            if (parametrosExtrasNutricionalV2.length > 3 && parametrosExtrasNutricionalV2.length < 6) {
                desenharLinhaContornoVerticalDireita(ctx, model, yMm - 2, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 20.5);
                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 8, model.posicao.xMm - 0.2, mm, 21.5);
            } else if (parametrosExtrasNutricionalV2.length >= 6) {
                desenharLinhaContornoVerticalDireita(ctx, model, yMm - 2, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 23.5);
                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 8, model.posicao.xMm - 0.2, mm, 24);
            } else {
                desenharLinhaContornoVerticalDireita(ctx, model, yMm - 2, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 20.5);
                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 8, model.posicao.xMm - 0.2, mm, 21.5);
            }
        });

        // TODO verificar se a validação feita na linha 239 é suficiente!!!
        // if (!!textBindings) {
        //     textBindings.parametrosExtrasNutricionalV2.forEach((parametro: any) => {
        //         montarInformacoesNutricionais(parametro, elementosTextuais, informacoesNutricionaisDivididas);
        //
        //         if (textBindings.parametrosExtrasNutricionalV2.length > 3 && textBindings.parametrosExtrasNutricionalV2.length < 7) {
        //             desenharLinhaContornoVerticalDireita(ctx, model, yMm - 2, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 20.5);
        //             desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 8, model.posicao.xMm - 0.2, mm, 23);
        //         } else if (textBindings.parametrosExtrasNutricionalV2.length > 7) {
        //             desenharLinhaContornoVerticalDireita(ctx, model, yMm - 2, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 25);
        //             desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 8, model.posicao.xMm - 0.2, mm, 26);
        //         } else {
        //             desenharLinhaContornoVerticalDireita(ctx, model, yMm - 2, model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, 20.5);
        //             desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 8, model.posicao.xMm - 0.2, mm, 23);
        //         }
        //     });
        // }

        // Insere "dos quais" quando for Açúcares totais e "das quais" quando for Gorduras totais
        // Retira quadrado separador quando for Açúcares adicionados, Gorduras saturadas e trans
        informacoesNutricionaisDivididas[23] = montaApenasVirgula();

        informacoesNutricionaisDivididas.splice(24, 0, "dos");
        informacoesNutricionaisDivididas.splice(25, 0, " quais ");

        informacoesNutricionaisDivididas[34] = montaApenasVirgula();
        informacoesNutricionaisDivididas[69] = montaApenasVirgula();

        informacoesNutricionaisDivididas.splice(70, 0, "das");
        informacoesNutricionaisDivididas.splice(71, 0, " quais ");

        informacoesNutricionaisDivididas[83] = montaApenasVirgula();

        // Adicionar espaçamento no parâmetro extra quando for nome composto
        for (let i: number = 119; i < informacoesNutricionaisDivididas.length; i += verificaSeContemNumeroPulandoUmElemento(informacoesNutricionaisDivididas, i)) {
            if (verificaSeContemNumeroPulandoUmElemento(informacoesNutricionaisDivididas, i) === 12) {
                if (informacoesNutricionaisDivididas[i]) {
                    informacoesNutricionaisDivididas[i] = informacoesNutricionaisDivididas[i] + montaApenasEspaco();
                }

                if (informacoesNutricionaisDivididas[i + 1]) {
                    informacoesNutricionaisDivididas[i + 1] = informacoesNutricionaisDivididas[i + 1] + montaApenasEspaco();
                }
            }

        }

        // Monta as informações nutricionais de forma linear
        informacoesNutricionaisDivididas.forEach((elemento: string, index: number, array: string[]) => {
            let tamanhoProximoElemento: number;
            let tamanhoLengthCadaObjeto: number = elemento.length;
            let posicaoX: number = posicaoAtualCharNaLinha;
            let textAlign: string = contadorPulaLinhas === 0 ? TextAlign.LEFT : TextAlign.JUSTIFY;

            // Ajusta posicionamento virgula dos quais/das quais
            if (identificaVirgulasDosQuaisDasQuais(index)) {
                posicaoAtualCharNaLinha -= 0.75;
            }

            // Verifica se fonte é em negrito
            if (elemento.indexOf(E_COMERCIAL) !== -1) {
                verificaSeContemNumeroPulandoDoisElementos(array, index)
                    ? elemento = elemento.slice(1, -1)
                    : elemento = elemento.slice(1, -1) + montaApenasEspaco();
                tamanhoLengthCadaObjeto = elemento.length;
                isBold = true;
            } else {
                isBold = false;
            }

            // Verifica o tamanho do próximo elemento a ser printado na tela
            if (index < array.length - 1) {
                if (array[index + 1].indexOf(E_COMERCIAL) !== -1) {
                    tamanhoProximoElemento = array[index + 1].length - 2;
                } else {
                    tamanhoProximoElemento = array[index + 1].length;
                }
            }

            // Insere espaço entre os nomes compostos
            if (verificaSeEhNomeCompostoParaIncluirEspaco(elemento)) {
                elemento = elemento + montaApenasEspaco();
            }

            if (contadorPulaLinhas > 0 && contadorPulaLinhas < 6) {
                valorMaximoPosicaoX = larguraMaxima + 1;
            } else if (contadorPulaLinhas >= 6) {
                valorMaximoPosicaoX = larguraMaxima;
            }

            console.log("_______________________________________");
            // console.log(array);
            // console.log({elemento});
            // console.log({posicaoAtualCharNaLinha});
            // console.log({tamanhoProximoElemento});
            // console.log({tamanhoLengthCadaObjeto});
            // console.log({contadorIndex});
            // console.log({index});
            // console.log({contadorPulaLinhas});
            // console.log("cabe na linha? " + (verificaSeCabeNaLinha((posicaoAtualCharNaLinha - (0.35 * contadorIndex)), verificaSeEhUltimoElemento(index, array) ? 0 : tamanhoProximoElemento, valorMaximoPosicaoX)));


            if (verificaSeCabeNaLinha((posicaoAtualCharNaLinha - (0.35 * contadorIndex)), verificaSeEhUltimoElemento(index, array) ? 0 : tamanhoProximoElemento, valorMaximoPosicaoX)) {

                if (verificaSeDesenhaQuadradoSeparador(elemento, index, array, elementosTextuais.quadradoVirtual)) {
                    desenharQuadradoSeparador(ctx, mm, yIncrementado - 0.9, posicaoX);
                } else if (elemento !== elementosTextuais.quadradoVirtual) {
                    tamanhoLengthCadaObjeto = elemento.length;

                    ctx.font = isBold
                        ? `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`
                        : `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;

                    strokeAlignedText(
                        ctx,
                        fabricCanvas,
                        valorMaximoPosicaoX,
                        elemento,
                        posicaoAtualCharNaLinha,
                        yIncrementado,
                        mm,
                        textAlign,
                        degrees,
                    )
                }

                if (contadorPulaLinhas === 0) {
                    contadorIndex++;
                }

                // Forma para deixar texto mais alinhado com a borda direita (justificado)
                if (contadorPulaLinhas > 0 && contadorPulaLinhas < 5) {
                    posicaoAtualCharNaLinha += (0.34 * 2);
                } else if (contadorPulaLinhas >= 5) {
                    posicaoAtualCharNaLinha += 0.25;
                } else {
                    posicaoAtualCharNaLinha += 0.35;
                }
                posicaoAtualCharNaLinha += tamanhoLengthCadaObjeto;

            } else {
                // Pula linha quando atingir a largura máxima
                tamanhoLengthCadaObjeto = elemento.length;
                posicaoAtualCharNaLinha = model.posicao.xMm + 1;
                posicaoX = posicaoAtualCharNaLinha;
                yIncrementado = yMm += 2.5;
                contadorIndex = 0;

                if (verificaSeDesenhaQuadradoSeparador(elemento, index, array, elementosTextuais.quadradoVirtual)) {
                    desenharQuadradoSeparador(ctx, mm, yIncrementado - 0.9, posicaoX);
                    posicaoAtualCharNaLinha += (0.34 * 2);
                } else {
                    strokeAlignedText(
                        ctx,
                        fabricCanvas,
                        valorMaximoPosicaoX,
                        elemento,
                        posicaoAtualCharNaLinha,
                        yIncrementado,
                        mm,
                        textAlign,
                        degrees,
                    )
                }
                posicaoAtualCharNaLinha += tamanhoLengthCadaObjeto;
                contadorPulaLinhas++;
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

const verificaSeDesenhaQuadradoSeparador = (elemento: string, index: number, array: string[], quadradoVirtual: string): boolean => {
    return elemento === quadradoVirtual && !verificaSeEhUltimoElemento(index, array);
}

const verificaSeEhUltimoElemento = (index: number, array: string[]): boolean => {
    return index === array.length - 1;
}
const verificaSeCabeNaLinha = (valorTotalAtual: number, valorDoProximoElemento: number, valorMaximoPosicaoX: number): boolean => {
    return (valorTotalAtual + valorDoProximoElemento) < valorMaximoPosicaoX;
};

const verificaSeContemNumeroPulandoDoisElementos = (array: string[], index: number): RegExpMatchArray => {
    const contemNumeros:RegExp = /[0-9]/;
    return array[index + 2].match(contemNumeros);
}

const verificaSeContemNumeroPulandoUmElemento = (array: string[], index: number): number => {
    const contemNumeros:RegExp = /[0-9]/;
    if (array[index + 1].match(contemNumeros)) {
        return 11;
    } else {
        return 12;
    }
}

const verificaSeEhNomeCompostoParaIncluirEspaco = (elemento: string) => {
    return elemento.indexOf(ACUCARES) === 0 ||
           elemento.indexOf(GORDURAS) === 0 ||
           elemento.indexOf(FIBRAS) === 0 ||
            elemento.indexOf(TOTAIS) === 0 ||
            elemento.indexOf(ADICIONADOS) === 0 ||
            elemento.indexOf(SATURADAS) === 0 ||
            elemento.indexOf(TRANS) === 0 ||
            elemento.indexOf(ALIMENTARES) === 0
}

const identificaVirgulasDosQuaisDasQuais = (index: number) => {
    return index === 5 || index === 6 || index === 23 || index === 34 || index === 69 || index === 83
}

const montarInformacoesNutricionais = (parametro: any, elementosTextuais: any, informacoesNutricionaisDivididas: string[]) => {
    let unidadeDoRotulo: string;
    let valorDiario: string;

    const nomeNutrienteFormatado = montaApenasNomeNutriente(parametro) + elementosTextuais.espaco;
    const quantidade100 = montaApenasQuantidade100(parametro);
    unidadeDoRotulo = montaApenasUnidadeDoRotulo(parametro);
    const quantidadePorcao = montaApenasQuantidadePorcao(parametro);
    valorDiario = montaApenasValorDiario(parametro);

    separarNomesCompostosEmIndividuais(nomeNutrienteFormatado, informacoesNutricionaisDivididas);
    informacoesNutricionaisDivididas.push(quantidade100 + elementosTextuais.espaco);
    informacoesNutricionaisDivididas.push(unidadeDoRotulo + elementosTextuais.espaco);
    informacoesNutricionaisDivididas.push(elementosTextuais.parentesesInicial);
    informacoesNutricionaisDivididas.push(E_COMERCIAL + quantidadePorcao + E_COMERCIAL);
    informacoesNutricionaisDivididas.push(E_COMERCIAL + unidadeDoRotulo + E_COMERCIAL);
    if (!parametro.rotulo.includes(ACUCARES_TOTAIS)) {
        informacoesNutricionaisDivididas.push(elementosTextuais.virgula);
        informacoesNutricionaisDivididas.push(valorDiario);
        informacoesNutricionaisDivididas.push(elementosTextuais.sinalPorcentagem + elementosTextuais.espaco);
    }
    informacoesNutricionaisDivididas.push(elementosTextuais.parentesesFinal);
    informacoesNutricionaisDivididas.push(elementosTextuais.quadradoVirtual);
}

const separarNomesCompostosEmIndividuais = (nomeNutrienteFormatado: string, informacoesNutricionaisDivididas: string[]) => {
    const nomeCompostoNutrienteTamanho = nomeNutrienteFormatado.trim().split(/\s+/).length;
    let nomeCompostoNutriente: string[];

    if (nomeCompostoNutrienteTamanho > 1) {
        nomeCompostoNutriente = nomeNutrienteFormatado.split(" ", 2);
        informacoesNutricionaisDivididas.push(...nomeCompostoNutriente);
    } else {
        informacoesNutricionaisDivididas.push(nomeNutrienteFormatado);
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

export const desenharQuadradoSeparador = (ctx: CanvasRenderingContext2D, mm: any, yMm: number, xMm: number) => {
    ctx.fillRect(mm(xMm), mm(yMm), 5, 5);
};

const montaApenasNomeNutriente = (parametro: any) => {
    const regexEspacosEmBrancoAntesDoNome = /^\s+/;
    return pegaValorRotuloSemUnidade(parametro.rotulo.replace(regexEspacosEmBrancoAntesDoNome, ''));
}

const montaApenasQuantidade100 = (parametro: any) => {
    return parametro.qt100;
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
