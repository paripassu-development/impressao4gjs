import {fabric} from "fabric";
import {montagemTipoAltoTeor, validacaoListaNutricional} from "../core/util/image-utils";
import {extraiPorcao, substituiVirgulaPorPonto} from "../core/util/tabela-nutricional-utils";
import {DADOS_DEFAULT} from "../default";
import {mmPartial} from "./mm";

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
    unidadeTratada: string;
}

interface IElementoAltoTeorModel {
    tipo: string;
    posicao: IElementoAltoTeorModelPosicao;
    dimensoes: IElementoAltoTeorModelDimensoes;
    nutricional: IElementoAltoTeorModelNutricional;
}

const drawAltoTeor = async (id: string, ctx: CanvasRenderingContext2D, fabricCanvas: fabric.Canvas, dpi: number, model: IElementoAltoTeorModel, textBindings?: any): Promise<any> => {
    const mm = mmPartial(dpi);
    const textbindsTratada = textBindings ? textBindings : DADOS_DEFAULT;
    const posicaoYMm = mm (model.posicao.yMm);
    const posicaoXMm = mm (model.posicao.xMm);
    const alturaMm = mm (model.dimensoes.alturaMm);
    const larguraMm = mm (model.dimensoes.larguraMm);
    const degrees = model.posicao.rotacao || 0;

    //TODO: REMOVER LOGS
    console.log("-----INICIO DO drawAltoTeor-----");
    console.log("Valores de referencia:");
    console.log("textbindsTratada: ", textbindsTratada);
    console.log("posicaoYMm: ", posicaoYMm);
    console.log("posicaoXMm: ", posicaoXMm);
    console.log("alturaMm: ", alturaMm);
    console.log("larguraMm: ", larguraMm);
    console.log("degrees: ", degrees);


    const mapeiaNutrientes = textbindsTratada.parametrosPadroesNutricionalV2.reduce((mapa: any, item: any) => {
        const rotuloLimpo = item.rotulo.trim();
        mapa[rotuloLimpo] = item.qt100;
        //#TODO: REMOVER LOGS
        console.log("----Retorno da funcao de mapeamento de nutrientes-----");
        console.log(mapa);
        return mapa;
    }, {});

    const sodioQt100 = substituiVirgulaPorPonto(mapeiaNutrientes["Sódio (mg)"] || 0);
    const acucaresAdicionadosQt100 = substituiVirgulaPorPonto(mapeiaNutrientes["Açúcares adicionados (g)"] || 0);
    const gorduraSaturadaQt100 = substituiVirgulaPorPonto(mapeiaNutrientes["Gorduras saturadas (g)"] || 0);
    const unidadeTratada = extraiPorcao(textbindsTratada.porcaoNutricionalV2);

    //#TODO:REMOVER LOGS
    console.log("-----LOGS DE ELEMENTOS NUTRICIONAIS-----");
    console.log("sodio: ", sodioQt100);
    console.log("acucar: ", acucaresAdicionadosQt100);
    console.log("gorudura: ", gorduraSaturadaQt100);
    console.log("unidade tratada: ", unidadeTratada);

    const listaNutricional = validacaoListaNutricional({
        sodioQt100,
        acucaresAdicionadosQt100,
        gorduraSaturadaQt100,
        unidadeTratada,
    });

    const tipoImagem = montagemTipoAltoTeor(listaNutricional);

    //#TODO: REMOVER LOGS
    console.log("Retorno da montagem dentro do drawAltoTeor: ", tipoImagem);

    const imgSvgAltoTeor = createImgAltoTeor(id, {
        imageSvg: tipoImagem,
    });

    console.log("Retorno da criação de imagem: ", imgSvgAltoTeor);

    return new Promise((resolve, reject) => {
        imgSvgAltoTeor.onload = () => {
            try {
                //#TODO: REMOVER LOGS
                console.log("-----DENTRO DO ONLOAD-----");
                console.log("Img que será desenhada no drawImage: ", imgSvgAltoTeor);
                ctx.save();
                ctx.rotate((degrees * Math.PI) / 180);
                ctx.drawImage(imgSvgAltoTeor, posicaoXMm, posicaoYMm, larguraMm, alturaMm);
                ctx.restore();
                resolve();
            } catch (error) {
                console.error("Erro ao desenhar imagem.", error);
                reject(error);
            }
        };

        imgSvgAltoTeor.onerror = (error) => {
            // tslint:disable-next-line:no-console
            console.error("Falha ao carregar a imagem.", error);
            reject(error);
        };
    });
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

    console.log("-----NO FINAL DO METODO DE CRIAR IMAGEM-----");
    console.log("Div gerada para criação da imagem ", altoTeorDiv);
    console.log("Imagem alto teor que será devolvida para o drawImage ", altoTeorDiv.getElementsByTagName("img")[0]);

    return altoTeorDiv.getElementsByTagName("img")[0];
};

export const altoTeor = {drawAltoTeor};
