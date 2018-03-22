import * as Mustache from "mustache";
import {mmPartial} from "./mm";
import {canvasUtils} from "../core/util/canvas-utils";
import {
    BARCODE_IMG_ELEMENT_ID,
    EAN128,
    EAN13_DEFAULT,
    EAN_128,
    GS1128,
    GS1_128_DEFAULT,
    GS1_DATE_PATTERN,
    AIS_DATAS,
    ITF14_DEFAULT,
    AIS_GTIN_CONTEUDO,
    AI_LOTE
} from "./index";
import JsBarcode = require("jsbarcode");
import moment = require("moment");

const bwipjs: any = require("bwip-js");
const _: any = require('lodash');

const OPTIONS_DEFAULT = {
    displayValue: true,
    textAlign: "center",
    font: "OCR-B"
};
const ERROR_PREFIX = "[Código de barras]";

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
    valores: IValorGS1[];
    mostraTexto: boolean;
    tipo: string;
    posicao: IElementoCodigoBarrasModelPosicao;
    dimensoes: IElementoCodigoBarrasModelDimensoes;
    fonte: IElementoCodigoBarrasModelFonte;
    tipoCodigoBarras: string;
    valor: string;
}

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

interface IValorGS1 {
    identificador: string;
    valor: string;
}


const formatValue = (model: IElementoCodigoBarrasModel, textBindings: any, tipoCodigoBarras: string) => {
    if (!textBindings) {
        return resolveDefaultValue(tipoCodigoBarras);
    }

    switch (tipoCodigoBarras.toLowerCase()) {
        case EAN13_DEFAULT:
            return formatEan13(Mustache.render(model.valor, textBindings));
        case ITF14_DEFAULT:
            return formatDun14(Mustache.render(model.valor, textBindings));
        case GS1_128_DEFAULT:
            return formatGs1128(model.valores, textBindings);
        default:
            return formatIntercalado2De5(Mustache.render(model.valor, textBindings));
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
            ean = "0" + ean;
        }
    }
    return ean;
};

function normalizeGS1Value(valor: string, identificador: string) {
    if (isData(identificador)) {
        const parts = valor.split("/");
        return moment({
            d: parts[0],
            m: parts[1],
            y: parts[2]
        } as any).format(GS1_DATE_PATTERN);
    }
    return valor;
}

function formatGs1128(valores: IValorGS1[], textBindings: any) {
    return _.reduce(valores, (finalValue: string, item: IValorGS1) => {
        let valor = Mustache.render(item.valor, textBindings);
        valor = normalizeGS1Value(valor, item.identificador);
        return finalValue.concat(`(${item.identificador})${valor}`);
    }, "");
}

let resolveDefaultValue = function (tipoCodigoBarras: string) {
    switch (tipoCodigoBarras.toLowerCase()) {
        case EAN13_DEFAULT:
            return "000000000000";
        case ITF14_DEFAULT:
            return "0000000000000";
        case GS1_128_DEFAULT:
            return "(10)00000000000";
        default:
            return "000000000000";
    }
};

function normalizeType(tipoCodigoBarras: string): string {
    if (!!tipoCodigoBarras && _.contains([GS1128, GS1_128_DEFAULT, EAN128, EAN_128], tipoCodigoBarras.toLowerCase())) {
        return GS1_128_DEFAULT;
    }
    return tipoCodigoBarras;
}

function validate(model: IElementoCodigoBarrasModel, textBindings: any | undefined, tipoCodigoBarras: string) {
    if (!textBindings || _.isEmpty(model.valores)) {
        return;
    }

    if(tipoCodigoBarras.toLowerCase() === GS1_128_DEFAULT){
        const errors: string[] = [];
        model.valores.forEach((item) => {
            const ai = item.identificador;
            const valor = Mustache.render(item.valor, textBindings);
            if(!ai){
                errors.push(`${ERROR_PREFIX} É necessário informar um identificador para cada valor do código de barras.`);
                return;
            }
            if(!valor){
                errors.push(`${ERROR_PREFIX} É necessário informar um valor para cada identificador do código de barras.`);
                return;
            }

            if (_.includes(AIS_GTIN_CONTEUDO, ai) && !(new RegExp(/^\d{14}$/).test(valor))){
                errors.push(`${ERROR_PREFIX} O valor do identificador ${ai} deve ter 14 caracteres numéricos.`);
            }
            if(_.includes(AIS_DATAS, ai) && !(new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/).test(valor))){
                errors.push(`${ERROR_PREFIX} O valor do identificador ${ai} deve ter o formato DD/MM/AAAA.`);
            }
            if(ai === AI_LOTE && !(new RegExp(/^.{1,20}$/).test(valor))){
                errors.push(`${ERROR_PREFIX} O valor do identificador ${ai} deve ter no máximo 20 caracteres alfanuméricos.`);
            }
        });
        if(!_.isEmpty(errors)){
            throw errors;
        }
    }
}

const drawBarcode = async (id: string, ctx: CanvasRenderingContext2D, dpi: number, model: IElementoCodigoBarrasModel, textBindings?: any): Promise<any> => {
    const mm = mmPartial(dpi);
    model.tipoCodigoBarras = normalizeType(model.tipoCodigoBarras);
        validate(model, textBindings, model.tipoCodigoBarras);
    const valor = formatValue(model, textBindings, model.tipoCodigoBarras);

    if (!_.isEmpty(valor)) {
        let barcodeImg = await barcode.createBarcode(id, dpi, {
            barCodeHeight: model.dimensoes.alturaCodigoBarrasMm,
            barcodeWidth: model.dimensoes.larguraUnitariaCodigoBarrasMm,
            font: model.fonte.nome,
            fontSize: model.fonte.alturaMm,
            format: model.tipoCodigoBarras,
            text: valor,
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

let isData = function (identificador: string) {
    return _.contains(AIS_DATAS, identificador);
};

const buildOptionsBwipJs = function (options: ICreateBarcodeOptions) {
    return {
        bcid: options.format,
        text: options.text,
        scaleX: 150,
        scaleY: 3,
        width: options.barcodeWidth,
        height: options.barCodeHeight,
        includetext: options.displayValue,
        textfont: "OCR-B",
        textsize: Math.round(options.fontSize),
        textxalign: options.textAlign,
    };
};
const buildOptionsJsBarcode = function (options: ICreateBarcodeOptions, dpi: number) {
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
const createBarcodeWithBwipJs = function (options: ICreateBarcodeOptions, img: HTMLImageElement): Promise<HTMLImageElement> {
    const canvas = canvasUtils.createCanvas("canvas", 0, 0);
    return new Promise((resolve) => {
        bwipjs(canvas, buildOptionsBwipJs(options), function (err: any) {
            if (err) {
                console.log("Erro ao gerar o codigo de barras " + options.format);
            } else {
                img.src = canvas.toDataURL("image/png");
            }
            resolve(img);
        });
    });
};
const createBarcodeWithBarcodeJs = function (id: string, img: HTMLImageElement, options: ICreateBarcodeOptions, dpi: number): Promise<HTMLImageElement> {
    const lpaddedText = _.padLeft(options.text, 12, "0");
    return new Promise((resolve) => {
        JsBarcode("#" + BARCODE_IMG_ELEMENT_ID, lpaddedText, buildOptionsJsBarcode(options, dpi));
        resolve(img);
    });
};
const createBarcode = (id: string, dpi: number, options: ICreateBarcodeOptions): Promise<HTMLImageElement> => {
    const oldImg = document.getElementById(BARCODE_IMG_ELEMENT_ID);
    if (oldImg) {
        oldImg.remove();
    }
    let img = document.createElement("img");
    img.id = BARCODE_IMG_ELEMENT_ID;
    img.style.display = "none";
    document.getElementById(id).appendChild(img);

    _.defaults(options, OPTIONS_DEFAULT);
    if (options.format === GS1_128_DEFAULT) {
        return createBarcodeWithBwipJs(options, img);
    } else {
        return createBarcodeWithBarcodeJs(id, img, options, dpi);
    }
};

export const barcode = {createBarcode, drawBarcode};
