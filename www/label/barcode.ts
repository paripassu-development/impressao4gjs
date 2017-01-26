import { mmPartial } from "./mm";
import JsBarcode = require("jsbarcode");

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
            margin: 0,
            textMargin: 0,
            width: options.barcodeWidth,
        });
    return img;
};

enum EnumBarcodeType {
    EAN13,
}
interface IElementoBarcodeModel {
    tipo: string;
    tipoBarcode: EnumBarcodeType;
    fonte: string;
    tamanhoFonteMm: number;
    xMm: number;
    yMm: number;
    larguraBarcodeMm: number;
    alturaBarcodeMm: number;
    valor: string;
}
const drawBarcode = (canvas: HTMLCanvasElement, dpi: number, model: IElementoBarcodeModel) => {
    const mm = mmPartial(dpi);
    const ctx: any = canvas.getContext("2d");
    const barcodeImg = barcode.createBarcode({
        barCodeHeight: mm(model.alturaBarcodeMm),
        barcodeWidth: mm(model.larguraBarcodeMm),
        font: model.fonte,
        fontSize: mm(model.tamanhoFonteMm),
        format: model.tipoBarcode.toString(),
        text: model.valor,
    });
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(barcodeImg, mm(model.xMm), mm(model.yMm));
};

export const barcode = {createBarcode, drawBarcode};
