var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var canvas_utils_1 = require("./../core/util/canvas-utils");
var barcode_1 = require("./barcode");
var barra_origem_rastreada_1 = require("./barra-origem-rastreada");
var mm_1 = require("./mm");
var qrcode_1 = require("./qrcode");
var tabela_nutricional_1 = require("./tabela-nutricional");
var text_1 = require("./text");
var create = function*(id, model, textBindings) {
    var nomeElementoCanvas = id + "-etiqueta-canvas";
    var mm = mm_1.mmPartial(model.impressao.resolucaoDpi);
    var canvas = canvas_utils_1.canvasUtils.createCanvas(nomeElementoCanvas, mm(model.etiqueta.dimensoes.larguraMm), mm(model.etiqueta.dimensoes.alturaMm));
    var ctx = canvas_utils_1.canvasUtils.createContext(canvas);
    var el = document.getElementById(id);
    el.appendChild(canvas);
    var promises = [];
    canvas_utils_1.canvasUtils.drawBackground(ctx, canvas.width, canvas.height);
    model.desenho.elementos.forEach(function (elemento) {
        var tipos = {
            codigoBarras: function () {
                return barcode_1.barcode.drawBarcode(id, ctx, model.impressao.resolucaoDpi, elemento, textBindings);
            },
            qrcode: function () {
                return new Promise(function (resolve) {
                    qrcode_1.qrcode.drawQrcode(id, ctx, model.impressao.resolucaoDpi, elemento, textBindings);
                    resolve();
                });
            },
            texto: function () {
                return new Promise(function (resolve) {
                    text_1.text.drawText(ctx, model.impressao.resolucaoDpi, elemento, textBindings);
                    resolve();
                });
            },
            tabelaNutricional: function () {
                return new Promise(function (resolve) {
                    tabela_nutricional_1.tabelaNutricional.drawTable(ctx, model.impressao.resolucaoDpi, elemento, textBindings);
                    resolve();
                });
            },
            barraOrigemRastreada: function () {
                return new Promise(function (resolve) {
                    barra_origem_rastreada_1.barraOrigemRastreada.drawBarraOrigemRastreada(id, ctx, model.impressao.resolucaoDpi, elemento);
                    resolve();
                });
            }
        };
        if (tipos[elemento.tipo]) {
            promises.push(tipos[elemento.tipo]());
        }
    });
    yield Promise.all(promises);
    redrawWithoutGrayscale(ctx, canvas.width, canvas.height);
    return canvas;
};
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
        ctx.save();
        ctx.translate(canvasFinal.width, 0);
        ctx.rotate(orientationDegrees * Math.PI / 180);
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
    }
    else if (orientationDegrees === 180) {
        canvasFinal.width = canvas.width;
        canvasFinal.height = canvas.height;
        var ctx = canvasFinal.getContext("2d");
        ctx.save();
        ctx.translate(canvas.width, canvas.height);
        ctx.rotate(orientationDegrees * Math.PI / 180);
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
    }
    else if (orientationDegrees === 270) {
        canvasFinal.width = canvas.height;
        canvasFinal.height = canvas.width;
        var ctx = canvasFinal.getContext("2d");
        ctx.save();
        ctx.translate(0, canvas.width);
        ctx.rotate(orientationDegrees * Math.PI / 180);
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
    }
    else {
        canvasFinal.width = canvas.width;
        canvasFinal.height = canvas.height;
        var ctx = canvasFinal.getContext("2d");
        ctx.save();
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
    }
    return canvasFinal;
};
exports.etiqueta = { create: create, exportCanvas: exportCanvas };
//# sourceMappingURL=index.js.map