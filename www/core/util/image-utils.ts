//#TODO: Criar os métodos de validação/manipulação para as imagens de alto teor
//#TODO: -> ex: caso a nutricional apontar qtd de acucar superior a 'x' valor a imagem de alto teor de acucar deve aparecer
//#TODO: Deixar o mais generico possivel para servir para os 3 tipos de alto teor + suas possiveis combinações
//#TODO: (posterior) -> uma vez selecionado alto teor em acucar o mesmo n deve aparecer novamente

import {
    ALTO_TEOR_UNICO_ACUCAR,
    ALTO_TEOR_UNICO_GORDURA_SATURADA,
    ALTO_TEOR_UNICO_SODIO
} from "../../default";

interface IElementoAltoTeorModelNutricional {
    sodio: number;
    acucar: number;
    gorduraSaturada: number;
}

export const getPathAltoTeor = (nutricional: IElementoAltoTeorModelNutricional): string => {
    console.log("Entrou no getAltoTeorImagePath");
    if (nutricional.sodio >= 600) {
        return ALTO_TEOR_UNICO_SODIO;
    }
    if (nutricional.acucar >= 30) {
        return ALTO_TEOR_UNICO_ACUCAR;
    }
    if (nutricional.gorduraSaturada >= 6) {
        return ALTO_TEOR_UNICO_GORDURA_SATURADA;
    }
    return "";
};








