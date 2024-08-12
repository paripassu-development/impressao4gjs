//#TODO: Criar metodo(s?) para desenho da imagem de alto teor (
//#TODO: Usar o CanvasRenderingContext2D: drawImage() method (esta no draw-utils)
//#TODO: primeiramemente o(s) metodo(s) de desenhar deve(m) pegar imagem de /assets/altoTeor/(tipo de alto teor)
//#TODO: 1 desenho por vez no começo
//#TODO: usar outros metodos para se basear -> /label


import {fabric} from "fabric";
import {mmPartial} from "./mm";
import {getAltoTeorImagePath} from "../core/util/image-utils";


interface IElementoAltoTeorModelPosicao {
    xMm: number;
    yMm: number;
    rotacao: number;
}

interface IElementoAltoTeorModelDimensoes {
    alturaMm: number;
    larguraMm: number;
}

interface IElementoAltoTeorModel {
    tipo: string;
    posicao: IElementoAltoTeorModelPosicao;
    dimensoes: IElementoAltoTeorModelDimensoes;
}


const drawAltoTeor = (ctx: CanvasRenderingContext2D, fabricCanvas: fabric.Canvas, dpi: number, model: IElementoAltoTeorModel, textBindings?: any) => {
    const mm = mmPartial(dpi);
    console.log("Entrou no drawAltoTeor");

    const altoTeorImgPath = getAltoTeorImagePath(model.tipo);

    createImgAltoTeor({
        height: mm(model.dimensoes.alturaMm),
        width: mm(model.dimensoes.larguraMm),
        src: altoTeorImgPath,
    }, (imgSvgAltoTeor) => {
        ctx.drawImage(imgSvgAltoTeor, 0, 0);
    });
}


interface ICreateAltoTeorOptions {
    height: number;
    width: number;
    src: string;
}

const createImgAltoTeor = (options: ICreateAltoTeorOptions, callback: (img: HTMLImageElement) => void) => {
    const imgSvgAltoTeorCreated = new Image();

    imgSvgAltoTeorCreated.height = options.height;
    imgSvgAltoTeorCreated.width = options.width;
    imgSvgAltoTeorCreated.src = options.src;

    imgSvgAltoTeorCreated.onload = () => {
        console.log("Imagem carregada:", imgSvgAltoTeorCreated);
        callback(imgSvgAltoTeorCreated);
    };

    imgSvgAltoTeorCreated.onerror = (error) => {
        console.error("Erro ao carregar a imagem:", error);
    };
}

export const imageAltoTeor = {drawAltoTeor};