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
        if (!palavras[index + 1] && linhaAtual) {
            linhas.push(linhaAtual);
        }
    });
    return linhas;
}

const strokeAlignedText = (ctx: CanvasRenderingContext2D, larguraMaxima: number, text: string, xMm: number, yMm: number, mm: any, textAlign: string) => {
    let x = xMm;
    if (textAlign === TextAlign.CENTER) {
        x = xMm + larguraMaxima / 2;
    } else if (textAlign === TextAlign.RIGHT) {
        x = xMm + larguraMaxima;
    }
    ctx.textAlign = textAlign;
    ctx.strokeText(text, mm(x), mm(yMm), mm(larguraMaxima));
    ctx.fillText(text, mm(x), mm(yMm), mm(larguraMaxima));
};

const TextAlign = {
    LEFT: "left",
    RIGHT: "right",
    CENTER: "center",
};

export {splitLines, strokeAlignedText, TextAlign};

