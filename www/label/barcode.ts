import * as Mustache from "mustache";
import { mmPartial } from "./mm";
import JsBarcode = require("jsbarcode");

enum EnumBarcodeType {
    EAN13,
}
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
    tipoCodigoBarras: EnumBarcodeType;
    valor: string;
}
const drawBarcode = (ctx: CanvasRenderingContext2D, dpi: number, model: IElementoCodigoBarrasModel, textBindings?: any) => {
    const mm = mmPartial(dpi);
    const barcodeImg = barcode.createBarcode({
        barCodeHeight: mm(model.dimensoes.alturaCodigoBarrasMm),
        barcodeWidth: mm(model.dimensoes.larguraUnitariaCodigoBarrasMm),
        font: model.fonte.nome,
        fontSize: mm(model.fonte.alturaMm),
        format: model.tipoCodigoBarras.toString(),
        text: textBindings ? Mustache.render(model.valor, textBindings) : "1234567890128", // placeholder,
    });
    ctx.drawImage(barcodeImg, mm(model.posicao.xMm), mm(model.posicao.yMm));
};

interface ICreateBarcodeOptions {
    barCodeHeight: number;
    barcodeWidth: number;
    font?: string;
    fontSize: number;
    format: string;
    text: string;
}
const createBarcode = (options: ICreateBarcodeOptions) => {
    const oldImg = document.getElementById("barcode-img");
    if (oldImg) {
        oldImg.remove();
    }
    const img = document.createElement("img");
    img.id = "barcode-img";
    img.style.display = "none";
    document.getElementById("canvas-area").appendChild(img);
    JsBarcode("#barcode-img", options.text, {
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
