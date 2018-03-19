import * as Mustache from "mustache";
import { mmPartial } from "./mm";
import JsBarcode = require("jsbarcode");
import {canvasUtils} from "../core/util/canvas-utils";
const bwipjs: any = require("bwip-js");
const _ : any = require('lodash');

const IMG_ELEMENT_ID = "barcode-img";
const EAN13 = "ean13";
const GS1128 = "gs1128";
const GS1_128 = "gs1-128";
const EAN128 = "ean128";
const EAN_128 = "ean-128";
const OPTIONS_DEFAULT = {
    displayValue: true,
    textAlign: "center",
    font: "OCR-B"
};

interface IElementoCodigoBarrasModelPosicao {
    xMm: number;
    yMm: number;
    rotacao: number;
}
interface IElementoCodigoBarrasModelDimensoes {
    larguraUnitariaCodigoBarrasMm: number;
    alturaCodigoBarrasMm: number;
}
interface IElementoCodigoBarrasModelFonte {
    nome: string;
    alturaMm: number;
    alinhar: string;
}
interface IElementoCodigoBarrasModel {
    mostraTexto: boolean;
    tipo: string;
    posicao: IElementoCodigoBarrasModelPosicao;
    dimensoes: IElementoCodigoBarrasModelDimensoes;
    fonte: IElementoCodigoBarrasModelFonte;
    tipoCodigoBarras: string;
    valor: string;
}
const formatEan = (ean: string, tipoCodigoBarras: string) => {
    switch(tipoCodigoBarras.toLowerCase()){
        case 'ean13':
            return formatEan13(ean);
        case 'itf14':
            return formatDun14(ean);
        default:
            return formatIntercalado2De5(ean);
    }
};
const formatEan13 = (ean: string) => {
    // deixa com 12 digitos para o digito verificador ser
    // gerado pela lib de codigo de barras
    // edita somente se não for vazio
    if (!_.isEmpty(ean)) {
        if (ean.length > 13) {
            ean = ean.substring(1, 13);
        } else if (ean.length == 13) {
            ean = ean.substring(0, 12);
        } else if (ean.length < 12) {
            ean = ean.substring(0, ean.length - 1);
        }
    }
    return ean;
};
const formatDun14 = (ean: string) => {
    // deixa com 13 digitos para o digito verificador ser
    // gerado pela lib de codigo de barras
    // edita somente se não for vazio
    if (!_.isEmpty(ean)) {
        if (ean.length > 14) {
            ean = ean.substring(1, 14);
        } else if (ean.length == 14) {
            ean = ean.substring(0, 13);
        } else if (ean.length < 13) {
            ean = ean.substring(0, ean.length - 1);
        }
    }
    return ean;
};
const formatIntercalado2De5 = (ean: string) => {
    if (!_.isEmpty(ean)) {
        if (ean.length == 13) {
            ean = '0'+ean;
        }
    }
    return ean;
};
let resolveDefaultValue = function (tipoCodigoBarras: string) {
    switch(tipoCodigoBarras.toLowerCase()){
        case 'ean13':
            return "000000000000";
        case 'itf14':
            return "0000000000000";
        case 'gs1-128':
            return "(10)00000000000";
        default:
            return "000000000000";
    }
};

function normalizeType(tipoCodigoBarras: string): string {
    if (!!tipoCodigoBarras && _.contains([GS1128, GS1_128, EAN128, EAN_128], tipoCodigoBarras.toLowerCase())) {
        return GS1_128;
    }
    return tipoCodigoBarras;
}

const drawBarcode = async (id: string, ctx: CanvasRenderingContext2D, dpi: number, model: IElementoCodigoBarrasModel, textBindings?: any): Promise<any> => {
    const mm = mmPartial(dpi);
    model.tipoCodigoBarras = normalizeType(model.tipoCodigoBarras);
    const ean = textBindings ? formatEan(Mustache.render(model.valor, textBindings), model.tipoCodigoBarras) : resolveDefaultValue(model.tipoCodigoBarras);
    
    if(!_.isEmpty(ean)){
        let barcodeImg = await barcode.createBarcode(id, dpi, {
            barCodeHeight: model.dimensoes.alturaCodigoBarrasMm,
            barcodeWidth: model.dimensoes.larguraUnitariaCodigoBarrasMm,
            font: model.fonte.nome,
            fontSize: model.fonte.alturaMm,
            format: model.tipoCodigoBarras,
            text: ean,
            textAlign: model.fonte.alinhar,
            displayValue: model.mostraTexto,
        });
        
        return new Promise((resolve) => {
            barcodeImg.onload = () => { // aguarda load da imagem no DOM
                let degrees = model.posicao.rotacao || 0;
                ctx.save();
                ctx.rotate(degrees * Math.PI / 180);
                ctx.drawImage(barcodeImg, 0, 0, barcodeImg.width, barcodeImg.height, mm(model.posicao.xMm), mm(model.posicao.yMm), barcodeImg.width, barcodeImg.height);
                ctx.restore();
                resolve();
            };
        });
    }
    return Promise.resolve();
};

interface ICreateBarcodeOptions {
    textAlign: string;
    displayValue: boolean;
    barCodeHeight: number;
    barcodeWidth: number;
    font?: string;
    fontSize: number;
    format: string;
    text: string;
}

let buildOptionsBwipJs = function (options: ICreateBarcodeOptions) {
    return {
        bcid: options.format,
        text: options.text,
        scaleX: 59,
        scaleY: 3,
        width: options.barcodeWidth,
        height: options.barCodeHeight,
        includetext: options.displayValue,
        textfont: "OCR-B",
        textsize: Math.round(options.fontSize),
        textxalign: options.textAlign,
    };
};
let buildOptionsJsBarcode = function (options: ICreateBarcodeOptions, dpi: number) {
    const mm = mmPartial(dpi);
    return {
        font: options.font,
        fontSize: mm(options.fontSize),
        displayValue: options.displayValue,
        format: options.format,
        height: mm(options.barCodeHeight),
        margin: 1,
        textMargin: 0,
        textAlign: options.textAlign,
        width: mm(options.barcodeWidth),
    };
};
let createBarcodeWithBwipJs = function (options: ICreateBarcodeOptions, img: HTMLImageElement): Promise<HTMLImageElement> {
    const canvas = canvasUtils.createCanvas("canvas", 0, 0);
    return new Promise((resolve) => {
        bwipjs(canvas, buildOptionsBwipJs(options), function (err: any) {
            if (err) {
                console.log("Erro ao gerar o codigo de barras " + options.format);
            } else {
                img.src = canvas.toDataURL('image/png');
            }
            resolve(img);
        });
    });
};
let createBarcodeWithBarcodeJs = function (id: string, img: HTMLImageElement, options: ICreateBarcodeOptions, dpi: number): Promise<HTMLImageElement> {
    const lpaddedText = _.padLeft(options.text, 12, '0');
    return new Promise((resolve) => {
        JsBarcode("#" + IMG_ELEMENT_ID, lpaddedText, buildOptionsJsBarcode(options, dpi));
        resolve(img);
    });
};
const createBarcode = (id: string, dpi: number, options: ICreateBarcodeOptions): Promise<HTMLImageElement> => {
    const oldImg = document.getElementById(IMG_ELEMENT_ID);
    if (oldImg) {
        oldImg.remove();
    }
    let img = document.createElement("img");
    img.id = IMG_ELEMENT_ID;
    img.style.display = "none";
    document.getElementById(id).appendChild(img);

    _.defaults(options, OPTIONS_DEFAULT);
    if(options.format==='gs1-128') {
        return createBarcodeWithBwipJs(options, img);
    } else {
        return createBarcodeWithBarcodeJs(id, img, options, dpi);
    }
};

export const barcode = {createBarcode, drawBarcode};
