import * as _ from "lodash";
import { barcode } from "./barcode";
import { mmPartialOversampled, OVERSAMPLED_FACTOR } from "./mm";
import { qrcode } from "./qrcode";
import { text } from "./text";

interface IImpressao {
    resolucaoDpi: number;
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
    const ctx: any = canvas.getContext("2d");
    el.appendChild(canvas);

    drawBackground(canvas);

    _.each(model.desenho.elementos, (elemento: any) => {
        const tipos: any = {
            codigoBarras: () => {
                barcode.drawBarcode(canvas, model.impressao.resolucaoDpi, elemento, textBindings);
            },
            qrcode: () => {
                qrcode.drawQrcode(canvas, model.impressao.resolucaoDpi, elemento, textBindings);
            },
            texto: () => {
                text.drawText(canvas, model.impressao.resolucaoDpi, elemento, textBindings);
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
