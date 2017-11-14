var splitLines = function (texto, caracteresPorLinha) {
    if (texto == null || texto === "") {
        return [texto];
    }
    var linhas = [];
    var linhaAtual = "";
    var palavras = texto.split(" ");
    palavras.forEach(function (palavra, index) {
        if (linhaAtual === "") {
            linhaAtual += palavra;
        }
        else if ((linhaAtual.length + palavra.length + 1) <= caracteresPorLinha) {
            linhaAtual += " " + palavra;
        }
        else {
            linhas.push(linhaAtual);
            linhaAtual = palavra;
        }
        if (!palavras[index + 1] && linhaAtual) {
            linhas.push(linhaAtual);
        }
    });
    return linhas;
};
exports.splitLines = splitLines;
var strokeAlignedText = function (ctx, larguraMaxima, text, xMm, yMm, mm, textAlign) {
    var x = xMm;
    if (textAlign === TextAlign.CENTER) {
        x = xMm + larguraMaxima / 2;
    }
    else if (textAlign === TextAlign.RIGHT) {
        x = xMm + larguraMaxima;
    }
    ctx.textAlign = textAlign;
    ctx.strokeText(text, mm(x), mm(yMm), mm(larguraMaxima));
    ctx.fillText(text, mm(x), mm(yMm), mm(larguraMaxima));
};
exports.strokeAlignedText = strokeAlignedText;
var TextAlign = {
    LEFT: "left",
    RIGHT: "right",
    CENTER: "center"
};
exports.TextAlign = TextAlign;
//# sourceMappingURL=text-utils.js.map