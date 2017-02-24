import * as _ from "lodash";
import { barcode } from "./barcode";
import { mmPartial } from "./mm";
import { qrcode } from "./qrcode";
import { text } from "./text";

export interface IImpressao {
    resolucaoDpi: number;
    etiquetasPorPagina: number;
    margemXMm: number;
    margemYMm: number;
    gapXMm: number;
    larguraPaginaMm: number;
    orientacaoEtiquetaGraus: number;
}
export interface IEtiqueta {
    dimensoes: IEtiquetaDimensoes;
}
export interface IEtiquetaDimensoes {
    alturaMm: number;
    larguraMm: number;
}
export interface IDesenho {
    elementos: any[];
}
export interface IEtiquetaDocModel {
    impressao: IImpressao;
    etiqueta: IEtiqueta;
    desenho: IDesenho;
}
const create = (id: string, model: IEtiquetaDocModel, textBindings?: any) => {
    const oldCanvas = document.getElementById(id + "-etiqueta-canvas");
    if (oldCanvas) {
        oldCanvas.remove();
    }
    const el = document.getElementById(id);
    const canvas = document.createElement("canvas");
    canvas.id = id + "-etiqueta-canvas";
    const mm = mmPartial(model.impressao.resolucaoDpi);
    canvas.width = mm(model.etiqueta.dimensoes.larguraMm);
    canvas.height = mm(model.etiqueta.dimensoes.alturaMm);
    canvas.style.width = (canvas.width) + "px";
    canvas.style.height = (canvas.height) + "px";
    const ctx: any = canvas.getContext("2d", {alpha: false});
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    el.appendChild(canvas);

    drawBackground(ctx, canvas.width, canvas.height);

    _.each(model.desenho.elementos, (elemento: any) => {
        const tipos: any = {
            codigoBarras: () => {
                barcode.drawBarcode(ctx, model.impressao.resolucaoDpi, elemento, textBindings);
            },
            qrcode: () => {
                qrcode.drawQrcode(ctx, model.impressao.resolucaoDpi, elemento, textBindings);
            },
            texto: () => {
                text.drawText(ctx, model.impressao.resolucaoDpi, elemento, textBindings);
            },
        };

        if (tipos[elemento.tipo]) {
            tipos[elemento.tipo]();
        }
    });

    redrawWithoutGrayscale(ctx, canvas.width, canvas.height);

    return canvas;
};

const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
};

const redrawWithoutGrayscale = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const value = (data[i] > 0 || data[i + 1] > 0 || data[i + 2] > 0) ? 255 : 0;
        // red
        data[i] = value;
        // green
        data[i + 1] = value;
        // blue
        data[i + 2] = value;
    }

    // overwrite original image
    ctx.putImageData(imageData, 0, 0);
};

const exportCanvas = (id: string, orientationDegrees: number) => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    const oldCanvas = document.getElementById(id + "-export-canvas");
    if (oldCanvas) {
        oldCanvas.remove();
    }
    const canvasFinal = document.createElement("canvas") as HTMLCanvasElement;
    canvasFinal.id = id + "-export-canvas";
    if (orientationDegrees === 90) {
        canvasFinal.width = canvas.height;
        canvasFinal.height = canvas.width;
        const ctx = canvasFinal.getContext("2d");
        ctx.save();
        ctx.translate(canvasFinal.width, 0);
        ctx.rotate(orientationDegrees * Math.PI / 180);
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
    } else if (orientationDegrees === 180) {
        canvasFinal.width = canvas.width;
        canvasFinal.height = canvas.height;
        const ctx = canvasFinal.getContext("2d");
        ctx.save();
        ctx.translate(canvas.width, canvas.height);
        ctx.rotate(orientationDegrees * Math.PI / 180);
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
    } else if (orientationDegrees === 270) {
        canvasFinal.width = canvas.height;
        canvasFinal.height = canvas.width;
        const ctx = canvasFinal.getContext("2d");
        ctx.save();
        ctx.translate(0, canvas.width);
        ctx.rotate(orientationDegrees * Math.PI / 180);
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
    } else {
        canvasFinal.width = canvas.width;
        canvasFinal.height = canvas.height;
        const ctx = canvasFinal.getContext("2d");
        ctx.save();
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
    }
    return canvasFinal;
};

export const etiqueta = { create, exportCanvas };
