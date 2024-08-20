//#TODO: Criar os métodos de validação/manipulação para as imagens de alto teor
//#TODO: -> ex: caso a nutricional apontar qtd de acucar superior a 'x' valor a imagem de alto teor de acucar deve aparecer
//#TODO: Deixar o mais generico possivel para servir para os 3 tipos de alto teor + suas possiveis combinações
//#TODO: (posterior) -> uma vez selecionado alto teor em acucar o mesmo n deve aparecer novamente
//#TODO: Verificar como validar diferentes unidades de medida (mg e g)

import {
    ALTO_TEOR_ACUCAR_GORDURA_SATURADA, ALTO_TEOR_ACUCAR_GORDURA_SATURADA_SODIO,
    ALTO_TEOR_ACUCAR_SODIO, ALTO_TEOR_GORDURA_SATURADA_SODIO,
    ALTO_TEOR_UNICO_ACUCAR,
    ALTO_TEOR_UNICO_GORDURA_SATURADA,
    ALTO_TEOR_UNICO_SODIO,
    STRING_VAZIA,
    VALOR_MINIMO_ALTO_TEOR_ACUCAR_SOLIDO,
    VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA_SOLIDO,
    VALOR_MINIMO_ALTO_TEOR_SODIO_SOLIDO, VIRGULA, VIRGULA_ESPACO,
} from "../../default";

interface IElementoAltoTeorModelNutricional {
    sodioQt100: number;
    acucaresAdicionadosQt100: number;
    gorduraSaturadaQt100: number;
}

const isNutricionalValida = (nutricional: IElementoAltoTeorModelNutricional): boolean => {
    if (!nutricional) { return false; }
    if (!nutricional.acucaresAdicionadosQt100) { return false; }
    if (!nutricional.gorduraSaturadaQt100) { return false; }
    if (!nutricional.sodioQt100) { return false; }

    return true;
};

export const validacaoListaNutricional = (nutricional: IElementoAltoTeorModelNutricional): string[] => {
    const listaNutricional: string[] = [];

    if (!isNutricionalValida(nutricional)) { return listaNutricional; }

    if (nutricional.sodioQt100 >= VALOR_MINIMO_ALTO_TEOR_SODIO_SOLIDO) {
        listaNutricional.push("itemSodio");
    }
    if (nutricional.acucaresAdicionadosQt100 >= VALOR_MINIMO_ALTO_TEOR_ACUCAR_SOLIDO) {
        listaNutricional.push("itemAcucar");
    }
    if (nutricional.gorduraSaturadaQt100 >= VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA_SOLIDO) {
        listaNutricional.push("itemGorduraSaturada");
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

    console.log(`Chave gerada: ${key}`);
    console.log(`Combinações disponíveis: ${Object.keys(combinacoesAltoTeor).join(VIRGULA_ESPACO)}`);

    return combinacoesAltoTeor[key] || STRING_VAZIA;
};
