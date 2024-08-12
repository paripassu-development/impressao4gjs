//#TODO: Criar os métodos de validação/manipulação para as imagens de alto teor
//#TODO: -> ex: caso a nutricional apontar qtd de acucar superior a 'x' valor a imagem de alto teor de acucar deve aparecer
//#TODO: Deixar o mais generico possivel para servir para os 3 tipos de alto teor + suas possiveis combinações
//#TODO: (posterior) -> uma vez selecionado alto teor em acucar o mesmo n deve aparecer novamente

import {
    ALTO_TEOR_UNICO_ACUCAR,
    ALTO_TEOR_UNICO_GORDURA_SATURADA,
    ALTO_TEOR_UNICO_SODIO
} from "../../default";

export const getAltoTeorImagePath = (tipo: string): string => {
    switch (tipo) {
        case 'unico_acucar':
            return ALTO_TEOR_UNICO_ACUCAR;
        case 'unico_sodio':
            return ALTO_TEOR_UNICO_SODIO;
        case 'unico_gordura_saturada':
            return ALTO_TEOR_UNICO_GORDURA_SATURADA;
        default:
            return ALTO_TEOR_UNICO_GORDURA_SATURADA;
    }
};
