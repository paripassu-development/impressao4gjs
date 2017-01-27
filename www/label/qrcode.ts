import * as Mustache from "mustache";
import { mmPartialOversampled } from "./mm";
declare var require: any;
const QRCode: any = require("qrcodejs2");

interface IElementoQrcodeModelPosicao {
    xMm: number;
    yMm: number;
}
interface IElementoQrcodeModelDimensoes {
    alturaMm: number;
    larguraMm: number;
}
interface IElementoQrcodeModel {
    tipo: string;
    valor: string;
    posicao: IElementoQrcodeModelPosicao;
    dimensoes: IElementoQrcodeModelDimensoes;
}
const drawQrcode = (ctx: CanvasRenderingContext2D, dpi: number, model: IElementoQrcodeModel, textBindings?: any) => {
    const mm = mmPartialOversampled(dpi);
    const qrcodeImg = createQrCode({
        height: mm(model.dimensoes.alturaMm),
        text: textBindings ? Mustache.render(model.valor, textBindings) : model.valor,
        width: mm(model.dimensoes.larguraMm),
    });
    ctx.drawImage(qrcodeImg, mm(model.posicao.xMm), mm(model.posicao.yMm));
};

interface ICreateQrcodeOptions {
    text: string;
    height: number;
    width: number;
}
const createQrCode = (options: ICreateQrcodeOptions) => {
    const oldQrcodeDiv = document.getElementById("qrcode-div");
    if (oldQrcodeDiv) {
        oldQrcodeDiv.remove();
    }
    const qrcodeDiv = document.createElement("div");
    qrcodeDiv.id = "qrcode-div";
    qrcodeDiv.style.display = "none";
    document.getElementById("canvas-area").appendChild(qrcodeDiv);
    const qrcode = new QRCode("qrcode-div", {
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.L,
        height: options.height,
        text: options.text,
        width: options.width,
    });
    return qrcodeDiv.getElementsByTagName("canvas")[0];
};

export const qrcode = { drawQrcode };
