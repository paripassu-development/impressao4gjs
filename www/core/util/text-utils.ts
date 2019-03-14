import {mmPartial} from "../../label/mm";
import {fabric} from "fabric";
import {
    Canvas,
    TextOptions
} from "fabric/fabric-impl";

const splitLines =  (texto: string, caracteresPorLinha: number): string[] => {
    if (texto == null || texto === "") {
        return [texto];
    }
    const linhas: string[] = [];
    let linhaAtual = "";
    const palavras: string[] = texto.split(" ");
    palavras.forEach((palavra: string, index: number) => {
        if (linhaAtual === "") {
            linhaAtual += palavra;
        } else if ((linhaAtual.length + palavra.length + 1) <= caracteresPorLinha) {
            linhaAtual += " " + palavra;
        } else {
            linhas.push(linhaAtual);
            linhaAtual = palavra;
        }
        if (palavras[index + 1] == null && linhaAtual) {
            linhas.push(linhaAtual);
        }
    });
    return linhas;
};

const splitLinesAutoSize =  (context: CanvasRenderingContext2D , model: any, texto: string,
                             larguraMaxima: number, maximoNumeroDeLinhas: number, alturaMinimaFonteMm: number, dpi: number): string[] => {
    if (texto == null || texto === "") {
        return [texto];
    }

    let alturaFontMm = model.fonte.alturaMm;
    const linhas: string[] = [];
    let linhaAtual = "";
    let linhaAtualWidth = getTextWidth(linhaAtual, context, dpi);
    const spaceWidth = getTextWidth(" ", context, dpi);
    texto = texto.replace(/\s{2,}/g, " ").trim() ; // remove espaços estras entre palavras
    texto = texto.replace(/,(\S)/g, ", $1"); // adiciona um espaço em branco após qualquer occorência de vírgula que não seja seguida de espaço (usado para evitar que múltiplas palavras sejam vistas como uma)
    const palavras: string[] = texto.split(" ");

    palavras.forEach((palavra: string, index: number) => {
        const palavraWidth = getTextWidth(palavra, context, dpi);
        if (linhaAtual === "") {
            linhaAtual += palavra;
            linhaAtualWidth = getTextWidth(linhaAtual, context, dpi);
        } else if ((linhaAtualWidth + palavraWidth + spaceWidth) <= larguraMaxima) {
            linhaAtual += " " + palavra;
            linhaAtualWidth = getTextWidth(linhaAtual, context, dpi);
        } else {
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
    } else if (linhas.length > maximoNumeroDeLinhas && alturaFontMm <= alturaMinimaFonteMm) {
        return truncaLinhas(linhas, maximoNumeroDeLinhas, larguraMaxima, context, dpi);
    } else {
        const mm = mmPartial(dpi);
        alturaFontMm = (alturaFontMm * 0.8) >= alturaMinimaFonteMm ? (alturaFontMm * 0.9) : alturaMinimaFonteMm; // diminui o tamanho da fonte gradativamente em 10% até a no máximo ter "alturaMinimaFonteMm"
        context.font = `${model.fonte.negrito ? "bold" : ""} ${mm(alturaFontMm)}px ${model.fonte.nome}`; // atualiza o tamanho da fonte do context
        model.fonte.alturaMm = alturaFontMm;
        return splitLinesAutoSize(context, model, texto, larguraMaxima, maximoNumeroDeLinhas, alturaMinimaFonteMm, dpi); // chama a função recursivamente com o tamanho da fonte atualizado
    }
};

const truncaLinhas = (linhas: string[], maximoNumeroDeLinhas: number, larguraMaxima: number, context: any, dpi: number): string[] => {
    linhas = linhas.slice(0, maximoNumeroDeLinhas);
    const ultimaLinhaWidth = getTextWidth(linhas[maximoNumeroDeLinhas], context, dpi);
    const reticenciasWidth = getTextWidth("...", context, dpi);
    if (ultimaLinhaWidth + reticenciasWidth <= larguraMaxima) {
        linhas[maximoNumeroDeLinhas - 1] = linhas[maximoNumeroDeLinhas - 1].concat("...");
    } else {
        linhas[maximoNumeroDeLinhas - 1] = linhas[maximoNumeroDeLinhas - 1].substring(0, larguraMaxima - reticenciasWidth).concat("...");
    }
    return linhas;
};

const getTextWidth = (text: string, context: any, dpi: number): number => {
    const textWidthInPixels = context.measureText(text).width;
    return pixelsToMillimeter(textWidthInPixels, dpi);
};

const pixelsToMillimeter = (textWidthInPixels: number, dpi: number) => {
    const MM_INCH_RATIO = 25.4;
    const ppm = dpi / MM_INCH_RATIO;
    return textWidthInPixels / ppm;
};

function resolveCharStyles(text: string): IFabricSubrangeStyles {
    if (!_.includes(text, "#")) {
        return {text};
    }

    const boldItalicRegExp = new RegExp(/#{3}([\w\s\W]+)#{3}/g);
    let match = boldItalicRegExp.exec(text);
    const boldItalicIndexes: number[][] = [];
    while (match != null) {
        boldItalicIndexes.push(_.range(match.index, match.index + match[0].length));
        text = text.replace(boldItalicRegExp, "$1");
        match = boldItalicRegExp.exec(text);
    }
    const uniqIndexes = _.chain(boldItalicIndexes)
        .flatten()
        .uniq()
        .value();

    const lineStyle = uniqIndexes
        .reduce((styleObj: IFabricTextLineStyle, charIndex: number) => {
            styleObj[charIndex] = {
                fontStyle: "italic",
                fontWeight: "bold",
            };
            return styleObj;
        }, {} as IFabricTextLineStyle) as IFabricTextLineStyle;

    return {
        text,
        styles: {0: lineStyle}
    };
}

const strokeAlignedText = (ctx: CanvasRenderingContext2D, fabricCanvas: fabric.Canvas, larguraMaxima: number, text: string, xMm: number, yMm: number, mm: any, textAlign: string, degrees?: number) => {
    let x = xMm;
    if (textAlign === TextAlign.CENTER) {
        x = xMm + larguraMaxima / 2;
    } else if (textAlign === TextAlign.RIGHT) {
        x = xMm + larguraMaxima;
    } else if (textAlign === TextAlign.JUSTIFY) {
        text = justifyText(ctx, mm(larguraMaxima), text);
    }
    ctx.textAlign = textAlign;

    if (!!fabricCanvas) {
        writeFabricText(fabricCanvas, ctx, text, x, yMm, larguraMaxima, mm);
    } else {
        console.log(`${text}: (${mm(x)}, ${mm(yMm)})`);
        ctx.strokeText(text, mm(x), mm(yMm), mm(larguraMaxima));
        ctx.fillText(text, mm(x), mm(yMm), mm(larguraMaxima));
    }
};

const writeFabricText = (fabricCanvas: Canvas, ctx: CanvasRenderingContext2D, text: string, xMm: number, yMm: number, larguraMaximaMm: number, mm: any, options?: IFabricTextOptions) => {
    options = options||{};
    let larguraMaximaPx = mm(larguraMaximaMm);
    const fontProperties = /(bold)?\s?(\d+px)?\s?(\w+)$/.exec(ctx.font);
    const font = {
        weight: fontProperties[1],
        size: Number((fontProperties[2]||"").replace("px","")),
        name: fontProperties[3]
    };

    const subrangeStyles = resolveCharStyles(text);
    text = subrangeStyles.text;
    const fabricText = new fabric.IText(text, {
        top: mm(yMm) - font.size,
        textAlign: ctx.textAlign,
        fill: String(ctx.fillStyle),
        stroke: String(ctx.strokeStyle),
        angle: options.degrees,
        fontFamily: font.name,
        fontSize: font.size,
        fontWeight: font.weight,
        strokeWidth: ctx.lineWidth,
        styles: subrangeStyles.styles,
    });

    const textAlign = ctx.textAlign;
    const maxTextWidth = larguraMaximaPx;
    let xPx = mm(xMm);
    if(textAlign === TextAlign.CENTER){
        xPx = xPx - (maxTextWidth / 2);
    } else if (textAlign === TextAlign.RIGHT) {
        xPx = xPx - maxTextWidth;
    }
    fabricText.left = xPx;

    const textWidth = fabricText.measureLine(0).width;
    const scaleFactorX = larguraMaximaPx / textWidth;
    if(scaleFactorX < 1) {
        fabricText.scaleX = scaleFactorX;
        larguraMaximaPx /= scaleFactorX; // ajusta se foi alterado pelo scaleX
    }

    fabricCanvas.add(fabricText);
    console.log(`${fabricText.text}: (${fabricText.left}, ${fabricText.top})`);
    fabricText.width = larguraMaximaPx;
    fabricCanvas.renderAll();
};

interface IFabricTextLineStyle {
    [charIndex: number]: TextOptions
}

interface IFabricTextStyle {
    [lineIndex: number]: IFabricTextLineStyle
}

interface IFabricSubrangeStyles {
    text: string,
    styles?: IFabricTextStyle,
}

interface IFabricTextOptions {
    degrees?: number;
}

const justifyText = (context: CanvasRenderingContext2D, maxLen: number, text: string): string => {
    let numWords;
    let spaceLength;
    let numOfSpaces;
    let num;
    let filler;
    const delimiter = "\u200A";
    let textJustified;

    numWords = text.trim().split(/\s+/).length;
    if (numWords <= 1) {
        return text;
    }

    textJustified = text.trim().split(/\s+/).join(delimiter);
    spaceLength = context.measureText(delimiter).width;
    numOfSpaces = (maxLen - context.measureText(text).width) / spaceLength;

    num = numOfSpaces;
    filler = "";

    for (let j = 0; j < num; j++) {
        filler += delimiter;
    }
    textJustified = textJustified.trim().split(delimiter).join(filler);

    return textJustified;
};

const TextAlign = {
    LEFT: "left",
    RIGHT: "right",
    CENTER: "center",
    JUSTIFY: "justify",
};

export {splitLines, splitLinesAutoSize, strokeAlignedText, writeFabricText, TextAlign};
