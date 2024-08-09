//#TODO: Criar metodo(s?) para desenho da imagem de alto teor (
//#TODO: Usar o CanvasRenderingContext2D: drawImage() method (esta no draw-utils)
//#TODO: primeiramemente o(s) metodo(s) de desenhar deve(m) pegar imagem de /assets/altoTeor/(tipo de alto teor)
//#TODO: 1 desenho por vez no começo
//#TODO: usar outros metodos para se basear -> /label


import {fabric} from "fabric";
import {ALTO_TEOR_UNICO_ACUCAR} from "../default";

interface IElementoAltoTeorModelPosicao {
    xMm: number;
    yMm: number;
    rotacao: number;
}

interface IElementoAltoTeorModelDimensoes {
    larguraMaximaMm: number;
}

interface IElementoAltoTeorModel {
    tipo: string;
    posicao: IElementoAltoTeorModelPosicao;
    dimensoes: IElementoAltoTeorModelDimensoes;
}


const drawAltoTeor = async (ctx: CanvasRenderingContext2D, fabricCanvas: fabric.Canvas, dpi: number, model: IElementoAltoTeorModel, textBindings?: any) => {

    console.log("Entrou no drawAltoTeor");

    const imgSvgAltoTeor = new Image(45, 45);
    imgSvgAltoTeor.src = ALTO_TEOR_UNICO_ACUCAR;

    imgSvgAltoTeor.onload = () => {
        console.log("Imagem carregada:", imgSvgAltoTeor);
        ctx.drawImage(imgSvgAltoTeor, 0, 0);
    };

    imgSvgAltoTeor.onerror = (error) => {
        console.error("Erro ao carregar a imagem:", error);
    };
}

export const imageAltoTeor = {drawAltoTeor};