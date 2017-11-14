var Mustache = require("mustache");
var text_utils_1 = require("./../core/util/text-utils");
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
var informacoesPadraoZero = [
    "valorEnergeticoQtPorcao",
    "valorEnergeticoValDiario",
    "sodioQtPorcao",
    "sodioValDiario",
    "proteinasQtPorcao",
    "proteinasValDiario",
    "gordurasTotaisQtPorcao",
    "gordurasTotaisValDiario",
    "gorduraTransQtPorcao",
    "gorduraTransValDiario",
    "gorduraSaturadaQtPorcao",
    "gorduraSaturadaValDiario",
    "fibraAlimentarQtPorcao",
    "fibraAlimentarValDiario",
    "carboidratosQtPorcao",
    "carboidratosValDiario",
];
var drawTable = function (ctx, dpi, model, textBindings) {
    if (textBindings) {
        informacoesPadraoZero.forEach(function (nomeInfo) {
            if (textBindings[nomeInfo] === undefined) {
                textBindings[nomeInfo] = "0";
            }
        });
    }
    var mm = mm_1.mmPartial(dpi);
    ctx.save();
    ctx.fillStyle = BLACK;
    ctx.strokeStyle = BLACK;
    ctx.lineWidth = model.fonte.forcaContorno || 0;
    var larguraMaxima = model.dimensoes.larguraMaximaMm;
    var yMm = model.posicao.yMm;
    var alturaLinhaMm = model.fonte.alturaMm * 1.2;
    var lineStrokeGap = alturaLinhaMm / 3;
    ctx.font = (model.fonte.negrito ? "bold" : "") + " " + mm(model.fonte.alturaMm * 1.5) + "px " + model.fonte.nome;
    text_utils_1.strokeAlignedText(ctx, larguraMaxima, getOrDefault(model.informacoesNutricionais, "textoInformacaoNutricional"), model.posicao.xMm, yMm, mm, text_utils_1.TextAlign.CENTER);
    yMm += alturaLinhaMm * 1.1;
    ctx.font = (model.fonte.negrito ? "bold" : "") + " " + mm(model.fonte.alturaMm) + "px " + model.fonte.nome;
    text_utils_1.strokeAlignedText(ctx, larguraMaxima, fillTemplate(model.informacoesNutricionais.textoPorcaoCaseira, textBindings), model.posicao.xMm, yMm, mm, text_utils_1.TextAlign.CENTER);
    yMm += lineStrokeGap;
    drawLine(ctx, model, yMm, mm);
    yMm += alturaLinhaMm;
    text_utils_1.strokeAlignedText(ctx, larguraMaxima, getOrDefault(model.informacoesNutricionais, "textoQuantidadePorPorcao"), model.posicao.xMm, yMm, mm, text_utils_1.TextAlign.LEFT);
    ctx.textAlign = text_utils_1.TextAlign.RIGHT;
    ctx.strokeText(getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario"), mm(model.posicao.xMm + model.dimensoes.larguraMaximaMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
    yMm += lineStrokeGap;
    drawLine(ctx, model, yMm, mm);
    nutrientes.forEach(function (nutriente) {
        var informacoesNutriente = model.informacoesNutricionais.informacoesNutrientesTabelaNutricional[nutriente];
        if (informacoesNutriente !== undefined) {
            yMm += alturaLinhaMm;
            ctx.textAlign = text_utils_1.TextAlign.LEFT;
            ctx.strokeText(getOrDefault(informacoesNutriente, "nome"), mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
            if (nutriente === "valorEnergetico") {
                text_utils_1.strokeAlignedText(ctx, larguraMaxima, fillTemplate(model.informacoesNutricionais.textoProporcaoCalorias, textBindings), model.posicao.xMm - (alturaLinhaMm * 3), yMm, mm, text_utils_1.TextAlign.RIGHT);
            }
            else {
                text_utils_1.strokeAlignedText(ctx, larguraMaxima, fillTemplate(informacoesNutriente.qtPorcao, textBindings), model.posicao.xMm - (alturaLinhaMm * 6), yMm, mm, text_utils_1.TextAlign.RIGHT);
            }
            text_utils_1.strokeAlignedText(ctx, larguraMaxima, fillTemplate(informacoesNutriente.valDiario, textBindings), model.posicao.xMm - alturaLinhaMm / 2, yMm, mm, text_utils_1.TextAlign.RIGHT);
            yMm += lineStrokeGap;
            drawLine(ctx, model, yMm, mm);
        }
    });
    yMm += alturaLinhaMm;
    if (!model.informacoesAdicionais.texto) {
        text_utils_1.strokeAlignedText(ctx, larguraMaxima, "<informacoesAdicionais.texto>", model.posicao.xMm, yMm, mm, text_utils_1.TextAlign.CENTER);
    }
    else {
        var linhasInformacoesAdicionais = text_utils_1.splitLines(model.informacoesAdicionais.texto, model.informacoesAdicionais.caracteresPorLinha);
        linhasInformacoesAdicionais.forEach(function (linha) {
            text_utils_1.strokeAlignedText(ctx, larguraMaxima, linha, model.posicao.xMm, yMm, mm, text_utils_1.TextAlign.CENTER);
            yMm += alturaLinhaMm;
        });
    }
    ctx.restore();
};
function fillTemplate(valor, textBindings) {
    return textBindings ? Mustache.render(valor, textBindings) : valor.replace("{{{", "<").replace("}}}", ">");
}
function getOrDefault(object, param) {
    return object[param] ? object[param] : "<" + param + ">";
}
var drawLine = function (ctx, model, yMm, mm) {
    if (model.opcoes != null && model.opcoes.ocultarLinhas) {
        return;
    }
    ctx.textAlign = text_utils_1.TextAlign.LEFT;
    ctx.strokeRect(mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm), 1);
};
exports.tabelaNutricional = { drawTable: drawTable };
//# sourceMappingURL=tabela-nutricional.js.map