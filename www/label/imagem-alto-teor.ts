import {fabric} from "fabric";
import {montagemTipoAltoTeor, validacaoListaNutricional} from "../core/util/image-utils";
import {extraiPorcao, substituiVirgulaPorPonto} from "../core/util/tabela-nutricional-utils";
import {DADOS_DEFAULT, ROTULO_ACUCARES_ADICIONADOS, ROTULO_GORDURA_SATURADA, ROTULO_SODIO} from "../default";
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

    const mapeiaNutrientes = textbindsTratada.parametrosPadroesNutricionalV2.reduce((mapa: any, item: any) => {
        const rotuloLimpo = item.rotulo.trim();
        mapa[rotuloLimpo] = item.qt100;
        return mapa;
    }, {});

    const sodioQt100 = substituiVirgulaPorPonto(mapeiaNutrientes[ROTULO_SODIO] || 0);
    const acucaresAdicionadosQt100 = substituiVirgulaPorPonto(mapeiaNutrientes[ROTULO_ACUCARES_ADICIONADOS] || 0);
    const gorduraSaturadaQt100 = substituiVirgulaPorPonto(mapeiaNutrientes[ROTULO_GORDURA_SATURADA] || 0);
    const unidadeTratada = extraiPorcao(textbindsTratada.porcaoNutricionalV2);

    const listaNutricional = validacaoListaNutricional({
        sodioQt100,
        acucaresAdicionadosQt100,
        gorduraSaturadaQt100,
        unidadeTratada,
    });

    const tipoImagem = montagemTipoAltoTeor(listaNutricional);

    const imgSvgAltoTeor = createImgAltoTeor(id, {
        imageSvg: tipoImagem,
    });

    return new Promise((resolve, reject) => {
        imgSvgAltoTeor.onload = () => {
            try {
                ctx.save();
                ctx.rotate((degrees * Math.PI) / 180);
                ctx.drawImage(imgSvgAltoTeor, posicaoXMm, posicaoYMm, larguraMm, alturaMm);
                ctx.restore();
                resolve();
            } catch (error) {
                // tslint:disable-next-line:no-console
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

    return altoTeorDiv.getElementsByTagName("img")[0];
};

export const altoTeor = {drawAltoTeor};
