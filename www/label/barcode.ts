import JsBarcode = require("jsbarcode");

interface ICreateBarcodeOptions {
    barCodeHeight: number;
    barcodeWidth: number;
    font?: string;
    fontSize: number;
    format: string;
    text: string;
}
const createBarcode = (options: ICreateBarcodeOptions) => {
    const oldImg = document.getElementById("barcode-img");
    if (oldImg) {
        oldImg.remove();
    }
    const img = document.createElement("img");
    img.id = "barcode-img";
    img.style.display = "none";
    document.getElementById("canvas-area").appendChild(img);
    JsBarcode("#barcode-img", options.text, {
            font: options.font || "OCR-B",
            fontSize: options.fontSize,
            format: options.format,
            height: options.barCodeHeight,
            margin: 0,
            textMargin: 0,
            width: options.barcodeWidth,
        });
    return img;
};

export const barcode = {createBarcode};
