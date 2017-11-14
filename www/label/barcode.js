var Mustache = require("mustache");
var mm_1 = require("./mm");
var JsBarcode = require("jsbarcode");
var _ = require('lodash');
var formatEan = function (ean, tipoCodigoBarras) {
    switch (tipoCodigoBarras.toLowerCase()) {
        case 'ean13':
            return formatEan13(ean);
        case 'itf14':
            return formatDun14(ean);
        default:
            return formatIntercalado2De5(ean);
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
        else if (ean.length == 13) {
            ean = ean.substring(0, 12);
        }
        else if (ean.length < 12) {
            ean = ean.substring(0, ean.length - 1);
        }
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
        else if (ean.length == 14) {
            ean = ean.substring(0, 13);
        }
        else if (ean.length < 13) {
            ean = ean.substring(0, ean.length - 1);
        }
    }
    return ean;
};
var formatIntercalado2De5 = function (ean) {
    if (!_.isEmpty(ean)) {
        if (ean.length == 13) {
            ean = '0' + ean;
        }
    }
    return ean;
};
var drawBarcode = function (id, ctx, dpi, model, textBindings) {
    var mm = mm_1.mmPartial(dpi);
    var ean = textBindings ? formatEan(Mustache.render(model.valor, textBindings), model.tipoCodigoBarras) : "000000000000";
    if (!_.isEmpty(ean)) {
        var barcodeImg = exports.barcode.createBarcode(id, {
            barCodeHeight: mm(model.dimensoes.alturaCodigoBarrasMm),
            barcodeWidth: mm(model.dimensoes.larguraUnitariaCodigoBarrasMm),
            font: model.fonte.nome,
            fontSize: mm(model.fonte.alturaMm),
            format: model.tipoCodigoBarras,
            text: ean
        });
        return new Promise(function (resolve, reject) {
            barcodeImg.onload = function () {
                var degrees = model.posicao.rotacao || 0;
                ctx.save();
                ctx.rotate(degrees * Math.PI / 180);
                ctx.drawImage(barcodeImg, 0, 0, barcodeImg.width, barcodeImg.height, mm(model.posicao.xMm), mm(model.posicao.yMm), barcodeImg.width, barcodeImg.height);
                ctx.restore();
                resolve();
            };
        });
    }
    return Promise.resolve();
};
var createBarcode = function (id, options) {
    var oldImg = document.getElementById("barcode-img");
    if (oldImg) {
        oldImg.remove();
    }
    var img = document.createElement("img");
    img.id = "barcode-img";
    img.style.display = "none";
    document.getElementById(id).appendChild(img);
    var lpaddedText = _.padLeft(options.text, 12, '0');
    JsBarcode("#barcode-img", lpaddedText, {
        font: options.font || "OCR-B",
        fontSize: options.fontSize,
        format: options.format,
        height: options.barCodeHeight,
        margin: 1,
        textMargin: 0,
        width: options.barcodeWidth
    });
    return img;
};
exports.barcode = { createBarcode: createBarcode, drawBarcode: drawBarcode };
//# sourceMappingURL=barcode.js.map