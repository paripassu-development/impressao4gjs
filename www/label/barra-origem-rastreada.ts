import { canvasUtils } from "./canvas-utils";
import { DrawUtils } from "./draw-utils";
import { mmPartial } from "./mm";

const corPreta: string = "#000000";

interface IElementoBarraOrigemRastreadaModelPosicao {
    xMm: number;
    yMm: number;
}

interface IElementoBarraOrigemRastreadaModelDimensoes {
    alturaMm: number;
    larguraMm: number;
}

interface IElementoBarraOrigemRastreadaModelFonte {
    nome: string;
    negrito?: boolean;
    forcaContorno?: number;
}

interface IElementoBarraOrigemRastreadaModel {
    tipo: string;
    posicao: IElementoBarraOrigemRastreadaModelPosicao;
    dimensoes: IElementoBarraOrigemRastreadaModelDimensoes;
    fonte: IElementoBarraOrigemRastreadaModelFonte;
    valor: string;
}

const drawBarraOrigemRastreada = (id: string, ctx: CanvasRenderingContext2D, dpi: number, model: IElementoBarraOrigemRastreadaModel) => {
    const mm = mmPartial(dpi);
    ctx.save();
    const barraOrigemRastreada = createBarraOrigemRastreada(id, {
        corBarra: corPreta,
        alturaMm: mm(model.dimensoes.alturaMm),
        larguraMm: mm(model.dimensoes.larguraMm),
        valorTexto: model.valor,
        negrito: model.fonte.negrito,
        forcaContorno: model.fonte.forcaContorno,
        nomeFonte: model.fonte.nome,
    });
    ctx.drawImage(barraOrigemRastreada,
        mm(model.posicao.xMm),
        mm(model.posicao.yMm),
    );
    ctx.restore();
};

interface ICreateBarraOrigemRastreadaOptions {
  corBarra: string;
  alturaMm: number;
  larguraMm: number;
  valorTexto: string;
  negrito: boolean;
  forcaContorno: number;
  nomeFonte: string;
}

const createBarraOrigemRastreada = (id: string, options: ICreateBarraOrigemRastreadaOptions) => {
    const nomeElementoCanvas = "barra-origem-rastreada-img";
    const canvas = canvasUtils.createCanvas(nomeElementoCanvas, options.larguraMm, options.alturaMm);
    canvas.style.display = "none";
    document.getElementById(id).appendChild(canvas);
    const ctx = canvasUtils.createContext(canvas);
    canvasUtils.drawBackground(ctx, canvas.width, canvas.height);
    const taxaEscalaAltura = options.alturaMm / 32;
    const taxaEscalaLargura = options.larguraMm / 776;
    ctx.scale(taxaEscalaLargura, taxaEscalaAltura);
    const drawUtils = new DrawUtils(ctx);

    // Primeiro
    const xValues = [0, 48, 32, 48, 0];
    const yValues = [0, 0, 16, 32, 32];
    drawUtils.polygon(xValues, yValues, options.corBarra);

    // Segundo 
    const xValues2 = [502, 534, 518, 534, 502, 486];
    const yValues2 = [0,   0,   16,  32,  32,  16];
    drawUtils.polygon(xValues2, yValues2, options.corBarra);

    // Terceiro
    const xValues3 = [550, 582, 566, 582, 550, 534];
    const yValues3 = [0, 0, 16, 32, 32, 16];
    drawUtils.polygon(xValues3, yValues3, options.corBarra);

     // Quarto
    const xValues4 = [598, 776, 776, 598, 582];
    const yValues4 = [0, 0, 32, 32, 16];
    drawUtils.polygon(xValues4, yValues4, options.corBarra);

    const textoBarra = options.valorTexto || "PRODUTO COM ORIGEM RASTREADA";
    ctx.fillStyle = corPreta;
    ctx.strokeStyle = corPreta;
    const tamanhoFonteTexto = 26;
    ctx.font = `${options.negrito ? "bold" : ""} ${tamanhoFonteTexto}px ${options.nomeFonte}`;
    ctx.lineWidth = options.forcaContorno || 0;
    const posicaoX = 68;
    const posicaoY = 24;
    ctx.strokeText(textoBarra, posicaoX, posicaoY);
    ctx.fillText(textoBarra, posicaoX, posicaoY);
    return document.getElementById(nomeElementoCanvas) as HTMLCanvasElement;
};

export const barraOrigemRastreada = { createBarraOrigemRastreada, drawBarraOrigemRastreada };
