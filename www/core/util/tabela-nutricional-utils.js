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
var default_1 = require("../../default");
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
var informacoesV2PadraoZero = [
    "valorEnergeticoQtPorcao",
    "valorEnergeticoQt100",
    "valorEnergeticoValDiario",
    "sodioQtPorcao",
    "sodioQt100",
    "sodioValDiario",
    "acucaresTotaisQtPorcao",
    "acucaresTotaisQt100",
    "acucaresTotaisValDiario",
    "acucaresAdicionadosQtPorcao",
    "acucaresAdicionadosQt100",
    "acucaresAdicionadosValDiario",
    "proteinasQtPorcao",
    "proteinasQt100",
    "proteinasValDiario",
    "gordurasTotaisQtPorcao",
    "gordurasTotaisQt100",
    "gordurasTotaisValDiario",
    "gorduraTransQtPorcao",
    "gorduraTransQt100",
    "gorduraTransValDiario",
    "gorduraSaturadaQtPorcao",
    "gorduraSaturadaQt100",
    "gorduraSaturadaValDiario",
    "fibraAlimentarQtPorcao",
    "fibraAlimentarQt100",
    "fibraAlimentarValDiario",
    "carboidratosQtPorcao",
    "carboidratosQt100",
    "carboidratosValDiario",
];
function setInformacoesPadraoZero(textBindings) {
    if (textBindings) {
        informacoesPadraoZero.forEach(function (nomeInfo) {
            if (textBindings[nomeInfo] === undefined) {
                textBindings[nomeInfo] = "0";
            }
        });
    }
}
exports.setInformacoesPadraoZero = setInformacoesPadraoZero;
function setInformacoesV2PadraoZero(textBindings) {
    if (textBindings) {
        informacoesV2PadraoZero.forEach(function (nomeInfo) {
            if (textBindings[nomeInfo] === undefined) {
                textBindings[nomeInfo] = "0";
            }
        });
    }
}
exports.setInformacoesV2PadraoZero = setInformacoesV2PadraoZero;
function alimentoProntoParaConsumo(textBindings) {
    if (!textBindings) {
        return false;
    }
    return textBindings.alimentoProntoParaConsumo ? textBindings.alimentoProntoParaConsumo : false;
}
exports.alimentoProntoParaConsumo = alimentoProntoParaConsumo;
/* -- TODO ----------------------------------------------------------------------------------------------------
- Para realizar a centralização dos valores na tabela:
     Foi necessário mapear as posições conforme o length do valor a ser inserido, devido a forma que a tabela foi construida.
- Como as linhas verticais são apenas sobreposições das linhas horizontais as mesmas não formam retângulos reais,
    não sendo possível centralizar de forma dinâmica.
*/
// Manter chaves e valores com o mesmo nome
exports.tipoTabela = {
    v2Normal: "v2Normal",
    v2Reduzida: "v2Reduzida"
};
exports.colunas = {
    qt100: "qt100",
    qtPorcao: "qtPorcao",
    valorDiario: "valorDiario"
};
// Função que centraliza apenas o textoQuantidadePorPorcao tabela nutricional normal e reduzida
exports.calcularPosicaoCentralizadaTextoQuantidadePorcao = function (parametroTipoTabela, larguraMaxima, textoPorcao) {
    var lenghtTextoPorcao = textoPorcao.length.toString();
    var valoresPosicoes = posicoesCentralizadasTextoQuantidadePorcao(parametroTipoTabela);
    // @ts-ignore
    return valoresPosicoes[lenghtTextoPorcao] ? larguraMaxima - valoresPosicoes[lenghtTextoPorcao] : larguraMaxima;
};
var posicoesCentralizadasTextoQuantidadePorcao = function (parametroTipoTabela) {
    if (parametroTipoTabela === exports.tipoTabela.v2Reduzida) {
        return {
            "1": 1.3,
            "2": 1.3,
            "3": 0.4,
            "4": -0.2,
            "5": -0.8,
            "6": -1.38,
            "7": -2,
            "8": -2.2
        };
    }
    return {
        "1": 2.7,
        "2": 2.05,
        "3": 1.6,
        "4": 0.9,
        "5": +0.2,
        "6": -0.47,
        "7": -1.3,
        "8": +1
    };
};
exports.calcularPosicaoCentralizadaTabelaNutricional = function (parametroTipoTabela, coluna, posicaoXg, parametroQt) {
    var parametroQtString = parametroQt.toString();
    var tamanhoParametroQt = parametroQtString.length;
    var valorAlinhamento = parametroTipoTabela === exports.tipoTabela.v2Reduzida ?
        valoresPosicoesCentralizadasTabelaNutricionalReduzida(coluna, parametroQtString)
        : valoresPosicoesCentralizadasTabelaNutricional(coluna, parametroQtString);
    // @ts-ignore
    return valorAlinhamento[tamanhoParametroQt.toString()] ? posicaoXg - valorAlinhamento[tamanhoParametroQt.toString()] : posicaoXg;
};
// Positivo posiciona os valores para esquerda - Negativo para direita
var valoresPosicoesCentralizadasTabelaNutricional = function (coluna, parametroQt) {
    if (coluna === exports.colunas.qt100) {
        return {
            "1": +3.1,
            "2": +2.4,
            "3": +temPontoDecimal(parametroQt) ? 2.1 : 1.8,
            "4": +1.05,
            "5": +0.75,
            "7": -0.7
        };
    }
    if (coluna === exports.colunas.qtPorcao) {
        return {
            "1": +2.7,
            "2": +2.05,
            "3": +temPontoDecimal(parametroQt) ? 1.8 : 1.35,
            "4": +0.7,
            "5": +0.27,
            "6": -0.4,
            "7": -1.10
        };
    }
    // if (coluna === colunas.valorDiario) {
    //     return {
    //         "1": + 2.5,
    //         "2": + 1.9,
    //         "3": + temPontoDecimal(parametroQt) ? 1.5 : 1.15,
    //         "4": + 0.4,
    //         "5": + 0.1,
    //         "6": - 0.6,
    //         "7": - 1.3,
    //     };
    // }
    // Valor Diario
    return {
        "1": +2.5,
        "2": +1.9,
        "3": +temPontoDecimal(parametroQt) ? 1.5 : 1.15,
        "4": +0.4,
        "5": +0.1,
        "6": -0.6,
        "7": -1.3
    };
};
var valoresPosicoesCentralizadasTabelaNutricionalReduzida = function (coluna, parametroQt) {
    if (coluna === exports.colunas.qt100) {
        return {
            "1": +2.3,
            "2": +1.7,
            "3": +temPontoDecimal(parametroQt) ? 1.4 : 1.1,
            "4": +0.5,
            "5": +0.22,
            "6": -0.4,
            "7": -1
        };
    }
    if (coluna === exports.colunas.qtPorcao) {
        return {
            "1": +1.25,
            "2": +0.7,
            "3": +temPontoDecimal(parametroQt) ? 0.46 : 0.2,
            "4": -0.45,
            "5": -0.7,
            "6": -1.34,
            "7": -1.9
        };
    }
    // if (coluna === colunas.valorDiario) {
    //     return {
    //         "1": + 1.6,
    //         "2": + 1,
    //         "3": + temPontoDecimal(parametroQt) ? 0.8 : 0.48,
    //         "4": - 0.2,
    //         "5": - 0.5,
    //         "6": - 1.1,
    //         "7": - 1.7,
    //     };
    // }
    // valor diario
    return {
        "1": +1.6,
        "2": +1,
        "3": +temPontoDecimal(parametroQt) ? 0.8 : 0.48,
        "4": -0.2,
        "5": -0.5,
        "6": -1.1,
        "7": -1.7
    };
};
function temPontoDecimal(numeroString) {
    var pontoIndex = numeroString.indexOf(".");
    return pontoIndex !== -1;
}
// ---------------------------------- Fim Centralização -------------------------------------------------------
exports.nutrienteZerado = function (nutriente) {
    return !!((nutriente.valorDiario === "0" &&
        nutriente.qt100 === "0" &&
        nutriente.qtPorcao === "0")
        || (nutriente.valorDiario.trim().length === 0 &&
            nutriente.qt100.trim().length === 0 &&
            nutriente.qtPorcao.trim().length === 0));
};
exports.removeUnidadeRotulos = function (rotulo) {
    return rotulo
        .replace(default_1.KCAL, default_1.STRING_VAZIA)
        .replace(default_1.G, default_1.STRING_VAZIA)
        .replace(default_1.MG, default_1.STRING_VAZIA)
        .replace(default_1.L, default_1.STRING_VAZIA)
        .replace(default_1.ML, default_1.STRING_VAZIA)
        .trimStart()
        .trimEnd();
};
exports.extraiNutrientesVazios = function (nutrientes) {
    return nutrientes.filter(exports.nutrienteZerado).map(function (nutriente) { return exports.removeUnidadeRotulos(nutriente.rotulo); });
};
exports.montaTextoNaoContemQuantidadesSignificativasDe = function (nutrientes) {
    return default_1.NAO_CONTEM_QUANTIDADES_SIGNIFICATIVAS_DE
        + nutrientes
            .toString()
            .replaceAll(default_1.VIRGULA, default_1.VIRGULA_ESPACO)
            .replace(default_1.REGEX_ULTIMA_VIRGULA, default_1.ESPACO_E)
        + default_1.PONTO_FINAL;
};
exports.extraiPorcao = function (textoPorcao) {
    return textoPorcao.replace(default_1.REGEX_REMOVE_NUMEROS, default_1.STRING_VAZIA);
};
exports.montaRotuloDinamicoUnidadePorcaoTabelaVertical = function (rotulo, unidadePorcao) {
    return rotulo.replace(default_1.G, "" + default_1.ABRE_PARENTESES + exports.extraiPorcao(unidadePorcao) + default_1.FECHA_PARENTESES);
};
exports.montaRotuloDinamicoUnidadePorcaoTabelaLinear = function (unidade, unidadePorcao) {
    if (unidade === default_1.APENAS_MG) {
        return unidade;
    }
    return unidade.replace(default_1.APENAS_G, unidadePorcao.replace(default_1.REGEX_REMOVE_NUMEROS, default_1.STRING_VAZIA));
};
exports.contemTodasRegrasTabelaSimplificada = function (tabelaSimplificada) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, !!(tabelaSimplificada)];
    });
}); };
//# sourceMappingURL=tabela-nutricional-utils.js.map