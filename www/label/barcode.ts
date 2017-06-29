import * as Mustache from "mustache";
import { mmPartial } from "./mm";
import JsBarcode = require("jsbarcode");

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
const drawBarcode = async (id: string, ctx: CanvasRenderingContext2D, dpi: number, model: IElementoCodigoBarrasModel, textBindings?: any) => {
    const mm = mmPartial(dpi);
    const promise = barcode.createBarcode(id, {
        barCodeHeight: mm(model.dimensoes.alturaCodigoBarrasMm),
        barcodeWidth: mm(model.dimensoes.larguraUnitariaCodigoBarrasMm),
        font: model.fonte.nome,
        fontSize: mm(model.fonte.alturaMm),
        format: model.tipoCodigoBarras,
        text: textBindings ? Mustache.render(model.valor, textBindings) : "1234567890128", // placeholder,
    });
    return promise.then((barcodeImg: HTMLCanvasElement) => {
        return ctx.drawImage(barcodeImg, 0, 0, barcodeImg.width, barcodeImg.height, mm(model.posicao.xMm), mm(model.posicao.yMm), barcodeImg.width, barcodeImg.height);
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

    return new Promise((resolve, reject) => {
        JsBarcode("#barcode-img", options.text, {
            font: options.font || "OCR-B",
            fontSize: options.fontSize,
            format: options.format,
            height: options.barCodeHeight,
            margin: 1,
            textMargin: 0,
            width: options.barcodeWidth,
        });
        img.onload = () => {
            resolve(img);
        };
    });
};

export const barcode = { createBarcode, drawBarcode };
