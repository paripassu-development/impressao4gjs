import {fabric} from "fabric";
import {Canvas} from "fabric/fabric-impl";
import * as _ from "lodash";
import * as Mustache from "mustache";
import {Error} from "../core/common/error";
import {canvasUtils} from "../core/util/canvas-utils";
import {ErrorUtils} from "../core/util/error-utils";
import {barcode} from "./barcode";
import {barraOrigemRastreada} from "./barra-origem-rastreada";
import {altoTeor} from "./imagem-alto-teor";
import {mmPartial} from "./mm";
import {qrcode} from "./qrcode";
import {tabelaNutricional} from "./tabela-nutricional";
import {tabelaNutricionalInline} from "./tabela-nutricional-inline";
import {tabelaNutricionalLinear} from "./tabela-nutricional-linear";
import {tabelaNutricionalV2} from "./tabela-nutricional-v2";
import {tabelaNutricionalVertical} from "./tabela-nutricional-vertical";
import {tabelaNutricionalVerticalReduzida} from "./tabela-nutricional-vertical-reduzida";
import {text} from "./text";

export const GS1_DATE_PATTERN = "YYmmDD";
export const BARCODE_IMG_ELEMENT_ID = "barcode-img";
export const EAN13_DEFAULT = "ean13";
export const ITF14_DEFAULT = "itf14";
export const ITF_DEFAULT = "itf";
export const DUN14_4G = "dun14";
export const INTERCALADO2A5_4G = "intercalado2a5";
export const GS1_128_DEFAULT = "gs1-128";
export const GS1_DATABAR_EXPANDED_STACKED = "databarexpandedstacked";
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
export const AI_GTIN = "01";
export const AI_CONTEUDO = "02";
export const AIS_PESO_LIQUIDO = "310";
export const AIS_PRECO_UNIDADE_MEDIDA = "8005";

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

function isFabricRequired(model: IEtiquetaDocModel, textBindings: any) {
    const markersRegex = new RegExp(/\^|\~/);
    return markersRegex.test(JSON.stringify(model)) || markersRegex.test(JSON.stringify(textBindings));
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
    let fabricCanvas: fabric.Canvas = null;
    if (isFabricRequired(model, textBindings)) {
        const canvas2 = canvasUtils.createCanvas(idElementoFabricCanvas, mm(model.etiqueta.dimensoes.larguraMm), mm(model.etiqueta.dimensoes.alturaMm));
        fabricCanvas = new fabric.Canvas(canvas2);
        canvas2.classList.add("fabric-canvas");
        el.appendChild(canvas2);
    }

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
            /* TODO - Remover tabelaNutricional, tabelaNutricionalV2, tabelaNutricionalEmLinha após completa adequação
            *   dos clientes com as novas nutricionais verticais*/
            tabelaNutricional: (): Promise<any> => {
                return new Promise((resolve) => {
                    tabelaNutricional.drawTable(ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
                    resolve();
                });
            },
            tabelaNutricionalV2: (): Promise<any> => {
                return new Promise((resolve) => {
                    tabelaNutricionalV2.drawTable(ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
                    resolve();
                });
            },
            tabelaNutricionalVertical: (): Promise<any> => {
                return new Promise((resolve) => {
                    tabelaNutricionalVertical.drawTable(ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
                    resolve();
                });
            },
            tabelaNutricionalVerticalReduzida: (): Promise<any> => {
                return new Promise((resolve) => {
                    tabelaNutricionalVerticalReduzida.drawTable(ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
                    resolve();
                });
            },
            tabelaNutricionalLinear: (): Promise<any> => {
                return new Promise((resolve) => {
                    tabelaNutricionalLinear.drawTable(ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
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
            altoTeor: (): Promise<any> => {
                return new Promise((resolve) => {
                    altoTeor.drawAltoTeor(id, ctx, fabricCanvas, model.impressao.resolucaoDpi, elemento, textBindings);
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

    return new Promise((resolve, reject) => {
        try {
            if (!!fabricCanvas) {
                const img = new Image(canvas.width, canvas.height);
                fabricCanvas.getContext().imageSmoothingEnabled = false;
                img.src = fabricCanvas.toDataURL({format: "png"});
                img.onload = () => {
                    ctx.drawImage(img, 0, 0);
                    redrawWithoutGrayscale(ctx, canvas.width, canvas.height);
                    resolve(canvas);
                };
            } else {
                redrawWithoutGrayscale(ctx, canvas.width, canvas.height);
                resolve(canvas);
            }
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(`Erro ao gerar imagem da etiqueta: ${JSON.stringify(e)}`);
            reject(e);
        }
    });
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
