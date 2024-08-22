//#TODO: Criar metodo(s?) para desenho da imagem de alto teor (
//#TODO: Usar o CanvasRenderingContext2D: drawImage() method (esta no draw-utils)
//#TODO: primeiramemente o(s) metodo(s) de desenhar deve(m) pegar imagem de /assets/altoTeor/(tipo de alto teor)
//#TODO: 1 desenho por vez no começo
//#TODO: usar outros metodos para se basear -> /label
//#TODO: Verificar como passar os parametros de dimensao para desenhar as imagens
//#TODO: Criar os tokens no label-configuration.ts (verificar como cria-los no bd)

import {fabric} from "fabric";
import {montagemTipoAltoTeor, validacaoListaNutricional} from "../core/util/image-utils";
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

const drawAltoTeor = (id: string, ctx: CanvasRenderingContext2D, fabricCanvas: fabric.Canvas, dpi: number, model: IElementoAltoTeorModel, textBindings?: any) => {
    // TODO: remover os console logs inuteis
    console.log("Dentro do DrwaAltoTeor");
    const textbindsTratada = textBindings ? textBindings : DADOS_DEFAULT;
    console.log(textbindsTratada);
    const posicaoYMm = model.posicao.yMm;
    const posicaoXMm = model.posicao.xMm;
    const alturaMm = model.dimensoes.alturaMm;
    const larguraMm = model.dimensoes.larguraMm;
    const degrees = model.posicao.rotacao || 0;

    const mapeiaNutrientes = textbindsTratada.parametrosPadroesNutricionalV2.reduce((mapa: any, item: any) => {
        const rotuloLimpo = item.rotulo.trim();
        mapa[rotuloLimpo] = item.qt100;
        return mapa;
    }, {});

    const sodioQt100 = mapeiaNutrientes["Sódio (mg)"] || 0;
    const acucaresAdicionadosQt100 = mapeiaNutrientes["Açúcares adicionados (g)"] || 0;
    const gorduraSaturadaQt100 = mapeiaNutrientes["Gorduras saturadas (g)"] || 0;

    console.log({sodioQt100});
    console.log({acucaresAdicionadosQt100});
    console.log({gorduraSaturadaQt100});

    const listaNutricional = validacaoListaNutricional({
        sodioQt100,
        acucaresAdicionadosQt100,
        gorduraSaturadaQt100,
    });

    const tipoImagem = montagemTipoAltoTeor(listaNutricional)

    const imgSvgAltoTeor = createImgAltoTeor(id, {
        imageSvg: tipoImagem,
    });

    imgSvgAltoTeor.onload = () => {
        console.log(imgSvgAltoTeor);
        ctx.rotate((degrees * Math.PI) / 180);
        ctx.drawImage(imgSvgAltoTeor, posicaoXMm, posicaoYMm, larguraMm, alturaMm);
    };

    imgSvgAltoTeor.onerror = (error) => {
        console.error(
            "Falha ao carregar imagem ou alimento não possui quantidades significativas de sódio, açucar adicionado ou gordura saturada.",
            error,
        );
    };

};

interface ICreateAltoTeorOptions {
    imageSvg: string;
}


const createImgAltoTeor = (id: string, options: ICreateAltoTeorOptions): HTMLImageElement => {
    const oldAltoTeorDiv = document.getElementById("altoTeor-div");
    if (oldAltoTeorDiv) {
        oldAltoTeorDiv.remove();
    }

    const altoTeorDiv = document.createElement("div");
    altoTeorDiv.id = "altoTeor-div";
    altoTeorDiv.style.display = "none";
    document.getElementById(id).appendChild(altoTeorDiv);

    const imgAltoTeor = document.createElement("img") as HTMLImageElement;
    imgAltoTeor.src = options.imageSvg;
    altoTeorDiv.appendChild(imgAltoTeor);

    return imgAltoTeor;
};


export const altoTeor = {drawAltoTeor};
