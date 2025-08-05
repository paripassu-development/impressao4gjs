"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var constants_impressao_1 = require("../core/constants/constants-impressao");
var conversor_utils_1 = require("../core/util/conversor-utils");
var param_utils_1 = require("../core/util/param-utils");
var tabela_nutricional_utils_1 = require("../core/util/tabela-nutricional-utils");
var text_utils_1 = require("../core/util/text-utils");
var _ = require("lodash");
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
var drawTable = function (ctx, fabricCanvas, dpi, model, textBindings) { return __awaiter(_this, void 0, void 0, function () {
    var textbindsTratada, unidadeTratada, TABELA_SIMPLIFICADA, mm, degrees, larguraMaxima, yMm, alturaLinhaMm, lineStrokeGap, posicaoX100g, posicaoX000g, posicaoXValorDiario, valorEspacamentoYMmRotulos, valorEspacamentoYMmValores, porcao100G, porcao100Tratada, informacoesNutricionaisTextoPorcao, valorPorcaoDefaultEdicao, porcaoXTratada, cabecalhoPorcao100, cabecalhoPorcaoX, cabecalhoValorDiario, textoCabecalhoMedidas, parametrosPadroesNutricionalV2, texto, naoVisiveis, listaNutrientesZerados, linhasInformacoesAdicionais, informacoesAdicionais;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                textbindsTratada = textBindings ? textBindings : default_1.DADOS_DEFAULT;
                unidadeTratada = tabela_nutricional_utils_1.extraiPorcao(textbindsTratada.porcaoNutricionalV2);
                return [4 /*yield*/, tabela_nutricional_utils_1.contemTodasRegrasTabelaSimplificada(textbindsTratada.tabelaSimplificada)];
            case 1:
                TABELA_SIMPLIFICADA = _a.sent();
                tabela_nutricional_utils_1.setInformacoesV2PadraoZero(textBindings);
                mm = mm_1.mmPartial(dpi);
                ctx.save();
                degrees = model.posicao.rotacao || 0;
                ctx.rotate(degrees * Math.PI / 180);
                ctx.fillStyle = default_1.BLACK;
                ctx.strokeStyle = default_1.BLACK;
                ctx.lineWidth = model.fonte.forcaContorno || 0;
                larguraMaxima = model.dimensoes.larguraMaximaMm;
                yMm = model.posicao.yMm;
                alturaLinhaMm = model.fonte.alturaMm * 1.2;
                lineStrokeGap = alturaLinhaMm / 3;
                posicaoX100g = model.posicao.xMm - (alturaLinhaMm * 6);
                posicaoX000g = model.posicao.xMm - (alturaLinhaMm * 3.1);
                posicaoXValorDiario = model.posicao.xMm - (alturaLinhaMm / 2.5);
                valorEspacamentoYMmRotulos = 0.38;
                valorEspacamentoYMmValores = 0.46;
                porcao100G = param_utils_1.getOrDefault(model.informacoesNutricionais, "textoQt100");
                porcao100Tratada = porcao100G.replace(tabela_nutricional_utils_1.extraiPorcao(porcao100G), unidadeTratada);
                // Contorno de cima
                desenharLinhaContornoHorizontal(ctx, model, yMm, mm);
                yMm += lineStrokeGap;
                yMm += alturaLinhaMm;
                // Configurando fonte do Titulo
                ctx.font = "bold " + conversor_utils_1.calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, default_1.TAMANHO_FONTE_PADRAO_TITULO_EM_PT) + "mm " + model.fonte.nome;
                // Titulo INFORMAÇÕES NUTRICIONAIS ---------------------------------------------------------------------------------
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, param_utils_1.getOrDefault(model.informacoesNutricionais, "textoInformacaoNutricional"), model.posicao.xMm, yMm, mm, text_utils_1.TextAlign.CENTER, degrees);
                // Linha normal ----------------------------------------------------------------------------------------------------
                yMm += lineStrokeGap;
                desenharLinha(ctx, model, yMm, mm, default_1.ESPESSURA_LINHA_PADRAO_EM_PT);
                desenharLinhaContornoVerticalDireita(ctx, model, yMm - (default_1.ESPACAMENTO_CONTORNO_TABELA_EM_PT * 6.4), model.posicao.xMm + (default_1.ESPACAMENTO_100G_000G_VD + 2.2), mm, 5.5);
                desenharLinhaContornoVerticalEsquerda(ctx, model, model.posicao.yMm, model.posicao.xMm, mm, 5.3);
                yMm += alturaLinhaMm;
                // Configurando fonte de Informações e labels nutricionais
                ctx.font = conversor_utils_1.calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, default_1.TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT) + "mm " + model.fonte.nome;
                informacoesNutricionaisTextoPorcao = [
                    {
                        id: 0,
                        titulo: "Porções por embalagem: ",
                        value: model.informacoesNutricionais.textoQuantidadeEmbalagem,
                        caseira: ""
                    },
                    {
                        id: 1,
                        titulo: "Porção: ",
                        value: model.informacoesNutricionais.textoQuantidadePorPorcao,
                        caseira: model.informacoesNutricionais.textoPorcaoCaseira
                    },
                ].map(function (infos) {
                    var textoPorcao = param_utils_1.fillTemplate(infos.value, textBindings);
                    text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, infos.id === 1 ?
                        (infos.titulo + text_utils_1.adicionarEspacoEntreNumeroELetra(textoPorcao)
                            + " " + "(" + param_utils_1.fillTemplate(infos.caseira, textBindings)) + ")"
                        : (infos.titulo + text_utils_1.adicionarEspacoEntreNumeroELetra(textoPorcao)), model.posicao.xMm + default_1.ESPACAMENTO_CONTORNO_TABELA_EM_PT, infos.id === 0 ? yMm + 0.2
                        : yMm + 1, mm, text_utils_1.TextAlign.LEFT, degrees);
                    yMm += alturaLinhaMm / 1.5;
                    desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - default_1.ESPACAMENTO_100G_000G_VD, model.posicao.xMm, mm, default_1.ESPACAMENTO_100G_000G_VD + 1);
                });
                desenharLinhaContornoVerticalDireita(ctx, model, yMm - (alturaLinhaMm * 1.6), model.posicao.xMm + (default_1.ESPACAMENTO_100G_000G_VD + 2.2), mm, default_1.ESPACAMENTO_100G_000G_VD + 2.6);
                // Linha grossa ----------------------------------------------------------------------------------------------------
                yMm += lineStrokeGap;
                desenharLinha(ctx, model, yMm, mm, default_1.ESPESSURA_LINHA_GROSSA_EM_PT);
                yMm += alturaLinhaMm * 1.5;
                // -----------------------------------------------------------------------------------------------------------------
                // 100 g 000 g e %VD*
                ctx.font = "bold " + conversor_utils_1.calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, default_1.TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT) + "mm " + model.fonte.nome;
                ctx.textAlign = text_utils_1.TextAlign.RIGHT;
                valorPorcaoDefaultEdicao = (textBindings && textBindings.porcaoNutricionalV2) ? textBindings : default_1.DADOS_DEFAULT;
                porcaoXTratada = text_utils_1.adicionarEspacoEntreNumeroELetra(param_utils_1.fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, valorPorcaoDefaultEdicao));
                if (tabela_nutricional_utils_1.alimentoProntoParaConsumo(textBindings)) {
                    (!TABELA_SIMPLIFICADA)
                        ? porcao100Tratada += default_1.INDICADOR_ALIMENTO_PRONTO_PARA_CONSUMO
                        : porcaoXTratada += default_1.INDICADOR_ALIMENTO_PRONTO_PARA_CONSUMO;
                }
                cabecalhoPorcao100 = {
                    // @ts-ignore
                    id: 1,
                    value: porcao100Tratada,
                    xMm: posicaoX100g
                };
                cabecalhoPorcaoX = {
                    id: 2,
                    value: porcaoXTratada,
                    xMm: posicaoX000g
                };
                cabecalhoValorDiario = {
                    id: 3,
                    value: param_utils_1.getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario"),
                    xMm: posicaoXValorDiario
                };
                textoCabecalhoMedidas = [];
                if (!TABELA_SIMPLIFICADA) {
                    textoCabecalhoMedidas.push(cabecalhoPorcao100);
                }
                textoCabecalhoMedidas.push(cabecalhoPorcaoX);
                textoCabecalhoMedidas.push(cabecalhoValorDiario);
                textoCabecalhoMedidas.map(function (medida) {
                    // ------ Texto Cabeçalho
                    /* TODO
                        - Foi necessário adicionar um ternário aninhado para centralizar a informação da coluna Quantidade Porcao "15g"
                        - E outro ternário para centralizar a informação quando o porcao100g for 100g ou 100g**
                    */
                    var alturaLinhaVertical = conversor_utils_1.converterPTparaMM(default_1.TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT) + alturaLinhaMm / 1.5;
                    if (!!fabricCanvas) {
                        text_utils_1.writeFabricText(fabricCanvas, ctx, medida.value, medida.xMm, yMm, larguraMaxima, mm, { degrees: degrees });
                    }
                    else {
                        text_utils_1.strokeAlignedText(ctx, fabricCanvas, medida.id === 2
                            ? tabela_nutricional_utils_1.calcularPosicaoCentralizadaTextoQuantidadePorcao("v2Normal", larguraMaxima, medida.value)
                            : medida.value === porcao100Tratada.replace("**", "")
                                ? larguraMaxima - 0.6
                                : larguraMaxima + 0.3, text_utils_1.adicionarEspacoEntreNumeroELetra(medida.value), medida.xMm, yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                    }
                    desenharLinhaVertical(ctx, model, model.posicao.yMm + default_1.ESPACAMENTO_100G_000G_VD * 2.8, medida.value === porcao100Tratada ? medida.xMm - 1.5 : medida.xMm, mm, alturaLinhaVertical + 0.6);
                    desenharLinhaContornoVerticalDireita(ctx, model, model.posicao.yMm + default_1.ESPACAMENTO_100G_000G_VD * 2.8, model.posicao.xMm + (default_1.ESPACAMENTO_100G_000G_VD + 2.2), mm, alturaLinhaVertical - 0.2);
                    desenharLinhaContornoVerticalEsquerda(ctx, model, model.posicao.yMm + default_1.ESPACAMENTO_100G_000G_VD * 2.2, model.posicao.xMm, mm, alturaLinhaVertical + 1.8);
                });
                ctx.font = conversor_utils_1.calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, default_1.TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT) + "mm " + model.fonte.nome;
                yMm += lineStrokeGap;
                desenharLinha(ctx, model, yMm, mm, default_1.ESPESSURA_LINHA_PADRAO_EM_PT);
                // -----------------------------------------------------------------------------------------------------------------
                // Informações nutricionais
                if (model.informacoesNutricionais !== undefined && model.informacoesNutricionais.informacoesNutrientesTabelaNutricional !== undefined) {
                    nutrientes.forEach(function (nutriente) {
                        if (_.includes(nutriente.rotulo, "Açúcares adicionados (g)") &&
                            calcularDiferencaDpiLarguraMaximaMm(dpi, model.dimensoes.larguraMaximaMm) < 470) {
                            nutriente.rotulo = renomeioParaAbreviacao(nutriente.rotulo);
                        }
                        textoCabecalhoMedidas.map(function (obj) {
                            // TODO Verificar como deixar responsivas as linhas verticais
                            var alturaLinhaVertical = conversor_utils_1.converterPTparaMM(default_1.TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT) + lineStrokeGap;
                            obj.id = model.informacoesNutricionais.informacoesNutrientesTabelaNutricional[nutriente];
                            if (obj.id !== undefined) {
                                yMm += alturaLinhaMm / 1.7;
                                ctx.textAlign = text_utils_1.TextAlign.LEFT;
                                var nomeNutriente = param_utils_1.getOrDefault(obj.id, "nome");
                                if (!!fabricCanvas) {
                                    text_utils_1.writeFabricText(fabricCanvas, ctx, nomeNutriente, obj.xMm, yMm, larguraMaxima, mm, { degrees: degrees });
                                }
                                else {
                                    ctx.strokeText(nomeNutriente, mm(obj.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                                }
                                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, param_utils_1.fillTemplate(obj.id, textBindings), obj.xMm, yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                                yMm += lineStrokeGap;
                                desenharLinhaVertical(ctx, model, yMm - 2, obj.value === porcao100Tratada ? obj.xMm - 1.5 : obj.xMm, mm, alturaLinhaVertical);
                                desenharLinhaContornoVerticalDireita(ctx, model, yMm - (default_1.ESPACAMENTO_100G_000G_VD / 3.6), model.posicao.xMm + (default_1.ESPACAMENTO_100G_000G_VD + 2.3), mm, default_1.ESPACAMENTO_100G_000G_VD / 1.8);
                                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - (default_1.ESPACAMENTO_100G_000G_VD / 1.8), model.posicao.xMm, mm, default_1.ESPACAMENTO_100G_000G_VD / 1.8);
                                desenharLinha(ctx, model, yMm, mm, default_1.ESPESSURA_LINHA_PADRAO_EM_PT);
                                // -----------------------------------------------------------------------------------------------------
                            }
                        });
                    });
                }
                else {
                    parametrosPadroesNutricionalV2 = !!textBindings ? textBindings.parametrosPadroesNutricionalV2 : default_1.PARAMETROS_PADROES_NUTRICIONAL_V2;
                    parametrosPadroesNutricionalV2.forEach(function (nutriente) {
                        if (_.includes(nutriente.rotulo, "Açúcares adicionados (g)") &&
                            calcularDiferencaDpiLarguraMaximaMm(dpi, model.dimensoes.larguraMaximaMm) < 470) {
                            nutriente.rotulo = renomeioParaAbreviacao(nutriente.rotulo);
                        }
                        var alturaLinhaVertical = conversor_utils_1.converterPTparaMM(default_1.TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT) + lineStrokeGap;
                        var matchArray = nutriente.qtPorcao.match(/[0-9]/mg, "");
                        if (!model.informacoesNutricionais.ocultarZerados || (matchArray && !matchArray.every(function (elemento) { return elemento === "0" || !elemento; }))) {
                            yMm += alturaLinhaMm / 1.7;
                            var yMmValores = yMm + valorEspacamentoYMmValores;
                            var yMmTextoRotulo = yMm + valorEspacamentoYMmRotulos;
                            ctx.textAlign = text_utils_1.TextAlign.LEFT;
                            var porcaoNutricional = (textBindings && textBindings.porcaoNutricionalV2) ? textBindings.porcaoNutricionalV2 : default_1.DADOS_DEFAULT.porcaoNutricionalV2;
                            if (!!fabricCanvas) {
                                text_utils_1.writeFabricText(fabricCanvas, ctx, tabela_nutricional_utils_1.montaRotuloDinamicoUnidadePorcaoTabelaVertical(nutriente.rotulo, porcaoNutricional), model.posicao.xMm, yMm, larguraMaxima, mm, { degrees: degrees });
                            }
                            else {
                                ctx.strokeText(tabela_nutricional_utils_1.montaRotuloDinamicoUnidadePorcaoTabelaVertical(nutriente.rotulo, porcaoNutricional), mm(model.posicao.xMm + default_1.ESPACAMENTO_CONTORNO_TABELA_EM_PT), mm(yMmTextoRotulo), mm(model.dimensoes.larguraMaximaMm));
                            }
                            if (TABELA_SIMPLIFICADA === false) {
                                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, nutriente.qt100, tabela_nutricional_utils_1.calcularPosicaoCentralizadaTabelaNutricional("v2Normal", "qt100", posicaoX100g, nutriente.qt100), yMmValores, mm, text_utils_1.TextAlign.RIGHT, degrees);
                            }
                            text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, nutriente.qtPorcao, tabela_nutricional_utils_1.calcularPosicaoCentralizadaTabelaNutricional("v2Normal", "qtPorcao", posicaoX000g, nutriente.qtPorcao), yMmValores, mm, text_utils_1.TextAlign.RIGHT, degrees);
                            text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, nutriente.valorDiario, tabela_nutricional_utils_1.calcularPosicaoCentralizadaTabelaNutricional("v2Normal", "valorDiario", posicaoXValorDiario, nutriente.valorDiario), yMmValores, mm, text_utils_1.TextAlign.RIGHT, degrees);
                            yMm += lineStrokeGap;
                            textoCabecalhoMedidas.map(function (obj) {
                                desenharLinhaVertical(ctx, model, yMm - 2, obj.value === porcao100Tratada ? obj.xMm - 1.5 : obj.xMm, mm, alturaLinhaVertical);
                                desenharLinhaContornoVerticalDireita(ctx, model, yMm - (default_1.ESPACAMENTO_100G_000G_VD / 3), model.posicao.xMm + (default_1.ESPACAMENTO_100G_000G_VD + 2.2), mm, default_1.ESPACAMENTO_100G_000G_VD / 1.8);
                                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - (default_1.ESPACAMENTO_100G_000G_VD / 1.8), model.posicao.xMm, mm, default_1.ESPACAMENTO_100G_000G_VD / 1.8);
                                desenharLinha(ctx, model, yMm, mm, default_1.ESPESSURA_LINHA_PADRAO_EM_PT);
                            });
                            // -----------------------------------------------------------------------------------------------------
                        }
                    });
                    // -----------------------------------------------------------------------------------------------------------------
                    // Parametros extras
                    if (!!textBindings) {
                        textBindings.parametrosExtrasNutricionalV2.forEach(function (parametro) {
                            yMm += alturaLinhaMm / 1.7;
                            var yMmValores = yMm + valorEspacamentoYMmValores;
                            var yMmTextoRotulo = yMm + valorEspacamentoYMmRotulos;
                            ctx.textAlign = text_utils_1.TextAlign.LEFT;
                            if (!!fabricCanvas) {
                                text_utils_1.writeFabricText(fabricCanvas, ctx, parametro.rotulo, model.posicao.xMm, yMm, larguraMaxima, mm, { degrees: degrees });
                            }
                            else {
                                ctx.strokeText(parametro.rotulo, mm(model.posicao.xMm + default_1.ESPACAMENTO_CONTORNO_TABELA_EM_PT), mm(yMmTextoRotulo), mm(model.dimensoes.larguraMaximaMm));
                            }
                            if (TABELA_SIMPLIFICADA === false) {
                                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qt100, tabela_nutricional_utils_1.calcularPosicaoCentralizadaTabelaNutricional("v2Normal", "qt100", posicaoX100g, parametro.qt100), yMmValores, mm, text_utils_1.TextAlign.RIGHT, degrees);
                            }
                            text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, tabela_nutricional_utils_1.calcularPosicaoCentralizadaTabelaNutricional("v2Normal", "qtPorcao", posicaoX000g, parametro.qtPorcao), yMmValores, mm, text_utils_1.TextAlign.RIGHT, degrees);
                            text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.valorDiario, tabela_nutricional_utils_1.calcularPosicaoCentralizadaTabelaNutricional("v2Normal", "valorDiario", posicaoXValorDiario + 0.1, parametro.valorDiario), yMmValores, mm, text_utils_1.TextAlign.RIGHT, degrees);
                            yMm += lineStrokeGap;
                            textoCabecalhoMedidas.map(function (obj) {
                                desenharLinhaVertical(ctx, model, yMm - (default_1.ESPACAMENTO_100G_000G_VD / 3), obj.value === porcao100Tratada ? obj.xMm - 1.5 : obj.xMm, mm, (default_1.ESPACAMENTO_100G_000G_VD / 1.6));
                                desenharLinhaContornoVerticalDireita(ctx, model, yMm - (default_1.ESPACAMENTO_100G_000G_VD / 3.6), model.posicao.xMm + (default_1.ESPACAMENTO_100G_000G_VD + 2.2), mm, default_1.ESPACAMENTO_100G_000G_VD / 1.5);
                                desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - (default_1.ESPACAMENTO_100G_000G_VD / 1.8), model.posicao.xMm, mm, default_1.ESPACAMENTO_100G_000G_VD / 1.8);
                            });
                            desenharLinha(ctx, model, yMm, mm, default_1.ESPESSURA_LINHA_PADRAO_EM_PT);
                            // -----------------------------------------------------------------------------------------------------
                        });
                        desenharLinha(ctx, model, yMm, mm, default_1.ESPESSURA_ULTIMA_LINHA_NUTRIENTES_EM_PT);
                        texto = "";
                        if (model.informacoesNutricionais.ocultarZerados && !possuiAvisoNutricionaisZerados(model.informacoesAdicionais.texto, texto)) {
                            naoVisiveis = textBindings.parametrosPadroesNutricionalV2.filter(function (parametro) {
                                return parametro.qtPorcao.match(/[0-9]/mg, "").every(function (elemento) { return elemento === "0"; });
                            });
                            if (naoVisiveis.length > 0) {
                                texto = texto.concat(naoVisiveis.map(function (parametro) {
                                    return parametro.rotulo.toUpperCase();
                                }).join(", ")).concat(". ");
                                model.informacoesAdicionais.texto = texto.concat(model.informacoesAdicionais.texto);
                            }
                        }
                    }
                    listaNutrientesZerados = tabela_nutricional_utils_1.extraiNutrientesVazios(parametrosPadroesNutricionalV2);
                    if (model.informacoesNutricionais.ocultarZerados && listaNutrientesZerados.length !== 0) {
                        desenharLinha(ctx, model, yMm, mm, default_1.ESPESSURA_LINHA_MEDIA_EM_PT);
                        yMm += alturaLinhaMm / 1.2;
                        linhasInformacoesAdicionais = text_utils_1.splitLines(tabela_nutricional_utils_1.montaTextoNaoContemQuantidadesSignificativasDe(listaNutrientesZerados), model.informacoesAdicionais.caracteresPorLinha);
                        desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - (default_1.ESPACAMENTO_LINHA_NAO_CONTEM_QUANTIDADES_SIGNIFICATIVAS / 1.8), model.posicao.xMm, mm, alturaLinhaMm * 2.5);
                        desenharLinhaContornoVerticalDireita(ctx, model, yMm - (default_1.ESPACAMENTO_LINHA_NAO_CONTEM_QUANTIDADES_SIGNIFICATIVAS / 3.6), model.posicao.xMm + (default_1.ESPACAMENTO_LINHA_NAO_CONTEM_QUANTIDADES_SIGNIFICATIVAS + 2.2), mm, (default_1.ESPACAMENTO_LINHA_NAO_CONTEM_QUANTIDADES_SIGNIFICATIVAS / 1.5));
                        linhasInformacoesAdicionais.forEach(function (linha) {
                            text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, linha, model.posicao.xMm + default_1.ESPACAMENTO_CONTORNO_TABELA_EM_PT, yMm, mm, text_utils_1.TextAlign.LEFT, degrees);
                            yMm += alturaLinhaMm / 1.6;
                        });
                        desenharLinha(ctx, model, yMm, mm, default_1.ESPESSURA_LINHA_PADRAO_EM_PT);
                    }
                    // Fim Não contém quantidades significativas de
                    // -------------------------------------------------------------------------------------------------------------«
                }
                yMm += alturaLinhaMm / 2;
                // -----------------------------------------------------------------------------------------------------------------
                // Rodapé (informações adicionais)
                ctx.font = conversor_utils_1.calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, default_1.TAMANHO_FONTE_INFORMACOES_ADICIONAIS_EM_PT) + "mm " + model.fonte.nome;
                informacoesAdicionais = [
                    {
                        id: "linhasInformacoesPercentual",
                        value: text_utils_1.splitLines(model.informacoesAdicionais.texto, model.informacoesAdicionais.caracteresPorLinha)
                    },
                    {
                        id: "linhasInformacaoAlimentoProntoParaConsumo",
                        value: text_utils_1.splitLines(model.informacoesAdicionais.textoAlimentoProntoParaConsumo, model.informacoesAdicionais.caracteresPorLinha)
                    },
                ].map(function (info) {
                    if (!tabela_nutricional_utils_1.alimentoProntoParaConsumo(textBindings) && info.id === "linhasInformacaoAlimentoProntoParaConsumo") {
                        return;
                    }
                    info.value.forEach(function (item) {
                        yMm += lineStrokeGap;
                        text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, item, model.posicao.xMm + default_1.ESPACAMENTO_CONTORNO_TABELA_EM_PT, yMm, mm, text_utils_1.TextAlign.LEFT, degrees);
                        desenharLinhaContornoVerticalDireita(ctx, model, yMm - 2, model.posicao.xMm + (default_1.ESPACAMENTO_100G_000G_VD + 2.2), mm, default_1.ESPACAMENTO_100G_000G_VD);
                        desenharLinhaContornoVerticalEsquerda(ctx, model, yMm - 4.5, model.posicao.xMm, mm, default_1.ESPACAMENTO_100G_000G_VD - 0.1);
                        yMm += alturaLinhaMm / 2;
                    });
                });
                // Contorno de baixo
                desenharLinhaContornoHorizontal(ctx, model, yMm, mm);
                yMm += lineStrokeGap;
                ctx.restore();
                return [2 /*return*/];
        }
    });
}); };
var possuiAvisoNutricionaisZerados = function (textoInformacoesAdicionais, texto) {
    return _.includes(textoInformacoesAdicionais, texto);
};
var desenharLinha = function (ctx, model, yMm, mm, espessuraLinha) {
    ctx.textAlign = text_utils_1.TextAlign.LEFT;
    ctx.lineWidth = conversor_utils_1.converterPtParaPX(espessuraLinha);
    // x, y, largura e altura
    ctx.strokeRect(mm(model.posicao.xMm + 0.5), mm(yMm), mm(model.dimensoes.larguraMaximaMm - 1), 1);
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};
var desenharLinhaContornoHorizontal = function (ctx, model, yMm, mm) {
    var espacoDireitaEEsquerda = 2;
    var espacoMargemInterna = conversor_utils_1.converterPTparaMM(default_1.ESPACAMENTO_CONTORNO_TABELA_EM_PT);
    var tamanhoLinhaContornoTotalMM = model.dimensoes.larguraMaximaMm + (espacoDireitaEEsquerda * espacoMargemInterna);
    ctx.textAlign = text_utils_1.TextAlign.LEFT;
    ctx.lineWidth = conversor_utils_1.converterPtParaPX(default_1.ESPESSURA_LINHA_CONTORNO_EM_PT);
    // x, y, largura e altura
    ctx.strokeRect(mm(model.posicao.xMm - espacoMargemInterna), // Começa antes da linha da tabela
    mm(yMm), mm(tamanhoLinhaContornoTotalMM), 1);
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};
var desenharLinhaContornoVerticalDireita = function (ctx, model, yMm, xMm, mm, alturaLinhaVertical) {
    ctx.textAlign = text_utils_1.TextAlign.LEFT;
    ctx.lineWidth = conversor_utils_1.converterPtParaPX(default_1.ESPESSURA_LINHA_CONTORNO_EM_PT);
    // x, y, largura e altura
    ctx.strokeRect(mm((xMm + (model.dimensoes.larguraMaximaMm - default_1.TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT))), mm(yMm) - (model.fonte.alturaMm * default_1.TAMANHO_FONTE_PADRAO_TITULO_EM_PT), 1, mm(alturaLinhaVertical));
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};
var desenharLinhaContornoVerticalEsquerda = function (ctx, model, yMm, xMm, mm, alturaLinhaVertical) {
    ctx.textAlign = text_utils_1.TextAlign.LEFT;
    ctx.lineWidth = conversor_utils_1.converterPtParaPX(default_1.ESPESSURA_LINHA_CONTORNO_EM_PT);
    // x, y, largura e altura
    ctx.strokeRect(mm(xMm), mm(yMm) - (model.fonte.alturaMm - alturaLinhaVertical), 1, mm(alturaLinhaVertical));
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};
var desenharLinhaVertical = function (ctx, model, yMm, xMm, mm, alturaLinhaVertical) {
    ctx.textAlign = text_utils_1.TextAlign.LEFT;
    ctx.lineWidth = conversor_utils_1.converterPtParaPX(default_1.ESPESSURA_LINHA_CONTORNO_EM_PT);
    // x, y, largura e altura
    ctx.strokeRect(mm((xMm + (model.dimensoes.larguraMaximaMm - default_1.TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT))), mm(yMm) - (model.fonte.alturaMm * default_1.TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT), 1, mm(alturaLinhaVertical));
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};
var calcularDiferencaDpiLarguraMaximaMm = function (dpi, larguraMm) {
    var mm = mm_1.mmPartial(dpi);
    var larguraEmPixels = mm(larguraMm);
    var larguraMinimaEmPixels = mm(1);
    return larguraEmPixels - larguraMinimaEmPixels;
};
var renomeioParaAbreviacao = function (texto) {
    switch (texto.trim()) {
        case "Açúcares adicionados (g)":
            return constants_impressao_1.abreviacoes.acucaresAdicionados.abreviado;
        default:
            return texto;
    }
};
exports.tabelaNutricionalVertical = { drawTable: drawTable };
//# sourceMappingURL=tabela-nutricional-vertical.js.map