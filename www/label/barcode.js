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
var JsBarcode = require("jsbarcode");
var moment_1 = require("moment");
var Mustache = require("mustache");
var error_1 = require("../core/common/error");
var constants_impressao_1 = require("../core/constants/constants-impressao");
var canvas_utils_1 = require("../core/util/canvas-utils");
var index_1 = require("./index");
var mm_1 = require("./mm");
var bwipjs = require("bwip-js");
var _ = require("lodash");
var OPTIONS_DEFAULT = {
    displayValue: true,
    textAlign: "center",
    font: "OCR-B"
};
//TODO refatorar para colocar o tipoCodigoBarras como um enum
var formatValue = function (model, textBindings, tipoCodigoBarras) {
    if (!textBindings) {
        return resolveDefaultValue(tipoCodigoBarras);
    }
    switch (tipoCodigoBarras.toLowerCase()) {
        case index_1.EAN13_DEFAULT:
            return formatEan13(Mustache.render(model.valor, textBindings));
        case index_1.ITF14_DEFAULT:
            return formatDun14(Mustache.render(model.valor, textBindings));
        case index_1.GS1_128_DEFAULT: {
            model.dimensoes.larguraUnitariaCodigoBarrasMm = Math.floor(model.dimensoes.larguraUnitariaCodigoBarrasMm);
            return formatGs1128(model.valores, textBindings);
        }
        case index_1.GS1_DATABAR_EXPANDED_STACKED: {
            return formatGs1128(model.valores, textBindings);
        }
        default:
            return formatIntercalado2De5(Mustache.render(model.valor, textBindings));
    }
};
var formatEan13 = function (ean) {
    // deixa com 12 digitos para o digito verificador ser
    // gerado pela lib de codigo de barras
    // edita somente se não for vazio
    if (!_.isEmpty(ean)) {
        if (ean.length > 13) {
            ean = ean.substring(1, 13);
        }
        else if (ean.length === 13) {
            ean = ean.substring(0, 12);
        }
        else if (ean.length < 12) {
            ean = ean.substring(0, ean.length - 1);
        }
        ean = _.padLeft(ean, 12, "0");
    }
    return ean;
};
var formatDun14 = function (ean) {
    // deixa com 13 digitos para o digito verificador ser
    // gerado pela lib de codigo de barras
    // edita somente se não for vazio
    if (!_.isEmpty(ean)) {
        if (ean.length > 14) {
            ean = ean.substring(1, 14);
        }
        else if (ean.length === 14) {
            ean = ean.substring(0, 13);
        }
        else if (ean.length < 13) {
            ean = ean.substring(0, ean.length - 1);
        }
        ean = _.padLeft(ean, 13, "0");
    }
    return ean;
};
var formatIntercalado2De5 = function (ean) {
    if (!_.isEmpty(ean)) {
        if (ean.length === 13) {
            ean = "0" + ean;
        }
        ean = _.padLeft(ean, 12, "0");
    }
    return ean;
};
function normalizeGS1Value(valor, identificador) {
    if (isData(identificador)) {
        var parts = valor.split("/");
        return moment_1["default"]({
            d: parts[0],
            m: parts[1],
            y: parts[2]
        }).format(index_1.GS1_DATE_PATTERN);
    }
    if (identificador.substring(0, identificador.length - 1) === index_1.AIS_PESO_LIQUIDO) {
        var casasDecimais = identificador.substring(identificador.length - 1);
        valor = _.padLeft(_.round(valor, casasDecimais).toFixed(casasDecimais).replace(/[.,]+/, ""), 6, "0");
        if (valor.length > 6) {
            valor = valor.substring(valor.length - 6);
        }
    }
    if (identificador === index_1.AIS_PRECO_UNIDADE_MEDIDA) {
        valor = _.padLeft(valor.replace(/\D+/, ""), 6, "0");
    }
    if (identificador === index_1.AI_GTIN) {
        valor = _.padLeft(valor, 14, "0");
    }
    return valor;
}
function formatGs1128(valores, textBindings) {
    return _.reduce(valores, function (finalValue, item) {
        var valor = Mustache.render(item.valor, textBindings);
        valor = normalizeGS1Value(valor, item.identificador);
        return finalValue.concat("(" + item.identificador + ")" + valor);
    }, "");
}
var resolveDefaultValue = function (tipoCodigoBarras) {
    switch (tipoCodigoBarras.toLowerCase()) {
        case index_1.EAN13_DEFAULT:
            return "000000000000";
        case index_1.ITF14_DEFAULT:
            return "0000000000000";
        case index_1.GS1_128_DEFAULT:
            return "(10)00000000000";
        case index_1.GS1_DATABAR_EXPANDED_STACKED:
            return "(10)00000000000";
        default:
            return "000000000000";
    }
};
function normalizeType(tipoCodigoBarras) {
    if (!!tipoCodigoBarras && _.contains([index_1.GS1128, index_1.GS1_128_DEFAULT, index_1.EAN128, index_1.EAN_128], tipoCodigoBarras.toLowerCase())) {
        return index_1.GS1_128_DEFAULT;
    }
    return tipoCodigoBarras;
}
// @ts-ignore
function validate(model, textBindings, tipoCodigoBarras) {
    if (!textBindings) {
        return [];
    }
    var errors = Array();
    if (tipoCodigoBarras.toLowerCase() === index_1.GS1_128_DEFAULT || tipoCodigoBarras.toLowerCase() === index_1.GS1_DATABAR_EXPANDED_STACKED) {
        model.valores.forEach(function (item) {
            var ai = item.identificador;
            var valor = Mustache.render(item.valor, textBindings);
            if (!ai) {
                errors.push(error_1.Error.build("impr.ui.js.identificador_nao_informado", constants_impressao_1.ErrosPrefix.ERROR_CODIGO_BARRAS + " \u00C9 necess\u00E1rio informar um identificador para cada valor do c\u00F3digo de barras.", constants_impressao_1.TipoError.GS1));
                return;
            }
            if (!valor) {
                errors.push(error_1.Error.build("impr.ui.js.valor_identificador_nao_informado", constants_impressao_1.ErrosPrefix.ERROR_CODIGO_BARRAS + " \u00C9 necess\u00E1rio informar um valor para cada identificador do c\u00F3digo de barras.", constants_impressao_1.TipoError.GS1));
                return;
            }
            if (_.includes(index_1.AI_GTIN, ai) && !(new RegExp(/^\d{1,14}$/).test(valor))) {
                errors.push(error_1.Error.build("impr.ui.js.identificador_gtin_conter_14_caracteres", constants_impressao_1.ErrosPrefix.ERROR_CODIGO_BARRAS + " O valor do identificador " + ai + " deve ter at\u00E9 14 caracteres. Somente n\u00FAmeros.", constants_impressao_1.TipoError.GS1, ai));
            }
            if (_.includes(index_1.AI_CONTEUDO, ai) && !(new RegExp(/^\d{14}$/).test(valor))) {
                errors.push(error_1.Error.build("impr.ui.js.identificador_conteudo_conter_14_caracteres", constants_impressao_1.ErrosPrefix.ERROR_CODIGO_BARRAS + " O valor do identificador " + ai + " deve ter 14 caracteres num\u00E9ricos.", constants_impressao_1.TipoError.GS1, ai));
            }
            if (_.includes(index_1.AIS_DATAS, ai) && !(new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/).test(valor))) {
                errors.push(error_1.Error.build("impr.ui.js.identificador_data_nao_esta_formatado", constants_impressao_1.ErrosPrefix.ERROR_CODIGO_BARRAS + " O valor do identificador " + ai + " deve ter o formato DD/MM/AAAA.", constants_impressao_1.TipoError.GS1, ai));
            }
            if (ai === index_1.AI_LOTE && !(new RegExp(/^.{1,20}$/).test(valor))) {
                errors.push(error_1.Error.build("impr.ui.js.identificador_lote_conter_max_20_caracteres", constants_impressao_1.ErrosPrefix.ERROR_CODIGO_BARRAS + " O valor do identificador " + ai + " deve ter no m\u00E1ximo 20 caracteres alfanum\u00E9ricos.", constants_impressao_1.TipoError.GS1, ai));
            }
            if (ai.substring(0, ai.length - 1) === index_1.AIS_PESO_LIQUIDO && (new RegExp(/^\d{1}$/)).test(ai.substring(ai.length - 1, ai.length)) && !(new RegExp(/^[+]?\d+(\.\d+)?$/).test(valor))) {
                errors.push(error_1.Error.build("impr.ui.js.identificador_peso_liquido_conter_6_caracteres", constants_impressao_1.ErrosPrefix.ERROR_CODIGO_BARRAS + " O valor do identificador " + ai + " deve ter no m\u00E1ximo 6 caracteres num\u00E9ricos.", constants_impressao_1.TipoError.GS1, ai));
            }
            if (ai === index_1.AIS_PRECO_UNIDADE_MEDIDA && valor.replace(/[.,]+/, "").length > 6) {
                errors.push(error_1.Error.build("impr.ui.js.identificador_preco_unidade_medida_conter_6_caracteres", constants_impressao_1.ErrosPrefix.ERROR_CODIGO_BARRAS + " O valor do identificador " + ai + " deve ter no m\u00E1ximo 6 caracteres num\u00E9ricos.", constants_impressao_1.TipoError.GS1, ai));
            }
            if (ai === index_1.AIS_PRECO_UNIDADE_MEDIDA && !(new RegExp(/^[+]?\d+((\.|,)\d+)?$/)).test(valor)) {
                errors.push(error_1.Error.build("impr.ui.js.identificador_preco_unidade_medida_deve_ser_numerico", constants_impressao_1.ErrosPrefix.ERROR_CODIGO_BARRAS + " O valor do identificador " + ai + " deve existir e ser um n\u00FAmero positivo.", constants_impressao_1.TipoError.GS1, ai));
            }
        });
        return errors;
    }
}
var drawBarcode = function (id, ctx, dpi, model, textBindings) { return __awaiter(_this, void 0, void 0, function () {
    var mm, tipoCodigoBarras, errorsCodigoBarras, valor, barcodeImg_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mm = mm_1.mmPartial(dpi);
                tipoCodigoBarras = mapLabelTypes(Mustache.render(model.tipoCodigoBarras, textBindings));
                tipoCodigoBarras = normalizeType(tipoCodigoBarras);
                errorsCodigoBarras = validate(model, textBindings, tipoCodigoBarras);
                if (!_.isEmpty(errorsCodigoBarras)) {
                    throw errorsCodigoBarras;
                }
                valor = formatValue(model, textBindings, tipoCodigoBarras);
                if (!!_.isEmpty(valor)) return [3 /*break*/, 2];
                return [4 /*yield*/, exports.barcode.createBarcode(id, dpi, {
                        barCodeHeight: model.dimensoes.alturaCodigoBarrasMm,
                        barcodeWidth: model.dimensoes.larguraUnitariaCodigoBarrasMm,
                        segments: model.dimensoes.numeroSegmentosPorLinha,
                        font: model.fonte.nome,
                        fontSize: model.fonte.alturaMm,
                        format: tipoCodigoBarras,
                        text: valor,
                        textAlign: model.fonte.alinhar,
                        displayValue: model.mostraTexto
                    })];
            case 1:
                barcodeImg_1 = _a.sent();
                return [2 /*return*/, new Promise(function (resolve) {
                        barcodeImg_1.onload = function () {
                            var degrees = model.posicao.rotacao || 0;
                            ctx.save();
                            ctx.rotate(degrees * Math.PI / 180);
                            ctx.drawImage(barcodeImg_1, 0, 0, barcodeImg_1.width, barcodeImg_1.height, mm(model.posicao.xMm), mm(model.posicao.yMm), barcodeImg_1.width, barcodeImg_1.height);
                            ctx.restore();
                            // @ts-ignore
                            resolve();
                        };
                    })];
            case 2: return [2 /*return*/, Promise.resolve()];
        }
    });
}); };
var mapLabelTypes = function (labelType) {
    switch (labelType.toLowerCase()) {
        case index_1.INTERCALADO2A5_4G:
            return index_1.ITF_DEFAULT;
        case index_1.DUN14_4G:
            return index_1.ITF14_DEFAULT;
        default:
            return labelType;
    }
};
var isData = function (identificador) { return _.contains(index_1.AIS_DATAS, identificador); };
var buildOptionsBwipJs = function (options) { return ({
    bcid: options.format,
    text: options.text,
    scaleX: 150,
    scaleY: 3,
    segments: options.segments || 10,
    width: options.barcodeWidth,
    height: options.barCodeHeight,
    includetext: options.displayValue,
    textfont: "OCR-B",
    textsize: Math.round(options.fontSize),
    textxalign: options.textAlign
}); };
var buildOptionsJsBarcode = function (options, dpi) {
    var mm = mm_1.mmPartial(dpi);
    return {
        font: options.font,
        fontSize: mm(options.fontSize),
        displayValue: options.displayValue,
        format: options.format,
        height: mm(options.barCodeHeight),
        margin: 1,
        textMargin: 0,
        textAlign: options.textAlign,
        width: mm(options.barcodeWidth)
    };
};
var createBarcodeWithBwipJs = function (options, img) {
    var canvas = canvas_utils_1.canvasUtils.createCanvas("canvas", 0, 0);
    return new Promise(function (resolve, reject) {
        bwipjs(canvas, buildOptionsBwipJs(options), function (err) {
            if (err) {
                reject("Erro ao gerar o codigo de barras " + options.format);
                // tslint:disable-next-line:no-console
                console.log("Erro ao gerar o codigo de barras " + options.format);
            }
            else {
                img.src = canvas.toDataURL("image/png");
            }
            resolve(img);
        });
    });
};
var createBarcodeWithBarcodeJs = function (
// @ts-ignore
id, img, options, dpi) { return new Promise(function (resolve, reject) {
    try {
        var selector = "#" + index_1.BARCODE_IMG_ELEMENT_ID;
        var barcodeElement = document.querySelector(selector);
        if (!barcodeElement) {
            // @ts-ignore
            throw new error_1.Error("Elemento com o seletor \"" + selector + "\" n\u00E3o encontrado no DOM.");
        }
        JsBarcode(selector, options.text, buildOptionsJsBarcode(options, dpi));
        resolve(img);
    }
    catch (error) {
        // tslint:disable-next-line:no-console
        console.error("Erro ao gerar o código de barras:", error);
        reject(error);
    }
}); };
var createBarcode = function (id, dpi, options) {
    var oldImg = document.getElementById(index_1.BARCODE_IMG_ELEMENT_ID);
    if (oldImg) {
        oldImg.remove();
    }
    var img = document.createElement("img");
    img.id = index_1.BARCODE_IMG_ELEMENT_ID;
    img.style.display = "none";
    // @ts-ignore
    document.getElementById(id).appendChild(img);
    _.defaults(options, OPTIONS_DEFAULT);
    if (options.format === index_1.GS1_128_DEFAULT || options.format === index_1.GS1_DATABAR_EXPANDED_STACKED) {
        return createBarcodeWithBwipJs(options, img);
    }
    else {
        return createBarcodeWithBarcodeJs(id, img, options, dpi);
    }
};
// extraido da biblioteca jsBarcode (src/barcodes/EAN_PC/EAN13)
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit
var checksumEan13 = function (ean13) {
    var result = 0;
    var i;
    for (i = 0; i < 12; i += 2) {
        result += parseInt(ean13[i]);
    }
    for (i = 1; i < 12; i += 2) {
        result += parseInt(ean13[i]) * 3;
    }
    return (10 - (result % 10)) % 10;
};
// extraido da biblioteca jsBarcode (src/barcodes/ITF14)
var checksumDun14 = function (dun14) {
    var result = 0;
    for (var i = 0; i < 13; i++) {
        result += parseInt(dun14[i]) * (3 - (i % 2) * 2);
    }
    return Math.ceil(result / 10) * 10 - result;
};
//TODO trocar tipoCodigoBarras para ser um enum contendo os tipos de barra suportados afim de evitar erros
var generateCodigoValue = function (tipoCodigoBarras, value) {
    switch (tipoCodigoBarras) {
        case index_1.EAN13_DEFAULT: {
            var formatedEan13 = formatEan13(value);
            return formatedEan13 + checksumEan13(formatedEan13);
        }
        case index_1.DUN14_4G:
        case index_1.ITF14_DEFAULT: {
            var formatedDun14 = formatDun14(value);
            return formatedDun14 + checksumDun14(formatedDun14);
        }
        default:
            return value;
    }
};
var removeZerosEsquerda = function (value) {
    return value.replace(/^0*/, "");
};
//TODO trocar tipoCodigoBarras para ser um enum contendo os tipos de barra suportados afim de evitar erros
var isValid = function (tipoCodigoBarras, value) {
    if (!value || _.isEmpty(value) || !tipoCodigoBarras || _.isEmpty(tipoCodigoBarras)) {
        return false;
    }
    return removeZerosEsquerda(value) === removeZerosEsquerda(generateCodigoValue(tipoCodigoBarras, value));
};
var visibleForTesting = {
    removeZerosEsquerda: removeZerosEsquerda,
    checksumEan13: checksumEan13,
    checksumDun14: checksumDun14,
    formatEan13: formatEan13,
    formatDun14: formatDun14,
    formatIntercalado2De5: formatIntercalado2De5
};
exports.barcode = { createBarcode: createBarcode, drawBarcode: drawBarcode, generateCodigoValue: generateCodigoValue, isValid: isValid, visibleForTesting: visibleForTesting };
//# sourceMappingURL=barcode.js.map