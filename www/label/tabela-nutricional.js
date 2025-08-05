"use strict";
exports.__esModule = true;
var param_utils_1 = require("../core/util/param-utils");
var tabela_nutricional_utils_1 = require("../core/util/tabela-nutricional-utils");
var text_utils_1 = require("../core/util/text-utils");
var default_1 = require("../default");
var mm_1 = require("./mm");
var BLACK = "#000000";
var nutrientes = [
    "valorEnergetico",
    "carboidratos",
    "proteinas",
    "gordurasTotais",
    "gorduraSaturada",
    "gorduraTrans",
    "fibraAlimentar",
    "sodio",
];
var drawTable = function (ctx, fabricCanvas, dpi, model, textBindings) {
    tabela_nutricional_utils_1.setInformacoesPadraoZero(textBindings);
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
    yMm += alturaLinhaMm * 1.1;
    ctx.font = (model.fonte.negrito ? "bold" : "") + " " + Math.round(mm(model.fonte.alturaMm)) + "px " + model.fonte.nome;
    text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, param_utils_1.fillTemplate(model.informacoesNutricionais.textoPorcaoCaseira, textBindings), model.posicao.xMm, yMm, mm, text_utils_1.TextAlign.CENTER, degrees);
    yMm += lineStrokeGap;
    drawLine(ctx, model, yMm, mm);
    yMm += alturaLinhaMm;
    text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, param_utils_1.getOrDefault(model.informacoesNutricionais, "textoQuantidadePorPorcao"), model.posicao.xMm, yMm, mm, text_utils_1.TextAlign.LEFT, degrees);
    ctx.textAlign = text_utils_1.TextAlign.RIGHT;
    var textoValorDiario = param_utils_1.getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario");
    if (!!fabricCanvas) {
        text_utils_1.writeFabricText(fabricCanvas, ctx, textoValorDiario, model.posicao.xMm + model.dimensoes.larguraMaximaMm, yMm, larguraMaxima, mm, { degrees: degrees });
    }
    else {
        ctx.strokeText(textoValorDiario, mm(model.posicao.xMm + model.dimensoes.larguraMaximaMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
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
                if (nutriente === "valorEnergetico") {
                    text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, param_utils_1.fillTemplate(model.informacoesNutricionais.textoProporcaoCalorias, textBindings), model.posicao.xMm - (alturaLinhaMm * 4.5), yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                }
                else {
                    text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, param_utils_1.fillTemplate(informacoesNutriente.qtPorcao, textBindings), model.posicao.xMm - (alturaLinhaMm * 7), yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                }
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, param_utils_1.fillTemplate(informacoesNutriente.valDiario, textBindings), model.posicao.xMm - alturaLinhaMm / 2, yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                drawLine(ctx, model, yMm, mm);
            }
        });
    }
    else {
        var parametrosPadroes = !!textBindings ? textBindings.parametrosPadroes : default_1.PARAMETROS_PADROES_NUTRICIONAL;
        parametrosPadroes.forEach(function (parametro) {
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
                if (parametro.rotulo === "Valor Energético") {
                    text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, model.posicao.xMm - (alturaLinhaMm * 4.5), yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                }
                else {
                    text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, model.posicao.xMm - (alturaLinhaMm * 7), yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                }
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.valorDiario, model.posicao.xMm - alturaLinhaMm / 2, yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                drawLine(ctx, model, yMm, mm);
            }
        });
        if (!!textBindings) {
            textBindings.parametrosExtras.forEach(function (parametro) {
                yMm += alturaLinhaMm;
                ctx.textAlign = text_utils_1.TextAlign.LEFT;
                if (!!fabricCanvas) {
                    text_utils_1.writeFabricText(fabricCanvas, ctx, parametro.rotulo, model.posicao.xMm, yMm, larguraMaxima, mm, { degrees: degrees });
                }
                else {
                    ctx.strokeText(parametro.rotulo, mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                }
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, model.posicao.xMm - (alturaLinhaMm * 7), yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.valorDiario, model.posicao.xMm - alturaLinhaMm / 2, yMm, mm, text_utils_1.TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                drawLine(ctx, model, yMm, mm);
            });
            var texto = "NÃO CONTÉM QUANTIDADES SIGNIFICATIVAS DE ";
            if (model.informacoesNutricionais.ocultarZerados && !possuiAvisoNutricionaisZerados(model.informacoesAdicionais.texto, texto)) {
                var naoVisiveis = textBindings.parametrosPadroes.filter(function (parametro) {
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
    return _.includes(textoInformacoesAdicionais, texto);
};
var drawLine = function (ctx, model, yMm, mm) {
    if (model.opcoes != null && model.opcoes.ocultarLinhas) {
        return;
    }
    ctx.textAlign = text_utils_1.TextAlign.LEFT;
    ctx.strokeRect(mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm), 1);
};
exports.tabelaNutricional = { drawTable: drawTable };
//# sourceMappingURL=tabela-nutricional.js.map