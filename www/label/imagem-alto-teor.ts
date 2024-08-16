//#TODO: Criar metodo(s?) para desenho da imagem de alto teor (
//#TODO: Usar o CanvasRenderingContext2D: drawImage() method (esta no draw-utils)
//#TODO: primeiramemente o(s) metodo(s) de desenhar deve(m) pegar imagem de /assets/altoTeor/(tipo de alto teor)
//#TODO: 1 desenho por vez no começo
//#TODO: usar outros metodos para se basear -> /label
//#TODO: Verificar como passar os parametros de dimensao para desenhar as imagens
//#TODO: Criar os tokens no label-configuration.ts (verificar como cria-los no bd)


import {fabric} from "fabric";
import {validacaoListaNutricional, montagemTipoAltoTeor} from "../core/util/image-utils";
import {DADOS_DEFAULT} from "../default";


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
    const posicaoYMm = model.posicao.yMm;
    const posicaoXMm = model.posicao.xMm;
    const alturaMm = model.dimensoes.alturaMm;
    const larguraMm = model.dimensoes.larguraMm;
    const degrees = model.posicao.rotacao || 0;
    const { sodioQt100, acucaresAdicionadosQt100, gorduraSaturadaQt100 } = textbindsTratada;

    const listaNutricional = validacaoListaNutricional({
        sodioQt100,
        acucaresAdicionadosQt100,
        gorduraSaturadaQt100
    });

    const tipoImagem = montagemTipoAltoTeor(listaNutricional)
    console.log(`Lista Nutricional: ${listaNutricional}`);
    console.log(`Tipo de imagem: ${tipoImagem}`);

    const imgSvgAltoTeor = createImgAltoTeor({
        imageSvg: tipoImagem,
    });

    imgSvgAltoTeor.onload = () => {
        ctx.rotate((degrees * Math.PI) / 180);
        ctx.drawImage(imgSvgAltoTeor, posicaoXMm, posicaoYMm, larguraMm, alturaMm);
    };

    imgSvgAltoTeor.onerror = (error) => {
        console.error(
            "Falha ao carregar imagem ou alimento não possui quantidades significativas de sódio, açucar adicionado ou gordura saturada.",
            error
        );
    };
};


interface ICreateAltoTeorOptions {
    imageSvg: string;
}

const createImgAltoTeor = (options: ICreateAltoTeorOptions): HTMLImageElement => {
    const imgSvgAltoTeorCreated = new Image();
    imgSvgAltoTeorCreated.src = options.imageSvg;

    return imgSvgAltoTeorCreated;
};


export const imageAltoTeor = {drawAltoTeor};