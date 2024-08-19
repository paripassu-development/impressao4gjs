"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var param_utils_1 = require("../core/util/param-utils");
var tabela_nutricional_utils_1 = require("../core/util/tabela-nutricional-utils");
var text_utils_1 = require("../core/util/text-utils");
var default_1 = require("../default");
var mm_1 = require("./mm");
var BLACK = "#000000";
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
    tabela_nutricional_utils_1.setInformacoesV2PadraoZero(textBindings);
    var mm = mm_1.mmPartial(dpi);
    ctx.save();
    var degrees = model.posicao.rotacao || 0;
    ctx.rotate(degrees * Math.PI / 180);
    ctx.fillStyle = BLACK;
    ctx.strokeStyle = BLACK;
    ctx.lineWidth = model.fonte.forcaContorno || 0;
    var larguraMaxima = model.dimensoes.larguraMaximaMm;
    var yMm = model.posicao.yMm;
    var alturaLinhaMm = model.fonte.alturaMm * 1.2;
    var lineStrokeGap = alturaLinhaMm / 3;
    ctx.font = (model.fonte.negrito ? "bold" : "") + " " + Math.round(mm(model.fonte.alturaMm * 1.5)) + "px " + model.fonte.nome;
    text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, param_utils_1.getOrDefault(model.informacoesNutricionais, "textoInformacaoNutricional"), model.posicao.xMm, yMm, mm, text_utils_1.TextAlign.CENTER, degrees);
    yMm += lineStrokeGap;
    drawLine(ctx, model, yMm, mm);
    yMm += alturaLinhaMm;
    ctx.font = (model.fonte.negrito ? "bold" : "") + " " + Math.round(mm(model.fonte.alturaMm)) + "px " + model.fonte.nome;
    text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, ("Porções por embalagem: " + param_utils_1.fillTemplate(model.informacoesNutricionais.textoQuantidadeEmbalagem, textBindings)), model.posicao.xMm, yMm, mm, text_utils_1.TextAlign.LEFT, degrees);
    yMm += lineStrokeGap;
    yMm += alturaLinhaMm;
    text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, ("Porção: " + param_utils_1.fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, textBindings)
        + "(" + param_utils_1.fillTemplate(model.informacoesNutricionais.textoPorcaoCaseira, textBindings)) + ")", model.posicao.xMm, yMm, mm, text_utils_1.TextAlign.LEFT, degrees);
    yMm += lineStrokeGap;
    drawLine(ctx, model, yMm, mm);
    yMm += alturaLinhaMm;
    ctx.textAlign = text_utils_1.TextAlign.RIGHT;
    var textoValorDiario = param_utils_1.getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario");
    var porcao = param_utils_1.fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, textBindings);
    var porcao100g = param_utils_1.getOrDefault(model.informacoesNutricionais, "textoQt100");
    if (!!fabricCanvas) {
        text_utils_1.writeFabricText(fabricCanvas, ctx, porcao100g, model.posicao.xMm - (alturaLinhaMm * 7), yMm, larguraMaxima, mm, { degrees: degrees });
        text_utils_1.writeFabricText(fabricCanvas, ctx, porcao, model.posicao.xMm - (alturaLinhaMm * 3.5), yMm, larguraMaxima, mm, { degrees: degrees });
        text_utils_1.writeFabricText(fabricCanvas, ctx, textoValorDiario, model.posicao.xMm - (alturaLinhaMm / 2), yMm, larguraMaxima, mm, { degrees: degrees });
    }
    else {
        text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, porcao100g, model.posicao.xMm - (alturaLinhaMm * 7), yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
        text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, porcao, model.posicao.xMm - (alturaLinhaMm * 3.5), yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
        text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, textoValorDiario, model.posicao.xMm - (alturaLinhaMm / 2), yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
    }
    yMm += lineStrokeGap;
    drawLine(ctx, model, yMm, mm);
    if (model.informacoesNutricionais !== undefined && model.informacoesNutricionais.informacoesNutrientesTabelaNutricional !== undefined) {
        nutrientes.forEach(function (nutriente) {
            var informacoesNutriente = model.informacoesNutricionais.informacoesNutrientesTabelaNutricional[nutriente];
            if (informacoesNutriente !== undefined) {
                yMm += alturaLinhaMm;
                ctx.textAlign = text_utils_1.TextAlign.LEFT;
                var nomeNutriente = param_utils_1.getOrDefault(informacoesNutriente, "nome");
                if (!!fabricCanvas) {
                    text_utils_1.writeFabricText(fabricCanvas, ctx, nomeNutriente, model.posicao.xMm, yMm, larguraMaxima, mm, { degrees: degrees });
                }
                else {
                    ctx.strokeText(nomeNutriente, mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                }
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, param_utils_1.fillTemplate(informacoesNutriente.qt100, textBindings), model.posicao.xMm - (alturaLinhaMm * 7), yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, param_utils_1.fillTemplate(informacoesNutriente.qtPorcao, textBindings), model.posicao.xMm - (alturaLinhaMm * 3.5), yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, param_utils_1.fillTemplate(informacoesNutriente.valDiario, textBindings), model.posicao.xMm - alturaLinhaMm / 2, yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                drawLine(ctx, model, yMm, mm);
            }
        });
    }
    else {
        var parametrosPadroesNutricionalV2 = !!textBindings ? textBindings.parametrosPadroesNutricionalV2 : default_1.PARAMETROS_PADROES_NUTRICIONAL_V2;
        parametrosPadroesNutricionalV2.forEach(function (parametro) {
            var matchArray = parametro.qtPorcao.match(/[0-9]/mg, "");
            if (!model.informacoesNutricionais.ocultarZerados || !matchArray.every(function (elemento) { return elemento === "0"; })) {
                yMm += alturaLinhaMm;
                ctx.textAlign = text_utils_1.TextAlign.LEFT;
                if (!!fabricCanvas) {
                    text_utils_1.writeFabricText(fabricCanvas, ctx, parametro.rotulo, model.posicao.xMm, yMm, larguraMaxima, mm, { degrees: degrees });
                }
                else {
                    ctx.strokeText(parametro.rotulo, mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                }
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qt100, model.posicao.xMm - (alturaLinhaMm * 7), yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, model.posicao.xMm - (alturaLinhaMm * 3.5), yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.valorDiario, model.posicao.xMm - alturaLinhaMm / 2, yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                drawLine(ctx, model, yMm, mm);
            }
        });
        if (!!textBindings) {
            textBindings.parametrosExtrasNutricionalV2.forEach(function (parametro) {
                yMm += alturaLinhaMm;
                ctx.textAlign = text_utils_1.TextAlign.LEFT;
                if (!!fabricCanvas) {
                    text_utils_1.writeFabricText(fabricCanvas, ctx, parametro.rotulo, model.posicao.xMm, yMm, larguraMaxima, mm, { degrees: degrees });
                }
                else {
                    ctx.strokeText(parametro.rotulo, mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                }
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qt100, model.posicao.xMm - (alturaLinhaMm * 7), yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, model.posicao.xMm - (alturaLinhaMm * 3.5), yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.valorDiario, model.posicao.xMm - alturaLinhaMm / 2, yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                drawLine(ctx, model, yMm, mm);
            });
            var texto = "NÃO CONTÉM QUANTIDADES SIGNIFICATIVAS DE ";
            if (model.informacoesNutricionais.ocultarZerados && !possuiAvisoNutricionaisZerados(model.informacoesAdicionais.texto, texto)) {
                var naoVisiveis = textBindings.parametrosPadroesNutricionalV2.filter(function (parametro) {
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
    }
    yMm += alturaLinhaMm;
    if (!model.informacoesAdicionais.texto) {
        text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, "<informacoesAdicionais.texto>", model.posicao.xMm, yMm, mm, text_utils_1.TextAlign.CENTER, degrees);
    }
    else {
        var linhasInformacoesAdicionais = text_utils_1.splitLines(model.informacoesAdicionais.texto, model.informacoesAdicionais.caracteresPorLinha);
        linhasInformacoesAdicionais.forEach(function (linha) {
            text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, linha, model.posicao.xMm, yMm, mm, text_utils_1.TextAlign.CENTER, degrees);
            yMm += alturaLinhaMm;
        });
    }
    ctx.restore();
};
var possuiAvisoNutricionaisZerados = function (textoInformacoesAdicionais, texto) {
    return lodash_1["default"].includes(textoInformacoesAdicionais, texto);
};
var drawLine = function (ctx, model, yMm, mm) {
    if (model.opcoes != null && model.opcoes.ocultarLinhas) {
        return;
    }
    ctx.textAlign = text_utils_1.TextAlign.LEFT;
    ctx.strokeRect(mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm), 1);
};
exports.tabelaNutricionalV2 = { drawTable: drawTable };
//# sourceMappingURL=tabela-nutricional-v2.js.map