import { canvasUtils } from "./../core/util/canvas-utils";
import { barcode } from "./barcode";
import { barraOrigemRastreada } from "./barra-origem-rastreada";
import { mmPartial } from "./mm";
import { qrcode } from "./qrcode";
import { tabelaNutricional } from "./tabela-nutricional";
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
    tela: ITela;
}
export interface ITela {
    campos: ICampos;
}
export interface ICampos {
    variavel: string;
    rotulo: string;
}
const create = async (id: string, model: IEtiquetaDocModel, textBindings?: any) => {
    const nomeElementoCanvas = id + "-etiqueta-canvas";
    const mm = mmPartial(model.impressao.resolucaoDpi);
    const canvas = canvasUtils.createCanvas(nomeElementoCanvas, mm(model.etiqueta.dimensoes.larguraMm), mm(model.etiqueta.dimensoes.alturaMm));
    const ctx = canvasUtils.createContext(canvas);
    const el = document.getElementById(id);
    el.appendChild(canvas);
    const promises: Promise<any>[] = [];
    canvasUtils.drawBackground(ctx, canvas.width, canvas.height);

    model.desenho.elementos.forEach((elemento: any) => {
        const tipos: any = {
            codigoBarras: async(): Promise<any> => {
                return barcode.drawBarcode(id, ctx, model.impressao.resolucaoDpi, elemento, textBindings);
            },
            qrcode: (): Promise<any> => {
                return new Promise((resolve) => {
                    qrcode.drawQrcode(id, ctx, model.impressao.resolucaoDpi, elemento, textBindings);
                    resolve();
                });
            },
            texto: (): Promise<any> => {
                return new Promise((resolve) => {
                    text.drawText(ctx, model.impressao.resolucaoDpi, elemento, textBindings);
                    resolve();
                });
            },
            tabelaNutricional: (): Promise<any> => {
                return new Promise((resolve) => {
                    tabelaNutricional.drawTable(ctx, model.impressao.resolucaoDpi, elemento, textBindings);
                    resolve();
                });
            },
            barraOrigemRastreada: (): Promise<any> => {
                return new Promise((resolve) => {
                    barraOrigemRastreada.drawBarraOrigemRastreada(id, ctx, model.impressao.resolucaoDpi, elemento);
                    resolve();
                });
            },
        };

        if (tipos[elemento.tipo]) {
            promises.push(tipos[elemento.tipo]());
        }
    });

    await Promise.all(promises);
    redrawWithoutGrayscale(ctx, canvas.width, canvas.height);
    return canvas;
};

const redrawWithoutGrayscale = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // const value = (data[i] > 150 || data[i + 1] > 150 || data[i + 2] > 150) ? 255 : 0;
        const value = (data[i] + data[i + 1] + data[i + 2] / 3) > 400 ? 255 : 0;
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
