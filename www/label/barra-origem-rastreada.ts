import {barraOrigemRastreadaConstants} from "../core/constants/constants-impressao";
import {canvasUtils} from "../core/util/canvas-utils";
import {DrawUtils} from "../core/util/draw-utils";
import {mmPartial} from "./mm";

const corPreta: string = "#000000";

interface IElementoBarraOrigemRastreadaModelPosicao {
    xMm: number;
    yMm: number;
    rotacao: number;
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
    const degrees = model.posicao.rotacao || 0;
    ctx.rotate(degrees * Math.PI / 180);
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
    negrito?: boolean;
    forcaContorno?: number;
    nomeFonte: string;
}

const createBarraOrigemRastreada = (id: string, options: ICreateBarraOrigemRastreadaOptions) => {
    const nomeElementoCanvas = "barra-origem-rastreada-img";
    const canvas = canvasUtils.createCanvas(nomeElementoCanvas, options.larguraMm, options.alturaMm);
    canvas.style.display = "none";
    // @ts-ignore
    document.getElementById(id).appendChild(canvas);
    const ctx = canvasUtils.createContext(canvas);
    canvasUtils.drawBackground(ctx, canvas.width, canvas.height);
    const taxaEscalaAltura = options.alturaMm / barraOrigemRastreadaConstants.ALTURA_BARRA;
    const taxaEscalaLargura = options.larguraMm / barraOrigemRastreadaConstants.LARGURA_BARRA;
    ctx.scale(taxaEscalaLargura, taxaEscalaAltura);
    const drawUtils = new DrawUtils(ctx);

    // Primeiro
    const coordenadas = [
        {x: 0, y: 0},
        {x: 48, y: 0},
        {x: barraOrigemRastreadaConstants.ALTURA_BARRA, y: 16},
        {x: 48, y: barraOrigemRastreadaConstants.ALTURA_BARRA},
        {x: 0, y: barraOrigemRastreadaConstants.ALTURA_BARRA},
    ];
    drawUtils.polygon(coordenadas, options.corBarra);

    // Segundo
    const coordenadas2 = [
        {x: 502, y: 0},
        {x: 534, y: 0},
        {x: 518, y: 16},
        {x: 534, y: barraOrigemRastreadaConstants.ALTURA_BARRA},
        {x: 502, y: barraOrigemRastreadaConstants.ALTURA_BARRA},
        {x: 486, y: 16},
    ];
    drawUtils.polygon(coordenadas2, options.corBarra);

    // Terceiro
    const coordenadas3 = [
        {x: 550, y: 0},
        {x: 582, y: 0},
        {x: 566, y: 16},
        {x: 582, y: barraOrigemRastreadaConstants.ALTURA_BARRA},
        {x: 550, y: barraOrigemRastreadaConstants.ALTURA_BARRA},
        {x: 534, y: 16},
    ];
    drawUtils.polygon(coordenadas3, options.corBarra);

    // Quarto
    const coordenadas4 = [
        {x: 598, y: 0},
        {x: barraOrigemRastreadaConstants.LARGURA_BARRA, y: 0},
        {x: barraOrigemRastreadaConstants.LARGURA_BARRA, y: barraOrigemRastreadaConstants.ALTURA_BARRA},
        {x: 598, y: barraOrigemRastreadaConstants.ALTURA_BARRA},
        {x: 582, y: 16},
    ];
    drawUtils.polygon(coordenadas4, options.corBarra);

    const textoBarra = options.valorTexto || "PRODUTO COM ORIGEM RASTREADA";
    ctx.fillStyle = corPreta;
    ctx.strokeStyle = corPreta;
    const tamanhoFonteTexto = 26;
    ctx.font = `${options.negrito ? "bold" : ""} ${tamanhoFonteTexto}px ${options.nomeFonte}`;
    ctx.lineWidth = options.forcaContorno || 0;
    const posicaoX = 68;
    const posicaoY = 24;
    ctx.strokeText(textoBarra, posicaoX, posicaoY, 400);
    ctx.fillText(textoBarra, posicaoX, posicaoY, 400);
    return document.getElementById(nomeElementoCanvas) as HTMLCanvasElement;
};

export const barraOrigemRastreada = {createBarraOrigemRastreada, drawBarraOrigemRastreada};
