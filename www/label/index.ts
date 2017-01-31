import * as _ from "lodash";
import { barcode } from "./barcode";
import { mmPartialOversampled, OVERSAMPLED_FACTOR } from "./mm";
import { qrcode } from "./qrcode";
import { text } from "./text";

interface IImpressao {
    resolucaoDpi: number;
    etiquetasPorPagina: number;
    margemXMm: number;
    margemYMm: number;
    gapXMm: number;
    larguraPaginaMm: number;
    orientacaoEtiqueta: string;
}
interface IEtiqueta {
    dimensoes: IEtiquetaDimensoes;
}
interface IEtiquetaDimensoes {
    alturaMm: number;
    larguraMm: number;
}
interface IDesenho {
    elementos: any[];
}
interface IEtiquetaDocModel {
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
    const mm = mmPartialOversampled(model.impressao.resolucaoDpi);
    canvas.width = mm(model.etiqueta.dimensoes.larguraMm);
    canvas.height = mm(model.etiqueta.dimensoes.alturaMm);
    // usando tamanhos de pixels oversampled, entao diminuir a visualizacao do canvas para o tamanho desejado
    canvas.style.width = (canvas.width / OVERSAMPLED_FACTOR) + "px";
    canvas.style.height = (canvas.height / OVERSAMPLED_FACTOR) + "px";
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
        const brightness = (data[i] > 0 || data[i + 1] > 0 || data[i + 2] > 0) ? 255 : 0;
        // red
        data[i] = brightness;
        // green
        data[i + 1] = brightness;
        // blue
        data[i + 2] = brightness;
    }

    // overwrite original image
    ctx.putImageData(imageData, 0, 0);
};

export const etiqueta = { create };
