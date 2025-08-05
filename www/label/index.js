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
var fabric_1 = require("fabric");
var _ = require("lodash");
var Mustache = require("mustache");
var canvas_utils_1 = require("../core/util/canvas-utils");
var error_utils_1 = require("../core/util/error-utils");
var barcode_1 = require("./barcode");
var barra_origem_rastreada_1 = require("./barra-origem-rastreada");
var mm_1 = require("./mm");
var qrcode_1 = require("./qrcode");
var tabela_nutricional_1 = require("./tabela-nutricional");
var tabela_nutricional_inline_1 = require("./tabela-nutricional-inline");
var tabela_nutricional_linear_1 = require("./tabela-nutricional-linear");
var tabela_nutricional_v2_1 = require("./tabela-nutricional-v2");
var tabela_nutricional_vertical_1 = require("./tabela-nutricional-vertical");
var tabela_nutricional_vertical_reduzida_1 = require("./tabela-nutricional-vertical-reduzida");
var text_1 = require("./text");
exports.GS1_DATE_PATTERN = "YYmmDD";
exports.BARCODE_IMG_ELEMENT_ID = "barcode-img";
exports.EAN13_DEFAULT = "ean13";
exports.ITF14_DEFAULT = "itf14";
exports.ITF_DEFAULT = "itf";
exports.DUN14_4G = "dun14";
exports.INTERCALADO2A5_4G = "intercalado2a5";
exports.GS1_128_DEFAULT = "gs1-128";
exports.GS1_DATABAR_EXPANDED_STACKED = "databarexpandedstacked";
exports.GS1128 = "gs1128";
exports.EAN128 = "ean128";
exports.EAN_128 = "ean-128";
exports.AI_LOTE = "10";
exports.AIS_DATAS = [
    "11",
    "12",
    "13",
    "15",
    "17",
];
exports.AI_GTIN = "01";
exports.AI_CONTEUDO = "02";
exports.AIS_PESO_LIQUIDO = "310";
exports.AIS_PRECO_UNIDADE_MEDIDA = "8005";
function isFabricRequired(model, textBindings) {
    var markersRegex = new RegExp(/\^|\~/);
    return markersRegex.test(JSON.stringify(model)) || markersRegex.test(JSON.stringify(textBindings));
}
var create = function (id, model, textBindings) { return __awaiter(_this, void 0, void 0, function () {
    var errors, idElementoCanvas, idElementoFabricCanvas, mm, canvas, ctx, el, validacoes, promises, fabricCanvas, canvas2;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = new Array();
                idElementoCanvas = id + "-etiqueta-canvas";
                idElementoFabricCanvas = id + "-etiqueta-fabric-canvas";
                mm = mm_1.mmPartial(model.impressao.resolucaoDpi);
                canvas = canvas_utils_1.canvasUtils.createCanvas(idElementoCanvas, mm(model.etiqueta.dimensoes.larguraMm), mm(model.etiqueta.dimensoes.alturaMm));
                ctx = canvas_utils_1.canvasUtils.createContext(canvas);
                el = document.getElementById(id);
                validacoes = _.indexBy(model.validacoes, "variavel");
                // @ts-ignore
                el.appendChild(canvas);
                promises = [];
                canvas_utils_1.canvasUtils.drawBackground(ctx, canvas.width, canvas.height);
                fabricCanvas = null;
                if (isFabricRequired(model, textBindings)) {
                    canvas2 = canvas_utils_1.canvasUtils.createCanvas(idElementoFabricCanvas, mm(model.etiqueta.dimensoes.larguraMm), mm(model.etiqueta.dimensoes.alturaMm));
                    // @ts-ignore
                    fabricCanvas = new fabric_1.fabric.Canvas(canvas2);
                    canvas2.classList.add("fabric-canvas");
                    // @ts-ignore
                    el.appendChild(canvas2);
                }
                model.desenho.elementos.forEach(function (elemento) {
                    var tipos = {
                        codigoBarras: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, barcode_1.barcode.drawBarcode(id, ctx, model.impressao.resolucaoDpi, elemento, textBindings)["catch"](function (error) {
                                        errors = _.union(errors, error);
                                    })];
                            });
                        }); },
                        qrcode: function () {
                            return new Promise(function (resolve) {
                                qrcode_1.qrcode.drawQrcode(id, ctx, model.impressao.resolucaoDpi, elemento, textBindings);
                                // @ts-ignore
                                resolve();
                            });
                        },
                        texto: function () {
                            return new Promise(function (resolve) {
                                text_1.text.drawText(ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
                                // @ts-ignore
                                resolve();
                            });
                        },
                        /* TODO - Remover tabelaNutricional, tabelaNutricionalV2, tabelaNutricionalEmLinha após completa adequação
                        *   dos clientes com as novas nutricionais verticais*/
                        tabelaNutricional: function () {
                            return new Promise(function (resolve) {
                                tabela_nutricional_1.tabelaNutricional.drawTable(ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
                                // @ts-ignore
                                resolve();
                            });
                        },
                        tabelaNutricionalV2: function () {
                            return new Promise(function (resolve) {
                                tabela_nutricional_v2_1.tabelaNutricionalV2.drawTable(ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
                                // @ts-ignore
                                resolve();
                            });
                        },
                        tabelaNutricionalVertical: function () {
                            return new Promise(function (resolve) {
                                tabela_nutricional_vertical_1.tabelaNutricionalVertical.drawTable(ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
                                // @ts-ignore
                                resolve();
                            });
                        },
                        tabelaNutricionalVerticalReduzida: function () {
                            return new Promise(function (resolve) {
                                tabela_nutricional_vertical_reduzida_1.tabelaNutricionalVerticalReduzida.drawTable(ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
                                // @ts-ignore
                                resolve();
                            });
                        },
                        tabelaNutricionalLinear: function () {
                            return new Promise(function (resolve) {
                                tabela_nutricional_linear_1.tabelaNutricionalLinear.drawTable(ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
                                // @ts-ignore
                                resolve();
                            });
                        },
                        tabelaNutricionalEmLinha: function () {
                            return new Promise(function (resolve) {
                                tabela_nutricional_inline_1.tabelaNutricionalInline.drawTable(ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
                                // @ts-ignore
                                resolve();
                            });
                        },
                        barraOrigemRastreada: function () {
                            return new Promise(function (resolve) {
                                barra_origem_rastreada_1.barraOrigemRastreada.drawBarraOrigemRastreada(id, ctx, model.impressao.resolucaoDpi, elemento);
                                // @ts-ignore
                                resolve();
                            });
                        }
                    };
                    if (tipos[elemento.tipo]) {
                        promises.push(tipos[elemento.tipo]());
                    }
                });
                return [4 /*yield*/, Promise.all(promises)
                        .then()["catch"]()
                        .then(function () {
                        if (_.isArray(model.validacoes) && !!textBindings) {
                            model.validacoes.forEach(function (validacao) {
                                var variavel = "{{{" + validacao.variavel + "}}}";
                                var textRender = Mustache.render(variavel, textBindings);
                                error_utils_1.ErrorUtils.captureError(validacao.variavel, textRender, validacoes, errors);
                            });
                        }
                        if (!_.isEmpty(errors)) {
                            return Promise.reject(errors);
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            if (!!fabricCanvas) {
                                var img_1 = new Image(canvas.width, canvas.height);
                                fabricCanvas.getContext().imageSmoothingEnabled = false;
                                img_1.src = fabricCanvas.toDataURL({ format: "png" });
                                img_1.onload = function () {
                                    ctx.drawImage(img_1, 0, 0);
                                    redrawWithoutGrayscale(ctx, canvas.width, canvas.height);
                                    resolve(canvas);
                                };
                            }
                            else {
                                redrawWithoutGrayscale(ctx, canvas.width, canvas.height);
                                resolve(canvas);
                            }
                        }
                        catch (e) {
                            // tslint:disable-next-line:no-console
                            console.log("Erro ao gerar imagem da etiqueta: " + JSON.stringify(e));
                            reject(e);
                        }
                    })];
        }
    });
}); };
var redrawWithoutGrayscale = function (ctx, width, height) {
    var imageData = ctx.getImageData(0, 0, width, height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        // const value = (data[i] > 150 || data[i + 1] > 150 || data[i + 2] > 150) ? 255 : 0;
        var value = (data[i] + data[i + 1] + data[i + 2] / 3) > 400 ? 255 : 0;
        // red
        data[i] = value;
        // green
        data[i + 1] = value;
        // blue
        data[i + 2] = value;
    }
    // overwrite original image
    ctx.putImageData(imageData, 0, 0);
};
var exportCanvas = function (id, orientationDegrees) {
    var canvas = document.getElementById(id);
    var oldCanvas = document.getElementById(id + "-export-canvas");
    if (oldCanvas) {
        oldCanvas.remove();
    }
    var canvasFinal = document.createElement("canvas");
    canvasFinal.id = id + "-export-canvas";
    if (orientationDegrees === 90) {
        canvasFinal.width = canvas.height;
        canvasFinal.height = canvas.width;
        var ctx = canvasFinal.getContext("2d");
        if (ctx) {
            ctx.save();
            ctx.translate(canvasFinal.width, 0);
            ctx.rotate(orientationDegrees * Math.PI / 180);
            ctx.drawImage(canvas, 0, 0);
            ctx.restore();
        }
    }
    else if (orientationDegrees === 180) {
        canvasFinal.width = canvas.width;
        canvasFinal.height = canvas.height;
        var ctx = canvasFinal.getContext("2d");
        if (ctx) {
            ctx.save();
            ctx.translate(canvas.width, canvas.height);
            ctx.rotate(orientationDegrees * Math.PI / 180);
            ctx.drawImage(canvas, 0, 0);
            ctx.restore();
        }
    }
    else if (orientationDegrees === 270) {
        canvasFinal.width = canvas.height;
        canvasFinal.height = canvas.width;
        var ctx = canvasFinal.getContext("2d");
        if (ctx) {
            ctx.save();
            ctx.translate(0, canvas.width);
            ctx.rotate(orientationDegrees * Math.PI / 180);
            ctx.drawImage(canvas, 0, 0);
            ctx.restore();
        }
    }
    else {
        canvasFinal.width = canvas.width;
        canvasFinal.height = canvas.height;
        var ctx = canvasFinal.getContext("2d");
        if (ctx) {
            ctx.save();
            ctx.drawImage(canvas, 0, 0);
            ctx.restore();
        }
    }
    return canvasFinal;
};
exports.etiqueta = { create: create, exportCanvas: exportCanvas };
//# sourceMappingURL=index.js.map