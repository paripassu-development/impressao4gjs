import * as Mustache from "mustache";
import { mmPartial } from "./mm";
import JsBarcode = require("jsbarcode");
const bwipjs: any = require("bwip-js");
const _ : any = require('lodash');

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
            return "0000000000000";
    }
};
const drawBarcode = async (id: string, ctx: CanvasRenderingContext2D, dpi: number, model: IElementoCodigoBarrasModel, textBindings?: any): Promise<any> => {
    const mm = mmPartial(dpi);
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
const createBarcode = (id: string, dpi: number, options: ICreateBarcodeOptions): Promise<HTMLImageElement> => {
    const oldImg = document.getElementById("barcode-img");
    if (oldImg) {
        oldImg.remove();
    }
    const lpaddedText = _.padLeft(options.text, 12,'0');
    let img = document.createElement("img");
    img.id = "barcode-img";
    img.style.display = "none";


    const mm = mmPartial(dpi);
    return new Promise((resolve, reject) => {
        if(options.format==='gs1-128') {
            const canvas = document.createElement("canvas");
            // canvas.style.display = "none";
            // document.getElementById(id).appendChild(canvas);
            bwipjs(canvas, {
                bcid:        options.format,       // Barcode type
                text:        options.text,    // Text to encode
                scale:       options.barcodeWidth*3,               // 3x scaling factor
                height:      options.barCodeHeight,              // Bar height, in millimeters
                includetext:  options.displayValue || true,            // Show human-readable text
                // textfont: options.font || "OCR-B",
                // textsize: options.fontSize,
                // textxalign: options.textAlign || "center",
            }, function (err: any) {
                if (err) {
                    console.log("Erro ao gerar o codigo de barras " + options.format);
                } else {
                    img.src = canvas.toDataURL('image/png');
                }
                resolve(img);
            });
        } else {
            document.getElementById(id).appendChild(img);
            JsBarcode("#barcode-img", lpaddedText, {
                font: options.font || "OCR-B",
                fontSize: mm(options.fontSize),
                displayValue: options.displayValue || true,
                format: options.format,
                height: mm(options.barCodeHeight),
                margin: 1,
                textMargin: 0,
                textAlign: options.textAlign || "center",
                width: mm(options.barcodeWidth),
            });
            resolve(img);
        }
    });
};

export const barcode = {createBarcode, drawBarcode};
