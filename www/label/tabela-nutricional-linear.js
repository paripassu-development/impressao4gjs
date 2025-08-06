"use strict";
exports.__esModule = true;
var conversor_utils_1 = require("../core/util/conversor-utils");
var param_utils_1 = require("../core/util/param-utils");
var tabela_nutricional_utils_1 = require("../core/util/tabela-nutricional-utils");
var text_utils_1 = require("../core/util/text-utils");
var default_1 = require("../default");
var mm_1 = require("./mm");
var nutrientes = [
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
var drawTable = function (ctx, fabricCanvas, dpi, model, textBindings) {
    var textbindsTratada = textBindings ? textBindings : default_1.DADOS_DEFAULT;
    var unidadeTratada = tabela_nutricional_utils_1.extraiPorcao(textbindsTratada.porcaoNutricionalV2);
    tabela_nutricional_utils_1.setInformacoesV2PadraoZero(textbindsTratada);
    var mm = mm_1.mmPartial(dpi);
    ctx.save();
    var degrees = model.posicao.rotacao || 0;
    ctx.rotate(degrees * Math.PI / 180);
    ctx.fillStyle = default_1.BLACK;
    ctx.strokeStyle = default_1.BLACK;
    ctx.lineWidth = model.fonte.forcaContorno || 0;
    var larguraMaxima = model.dimensoes.larguraMaximaMm;
    var yMm = model.posicao.yMm;
    var alturaLinhaMm = model.fonte.alturaMm * 1.46;
    var lineStrokeGap = alturaLinhaMm / 3;
    var posicaoXPorcoesPorEmbalagem = 1;
    var porcao100G = param_utils_1.getOrDefault(model.informacoesNutricionais, "textoQt100");
    var porcao100Tratada = porcao100G.replace(tabela_nutricional_utils_1.extraiPorcao(porcao100G), unidadeTratada);
    if (tabela_nutricional_utils_1.alimentoProntoParaConsumo(textbindsTratada)) {
        porcao100Tratada += "**";
    }
    // Contorno de cima
    desenharLinhaContornoHorizontal(ctx, model, yMm, mm);
    yMm += alturaLinhaMm + 1;
    // Configurando fonte do Titulo
    ctx.font = "bold " + conversor_utils_1.calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, default_1.TAMANHO_FONTE_REDUZIDA_TITULO_EM_PT) + "mm " + model.fonte.nome;
    // Titulo INFORMAÇÕES NUTRICIONAIS ---------------------------------------------------------------------------------
    text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, param_utils_1.getOrDefault(model.informacoesNutricionais, "textoInformacaoNutricional"), model.posicao.xMm + 1, yMm, mm, text_utils_1.TextAlign.LEFT, degrees);
    // Linha normal ----------------------------------------------------------------------------------------------------
    yMm += alturaLinhaMm / 2.8;
    desenharLinha(ctx, model, yMm, mm, default_1.ESPESSURA_LINHA_PADRAO_EM_PT);
    desenharLinhaContornoVerticalDireita(ctx, model, yMm - (default_1.ESPACAMENTO_CONTORNO_TABELA_EM_PT * 6), model.posicao.xMm + (default_1.ESPACAMENTO_100G_000G_VD + 0.3), mm, 4);
    desenharLinhaContornoVerticalEsquerda(ctx, model, model.posicao.yMm, model.posicao.xMm - 0.2, mm, 4.8);
    yMm += alturaLinhaMm;
    // Configurando fonte de Informações e labels nutricionais
    ctx.font = conversor_utils_1.calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, default_1.TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT) + "mm " + model.fonte.nome;
    // -----------------------------------------------------------------------------------------------------------------
    // Porções por embalagem
    var porcaoLength = "Porções por embalagem: ".length + (param_utils_1.fillTemplate(model.informacoesNutricionais.textoQuantidadeEmbalagem, textbindsTratada)).length;
    var informacoesNutricionaisTextoPorcao = [
        {
            id: "Porções por embalagem: ",
            value: model.informacoesNutricionais.textoQuantidadeEmbalagem,
            caseira: null,
            xMm: posicaoXPorcoesPorEmbalagem
        },
        {
            id: "Porção: ",
            value: model.informacoesNutricionais.textoQuantidadePorPorcao,
            caseira: model.informacoesNutricionais.textoPorcaoCaseira,
            xMm: porcaoLength + (porcaoLength / 5.5)
        },
    ].map(function (infos) {
        text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, infos.id === "Porção: " ?
            (infos.id + param_utils_1.fillTemplate(infos.value, textbindsTratada)
                + " (" + param_utils_1.fillTemplate(infos.caseira, textbindsTratada)) + ")"
            : (infos.id + param_utils_1.fillTemplate(infos.value, textbindsTratada)), model.posicao.xMm + infos.xMm, yMm, mm, text_utils_1.TextAlign.LEFT, degrees);
        desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 3.3, model.posicao.xMm - 0.2, mm, 5.4);
        desenharLinhaContornoVerticalDireita(ctx, model, yMm - alturaLinhaMm, model.posicao.xMm + (default_1.ESPACAMENTO_100G_000G_VD + 0.3), mm, 7.8);
        exports.desenharQuadradoSeparador(ctx, mm, yMm - 1, model.posicao.xMm + (porcaoLength + (porcaoLength / 7.5)));
    });
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
        //             strokeAlignedText(ctx, fabricCanvas, larguraMaxima, fillTemplate(obj.id, textbindsTratada),
        //                 model.posicao.xMm + obj.xMm, yMm, mm, TextAlign.LEFT, degrees);
        //             yMm += alturaLinhaMm / 3;
        //             desenharLinhaContornoVerticalDireita(ctx, model, yMm - (ESPACAMENTO_100G_000G_VD / 3.6), model.posicao.xMm + (ESPACAMENTO_100G_000G_VD + 0.3), mm, ESPACAMENTO_100G_000G_VD / 2.2);
        //             desenharLinhaContornoVerticalEsquerda(ctx, model, yMm, model.posicao.xMm - 0.2, mm, ESPACAMENTO_100G_000G_VD / 1.8);
        //             // -----------------------------------------------------------------------------------------------------
        //         }
        //     });
        // });
    }
    else {
        var parametrosPadroesNutricionalV2_1 = !!textbindsTratada ? textbindsTratada.parametrosPadroesNutricionalV2 : default_1.PARAMETROS_PADROES_NUTRICIONAL_V2;
        var parametrosExtrasNutricionalV2_1 = !!textbindsTratada ? textbindsTratada.parametrosExtrasNutricionalV2 : default_1.PARAMETROS_EXTRAS_PADROES_NUTRICIONAL_V2;
        // variáveis de posicionamento na etiqueta
        var valorMaximoPosicaoX_1 = definirValorMaximoX(model, larguraMaxima, porcao100Tratada);
        var posicaoAtualCharNaLinha_1 = model.posicao.xMm + 1;
        var yIncrementado_1 = yMm;
        var contadorIndex_1 = 0;
        var contadorPulaLinhas_1 = 0;
        // negrito
        var isBold_1 = false;
        var informacoesNutricionaisDivididas_1 = [];
        var elementosTextuais_1 = {
            espaco: montaApenasEspaco(),
            parentesesInicial: montaApenasParentesesInicial(),
            virgula: montaApenasVirgula(),
            sinalPorcentagem: montaApenasSinalPorcentagem(),
            parentesesFinal: montaApenasParentesesFinal(),
            quadradoVirtual: montaApenasEspaco()
        };
        var por100GFormatado = "Por " + porcao100Tratada + elementosTextuais_1.espaco + elementosTextuais_1.parentesesInicial +
            param_utils_1.fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, textbindsTratada) + elementosTextuais_1.virgula + elementosTextuais_1.espaco +
            param_utils_1.getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario") + elementosTextuais_1.parentesesFinal + ": ";
        informacoesNutricionaisDivididas_1.push(por100GFormatado);
        parametrosPadroesNutricionalV2_1.forEach(function (parametro) {
            montarInformacoesNutricionais(parametro, elementosTextuais_1, informacoesNutricionaisDivididas_1, unidadeTratada);
            if (parametrosExtrasNutricionalV2_1.length === 0) {
                desenharLinhaContornoVerticalDireita(ctx, model, yMm - 2, model.posicao.xMm + (default_1.ESPACAMENTO_100G_000G_VD + 0.3), mm, 18 + parametrosPadroesNutricionalV2_1.length);
                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 8, model.posicao.xMm - 0.2, mm, 21 + parametrosPadroesNutricionalV2_1.length);
            }
        });
        parametrosExtrasNutricionalV2_1.forEach(function (parametro) {
            montarInformacoesNutricionais(parametro, elementosTextuais_1, informacoesNutricionaisDivididas_1, unidadeTratada);
            if (parametrosExtrasNutricionalV2_1.length > 3 && parametrosExtrasNutricionalV2_1.length < 6) {
                desenharLinhaContornoVerticalDireita(ctx, model, yMm - 2, model.posicao.xMm + (default_1.ESPACAMENTO_100G_000G_VD + 0.3), mm, 20.5);
                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 8, model.posicao.xMm - 0.2, mm, 21.5);
            }
            else if (parametrosExtrasNutricionalV2_1.length >= 6) {
                desenharLinhaContornoVerticalDireita(ctx, model, yMm - 2, model.posicao.xMm + (default_1.ESPACAMENTO_100G_000G_VD + 0.3), mm, 23.5);
                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 8, model.posicao.xMm - 0.2, mm, 24);
            }
            else {
                desenharLinhaContornoVerticalDireita(ctx, model, yMm - 2, model.posicao.xMm + (default_1.ESPACAMENTO_100G_000G_VD + 0.3), mm, 21.5 + parametrosPadroesNutricionalV2_1.length);
                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 8, model.posicao.xMm - 0.2, mm, 21.5 + parametrosPadroesNutricionalV2_1.length);
            }
        });
        // Insere "dos quais" quando for Açúcares totais e "das quais" quando for Gorduras totais
        // Retira quadrado separador quando for Açúcares adicionados, Gorduras saturadas e trans
        informacoesNutricionaisDivididas_1[23] = montaApenasVirgula();
        informacoesNutricionaisDivididas_1.splice(24, 0, "dos");
        informacoesNutricionaisDivididas_1.splice(25, 0, " quais ");
        informacoesNutricionaisDivididas_1[34] = montaApenasVirgula();
        informacoesNutricionaisDivididas_1[69] = montaApenasVirgula();
        informacoesNutricionaisDivididas_1.splice(70, 0, " das ");
        informacoesNutricionaisDivididas_1.splice(71, 0, " quais ");
        informacoesNutricionaisDivididas_1[83] = montaApenasVirgula();
        // Adicionar espaçamento no parâmetro extra quando for nome composto
        for (var i = 119; i < informacoesNutricionaisDivididas_1.length; i += verificaSeContemNumeroPulandoUmElemento(informacoesNutricionaisDivididas_1, i)) {
            if (verificaSeContemNumeroPulandoUmElemento(informacoesNutricionaisDivididas_1, i) === 12) {
                if (informacoesNutricionaisDivididas_1[i]) {
                    informacoesNutricionaisDivididas_1[i] = informacoesNutricionaisDivididas_1[i] + montaApenasEspaco();
                }
                if (informacoesNutricionaisDivididas_1[i + 1]) {
                    informacoesNutricionaisDivididas_1[i + 1] = informacoesNutricionaisDivididas_1[i + 1] + montaApenasEspaco();
                }
            }
        }
        // Monta as informações nutricionais de forma linear
        informacoesNutricionaisDivididas_1.forEach(function (elemento, index, array) {
            var tamanhoProximoElemento;
            var tamanhoLengthCadaObjeto = elemento.length;
            var posicaoX = posicaoAtualCharNaLinha_1;
            var textAlign = contadorPulaLinhas_1 === 0 ? text_utils_1.TextAlign.LEFT : text_utils_1.TextAlign.JUSTIFY;
            // Ajusta posicionamento virgula dos quais/das quais
            if (identificaVirgulasDosQuaisDasQuais(index)) {
                posicaoAtualCharNaLinha_1 -= 0.75;
            }
            // Verifica se fonte é em negrito
            if (elemento.indexOf(default_1.E_COMERCIAL) !== -1) {
                verificaSeContemNumeroPulandoDoisElementos(array, index)
                    ? elemento = elemento.slice(1, -1)
                    : elemento = elemento.slice(1, -1) + montaApenasEspaco();
                tamanhoLengthCadaObjeto = elemento.length;
                isBold_1 = true;
            }
            else {
                isBold_1 = false;
            }
            // Verifica o tamanho do próximo elemento a ser printado na tela
            if (index < array.length - 1) {
                // tslint:disable-next-line:prefer-conditional-expression
                if (array[index + 1].indexOf(default_1.E_COMERCIAL) !== -1) {
                    tamanhoProximoElemento = array[index + 1].length - 2;
                }
                else {
                    tamanhoProximoElemento = array[index + 1].length;
                }
            }
            // Insere espaço entre os nomes compostos
            if (verificaSeEhNomeCompostoParaIncluirEspaco(elemento)) {
                elemento = elemento + montaApenasEspaco();
            }
            if (contadorPulaLinhas_1 > 0 && contadorPulaLinhas_1 < 6) {
                valorMaximoPosicaoX_1 = (larguraMaxima - 1) + model.posicao.xMm;
            }
            else if (contadorPulaLinhas_1 >= 6) {
                // tslint:disable-next-line:prefer-conditional-expression
                if (model.posicao.xMm > 3) {
                    valorMaximoPosicaoX_1 = (larguraMaxima - 1) + model.posicao.xMm;
                }
                else {
                    valorMaximoPosicaoX_1 = larguraMaxima - model.posicao.xMm;
                }
            }
            if (verificaSeCabeNaLinha((posicaoAtualCharNaLinha_1 - (0.35 * contadorIndex_1)), verificaSeEhUltimoElemento(index, array) ? 0 : tamanhoProximoElemento, valorMaximoPosicaoX_1)) {
                if (verificaSeDesenhaQuadradoSeparador(elemento, index, array, elementosTextuais_1.quadradoVirtual)) {
                    exports.desenharQuadradoSeparador(ctx, mm, yIncrementado_1 - 0.9, posicaoX);
                }
                else if (elemento !== elementosTextuais_1.quadradoVirtual) {
                    tamanhoLengthCadaObjeto = elemento.length;
                    ctx.font = isBold_1
                        ? "bold " + conversor_utils_1.calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, default_1.TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT) + "mm " + model.fonte.nome
                        : conversor_utils_1.calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, default_1.TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT) + "mm " + model.fonte.nome;
                    text_utils_1.strokeAlignedText(ctx, fabricCanvas, valorMaximoPosicaoX_1, elemento, posicaoAtualCharNaLinha_1, yIncrementado_1, mm, textAlign, degrees);
                }
                if (contadorPulaLinhas_1 === 0) {
                    contadorIndex_1++;
                }
                // Forma para deixar texto mais alinhado com a borda direita (justificado)
                if (contadorPulaLinhas_1 > 0 && contadorPulaLinhas_1 < 5) {
                    posicaoAtualCharNaLinha_1 += (0.34 * 2);
                }
                else {
                    posicaoAtualCharNaLinha_1 += 0.35;
                }
                posicaoAtualCharNaLinha_1 += tamanhoLengthCadaObjeto;
            }
            else {
                // Pula linha quando atingir a largura máxima
                tamanhoLengthCadaObjeto = elemento.length;
                posicaoAtualCharNaLinha_1 = model.posicao.xMm + 1;
                posicaoX = posicaoAtualCharNaLinha_1;
                yIncrementado_1 = yMm += 2.5;
                contadorIndex_1 = 0;
                if (verificaSeDesenhaQuadradoSeparador(elemento, index, array, elementosTextuais_1.quadradoVirtual)) {
                    exports.desenharQuadradoSeparador(ctx, mm, yIncrementado_1 - 0.9, posicaoX);
                    posicaoAtualCharNaLinha_1 += (0.34 * 2);
                }
                else {
                    text_utils_1.strokeAlignedText(ctx, fabricCanvas, valorMaximoPosicaoX_1, elemento, posicaoAtualCharNaLinha_1, yIncrementado_1, mm, textAlign, degrees);
                }
                posicaoAtualCharNaLinha_1 += tamanhoLengthCadaObjeto;
                contadorPulaLinhas_1++;
            }
        });
        yMm += lineStrokeGap;
        // -----------------------------------------------------------------------------------------------------
        desenharLinha(ctx, model, yMm, mm, default_1.ESPESSURA_ULTIMA_LINHA_NUTRIENTES_EM_PT);
        yMm += alturaLinhaMm / 1.5;
        // Rodapé (informações adicionais)
        ctx.font = conversor_utils_1.calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, default_1.TAMANHO_FONTE_INFORMACOES_ADICIONAIS_EM_PT) + "mm " + model.fonte.nome;
        var informacoesAdicionais = [
            {
                id: "linhasInformacoesPercentual",
                value: text_utils_1.splitLines(model.informacoesAdicionais.texto, model.informacoesAdicionais.caracteresPorLinha)
            },
            {
                id: "linhasInformacaoAlimentoProntoParaConsumo",
                value: text_utils_1.splitLines(model.informacoesAdicionais.textoAlimentoProntoParaConsumo, model.informacoesAdicionais.caracteresPorLinha)
            },
        ].map(function (info) {
            if (!tabela_nutricional_utils_1.alimentoProntoParaConsumo(textbindsTratada) && info.id === "linhasInformacaoAlimentoProntoParaConsumo") {
                return;
            }
            info.value.forEach(function (item) {
                yMm += alturaLinhaMm / 4;
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, item, model.posicao.xMm + default_1.ESPACAMENTO_CONTORNO_TABELA_EM_PT, yMm, mm, text_utils_1.TextAlign.LEFT, degrees);
                desenharLinhaContornoVerticalDireita(ctx, model, yMm - 0.5, model.posicao.xMm + (default_1.ESPACAMENTO_100G_000G_VD + 0.3), mm, default_1.ESPACAMENTO_100G_000G_VD / 1.5);
                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 3.1, model.posicao.xMm - 0.2, mm, default_1.ESPACAMENTO_100G_000G_VD / 1.4);
                yMm += alturaLinhaMm / 2;
            });
        });
        // Contorno de baixo
        desenharLinhaContornoHorizontal(ctx, model, yMm, mm);
        yMm += alturaLinhaMm / 3;
    }
    ctx.restore();
};
var verificaSeDesenhaQuadradoSeparador = function (elemento, index, array, quadradoVirtual) {
    return elemento === quadradoVirtual && !verificaSeEhUltimoElemento(index, array);
};
var verificaSeEhUltimoElemento = function (index, array) {
    return index === array.length - 1;
};
var verificaSeCabeNaLinha = function (valorTotalAtual, valorDoProximoElemento, valorMaximoPosicaoX) {
    return (valorTotalAtual + valorDoProximoElemento) < valorMaximoPosicaoX;
};
var verificaSeContemNumeroPulandoDoisElementos = function (array, index) {
    var contemNumeros = /[0-9]/;
    return array[index + 2].match(contemNumeros);
};
var verificaSeContemNumeroPulandoUmElemento = function (array, index) {
    var contemNumeros = /[0-9]/;
    return array[index + 1].match(contemNumeros) ? 11 : 12;
};
var verificaSeEhNomeCompostoParaIncluirEspaco = function (elemento) {
    return elemento.indexOf(default_1.ACUCARES) === 0 ||
        elemento.indexOf(default_1.GORDURAS) === 0 ||
        elemento.indexOf(default_1.FIBRAS) === 0 ||
        elemento.indexOf(default_1.TOTAIS) === 0 ||
        elemento.indexOf(default_1.ADICIONADOS) === 0 ||
        elemento.indexOf(default_1.SATURADAS) === 0 ||
        elemento.indexOf(default_1.TRANS) === 0 ||
        elemento.indexOf(default_1.ALIMENTARES) === 0;
};
var definirValorMaximoX = function (model, larguraMaxima, porcao100g) {
    if (model.posicao.xMm === 0) {
        return porcao100g.indexOf("**") !== -1
            ? (larguraMaxima - 7) - model.posicao.xMm
            : (larguraMaxima - 6) - model.posicao.xMm;
    }
    else if (model.posicao.xMm > 0 && model.posicao.xMm < 3) {
        return porcao100g.indexOf("**") !== -1
            ? (larguraMaxima - 3) - model.posicao.xMm
            : (larguraMaxima - 4) - model.posicao.xMm;
    }
    else {
        return (larguraMaxima - 7) + model.posicao.xMm;
    }
};
var identificaVirgulasDosQuaisDasQuais = function (index) {
    return index === 5 || index === 6 || index === 23 || index === 34 || index === 69 || index === 83;
};
var montarInformacoesNutricionais = function (parametro, elementosTextuais, informacoesNutricionaisDivididas, unidadeTratada) {
    var unidadeDoRotulo;
    var valorDiario;
    var nomeNutrienteFormatado = montaApenasNomeNutriente(parametro) + elementosTextuais.espaco;
    var quantidade100 = montaApenasQuantidade100(parametro);
    unidadeDoRotulo = montaApenasUnidadeDoRotulo(parametro);
    var quantidadePorcao = montaApenasQuantidadePorcao(parametro);
    valorDiario = montaApenasValorDiario(parametro);
    var unidadeRotuloTratada = tabela_nutricional_utils_1.montaRotuloDinamicoUnidadePorcaoTabelaLinear(unidadeDoRotulo, unidadeTratada);
    separarNomesCompostosEmIndividuais(nomeNutrienteFormatado, informacoesNutricionaisDivididas);
    informacoesNutricionaisDivididas.push(quantidade100 + elementosTextuais.espaco);
    informacoesNutricionaisDivididas.push(unidadeRotuloTratada + elementosTextuais.espaco);
    informacoesNutricionaisDivididas.push(elementosTextuais.parentesesInicial);
    informacoesNutricionaisDivididas.push(default_1.E_COMERCIAL + quantidadePorcao + default_1.E_COMERCIAL);
    informacoesNutricionaisDivididas.push(default_1.E_COMERCIAL + unidadeRotuloTratada + default_1.E_COMERCIAL);
    if (!parametro.rotulo.includes(default_1.ACUCARES_TOTAIS)) {
        informacoesNutricionaisDivididas.push(elementosTextuais.virgula);
        informacoesNutricionaisDivididas.push(valorDiario);
        informacoesNutricionaisDivididas.push(elementosTextuais.sinalPorcentagem + elementosTextuais.espaco);
    }
    informacoesNutricionaisDivididas.push(elementosTextuais.parentesesFinal);
    informacoesNutricionaisDivididas.push(elementosTextuais.quadradoVirtual);
};
var separarNomesCompostosEmIndividuais = function (nomeNutrienteFormatado, informacoesNutricionaisDivididas) {
    var nomeCompostoNutrienteTamanho = nomeNutrienteFormatado.trim().split(/\s+/).length;
    var nomeCompostoNutriente;
    if (nomeCompostoNutrienteTamanho > 1) {
        nomeCompostoNutriente = nomeNutrienteFormatado.split(" ", 2);
        informacoesNutricionaisDivididas.push.apply(informacoesNutricionaisDivididas, nomeCompostoNutriente);
    }
    else {
        informacoesNutricionaisDivididas.push(nomeNutrienteFormatado);
    }
};
var desenharLinha = function (ctx, model, yMm, mm, espessuraLinha) {
    ctx.textAlign = text_utils_1.TextAlign.LEFT;
    ctx.lineWidth = conversor_utils_1.converterPtParaPX(espessuraLinha);
    // x, y, largura e altura
    ctx.strokeRect(mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm), 1);
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};
var desenharLinhaGrossa = function (ctx, model, yMm, mm) {
    ctx.textAlign = text_utils_1.TextAlign.LEFT;
    ctx.lineWidth = conversor_utils_1.converterPtParaPX(default_1.ESPESSURA_LINHA_GROSSA_EM_PT);
    // x, y, largura e altura
    ctx.strokeRect(mm(model.posicao.xMm + 1), mm(yMm), mm(model.dimensoes.larguraMaximaMm - 1.8), 1);
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};
var desenharLinhaContornoHorizontal = function (ctx, model, yMm, mm) {
    var espacoDireitaEEsquerda = 2;
    var espacoMargemInterna = conversor_utils_1.converterPTparaMM(default_1.ESPACAMENTO_CONTORNO_TABELA_EM_PT);
    var tamanhoLinhaContornoTotalMM = model.dimensoes.larguraMaximaMm + (espacoDireitaEEsquerda * espacoMargemInterna);
    ctx.textAlign = text_utils_1.TextAlign.LEFT;
    // x, y, largura e altura
    ctx.strokeRect(mm(model.posicao.xMm), mm(yMm), mm(tamanhoLinhaContornoTotalMM), 1);
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};
var desenharLinhaContornoVerticalDireita = function (ctx, model, yMm, xMm, mm, alturaLinhaVertical) {
    ctx.textAlign = text_utils_1.TextAlign.LEFT;
    ctx.lineWidth = conversor_utils_1.converterPtParaPX(default_1.ESPESSURA_LINHA_CONTORNO_EM_PT);
    // x, y, largura e altura
    ctx.strokeRect(mm((xMm + (model.dimensoes.larguraMaximaMm - default_1.TAMANHO_FONTE_REDUZIDA_INFORMACOES_EM_PT))), mm(yMm) - (model.fonte.alturaMm * default_1.TAMANHO_FONTE_REDUZIDA_TITULO_EM_PT), 1, mm(alturaLinhaVertical));
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};
var desenharLinhaContornoVerticalEsquerda = function (ctx, model, yMm, xMm, mm, alturaLinhaVertical) {
    ctx.textAlign = text_utils_1.TextAlign.LEFT;
    ctx.lineWidth = conversor_utils_1.converterPtParaPX(default_1.ESPESSURA_LINHA_CONTORNO_EM_PT);
    // x, y, largura e altura
    ctx.strokeRect(mm(xMm), mm(yMm) - (model.fonte.alturaMm - alturaLinhaVertical), 1, mm(alturaLinhaVertical));
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};
exports.desenharQuadradoSeparador = function (ctx, mm, yMm, xMm) {
    ctx.fillRect(mm(xMm), mm(yMm), 5, 5);
};
var montaApenasNomeNutriente = function (parametro) {
    var regexEspacosEmBrancoAntesDoNome = /^\s+/;
    return pegaValorRotuloSemUnidade(parametro.rotulo.replace(regexEspacosEmBrancoAntesDoNome, ""));
};
var montaApenasQuantidade100 = function (parametro) {
    return parametro.qt100;
};
var montaApenasUnidadeDoRotulo = function (parametro) {
    return pegaUnidadeDoRotulo(parametro.rotulo);
};
var montaApenasParentesesInicial = function () {
    return "(";
};
var montaApenasQuantidadePorcao = function (parametro) {
    return parametro.qtPorcao;
};
var montaApenasVirgula = function () {
    return ",";
};
var montaApenasValorDiario = function (parametro) {
    return parametro.valorDiario;
};
var montaApenasSinalPorcentagem = function () {
    return "%";
};
var montaApenasParentesesFinal = function () {
    return ")";
};
var montaApenasEspaco = function () {
    return " ";
};
var pegaUnidadeDoRotulo = function (rotuloCompleto) {
    var regexString = /\(([^()]+)\)/g;
    var regexParenteses = /[{()}]/g;
    return rotuloCompleto.match(regexString)[0].replace(regexParenteses, "");
};
var pegaValorRotuloSemUnidade = function (rotuloCompleto) {
    var regexString = /(.+?)\s*\(.+?\)/;
    return rotuloCompleto.match(regexString)[1];
};
exports.tabelaNutricionalLinear = { drawTable: drawTable };
//# sourceMappingURL=tabela-nutricional-linear.js.map