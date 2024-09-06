"use strict";
exports.__esModule = true;
var Mustache = require("mustache");
var text_utils_1 = require("../core/util/text-utils");
var mm_1 = require("./mm");
var drawText = function (ctx, fabricCanvas, dpi, model, textBindings) {
    if (!isVariableBindingEmpty(model, textBindings)) {
        var mm_2 = mm_1.mmPartial(dpi);
        var degrees_1 = model.posicao.rotacao || 0;
        ctx.save();
        ctx.textAlign = model.posicao.alinhar || "start";
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.rotate(degrees_1 * Math.PI / 180);
        ctx.font = (model.fonte.negrito ? "bold" : "") + " " + Math.round(mm_2(model.fonte.alturaMm)) + "px " + model.fonte.nome;
        var renderedText = textBindings ? Mustache.render(model.valor, textBindings) : model.valor.replace("{{{", "<").replace("}}}", ">");
        if (textFunctions[model.fn] && textBindings) {
            renderedText = textFunctions[model.fn](renderedText);
        }
        renderedText = text_utils_1.ocultaCampoTextoComBaseNoValor(renderedText);
        ctx.lineWidth = model.fonte.forcaContorno || 0;
        if (!!model.multiplasLinhas) {
            var yMm_1 = model.posicao.yMm;
            var alturaLinhaMm_1 = model.fonte.alturaMm;
            var larguraMaxima_1 = model.dimensoes.larguraMaximaMm;
            var maximoNumeroDeLinhas = model.multiplasLinhas.numeroMaximoDeLinhas || -1;
            var alturaMinimaFonteMm = model.multiplasLinhas.alturaMinimaFonteMm ? model.multiplasLinhas.alturaMinimaFonteMm : ALTURA_MINIMA_FONT_MM;
            var linhas_1 = getMultiplasLinhas(ctx, model, renderedText, larguraMaxima_1, maximoNumeroDeLinhas, alturaMinimaFonteMm, dpi);
            var alinhamento_1 = model.multiplasLinhas.alinhamento || "left";
            var contaLinha_1 = 0;
            linhas_1.forEach(function (linha) {
                if (contaLinha_1 === linhas_1.length - 1 && alinhamento_1 === "justify") {
                    alinhamento_1 = "left";
                }
                text_utils_1.strokeAlignedText(ctx, fabricCanvas, larguraMaxima_1, linha, model.posicao.xMm, yMm_1, mm_2, alinhamento_1, degrees_1);
                yMm_1 += alturaLinhaMm_1;
                contaLinha_1++;
            });
        }
        else {
            if (!!fabricCanvas) {
                text_utils_1.writeFabricText(fabricCanvas, ctx, renderedText, model.posicao.xMm, model.posicao.yMm, model.dimensoes.larguraMaximaMm, mm_2, { degrees: degrees_1 });
            }
            else {
                ctx.strokeText(renderedText, mm_2(model.posicao.xMm), mm_2(model.posicao.yMm), mm_2(model.dimensoes.larguraMaximaMm));
                ctx.fillText(renderedText, mm_2(model.posicao.xMm), mm_2(model.posicao.yMm), mm_2(model.dimensoes.larguraMaximaMm));
            }
        }
        ctx.restore();
    }
};
function getMultiplasLinhas(context, model, texto, larguraMaxima, maximoNumeroDeLinhas, alturaMinimaFonteMm, dpi) {
    if (maximoNumeroDeLinhas > 0) {
        return text_utils_1.splitLinesAutoSize(context, model, texto, larguraMaxima, maximoNumeroDeLinhas, alturaMinimaFonteMm, dpi);
    }
    else {
        return text_utils_1.splitLines(texto, larguraMaxima);
    }
}
var isVariableBindingEmpty = function (model, textBindings) {
    var valor = model.valor;
    if (textBindings && indexStartVariable(valor) > 0 && indexLastVariable(valor) > 0) {
        var variable = valor.substr(indexStartVariable(valor), indexLastVariable(valor));
        return !Mustache.render(variable, textBindings);
    }
    return false;
};
var indexStartVariable = function (valor) {
    return valor.indexOf("{");
};
var indexLastVariable = function (valor) {
    return valor.lastIndexOf("}");
};
var textFunctions = {
    "caixaAlta": function (text) {
        return text.toUpperCase();
    }
};
var ALTURA_MINIMA_FONT_MM = 1.2;
exports.text = { drawText: drawText };
//# sourceMappingURL=text.js.map