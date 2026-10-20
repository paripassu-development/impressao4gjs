import {
    buildNutricionalAltoTeor,
    calculaEncaixeSeloAltoTeor,
    extraiProporcaoSeloAltoTeor,
    montagemTipoAltoTeor,
    validacaoListaNutricional,
} from "../core/util/image-utils";
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

interface IElementoAltoTeorModel {
    tipo: string;
    posicao: IElementoAltoTeorModelPosicao;
    dimensoes: IElementoAltoTeorModelDimensoes;
}

const drawAltoTeor = async (ctx: CanvasRenderingContext2D, dpi: number, model: IElementoAltoTeorModel, textBindings?: any): Promise<any> => {
    const listaNutricional = validacaoListaNutricional(buildNutricionalAltoTeor(textBindings || DADOS_DEFAULT));
    const tipoImagem = montagemTipoAltoTeor(listaNutricional);

    if (!tipoImagem) {
        return;
    }

    const mm = mmPartial(dpi);
    const posicaoYMm = mm(model.posicao.yMm);
    const posicaoXMm = mm(model.posicao.xMm);
    const encaixe = calculaEncaixeSeloAltoTeor(model.dimensoes, extraiProporcaoSeloAltoTeor(tipoImagem));
    const alturaMm = mm(encaixe.alturaMm);
    const larguraMm = mm(encaixe.larguraMm);
    const degrees = Number(model.posicao.rotacao) || 0;

    const imgSvgAltoTeor = new Image();

    return new Promise<void>((resolve, reject) => {
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

        imgSvgAltoTeor.src = tipoImagem;
    });
};

export const altoTeor = {drawAltoTeor};
