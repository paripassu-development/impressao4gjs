import {fabric} from "fabric";
import * as _ from "lodash";
import * as Mustache from "mustache";
import {Error} from "../core/common/error";
import {canvasUtils} from "../core/util/canvas-utils";
import {ErrorUtils} from "../core/util/error-utils";
import {barcode} from "./barcode";
import {barraOrigemRastreada} from "./barra-origem-rastreada";
import {mmPartial} from "./mm";
import {qrcode} from "./qrcode";
import {tabelaNutricional} from "./tabela-nutricional";
import {tabelaNutricionalInline} from "./tabela-nutricional-inline";
import {text} from "./text";

export const GS1_DATE_PATTERN = "YYmmDD";
export const BARCODE_IMG_ELEMENT_ID = "barcode-img";
export const EAN13_DEFAULT = "ean13";
export const ITF14_DEFAULT = "itf14";
export const ITF_DEFAULT = "itf";
export const DUN14_4G = "dun14";
export const INTERCALADO2A5_4G = "intercalado2a5";
export const GS1_128_DEFAULT = "gs1-128";
export const GS1128 = "gs1128";
export const EAN128 = "ean128";
export const EAN_128 = "ean-128";
export const AI_LOTE = "10";
export const AIS_DATAS = [
    "11", // data producao
    "12", // data validade
    "13", // data embalagem
    "15", // durabilidade minima
    "17", // durabilidade maxima
];
export const AIS_GTIN_CONTEUDO = ["01", "02"];

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
    pdf: IPdf;
    validacoes: IValidacao[];
}

export interface ITela {
    campos: ICampos;
}

export interface IPdf {
    pdfPadding: number;
    etiquetaPadding: number;
    etiquetaComBorda: boolean;
}

export interface ICampos {
    variavel: string;
    rotulo: string;
}

export interface IValidacao {
    variavel: string;
    obrigatorio: boolean;
}

const create = async (id: string, model: IEtiquetaDocModel, textBindings?: any) => {
    let errors = new Array<Error>();
    const idElementoCanvas = id + "-etiqueta-canvas";
    const idElementoFabricCanvas = id + "-etiqueta-fabric-canvas";
    const mm = mmPartial(model.impressao.resolucaoDpi);
    const canvas = canvasUtils.createCanvas(idElementoCanvas, mm(model.etiqueta.dimensoes.larguraMm), mm(model.etiqueta.dimensoes.alturaMm));
    const ctx = canvasUtils.createContext(canvas);
    const el = document.getElementById(id);
    const validacoes = _.indexBy(model.validacoes, "variavel") as any;
    el.appendChild(canvas);
    const promises: Array<Promise<any>> = [];
    canvasUtils.drawBackground(ctx, canvas.width, canvas.height);

    // fabricjs
    const canvas2 = canvasUtils.createCanvas(idElementoFabricCanvas, mm(model.etiqueta.dimensoes.larguraMm), mm(model.etiqueta.dimensoes.alturaMm));
    const fabricCanvas = new fabric.Canvas(canvas2);
    canvas2.classList.add("fabric-canvas");
    el.appendChild(canvas2);

    model.desenho.elementos.forEach((elemento: any) => {
        const tipos: any = {
            codigoBarras: async (): Promise<any> => {
                return barcode.drawBarcode(id, ctx, model.impressao.resolucaoDpi, elemento, textBindings)
                    .catch((error) => {
                        errors = _.union(errors, error);
                    });
            },
            qrcode: (): Promise<any> => {
                return new Promise((resolve) => {
                    qrcode.drawQrcode(id, ctx, model.impressao.resolucaoDpi, elemento, textBindings);
                    resolve();
                });
            },
            texto: (): Promise<any> => {
                return new Promise((resolve) => {
                    text.drawText(ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
                    resolve();
                });
            },
            tabelaNutricional: (): Promise<any> => {
                return new Promise((resolve) => {
                    tabelaNutricional.drawTable(ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
                    resolve();
                });
            },
            tabelaNutricionalEmLinha: (): Promise<any> => {
                return new Promise((resolve) => {
                    tabelaNutricionalInline.drawTable(ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
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

    await Promise.all(promises)
        .then()
        .catch()
        .then(() => {
            if (_.isArray(model.validacoes) && !!textBindings) {
                model.validacoes.forEach((validacao: IValidacao) => {
                    const variavel = "{{{" + validacao.variavel + "}}}";
                    const textRender = Mustache.render(variavel, textBindings);
                    ErrorUtils.captureError(validacao.variavel, textRender, validacoes, errors);
                });
            }

            if (!_.isEmpty(errors)) {
                return Promise.reject(errors);
            }

        });

    _.range(0, canvas.width, 50)
        .forEach((pixel) => {
            const square = new fabric.Line([100, 100,100,110], {
                fill: "#000",
                stroke: "#000",
                strokeWidth: 1,
                left: pixel,
                top: 0,
                width: 10,
                height: 10,
            });
            fabricCanvas.add(square);
            fabricCanvas.add(new fabric.Text(String(pixel), {
               left: pixel,
               top: 12,
                fontSize: 10,
            }));
        });

    const img = new Image(canvas.width, canvas.height);
    img.src = fabricCanvas.toDataURL({format:"png"});
    img.onload = () => {
        ctx.drawImage(img, 0, 0);
    };

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

export const etiqueta = {create, exportCanvas};
