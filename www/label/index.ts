import * as _ from "lodash";
import { barcode } from "./barcode";
import { mmPartial } from "./mm";

interface IEtiquetaDimensoes {
    resolucaoDpi: number;
    alturaMm: number;
    larguraMm: number;
}
interface IEtiquetaDocModel {
    dimensoes: IEtiquetaDimensoes;
    elementos: any[];
}
const create = (id: string, model: IEtiquetaDocModel) => {
    const oldCanvas = document.getElementById("etiqueta-canvas");
    if (oldCanvas) {
        oldCanvas.remove();
    }
    const el = document.getElementById(id);
    const canvas = document.createElement("canvas");
    canvas.id = "etiqueta-canvas";
    const mm = mmPartial(model.dimensoes.resolucaoDpi);
    canvas.width = mm(model.dimensoes.larguraMm);
    canvas.height = mm(model.dimensoes.alturaMm);
    el.appendChild(canvas);

    drawBackground(canvas);

    _.each(model.elementos, (elemento: any) => {
        const tipos: any = {
            barcode: () => {
                drawBarcode(canvas, model.dimensoes.resolucaoDpi, elemento);
            },
            texto: () => {
                drawText(canvas, model.dimensoes.resolucaoDpi, elemento);
            },
        };

        if (tipos[elemento.tipo]) {
            tipos[elemento.tipo]();
        }
    });

    return canvas;
};

const drawBackground = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

interface IElementoTextoModel {
    tipo: string;
    fonte: string;
    alturaMm: number;
    xMm: number;
    yMm: number;
    valor: string;
}
const drawText = (canvas: HTMLCanvasElement, dpi: number, model: IElementoTextoModel) => {
    const mm = mmPartial(dpi);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.font = `${mm(model.alturaMm)}px ${model.fonte}`;
    ctx.fillText(model.valor, mm(model.xMm), mm(model.yMm));
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

export const etiqueta = {create};
