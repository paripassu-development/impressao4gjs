import {
    APENAS_G,
    ITEM_ACUCAR,
    ITEM_GORDURA_SATURADA,
    ITEM_SODIO,
    PONTO_FINAL,
    REGEX_REMOVE_QUANTIDADE_PORCAO,
    ROTULO_ACUCARES_ADICIONADOS,
    ROTULO_GORDURA_SATURADA,
    ROTULO_SODIO,
    STRING_VAZIA,
    VALOR_MINIMO_ALTO_TEOR_ACUCAR_LIQUIDO,
    VALOR_MINIMO_ALTO_TEOR_ACUCAR_SOLIDO,
    VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA_LIQUIDO,
    VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA_SOLIDO,
    VALOR_MINIMO_ALTO_TEOR_SODIO_LIQUIDO,
    VALOR_MINIMO_ALTO_TEOR_SODIO_SOLIDO,
    VIRGULA,
} from "../../default";
import {
    ALTO_TEOR_ACUCAR_GORDURA_SATURADA,
    ALTO_TEOR_ACUCAR_GORDURA_SATURADA_SODIO,
    ALTO_TEOR_ACUCAR_SODIO,
    ALTO_TEOR_GORDURA_SATURADA_SODIO,
    ALTO_TEOR_UNICO_ACUCAR,
    ALTO_TEOR_UNICO_GORDURA_SATURADA,
    ALTO_TEOR_UNICO_SODIO,
} from "../constants/imagens-alto-teor";

export interface IElementoAltoTeorModelNutricional {
    sodioQt100: number;
    acucaresAdicionadosQt100: number;
    gorduraSaturadaQt100: number;
    unidadeTratada: string;
}

export const extraiUnidadePorcao = (textoPorcao: string): string => {
    if (!textoPorcao) { return STRING_VAZIA; }
    return String(textoPorcao).replace(REGEX_REMOVE_QUANTIDADE_PORCAO, STRING_VAZIA).toLowerCase();
};

export const converteQuantidadeNutricional = (valor: string | number): number => {
    if (typeof valor === "number") { return valor; }
    if (!valor) { return 0; }
    const quantidade = parseFloat(String(valor).replace(VIRGULA, PONTO_FINAL));
    return isNaN(quantidade) ? 0 : quantidade;
};

export const buildNutricionalAltoTeor = (textBindings: any): IElementoAltoTeorModelNutricional | null => {
    const parametros = textBindings && textBindings.parametrosPadroesNutricionalV2;
    if (!Array.isArray(parametros)) { return null; }

    const qt100PorRotulo = parametros.reduce((mapa: { [rotulo: string]: string | number }, item: any) => {
        if (item && typeof item.rotulo === "string") {
            mapa[item.rotulo.trim()] = item.qt100;
        }
        return mapa;
    }, {});

    return {
        sodioQt100: converteQuantidadeNutricional(qt100PorRotulo[ROTULO_SODIO]),
        acucaresAdicionadosQt100: converteQuantidadeNutricional(qt100PorRotulo[ROTULO_ACUCARES_ADICIONADOS]),
        gorduraSaturadaQt100: converteQuantidadeNutricional(qt100PorRotulo[ROTULO_GORDURA_SATURADA]),
        unidadeTratada: extraiUnidadePorcao(textBindings.porcaoNutricionalV2),
    };
};

const isAlimentoSolido =(nutricional: IElementoAltoTeorModelNutricional): boolean => {
    return nutricional.unidadeTratada === APENAS_G;
};

export const validacaoListaNutricional = (nutricional: IElementoAltoTeorModelNutricional | null): string[] => {
    const listaNutricional: string[] = [];

    if (!nutricional) { return listaNutricional; }

    if (isAlimentoSolido(nutricional)) {
        if (nutricional.sodioQt100 >= VALOR_MINIMO_ALTO_TEOR_SODIO_SOLIDO) {
            listaNutricional.push(ITEM_SODIO);
        }
        if (nutricional.acucaresAdicionadosQt100 >= VALOR_MINIMO_ALTO_TEOR_ACUCAR_SOLIDO) {
            listaNutricional.push(ITEM_ACUCAR);
        }
        if (nutricional.gorduraSaturadaQt100 >= VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA_SOLIDO) {
            listaNutricional.push(ITEM_GORDURA_SATURADA);
        }
    } else {
        if (nutricional.sodioQt100 >= VALOR_MINIMO_ALTO_TEOR_SODIO_LIQUIDO) {
            listaNutricional.push(ITEM_SODIO);
        }
        if (nutricional.acucaresAdicionadosQt100 >= VALOR_MINIMO_ALTO_TEOR_ACUCAR_LIQUIDO) {
            listaNutricional.push(ITEM_ACUCAR);
        }
        if (nutricional.gorduraSaturadaQt100 >= VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA_LIQUIDO) {
            listaNutricional.push(ITEM_GORDURA_SATURADA);
        }
    }
    return listaNutricional;
};

export const montagemTipoAltoTeor = (listaNutricional: string[]): string => {
    const combinacoesAltoTeor: { [key: string]: string } = {
        "itemSodio": ALTO_TEOR_UNICO_SODIO,
        "itemAcucar": ALTO_TEOR_UNICO_ACUCAR,
        "itemGorduraSaturada": ALTO_TEOR_UNICO_GORDURA_SATURADA,
        "itemAcucar,itemSodio": ALTO_TEOR_ACUCAR_SODIO,
        "itemGorduraSaturada,itemSodio": ALTO_TEOR_GORDURA_SATURADA_SODIO,
        "itemAcucar,itemGorduraSaturada": ALTO_TEOR_ACUCAR_GORDURA_SATURADA,
        "itemAcucar,itemGorduraSaturada,itemSodio": ALTO_TEOR_ACUCAR_GORDURA_SATURADA_SODIO,
    };

    const key = [...listaNutricional].sort().join(VIRGULA);

    return combinacoesAltoTeor[key] || STRING_VAZIA;
};

export interface IDimensoesEncaixeAltoTeor {
    larguraMm: number;
    alturaMm: number;
}

const REGEX_VIEWBOX_SVG = /viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/;

export const extraiProporcaoSeloAltoTeor = (dataUriSvg: string): number => {
    const viewBox = REGEX_VIEWBOX_SVG.exec(decodeURIComponent(dataUriSvg || STRING_VAZIA));
    if (!viewBox) { return 0; }
    const larguraViewBox = parseFloat(viewBox[1]);
    const alturaViewBox = parseFloat(viewBox[2]);
    return larguraViewBox > 0 ? alturaViewBox / larguraViewBox : 0;
};

export const calculaEncaixeSeloAltoTeor = (caixa: IDimensoesEncaixeAltoTeor, proporcao: number): IDimensoesEncaixeAltoTeor => {
    if (!(proporcao > 0) || !(caixa.larguraMm > 0) || !(caixa.alturaMm > 0)) {
        return caixa;
    }
    if (caixa.larguraMm * proporcao <= caixa.alturaMm) {
        return {larguraMm: caixa.larguraMm, alturaMm: caixa.larguraMm * proporcao};
    }
    return {larguraMm: caixa.alturaMm / proporcao, alturaMm: caixa.alturaMm};
};
