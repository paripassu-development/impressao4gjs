"use strict";
exports.__esModule = true;
var default_1 = require("../../default");
var imagens_alto_teor_1 = require("../constants/imagens-alto-teor");
exports.extraiUnidadePorcao = function (textoPorcao) {
    if (!textoPorcao) {
        return default_1.STRING_VAZIA;
    }
    return String(textoPorcao).replace(default_1.REGEX_REMOVE_QUANTIDADE_PORCAO, default_1.STRING_VAZIA).toLowerCase();
};
exports.converteQuantidadeNutricional = function (valor) {
    if (typeof valor === "number") {
        return valor;
    }
    if (!valor) {
        return 0;
    }
    var quantidade = parseFloat(String(valor).replace(default_1.VIRGULA, default_1.PONTO_FINAL));
    return isNaN(quantidade) ? 0 : quantidade;
};
exports.buildNutricionalAltoTeor = function (textBindings) {
    var parametros = textBindings && textBindings.parametrosPadroesNutricionalV2;
    if (!Array.isArray(parametros)) {
        return null;
    }
    var qt100PorRotulo = parametros.reduce(function (mapa, item) {
        if (item && typeof item.rotulo === "string") {
            mapa[item.rotulo.trim()] = item.qt100;
        }
        return mapa;
    }, {});
    return {
        sodioQt100: exports.converteQuantidadeNutricional(qt100PorRotulo[default_1.ROTULO_SODIO]),
        acucaresAdicionadosQt100: exports.converteQuantidadeNutricional(qt100PorRotulo[default_1.ROTULO_ACUCARES_ADICIONADOS]),
        gorduraSaturadaQt100: exports.converteQuantidadeNutricional(qt100PorRotulo[default_1.ROTULO_GORDURA_SATURADA]),
        unidadeTratada: exports.extraiUnidadePorcao(textBindings.porcaoNutricionalV2)
    };
};
var isAlimentoSolido = function (nutricional) {
    return nutricional.unidadeTratada === default_1.APENAS_G;
};
exports.validacaoListaNutricional = function (nutricional) {
    var listaNutricional = [];
    if (!nutricional) {
        return listaNutricional;
    }
    if (isAlimentoSolido(nutricional)) {
        if (nutricional.sodioQt100 >= default_1.VALOR_MINIMO_ALTO_TEOR_SODIO_SOLIDO) {
            listaNutricional.push(default_1.ITEM_SODIO);
        }
        if (nutricional.acucaresAdicionadosQt100 >= default_1.VALOR_MINIMO_ALTO_TEOR_ACUCAR_SOLIDO) {
            listaNutricional.push(default_1.ITEM_ACUCAR);
        }
        if (nutricional.gorduraSaturadaQt100 >= default_1.VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA_SOLIDO) {
            listaNutricional.push(default_1.ITEM_GORDURA_SATURADA);
        }
    }
    else {
        if (nutricional.sodioQt100 >= default_1.VALOR_MINIMO_ALTO_TEOR_SODIO_LIQUIDO) {
            listaNutricional.push(default_1.ITEM_SODIO);
        }
        if (nutricional.acucaresAdicionadosQt100 >= default_1.VALOR_MINIMO_ALTO_TEOR_ACUCAR_LIQUIDO) {
            listaNutricional.push(default_1.ITEM_ACUCAR);
        }
        if (nutricional.gorduraSaturadaQt100 >= default_1.VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA_LIQUIDO) {
            listaNutricional.push(default_1.ITEM_GORDURA_SATURADA);
        }
    }
    return listaNutricional;
};
exports.montagemTipoAltoTeor = function (listaNutricional) {
    var combinacoesAltoTeor = {
        "itemSodio": imagens_alto_teor_1.ALTO_TEOR_UNICO_SODIO,
        "itemAcucar": imagens_alto_teor_1.ALTO_TEOR_UNICO_ACUCAR,
        "itemGorduraSaturada": imagens_alto_teor_1.ALTO_TEOR_UNICO_GORDURA_SATURADA,
        "itemAcucar,itemSodio": imagens_alto_teor_1.ALTO_TEOR_ACUCAR_SODIO,
        "itemGorduraSaturada,itemSodio": imagens_alto_teor_1.ALTO_TEOR_GORDURA_SATURADA_SODIO,
        "itemAcucar,itemGorduraSaturada": imagens_alto_teor_1.ALTO_TEOR_ACUCAR_GORDURA_SATURADA,
        "itemAcucar,itemGorduraSaturada,itemSodio": imagens_alto_teor_1.ALTO_TEOR_ACUCAR_GORDURA_SATURADA_SODIO
    };
    var key = listaNutricional.slice().sort().join(default_1.VIRGULA);
    return combinacoesAltoTeor[key] || default_1.STRING_VAZIA;
};
//# sourceMappingURL=image-utils.js.map