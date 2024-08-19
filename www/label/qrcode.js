"use strict";
exports.__esModule = true;
var Mustache = require("mustache");
var mm_1 = require("./mm");
var QRCode = require("qrcodejs2-fixes");
var drawQrcode = function (id, ctx, dpi, model, textBindings) {
    var mm = mm_1.mmPartial(dpi);
    var qrcodeImg = createQrCode(id, {
        height: mm(model.dimensoes.alturaMm),
        text: textBindings ? Mustache.render(model.valor, textBindings) : model.valor,
        width: mm(model.dimensoes.larguraMm)
    });
    ctx.save();
    var degrees = model.posicao.rotacao || 0;
    ctx.rotate(degrees * Math.PI / 180);
    ctx.drawImage(qrcodeImg, mm(model.posicao.xMm), mm(model.posicao.yMm));
    ctx.restore();
};
var createQrCode = function (id, options) {
    var oldQrcodeDiv = document.getElementById("qrcode-div");
    if (oldQrcodeDiv) {
        oldQrcodeDiv.remove();
    }
    var qrcodeDiv = document.createElement("div");
    qrcodeDiv.id = "qrcode-div";
    qrcodeDiv.style.display = "none";
    document.getElementById(id).appendChild(qrcodeDiv);
    var qrcode = new QRCode("qrcode-div", {
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L,
        height: options.height,
        text: options.text,
        width: options.width
    });
    return qrcodeDiv.getElementsByTagName("canvas")[0];
};
exports.qrcode = { drawQrcode: drawQrcode };
//# sourceMappingURL=qrcode.js.map