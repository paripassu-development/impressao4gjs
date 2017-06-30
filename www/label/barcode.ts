import * as Mustache from "mustache";
import { mmPartial } from "./mm";
import JsBarcode = require("jsbarcode");
const _ : any = require('lodash');

interface IElementoCodigoBarrasModelPosicao {
    xMm: number;
    yMm: number;
}
interface IElementoCodigoBarrasModelDimensoes {
    larguraUnitariaCodigoBarrasMm: number;
    alturaCodigoBarrasMm: number;
}
interface IElementoCodigoBarrasModelFonte {
    nome: string;
    alturaMm: number;
}
interface IElementoCodigoBarrasModel {
    tipo: string;
    posicao: IElementoCodigoBarrasModelPosicao;
    dimensoes: IElementoCodigoBarrasModelDimensoes;
    fonte: IElementoCodigoBarrasModelFonte;
    tipoCodigoBarras: string;
    valor: string;
}
const drawBarcode = (id: string, ctx: CanvasRenderingContext2D, dpi: number, model: IElementoCodigoBarrasModel, textBindings?: any) => {
    const mm = mmPartial(dpi);
    const barcodeImg = barcode.createBarcode(id, {
        barCodeHeight: mm(model.dimensoes.alturaCodigoBarrasMm),
        barcodeWidth: mm(model.dimensoes.larguraUnitariaCodigoBarrasMm),
        font: model.fonte.nome,
        fontSize: mm(model.fonte.alturaMm),
        format: model.tipoCodigoBarras,
        text: textBindings ? Mustache.render(model.valor, textBindings) : "1234567890128", // placeholder,
    });

    return new Promise((resolve, reject) => {
        barcodeImg.onload = () => { // aguarda load da imagem no DOM
            ctx.drawImage(barcodeImg, 0, 0, barcodeImg.width, barcodeImg.height, mm(model.posicao.xMm), mm(model.posicao.yMm), barcodeImg.width, barcodeImg.height);
            resolve();
        };
    });
};

interface ICreateBarcodeOptions {
    barCodeHeight: number;
    barcodeWidth: number;
    font?: string;
    fontSize: number;
    format: string;
    text: string;
}
const createBarcode = (id: string, options: ICreateBarcodeOptions) => {
    const oldImg = document.getElementById("barcode-img");
    if (oldImg) {
        oldImg.remove();
    }
    const img = document.createElement("img");
    img.id = "barcode-img";
    img.style.display = "none";
    document.getElementById(id).appendChild(img);
    const lpaddedText = _.padLeft(options.text, 12,'0');
    JsBarcode("#barcode-img", lpaddedText, {
        font: options.font || "OCR-B",
        fontSize: options.fontSize,
        format: options.format,
        height: options.barCodeHeight,
        margin: 1,
        textMargin: 0,
        width: options.barcodeWidth,
    });
    return img;
};

export const barcode = {createBarcode, drawBarcode};
