"use strict";
exports.__esModule = true;
var typescript_string_enums_1 = require("typescript-string-enums");
exports.barraOrigemRastreadaConstants = {
    LARGURA_BARRA: 776,
    ALTURA_BARRA: 32
};
exports.abreviacoes = {
    acucaresAdicionados: {
        nomeOriginal: "Açúcares adicionados (g)",
        abreviado: "    Aç adicionados (g)"
    }
};
exports.ErrosPrefix = {
    ERROR_CODIGO_BARRAS: "[Código de barras]",
    ERROR_OBRIGATORIEDADE: "[Campo obrigatório]"
};
exports.TipoError = typescript_string_enums_1.Enum({
    GS1: "gs1",
    OBRIGATORIO: "obrigatorio"
});
exports.intervaloTamanhoFonte = {
    "unispace-bold": {
        proporcaoTamanhoFonte1: { min: 1, max: 3, tamanhoFonte: 2 },
        proporcaoTamanhoFonte2: { min: 3, max: 3, tamanhoFonte: 2 },
        proporcaoTamanhoFonte3: { min: 4, max: 5, tamanhoFonte: 3 },
        proporcaoTamanhoFonte4: { min: 6, max: 7, tamanhoFonte: 4 },
        proporcaoTamanhoFonte6: { min: 8, max: Number.MAX_VALUE, tamanhoFonte: 6 }
    },
    "telegrama": {
        proporcaoTamanhoFonte1: { min: 1, max: 2, tamanhoFonte: 2 },
        proporcaoTamanhoFonte2: { min: 3, max: 3, tamanhoFonte: 2 },
        proporcaoTamanhoFonte3: { min: 4, max: 5, tamanhoFonte: 3 },
        proporcaoTamanhoFonte4: { min: 6, max: 7, tamanhoFonte: 4 },
        proporcaoTamanhoFonte6: { min: 8, max: Number.MAX_VALUE, tamanhoFonte: 6 }
    },
    "fromwhereyouare": {
        proporcaoTamanhoFonte1: { min: 1, max: 2, tamanhoFonte: 2 },
        proporcaoTamanhoFonte2: { min: 3, max: 3, tamanhoFonte: 2 },
        proporcaoTamanhoFonte3: { min: 4, max: 4, tamanhoFonte: 3 },
        proporcaoTamanhoFonte4: { min: 5, max: 7, tamanhoFonte: 4 },
        proporcaoTamanhoFonte6: { min: 8, max: Number.MAX_VALUE, tamanhoFonte: 6 }
    },
    "dejavusansmono-bold": {
        proporcaoTamanhoFonte1: { min: 1, max: 2, tamanhoFonte: 2 },
        proporcaoTamanhoFonte2: { min: 3, max: 3, tamanhoFonte: 2 },
        proporcaoTamanhoFonte3: { min: 4, max: 5, tamanhoFonte: 3 },
        proporcaoTamanhoFonte4: { min: 6, max: 8, tamanhoFonte: 4 },
        proporcaoTamanhoFonte6: { min: 9, max: Number.MAX_VALUE, tamanhoFonte: 6 }
    },
    "dejavusansmono": {
        proporcaoTamanhoFonte1: { min: 1, max: 2, tamanhoFonte: 2 },
        proporcaoTamanhoFonte2: { min: 3, max: 3, tamanhoFonte: 2 },
        proporcaoTamanhoFonte3: { min: 4, max: 5, tamanhoFonte: 3 },
        proporcaoTamanhoFonte4: { min: 6, max: 8, tamanhoFonte: 4 },
        proporcaoTamanhoFonte6: { min: 9, tamanhoFonte: 6 }
    },
    "bpmono-bold": {
        proporcaoTamanhoFonte1: { min: 1, max: 3, tamanhoFonte: 2 },
        proporcaoTamanhoFonte2: { min: 4, max: 4, tamanhoFonte: 2 },
        proporcaoTamanhoFonte3: { min: 5, max: 6, tamanhoFonte: 3 },
        proporcaoTamanhoFonte4: { min: 7, max: 9, tamanhoFonte: 4 },
        proporcaoTamanhoFonte6: { min: 10, max: Number.MAX_VALUE, tamanhoFonte: 6 }
    },
    "codenewroman-bold": {
        proporcaoTamanhoFonte1: { min: 1, max: 3, tamanhoFonte: 2 },
        proporcaoTamanhoFonte2: { min: 4, max: 4, tamanhoFonte: 2 },
        proporcaoTamanhoFonte3: { min: 5, max: 6, tamanhoFonte: 3 },
        proporcaoTamanhoFonte4: { min: 7, max: 9, tamanhoFonte: 4 },
        proporcaoTamanhoFonte6: { min: 10, max: Number.MAX_VALUE, tamanhoFonte: 6 }
    },
    "arial": {
        proporcaoTamanhoFonte1: { min: 1, max: 2, tamanhoFonte: 2 },
        proporcaoTamanhoFonte2: { min: 3, max: 4, tamanhoFonte: 2 },
        proporcaoTamanhoFonte3: { min: 4, max: 5, tamanhoFonte: 3 },
        proporcaoTamanhoFonte4: { min: 6, max: 8, tamanhoFonte: 4 },
        proporcaoTamanhoFonte6: { min: 9, max: Number.MAX_VALUE, tamanhoFonte: 6 }
    },
    "consolas": {
        proporcaoTamanhoFonte1: { min: 1, max: 2, tamanhoFonte: 2 },
        proporcaoTamanhoFonte2: { min: 4, max: 4, tamanhoFonte: 2 },
        proporcaoTamanhoFonte3: { min: 5, max: 6, tamanhoFonte: 3 },
        proporcaoTamanhoFonte4: { min: 7, max: 9, tamanhoFonte: 4 },
        proporcaoTamanhoFonte6: { min: 10, max: Number.MAX_VALUE, tamanhoFonte: 6 }
    }
};
//# sourceMappingURL=constants-impressao.js.map