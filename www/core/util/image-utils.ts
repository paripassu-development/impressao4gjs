import {
    ALTO_TEOR_ACUCAR_GORDURA_SATURADA,
    ALTO_TEOR_ACUCAR_GORDURA_SATURADA_SODIO,
    ALTO_TEOR_ACUCAR_SODIO,
    ALTO_TEOR_GORDURA_SATURADA_SODIO,
    ALTO_TEOR_UNICO_ACUCAR,
    ALTO_TEOR_UNICO_GORDURA_SATURADA,
    ALTO_TEOR_UNICO_SODIO,
    APENAS_G,
    ITEM_ACUCAR,
    ITEM_GORDURA_SATURADA,
    ITEM_SODIO,
    STRING_VAZIA,
    VALOR_MINIMO_ALTO_TEOR_ACUCAR_LIQUIDO,
    VALOR_MINIMO_ALTO_TEOR_ACUCAR_SOLIDO,
    VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA_LIQUIDO,
    VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA_SOLIDO,
    VALOR_MINIMO_ALTO_TEOR_SODIO_LIQUIDO,
    VALOR_MINIMO_ALTO_TEOR_SODIO_SOLIDO,
    VIRGULA,
} from "../../default";

interface IElementoAltoTeorModelNutricional {
    sodioQt100: number;
    acucaresAdicionadosQt100: number;
    gorduraSaturadaQt100: number;
    unidadeTratada: string;
}

const isAlimentoSolido = (nutricional: IElementoAltoTeorModelNutricional): boolean => {
    if (nutricional.unidadeTratada === APENAS_G) {
        return true;
    }
    return false;
};

export const validacaoListaNutricional = (nutricional: IElementoAltoTeorModelNutricional): string[] => {
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
    listaNutricional.sort();

    const key = listaNutricional.join(VIRGULA);

    return combinacoesAltoTeor[key] || STRING_VAZIA;
};
