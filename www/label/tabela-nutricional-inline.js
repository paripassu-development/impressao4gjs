"use strict";
exports.__esModule = true;
var param_utils_1 = require("../core/util/param-utils");
var tabela_nutricional_utils_1 = require("../core/util/tabela-nutricional-utils");
var text_1 = require("./text");
var default_1 = require("../default");
var _ = require("lodash");
var drawTable = function (ctx, fabricCanvas, dpi, model, textBindings) {
    var elemento = mountTextElement(model.posicao, model, mountTextTabelaNutricional(model, textBindings));
    var degrees = model.posicao.rotacao || 0;
    ctx.save();
    ctx.rotate(degrees * Math.PI / 180);
    text_1.text.drawText(ctx, fabricCanvas, dpi, elemento, textBindings);
    ctx.restore();
};
function calculaKJ(valor) {
    if (valor) {
        valor = parseFloat(valor.replace(/[,]/g, "."));
    }
    return Math.round((valor * 4.2) || 0);
}
function setProporcaoKJValorEnergeticoPorcao(textBindings) {
    var valorEnergeticoQtPorcao = _.get(textBindings, "valorEnergeticoQtPorcao");
    _.set(textBindings, "valorEnergeticoQtPorcaoKj", calculaKJ(valorEnergeticoQtPorcao));
}
function mountTextTabelaNutricional(model, textBindings) {
    tabela_nutricional_utils_1.setInformacoesPadraoZero(textBindings);
    setProporcaoKJValorEnergeticoPorcao(textBindings);
    var tabela = "INFORMAÇÃO NUTRICIONAL:";
    var informacoes = [];
    informacoes.push("PORÇÃO {{{porcao}}}");
    var parametros;
    if (model.informacoesNutricionais !== undefined && model.informacoesNutricionais.informacoesNutrientesTabelaNutricional !== undefined) {
        var valorEnergeticoQtPorcao = _.get(textBindings, "valorEnergeticoQtPorcao");
        var valorEnergeticoValDiario = _.get(textBindings, "valorEnergeticoValDiario");
        if (!textBindings || (valorEnergeticoQtPorcao && valorEnergeticoValDiario)) {
            var valorEnergeticoNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico, "nome", "Valor energético");
            informacoes.push(valorEnergeticoNome + " {{{valorEnergeticoQtPorcao}}}kcal = {{{valorEnergeticoQtPorcaoKj}}}kj ({{{valorEnergeticoValDiario}}} %VD)");
        }
        var carboidratosQtPorcao = _.get(textBindings, "carboidratosQtPorcao");
        var carboidratosValDiario = _.get(textBindings, "carboidratosValDiario");
        if (!textBindings || (carboidratosQtPorcao && carboidratosValDiario)) {
            var carboidratosNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos, "nome", "Carboidratos");
            informacoes.push(carboidratosNome + " {{{carboidratosQtPorcao}}}g ({{{carboidratosValDiario}}} %VD)");
        }
        var proteinasQtPorcao = _.get(textBindings, "proteinasQtPorcao");
        var proteinasValDiario = _.get(textBindings, "proteinasValDiario");
        if (!textBindings || (proteinasQtPorcao && proteinasValDiario)) {
            var proteinasNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas, "nome", "Proteinas");
            informacoes.push(proteinasNome + " {{{proteinasQtPorcao}}}g ({{{proteinasValDiario}}} %VD)");
        }
        var gordurasTotaisQtPorcao = _.get(textBindings, "gordurasTotaisQtPorcao");
        var gordurasTotaisValDiario = _.get(textBindings, "gordurasTotaisValDiario");
        if (!textBindings || (gordurasTotaisQtPorcao && gordurasTotaisValDiario)) {
            var gordurasTotaisNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais, "nome", "Gorduras totais");
            informacoes.push(gordurasTotaisNome + " {{{gordurasTotaisQtPorcao}}}g ({{{gordurasTotaisValDiario}}} %VD)");
        }
        var gorduraSaturadaQtPorcao = _.get(textBindings, "gorduraSaturadaQtPorcao");
        var gorduraSaturadaValDiario = _.get(textBindings, "gorduraSaturadaValDiario");
        if (!textBindings || (gorduraSaturadaQtPorcao && gorduraSaturadaValDiario)) {
            var gordurasSaturadasNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada, "nome", "Gorduras saturadas");
            informacoes.push(gordurasSaturadasNome + " {{{gorduraSaturadaQtPorcao}}}g ({{{gorduraSaturadaValDiario}}} %VD)");
        }
        var gorduraTransQtPorcao = _.get(textBindings, "gorduraTransQtPorcao");
        if (!textBindings || gorduraTransQtPorcao) {
            var gordurasTransNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans, "nome", "Gorduras trans");
            informacoes.push(gordurasTransNome + " {{{gorduraTransQtPorcao}}}g (VD n\u00E3o estabelecido)");
        }
        var fibraAlimentarQtPorcao = _.get(textBindings, "fibraAlimentarQtPorcao");
        var fibraAlimentarValDiario = _.get(textBindings, "fibraAlimentarValDiario");
        if (!textBindings || (fibraAlimentarQtPorcao && fibraAlimentarValDiario)) {
            var fibraAlimentarNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar, "nome", "Fibra alimentar");
            informacoes.push(fibraAlimentarNome + " {{{fibraAlimentarQtPorcao}}}g ({{{fibraAlimentarValDiario}}} %VD)");
        }
        var sodioQtPorcao = _.get(textBindings, "sodioQtPorcao");
        var sodioValDiario = _.get(textBindings, "sodioValDiario");
        if (!textBindings || (sodioQtPorcao && sodioValDiario)) {
            var sodioNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio, "nome", "Sódio");
            informacoes.push(sodioNome + " {{{sodioQtPorcao}}}mg ({{{sodioValDiario}}} %VD)");
        }
    }
    else {
        var parametrosPadroes = !!textBindings ? textBindings.parametrosPadroes : default_1.PARAMETROS_PADROES_NUTRICIONAL;
        parametrosPadroes.forEach(function (parametro) {
            // @ts-ignore
            var matchArray = parametro.qtPorcao.match(/[0-9]/mg, "");
            if (parametro.rotulo === "Gorduras trans") {
                informacoes.push(parametro.rotulo + " " + parametro.qtPorcao.replace(/ +/g, "") + " (VD n\u00E3o estabelecido)");
            }
            else {
                informacoes.push(parametro.rotulo + " " + parametro.qtPorcao.replace(/ +/g, "") + " " + "(" + parametro.valorDiario + "VD)");
            }
        });
        if (!!textBindings) {
            textBindings.parametrosExtras.forEach(function (parametro) {
                informacoes.push(parametro.rotulo + " " + parametro.qtPorcao.replace(/ +/g, "") + " " + "(" + parametro.valorDiario + "VD)");
            });
        }
    }
    var informacoesAdicionais = "* % Valores diários com base em uma dieta de 2.000 kcal ou 8.400 kJ. Seus valores diários podem ser maiores ou menores dependendo de suas necessidades energéticas.";
    if (_.get(model, "informacoesAdicionais.texto")) {
        informacoesAdicionais = model.informacoesAdicionais.texto;
    }
    return param_utils_1.fillTemplate(tabela + " " + (parametros != null ? parametros : informacoes.join("; ")) + ". " + informacoesAdicionais, textBindings);
}
function mountTextElement(posicao, model, texto) {
    return {
        "tipo": "texto",
        "posicao": {
            "xMm": posicao.xMm,
            "yMm": posicao.yMm
        },
        "dimensoes": {
            "larguraMaximaMm": model.dimensoes.larguraMaximaMm
        },
        "multiplasLinhas": model.multiplasLinhas,
        "fonte": model.fonte,
        "valor": texto
    };
}
exports.tabelaNutricionalInline = { drawTable: drawTable };
//# sourceMappingURL=tabela-nutricional-inline.js.map