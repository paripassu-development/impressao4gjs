//#TODO: (posterior) -> uma vez selecionado alto teor em acucar o mesmo n deve aparecer novamente
//#TODO: Verificar como validar diferentes unidades de medida (mg e g)

import {
    ALTO_TEOR_ACUCAR_GORDURA_SATURADA, ALTO_TEOR_ACUCAR_GORDURA_SATURADA_SODIO,
    ALTO_TEOR_ACUCAR_SODIO, ALTO_TEOR_GORDURA_SATURADA_SODIO,
    ALTO_TEOR_UNICO_ACUCAR,
    ALTO_TEOR_UNICO_GORDURA_SATURADA,
    ALTO_TEOR_UNICO_SODIO, APENAS_G,
    STRING_VAZIA, VALOR_MINIMO_ALTO_TEOR_ACUCAR_LIQUIDO,
    VALOR_MINIMO_ALTO_TEOR_ACUCAR_SOLIDO, VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA_LIQUIDO,
    VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA_SOLIDO, VALOR_MINIMO_ALTO_TEOR_SODIO_LIQUIDO,
    VALOR_MINIMO_ALTO_TEOR_SODIO_SOLIDO, VIRGULA,
} from "../../default";

interface IElementoAltoTeorModelNutricional {
    sodioQt100: number;
    acucaresAdicionadosQt100: number;
    gorduraSaturadaQt100: number;
    unidadeTratada: string;
}

const isNutricionalValida = (nutricional: IElementoAltoTeorModelNutricional): boolean => {
    if (!nutricional) { return false; }
    if (!nutricional.acucaresAdicionadosQt100) { return false; }
    if (!nutricional.gorduraSaturadaQt100) { return false; }
    if (!nutricional.sodioQt100) { return false; }

    return true;
};

const isAlimentoSolido = (nutricional: IElementoAltoTeorModelNutricional): boolean =>{
    if (nutricional.unidadeTratada === APENAS_G) {
        return true;
    }
    return false;
};

export const validacaoListaNutricional = (nutricional: IElementoAltoTeorModelNutricional): string[] => {
    const listaNutricional: string[] = [];

    if (!isNutricionalValida(nutricional)) { return listaNutricional; }

    if (isAlimentoSolido(nutricional)) {
        if (nutricional.sodioQt100 >= VALOR_MINIMO_ALTO_TEOR_SODIO_SOLIDO) {
            listaNutricional.push("itemSodio");
        }
        if (nutricional.acucaresAdicionadosQt100 >= VALOR_MINIMO_ALTO_TEOR_ACUCAR_SOLIDO) {
            listaNutricional.push("itemAcucar");
        }
        if (nutricional.gorduraSaturadaQt100 >= VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA_SOLIDO) {
            listaNutricional.push("itemGorduraSaturada");
        }
    } else {
        if (nutricional.sodioQt100 >= VALOR_MINIMO_ALTO_TEOR_SODIO_LIQUIDO) {
            listaNutricional.push("itemSodio");
        }
        if (nutricional.acucaresAdicionadosQt100 >= VALOR_MINIMO_ALTO_TEOR_ACUCAR_LIQUIDO) {
            listaNutricional.push("itemAcucar");
        }
        if (nutricional.gorduraSaturadaQt100 >= VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA_LIQUIDO) {
            listaNutricional.push("itemGorduraSaturada");
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
