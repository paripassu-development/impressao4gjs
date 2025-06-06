"use strict";
exports.__esModule = true;
var converterPtParaPX = function (pt) {
    return pt * 96 / 72;
};
exports.converterPtParaPX = converterPtParaPX;
var converterPXParaPT = function (px) {
    return 3 / 4 * px;
};
exports.converterPXParaPT = converterPXParaPT;
var converterPTparaMM = function (pt) {
    return pt * 0.3528;
};
exports.converterPTparaMM = converterPTparaMM;
var calculaTamanhoFonteByAlturaMMEFontePadraoPT = function (alturaMM, tamanhoPadraoFontePT) {
    var valorMMDaFonteEmPT = converterPTparaMM(tamanhoPadraoFontePT);
    return valorMMDaFonteEmPT > alturaMM
        ? alturaMM * (alturaMM + (valorMMDaFonteEmPT - alturaMM))
        : alturaMM * valorMMDaFonteEmPT;
};
exports.calculaTamanhoFonteByAlturaMMEFontePadraoPT = calculaTamanhoFonteByAlturaMMEFontePadraoPT;
