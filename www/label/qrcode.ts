import { mmPartial } from "./mm";
declare var require: any;
const QRCode: any = require("qrcodejs2");

interface IElementoQrcodeModel {
    tipo: string;
    valor: string;
    xMm: number;
    yMm: number;
    alturaMm: number;
    larguraMm: number;
}
const drawQrcode = (canvas: HTMLCanvasElement, dpi: number, model: IElementoQrcodeModel) => {
    const mm = mmPartial(dpi);
    const ctx: any = canvas.getContext("2d");
    const qrcodeImg = createQrCode({
        height: mm(model.alturaMm),
        text: model.valor,
        width: mm(model.larguraMm),
    });
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(qrcodeImg, mm(model.xMm), mm(model.yMm));
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
