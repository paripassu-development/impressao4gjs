"use strict";
exports.__esModule = true;
var constants_impressao_1 = require("../core/constants/constants-impressao");
var canvas_utils_1 = require("../core/util/canvas-utils");
var draw_utils_1 = require("../core/util/draw-utils");
var mm_1 = require("./mm");
var corPreta = "#000000";
var drawBarraOrigemRastreada = function (id, ctx, dpi, model) {
    var mm = mm_1.mmPartial(dpi);
    ctx.save();
    var degrees = model.posicao.rotacao || 0;
    ctx.rotate(degrees * Math.PI / 180);
    var barraOrigemRastreada = createBarraOrigemRastreada(id, {
        corBarra: corPreta,
        alturaMm: mm(model.dimensoes.alturaMm),
        larguraMm: mm(model.dimensoes.larguraMm),
        valorTexto: model.valor,
        negrito: model.fonte.negrito,
        forcaContorno: model.fonte.forcaContorno,
        nomeFonte: model.fonte.nome
    });
    ctx.drawImage(barraOrigemRastreada, mm(model.posicao.xMm), mm(model.posicao.yMm));
    ctx.restore();
};
var createBarraOrigemRastreada = function (id, options) {
    var nomeElementoCanvas = "barra-origem-rastreada-img";
    var canvas = canvas_utils_1.canvasUtils.createCanvas(nomeElementoCanvas, options.larguraMm, options.alturaMm);
    canvas.style.display = "none";
    // @ts-ignore
    document.getElementById(id).appendChild(canvas);
    var ctx = canvas_utils_1.canvasUtils.createContext(canvas);
    canvas_utils_1.canvasUtils.drawBackground(ctx, canvas.width, canvas.height);
    var taxaEscalaAltura = options.alturaMm / constants_impressao_1.barraOrigemRastreadaConstants.ALTURA_BARRA;
    var taxaEscalaLargura = options.larguraMm / constants_impressao_1.barraOrigemRastreadaConstants.LARGURA_BARRA;
    ctx.scale(taxaEscalaLargura, taxaEscalaAltura);
    var drawUtils = new draw_utils_1.DrawUtils(ctx);
    // Primeiro
    var coordenadas = [
        { x: 0, y: 0 },
        { x: 48, y: 0 },
        { x: constants_impressao_1.barraOrigemRastreadaConstants.ALTURA_BARRA, y: 16 },
        { x: 48, y: constants_impressao_1.barraOrigemRastreadaConstants.ALTURA_BARRA },
        { x: 0, y: constants_impressao_1.barraOrigemRastreadaConstants.ALTURA_BARRA },
    ];
    drawUtils.polygon(coordenadas, options.corBarra);
    // Segundo
    var coordenadas2 = [
        { x: 502, y: 0 },
        { x: 534, y: 0 },
        { x: 518, y: 16 },
        { x: 534, y: constants_impressao_1.barraOrigemRastreadaConstants.ALTURA_BARRA },
        { x: 502, y: constants_impressao_1.barraOrigemRastreadaConstants.ALTURA_BARRA },
        { x: 486, y: 16 },
    ];
    drawUtils.polygon(coordenadas2, options.corBarra);
    // Terceiro
    var coordenadas3 = [
        { x: 550, y: 0 },
        { x: 582, y: 0 },
        { x: 566, y: 16 },
        { x: 582, y: constants_impressao_1.barraOrigemRastreadaConstants.ALTURA_BARRA },
        { x: 550, y: constants_impressao_1.barraOrigemRastreadaConstants.ALTURA_BARRA },
        { x: 534, y: 16 },
    ];
    drawUtils.polygon(coordenadas3, options.corBarra);
    // Quarto
    var coordenadas4 = [
        { x: 598, y: 0 },
        { x: constants_impressao_1.barraOrigemRastreadaConstants.LARGURA_BARRA, y: 0 },
        { x: constants_impressao_1.barraOrigemRastreadaConstants.LARGURA_BARRA, y: constants_impressao_1.barraOrigemRastreadaConstants.ALTURA_BARRA },
        { x: 598, y: constants_impressao_1.barraOrigemRastreadaConstants.ALTURA_BARRA },
        { x: 582, y: 16 },
    ];
    drawUtils.polygon(coordenadas4, options.corBarra);
    var textoBarra = options.valorTexto || "PRODUTO COM ORIGEM RASTREADA";
    ctx.fillStyle = corPreta;
    ctx.strokeStyle = corPreta;
    var tamanhoFonteTexto = 26;
    ctx.font = (options.negrito ? "bold" : "") + " " + tamanhoFonteTexto + "px " + options.nomeFonte;
    ctx.lineWidth = options.forcaContorno || 0;
    var posicaoX = 68;
    var posicaoY = 24;
    ctx.strokeText(textoBarra, posicaoX, posicaoY, 400);
    ctx.fillText(textoBarra, posicaoX, posicaoY, 400);
    return document.getElementById(nomeElementoCanvas);
};
exports.barraOrigemRastreada = { createBarraOrigemRastreada: createBarraOrigemRastreada, drawBarraOrigemRastreada: drawBarraOrigemRastreada };
//# sourceMappingURL=barra-origem-rastreada.js.map