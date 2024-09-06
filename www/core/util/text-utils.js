"use strict";
exports.__esModule = true;
var fabric_1 = require("fabric");
var lodash_1 = require("lodash");
var default_1 = require("../../default");
var mm_1 = require("../../label/mm");
var TextAlign = {
    LEFT: "left",
    RIGHT: "right",
    CENTER: "center",
    JUSTIFY: "justify"
};
exports.TextAlign = TextAlign;
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
        if (palavras[index + 1] == null && linhaAtual) {
            linhas.push(linhaAtual);
        }
    });
    return linhas;
};
exports.splitLines = splitLines;
var splitLinesAutoSize = function (context, model, texto, larguraMaxima, maximoNumeroDeLinhas, alturaMinimaFonteMm, dpi) {
    if (texto == null || texto === "") {
        return [texto];
    }
    var alturaFontMm = model.fonte.alturaMm;
    var linhas = [];
    var linhaAtual = "";
    var linhaAtualWidth = getTextWidth(linhaAtual, context, dpi);
    var spaceWidth = getTextWidth(" ", context, dpi);
    texto = texto.replace(/\s{2,}/g, " ").trim(); // remove espaços estras entre palavras
    texto = texto.replace(/,(\S)/g, ", $1"); // adiciona um espaço em branco após qualquer occorência de vírgula que não seja seguida de espaço (usado para evitar que múltiplas palavras sejam vistas como uma)
    var palavras = texto.split(" ");
    palavras.forEach(function (palavra, index) {
        var palavraWidth = getTextWidth(palavra, context, dpi);
        if (linhaAtual === "") {
            linhaAtual += palavra;
            linhaAtualWidth = getTextWidth(linhaAtual, context, dpi);
        }
        else if ((linhaAtualWidth + palavraWidth + spaceWidth) <= larguraMaxima) {
            linhaAtual += " " + palavra;
            linhaAtualWidth = getTextWidth(linhaAtual, context, dpi);
        }
        else {
            linhas.push(linhaAtual);
            linhaAtual = palavra;
            linhaAtualWidth = getTextWidth(linhaAtual, context, dpi);
        }
        if (!palavras[index + 1] && linhaAtual) {
            linhas.push(linhaAtual);
        }
    });
    if (linhas.length <= maximoNumeroDeLinhas) {
        return linhas;
    }
    else if (linhas.length > maximoNumeroDeLinhas && alturaFontMm <= alturaMinimaFonteMm) {
        return truncaLinhas(linhas, maximoNumeroDeLinhas, larguraMaxima, context, dpi);
    }
    else {
        var mm = mm_1.mmPartial(dpi);
        alturaFontMm = (alturaFontMm * 0.8) >= alturaMinimaFonteMm ? (alturaFontMm * 0.9) : alturaMinimaFonteMm; // diminui o tamanho da fonte gradativamente em 10% até a no máximo ter "alturaMinimaFonteMm"
        context.font = (model.fonte.negrito ? "bold" : "") + " " + mm(alturaFontMm) + "px " + model.fonte.nome; // atualiza o tamanho da fonte do context
        model.fonte.alturaMm = alturaFontMm;
        return splitLinesAutoSize(context, model, texto, larguraMaxima, maximoNumeroDeLinhas, alturaMinimaFonteMm, dpi); // chama a função recursivamente com o tamanho da fonte atualizado
    }
};
exports.splitLinesAutoSize = splitLinesAutoSize;
var truncaLinhas = function (linhas, maximoNumeroDeLinhas, larguraMaxima, context, dpi) {
    linhas = linhas.slice(0, maximoNumeroDeLinhas);
    var ultimaLinhaWidth = getTextWidth(linhas[maximoNumeroDeLinhas], context, dpi);
    var reticenciasWidth = getTextWidth("...", context, dpi);
    if (ultimaLinhaWidth + reticenciasWidth <= larguraMaxima) {
        linhas[maximoNumeroDeLinhas - 1] = linhas[maximoNumeroDeLinhas - 1].concat("...");
    }
    else {
        linhas[maximoNumeroDeLinhas - 1] = linhas[maximoNumeroDeLinhas - 1].substring(0, larguraMaxima - reticenciasWidth).concat("...");
    }
    return linhas;
};
var getTextWidth = function (text, context, dpi) {
    var textWidthInPixels = context.measureText(text).width;
    return pixelsToMillimeter(textWidthInPixels, dpi);
};
var pixelsToMillimeter = function (textWidthInPixels, dpi) {
    var MM_INCH_RATIO = 25.4;
    var ppm = dpi / MM_INCH_RATIO;
    return textWidthInPixels / ppm;
};
function buildMarkersRegex(config) {
    return "\\" + config.marker + "([^\\" + config.marker + "]+)\\" + config.marker;
}
function resolveCharStyles(text, markersConfig) {
    // mapeia o estilo de cada caractere
    var finalText = text;
    var lineStyle = markersConfig.reduce(function (mappedStyles, config) {
        if (!lodash_1["default"].includes(text, config.marker)) {
            return mappedStyles;
        }
        var boldItalicRegExp = new RegExp(buildMarkersRegex(config));
        var cleanText = text;
        lodash_1["default"].reject(markersConfig, config)
            .forEach(function (otherConfig) {
            cleanText = cleanText.replace(new RegExp(buildMarkersRegex(otherConfig), "g"), "$1");
        });
        var match = boldItalicRegExp.exec(cleanText);
        // identifica os chars marcados
        var markedCharIndexes = [];
        while (match != null) {
            var endIndex = match.index + match[0].length - 2; // desconsidera marcadores
            markedCharIndexes = markedCharIndexes.concat(lodash_1["default"].range(match.index, endIndex));
            cleanText = cleanText.replace(boldItalicRegExp, "$1");
            match = boldItalicRegExp.exec(cleanText);
        }
        // seta estilos de cada char
        lodash_1["default"].uniq(markedCharIndexes)
            .forEach(function (charIndex) {
            mappedStyles[charIndex] = mappedStyles[charIndex] || {};
            lodash_1["default"].assign(mappedStyles[charIndex], config.textStyle);
        });
        finalText = cleanText;
        return mappedStyles;
    }, {});
    return {
        text: finalText,
        styles: { 0: lineStyle }
    };
}
var strokeAlignedText = function (ctx, fabricCanvas, larguraMaxima, text, xMm, yMm, mm, textAlign, degrees) {
    var x = xMm;
    if (textAlign === TextAlign.CENTER) {
        x = xMm + larguraMaxima / 2;
    }
    else if (textAlign === TextAlign.RIGHT) {
        x = xMm + larguraMaxima;
    }
    else if (textAlign === TextAlign.JUSTIFY) {
        text = justifyText(ctx, mm(larguraMaxima), text);
    }
    ctx.textAlign = textAlign;
    if (!!fabricCanvas) {
        writeFabricText(fabricCanvas, ctx, text, x, yMm, larguraMaxima, mm, { degrees: degrees });
    }
    else {
        ctx.strokeText(text, mm(x), mm(yMm), mm(larguraMaxima));
        ctx.fillText(text, mm(x), mm(yMm), mm(larguraMaxima));
    }
};
exports.strokeAlignedText = strokeAlignedText;
function isBoldFont(fontName) {
    return lodash_1["default"].includes(fontName.toLowerCase(), 'bold');
}
var writeFabricText = function (fabricCanvas, ctx, text, xMm, yMm, larguraMaximaMm, mm, options) {
    options = options || {};
    var larguraMaximaPx = mm(larguraMaximaMm);
    var fontProperties = /(bold)?\s?(\d+px)?\s?(.+)?$/.exec(ctx.font);
    var font = {
        weight: fontProperties[1],
        size: Number((fontProperties[2] || "").replace("px", "")),
        name: fontProperties[3]
    };
    var textAlign = ctx.textAlign;
    var maxTextWidth = larguraMaximaPx;
    var background = undefined;
    var xPx = mm(xMm);
    if (textAlign === TextAlign.CENTER) {
        xPx = xPx - (maxTextWidth / 2);
    }
    else if (textAlign === TextAlign.RIGHT) {
        xPx = xPx - maxTextWidth;
    }
    var top = mm(yMm) - font.size;
    var left = xPx;
    if (options.degrees > 0 && options.degrees <= 90) {
        var newLeft = Math.abs(top);
        top = left;
        left = newLeft;
    }
    else if (options.degrees > 90 && options.degrees <= 180) {
        top = Math.abs(top);
        left = Math.abs(left);
    }
    else if (options.degrees > 180 && options.degrees <= 270) {
        var newTop = Math.abs(left);
        left = top;
        top = newTop;
    }
    if (left < 0) {
        maxTextWidth += left;
        left = 0;
    }
    if (top < 0) {
        maxTextWidth += top;
        top = 0;
    }
    var subrangeStyles = resolveCharStyles(text, [
        { marker: "^", textStyle: { fontWeight: "bold" } },
        { marker: "~", textStyle: { fontStyle: "italic" } },
    ]);
    text = subrangeStyles.text;
    var fabricText = new fabric_1.fabric.IText(text, {
        top: top,
        left: left,
        textAlign: ctx.textAlign,
        fill: String(ctx.fillStyle),
        stroke: String(ctx.strokeStyle),
        angle: options.degrees,
        fontWeight: isBoldFont(font.name) ? 'bold' : font.weight || "normal",
        fontFamily: font.name,
        fontSize: font.size,
        strokeWidth: ctx.lineWidth,
        styles: subrangeStyles.styles,
        backgroundColor: background
    });
    var textWidth = fabricText.measureLine(0).width;
    var scaleFactorX = maxTextWidth / textWidth;
    if (scaleFactorX < 1) {
        fabricText.scaleX = scaleFactorX;
        maxTextWidth /= scaleFactorX; // ajusta se foi alterado pelo scaleX
    }
    fabricCanvas.add(fabricText);
    fabricText.width = maxTextWidth;
    fabricCanvas.renderAll();
};
exports.writeFabricText = writeFabricText;
var justifyText = function (context, maxLen, text) {
    var numWords;
    var spaceLength;
    var numOfSpaces;
    var num;
    var filler;
    var delimiter = "\u200A";
    var textJustified;
    numWords = text.trim().split(/\s+/).length;
    if (numWords <= 1) {
        return text;
    }
    textJustified = text.trim().split(/\s+/).join(delimiter);
    spaceLength = context.measureText(delimiter).width;
    numOfSpaces = (maxLen - context.measureText(text).width) / spaceLength;
    num = numOfSpaces;
    filler = "";
    for (var j = 0; j < num; j++) {
        filler += delimiter;
    }
    textJustified = textJustified.trim().split(delimiter).join(filler);
    return textJustified;
};
function adicionarEspacoEntreNumeroELetra(text) {
    var regex = /(\d)([a-zA-Z])/g;
    var textoConvertido = text.replace(regex, '$1 $2');
    return textoConvertido;
}
exports.adicionarEspacoEntreNumeroELetra = adicionarEspacoEntreNumeroELetra;
var ocultaCampoTextoComBaseNoValor = function (valor) {
    if (default_1.VALORES_PARA_OCULTAR.some(function (item) { return item.toUpperCase() === valor.toUpperCase(); })) {
        return default_1.STRING_VAZIA;
    }
    return valor;
};
exports.ocultaCampoTextoComBaseNoValor = ocultaCampoTextoComBaseNoValor;
//# sourceMappingURL=text-utils.js.map