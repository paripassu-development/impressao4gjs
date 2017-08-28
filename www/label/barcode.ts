import * as Mustache from "mustache";
import { mmPartial } from "./mm";
import JsBarcode = require("jsbarcode");
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
}
interface IElementoCodigoBarrasModel {
    tipo: string;
    posicao: IElementoCodigoBarrasModelPosicao;
    dimensoes: IElementoCodigoBarrasModelDimensoes;
    fonte: IElementoCodigoBarrasModelFonte;
    tipoCodigoBarras: string;
    valor: string;
}
const formatEam = (ean: string) => {
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
const drawBarcode = (id: string, ctx: CanvasRenderingContext2D, dpi: number, model: IElementoCodigoBarrasModel, textBindings?: any) => {
    const mm = mmPartial(dpi);
    const ean = formatEam(Mustache.render(model.valor, textBindings));
    
    if(!_.isEmpty(ean)){
        let barcodeImg = barcode.createBarcode(id, {
            barCodeHeight: mm(model.dimensoes.alturaCodigoBarrasMm),
            barcodeWidth: mm(model.dimensoes.larguraUnitariaCodigoBarrasMm),
            font: model.fonte.nome,
            fontSize: mm(model.fonte.alturaMm),
            format: model.tipoCodigoBarras,
            text: ean, 
        });
        
        return new Promise((resolve, reject) => {
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
    barCodeHeight: number;
    barcodeWidth: number;
    font?: string;
    fontSize: number;
    format: string;
    text: string;
}
const createBarcode = (id: string, options: ICreateBarcodeOptions) => {
    const oldImg = document.getElementById("barcode-img");
    if (oldImg) {
        oldImg.remove();
    }
    const img = document.createElement("img");
    img.id = "barcode-img";
    img.style.display = "none";
    document.getElementById(id).appendChild(img);
    const lpaddedText = _.padLeft(options.text, 12,'0');
    JsBarcode("#barcode-img", lpaddedText, {
        font: options.font || "OCR-B",
        fontSize: options.fontSize,
        format: options.format,
        height: options.barCodeHeight,
        margin: 1,
        textMargin: 0,
        width: options.barcodeWidth,
    });
    return img;
};

export const barcode = {createBarcode, drawBarcode};
