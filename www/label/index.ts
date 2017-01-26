import * as _ from "lodash";
import { barcode } from "./barcode";
import { mmPartial } from "./mm";
import { qrcode } from "./qrcode";
import { text } from "./text";

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
                barcode.drawBarcode(canvas, model.dimensoes.resolucaoDpi, elemento);
            },
            qrcode: () => {
                qrcode.drawQrcode(canvas, model.dimensoes.resolucaoDpi, elemento);
            },
            texto: () => {
                text.drawText(canvas, model.dimensoes.resolucaoDpi, elemento);
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

export const etiqueta = { create };
