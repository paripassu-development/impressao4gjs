//#TODO: Criar os métodos de validação/manipulação para as imagens de alto teor
//#TODO: -> ex: caso a nutricional apontar qtd de acucar superior a 'x' valor a imagem de alto teor de acucar deve aparecer
//#TODO: Deixar o mais generico possivel para servir para os 3 tipos de alto teor + suas possiveis combinações
//#TODO: (posterior) -> uma vez selecionado alto teor em acucar o mesmo n deve aparecer novamente
//#TODO: Verificar como validar diferentes unidades de medida (mg e g)


import {
    ALTO_TEOR_UNICO_ACUCAR,
    ALTO_TEOR_UNICO_GORDURA_SATURADA,
    ALTO_TEOR_UNICO_SODIO,
    STRING_VAZIA,
    VALOR_MINIMO_ALTO_TEOR_ACUCAR,
    VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA,
    VALOR_MINIMO_ALTO_TEOR_SODIO
} from "../../default";

interface IElementoAltoTeorModelNutricional {
    sodioQt100: number;
    acucaresTotaisQt100: number;
    gorduraSaturadaQt100: number;
}

export const getPathAltoTeor = (nutricional: IElementoAltoTeorModelNutricional): string => {
    //TODO: REMOVER CONSOLE.LOG
    console.log("Entrou no getAltoTeorImagePath");
    // TODO: Melhorar validações
    if (!nutricional) { return STRING_VAZIA; }
    if (!nutricional.acucaresTotaisQt100) { return STRING_VAZIA; }
    if (!nutricional.gorduraSaturadaQt100) { return STRING_VAZIA; }

    if (nutricional.sodioQt100 >= VALOR_MINIMO_ALTO_TEOR_SODIO) {
        return ALTO_TEOR_UNICO_SODIO;
    }
    if (nutricional.acucaresTotaisQt100 >= VALOR_MINIMO_ALTO_TEOR_ACUCAR) {
        return ALTO_TEOR_UNICO_ACUCAR;
    }
    if (nutricional.gorduraSaturadaQt100 >= VALOR_MINIMO_ALTO_TEOR_GORDURA_SATURADA) {
        return ALTO_TEOR_UNICO_GORDURA_SATURADA;
    }
    return STRING_VAZIA;
};