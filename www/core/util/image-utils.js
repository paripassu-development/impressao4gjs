"use strict";
exports.__esModule = true;
var default_1 = require("../../default");
var isAlimentoSolido = function (nutricional) {
    if (nutricional.unidadeTratada === default_1.APENAS_G) {
        return true;
    }
    return false;
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
        "itemSodio": default_1.ALTO_TEOR_UNICO_SODIO,
        "itemAcucar": default_1.ALTO_TEOR_UNICO_ACUCAR,
        "itemGorduraSaturada": default_1.ALTO_TEOR_UNICO_GORDURA_SATURADA,
        "itemAcucar,itemSodio": default_1.ALTO_TEOR_ACUCAR_SODIO,
        "itemGorduraSaturada,itemSodio": default_1.ALTO_TEOR_GORDURA_SATURADA_SODIO,
        "itemAcucar,itemGorduraSaturada": default_1.ALTO_TEOR_ACUCAR_GORDURA_SATURADA,
        "itemAcucar,itemGorduraSaturada,itemSodio": default_1.ALTO_TEOR_ACUCAR_GORDURA_SATURADA_SODIO
    };
    listaNutricional.sort();
    var key = listaNutricional.join(default_1.VIRGULA);
    return combinacoesAltoTeor[key] || default_1.STRING_VAZIA;
};
//# sourceMappingURL=image-utils.js.map