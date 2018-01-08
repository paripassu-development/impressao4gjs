let splitLines = function (texto, caracteresPorLinha) {
    if (texto == null || texto === "") {
        return [texto];
    }
    let linhas = [];
    let linhaAtual = "";
    let palavras = texto.split(" ");
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
let strokeAlignedText = function (ctx, larguraMaxima, text, xMm, yMm, mm, textAlign) {
    let x = xMm;
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
let TextAlign = {
    LEFT: "left",
    RIGHT: "right",
    CENTER: "center"
};
exports.TextAlign = TextAlign;
//# sourceMappingURL=text-utils.js.map