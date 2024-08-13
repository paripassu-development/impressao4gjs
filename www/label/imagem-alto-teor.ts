//#TODO: Criar metodo(s?) para desenho da imagem de alto teor (
//#TODO: Usar o CanvasRenderingContext2D: drawImage() method (esta no draw-utils)
//#TODO: primeiramemente o(s) metodo(s) de desenhar deve(m) pegar imagem de /assets/altoTeor/(tipo de alto teor)
//#TODO: 1 desenho por vez no começo
//#TODO: usar outros metodos para se basear -> /label
//#TODO: Verificar como passar os parametros de dimensao para desenhar as imagens
//#TODO: Criar os tokens no label-configuration.ts (verificar como cria-los no bd)

// {
//     nome: "ras.ui.4g.etiqueta.configuracao.image_alto_teor",
//     tipo: "imageAltoTeor",
//     descricao: "ras.ui.4g.etiqueta.configuracao.image_alto_teor.descricao",
//     camposConfiguraveis: [
//     {
//         nome: "ras.ui.4g.etiqueta.configuracao.posicao",
//         tipo: "OBJECT",
//         obrigatorio: true,
//         campo: "posicao",
//         itens: [
//             {
//                 nome: "ras.ui.4g.etiqueta.configuracao.posicao_horizontal",
//                 descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.posicao_horizontal.descricao",
//                 tipo: "NUMERIC",
//                 categoria: "posicionamento",
//                 obrigatorio: true,
//                 campo: "posicao.xMm",
//                 padrao: 0,
//             },
//             {
//                 nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
//                 descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.posicao_vertical.descricao",
//                 tipo: "NUMERIC",
//                 obrigatorio: true,
//                 campo: "posicao.yMm",
//                 padrao: 2,
//             },
//             {
//                 nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
//                 descricao: "Ângulo de rotação da tabela nutricional dentro da etiqueta",
//                 campo: "posicao.rotacao",
//                 tipo: "OPTIONS",
//                 opcoes: VALORES_ROTACAO,
//                 obrigatorio: false,
//             },
//         ],
//     },
//     {
//         nome: "ras.ui.4g.etiqueta.configuracao.dimensoes",
//         tipo: "OBJECT",
//         obrigatorio: true,
//         campo: "dimensoes",
//         itens: [
//             {
//                 nome: "ras.ui.4g.etiqueta.configuracao.largura_maxima",
//                 descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.largura_maxima.descricao",
//                 tipo: "NUMERIC",
//                 obrigatorio: true,
//                 campo: "dimensoes.larguraMaximaMm",
//                 padrao: 43,
//             },
//         ],
//     },




import {fabric} from "fabric";
import {mmPartial} from "./mm";
import {getPathAltoTeor} from "../core/util/image-utils";


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
    sodio: number;
    acucaresTotais: number;
    gorduraSaturada: number;
}


interface IElementoAltoTeorModel {
    tipo: string;
    posicao: IElementoAltoTeorModelPosicao;
    dimensoes: IElementoAltoTeorModelDimensoes;
    nutricional: IElementoAltoTeorModelNutricional;
}


const drawAltoTeor = (ctx: CanvasRenderingContext2D, fabricCanvas: fabric.Canvas, dpi: number, model: IElementoAltoTeorModel, textBindings?: any) => {
    // const mm = mmPartial(dpi);
    const posicaoYMm = model.posicao.yMm;
    const posicaoXMm = model.posicao.xMm;
    console.log("Entrou no drawAltoTeor");

    //mock de teste:
    const mockNutricional: IElementoAltoTeorModelNutricional = {
        sodio: 500,
        acucaresTotais: 20,
        gorduraSaturada: 8,
    };

    createImgAltoTeor({
        alturaMm: (model.dimensoes.alturaMm),
        larguraMm: (model.dimensoes.larguraMm),
        src: getPathAltoTeor(mockNutricional),
    }, (imgSvgAltoTeor) => {
        ctx.drawImage(imgSvgAltoTeor, posicaoXMm, posicaoYMm);
    });
}


interface ICreateAltoTeorOptions {
    alturaMm: number;
    larguraMm: number;
    src: string;
}

const createImgAltoTeor = (options: ICreateAltoTeorOptions, callback: (img: HTMLImageElement) => void) => {
    const altura = options.alturaMm;
    const largura = options.larguraMm;

    const imgSvgAltoTeorCreated = new Image(largura, altura);
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