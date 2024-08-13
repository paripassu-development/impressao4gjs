//#TODO: Criar metodo(s?) para desenho da imagem de alto teor (
//#TODO: Usar o CanvasRenderingContext2D: drawImage() method (esta no draw-utils)
//#TODO: primeiramemente o(s) metodo(s) de desenhar deve(m) pegar imagem de /assets/altoTeor/(tipo de alto teor)
//#TODO: 1 desenho por vez no começo
//#TODO: usar outros metodos para se basear -> /label
//#TODO: Verificar como passar os parametros de dimensao para desenhar as imagens
//#TODO: Criar os tokens no label-configuration.ts (verificar como cria-los no bd)


import {fabric} from "fabric";
import {getPathAltoTeor} from "../core/util/image-utils";
import {DADOS_DEFAULT} from "../default";
import {extraiPorcao} from "../core/util/tabela-nutricional-utils";


interface IElementoAltoTeorModelPosicao {
    xMm: number;
    yMm: number;
    rotacao: number;
}

interface IElementoAltoTeorModelDimensoes {
    alturaMm: number;
    larguraMm: number;
}

interface IElementoAltoTeorModelNutricional {
    sodioQt100: number;
    acucaresAdicionadosQt100: number;
    gorduraSaturadaQt100: number;
}

interface IElementoAltoTeorModel {
    tipo: string;
    posicao: IElementoAltoTeorModelPosicao;
    dimensoes: IElementoAltoTeorModelDimensoes;
    nutricional: IElementoAltoTeorModelNutricional;
}

const drawAltoTeor = (ctx: CanvasRenderingContext2D, fabricCanvas: fabric.Canvas, dpi: number, model: IElementoAltoTeorModel, textBindings?: any) => {
    const textbindsTratada = textBindings ? textBindings : DADOS_DEFAULT;
    const unidadeTratada = extraiPorcao(textbindsTratada.porcaoNutricionalV2);
    const posicaoYMm = model.posicao.yMm;
    const posicaoXMm = model.posicao.xMm;
    const alturaMm = model.dimensoes.alturaMm;
    const larguraMm = model.dimensoes.larguraMm;
    const {sodioQt100, acucaresAdicionadosQt100, gorduraSaturadaQt100} = textbindsTratada;

    createImgAltoTeor({
        imageSvg: getPathAltoTeor({
            sodioQt100: sodioQt100,
            acucaresAdicionadosQt100: acucaresAdicionadosQt100,
            gorduraSaturadaQt100: gorduraSaturadaQt100,
        }),
    }, (imgSvgAltoTeor) => {
        ctx.drawImage(imgSvgAltoTeor, posicaoXMm, posicaoYMm, larguraMm, alturaMm);
    });
}

interface ICreateAltoTeorOptions {
    imageSvg: string;
}

const createImgAltoTeor = (options: ICreateAltoTeorOptions, callback: (img: HTMLImageElement) => void) => {

    const imgSvgAltoTeorCreated = new Image();
    imgSvgAltoTeorCreated.src = options.imageSvg;

    imgSvgAltoTeorCreated.onload = () => {
        callback(imgSvgAltoTeorCreated);
    };

    imgSvgAltoTeorCreated.onerror = (error) => {
        console.error(error);
    };
}

export const imageAltoTeor = {drawAltoTeor};