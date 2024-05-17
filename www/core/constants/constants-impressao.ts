import {Enum} from "typescript-string-enums";

export const barraOrigemRastreadaConstants = {
    LARGURA_BARRA: 776,
    ALTURA_BARRA: 32,
};

export const ErrosPrefix = {
    ERROR_CODIGO_BARRAS: "[Código de barras]",
    ERROR_OBRIGATORIEDADE: "[Campo obrigatório]",
};

export const TipoError = Enum({
    GS1: "gs1",
    OBRIGATORIO: "obrigatorio",
});

export type TipoError = Enum<typeof TipoError>;

export const intervaloTamanhoFonte: any = {
    "unispace-bold": {
        proporcaoTamanhoFonte1: {min: 1, max: 3, tamanhoFonte: 2},
        proporcaoTamanhoFonte2: {min: 3, max: 3, tamanhoFonte: 2},
        proporcaoTamanhoFonte3: {min: 4, max: 5, tamanhoFonte: 3},
        proporcaoTamanhoFonte4: {min: 6, max: 7, tamanhoFonte: 4},
        proporcaoTamanhoFonte6: {min: 8, max: Number.MAX_VALUE, tamanhoFonte: 6},
    },  // proporção 1.3333333333
    "telegrama": {
        proporcaoTamanhoFonte1: {min: 1, max: 2, tamanhoFonte: 2},
        proporcaoTamanhoFonte2: {min: 3, max: 3, tamanhoFonte: 2},
        proporcaoTamanhoFonte3: {min: 4, max: 5, tamanhoFonte: 3},
        proporcaoTamanhoFonte4: {min: 6, max: 7, tamanhoFonte: 4},
        proporcaoTamanhoFonte6: {min: 8, max: Number.MAX_VALUE, tamanhoFonte: 6},
    }, // proporção 1.3333333333
    "fromwhereyouare": {
        proporcaoTamanhoFonte1: {min: 1, max: 2, tamanhoFonte: 2},
        proporcaoTamanhoFonte2: {min: 3, max: 3, tamanhoFonte: 2},
        proporcaoTamanhoFonte3: {min: 4, max: 4, tamanhoFonte: 3},
        proporcaoTamanhoFonte4: {min: 5, max: 7, tamanhoFonte: 4},
        proporcaoTamanhoFonte6: {min: 8, max: Number.MAX_VALUE, tamanhoFonte: 6},
    }, // proporção 1.25
    "dejavusansmono-bold": {
        proporcaoTamanhoFonte1: {min: 1, max: 2, tamanhoFonte: 2},
        proporcaoTamanhoFonte2: {min: 3, max: 3, tamanhoFonte: 2},
        proporcaoTamanhoFonte3: {min: 4, max: 5, tamanhoFonte: 3},
        proporcaoTamanhoFonte4: {min: 6, max: 8, tamanhoFonte: 4},
        proporcaoTamanhoFonte6: {min: 9, max: Number.MAX_VALUE, tamanhoFonte: 6},
    }, // proporção 1.5
    "dejavusansmono": {
        proporcaoTamanhoFonte1: {min: 1, max: 2, tamanhoFonte: 2},
        proporcaoTamanhoFonte2: {min: 3, max: 3, tamanhoFonte: 2},
        proporcaoTamanhoFonte3: {min: 4, max: 5, tamanhoFonte: 3},
        proporcaoTamanhoFonte4: {min: 6, max: 8, tamanhoFonte: 4},
        proporcaoTamanhoFonte6: {min: 9, tamanhoFonte: 6},
    }, // proporção 1.5
    "bpmono-bold": {
        proporcaoTamanhoFonte1: {min: 1, max: 3, tamanhoFonte: 2},
        proporcaoTamanhoFonte2: {min: 4, max: 4, tamanhoFonte: 2},
        proporcaoTamanhoFonte3: {min: 5, max: 6, tamanhoFonte: 3},
        proporcaoTamanhoFonte4: {min: 7, max: 9, tamanhoFonte: 4},
        proporcaoTamanhoFonte6: {min: 10, max: Number.MAX_VALUE, tamanhoFonte: 6},
    }, // proporção 1.666666666666667
    "codenewroman-bold": {
        proporcaoTamanhoFonte1: {min: 1, max: 3, tamanhoFonte: 2},
        proporcaoTamanhoFonte2: {min: 4, max: 4, tamanhoFonte: 2},
        proporcaoTamanhoFonte3: {min: 5, max: 6, tamanhoFonte: 3},
        proporcaoTamanhoFonte4: {min: 7, max: 9, tamanhoFonte: 4},
        proporcaoTamanhoFonte6: {min: 10, max: Number.MAX_VALUE, tamanhoFonte: 6},
    }, // proporção 1.666666666666667
    "arial": {
        proporcaoTamanhoFonte1: {min: 1, max: 2, tamanhoFonte: 2},
        proporcaoTamanhoFonte2: {min: 3, max: 4, tamanhoFonte: 2},
        proporcaoTamanhoFonte3: {min: 4, max: 5, tamanhoFonte: 3},
        proporcaoTamanhoFonte4: {min: 6, max: 8, tamanhoFonte: 4},
        proporcaoTamanhoFonte6: {min: 9, max: Number.MAX_VALUE, tamanhoFonte: 6},
    }, // proporção 1.5
    "consolas": {
        proporcaoTamanhoFonte1: {min: 1, max: 2, tamanhoFonte: 2},
        proporcaoTamanhoFonte2: {min: 4, max: 4, tamanhoFonte: 2},
        proporcaoTamanhoFonte3: {min: 5, max: 6, tamanhoFonte: 3},
        proporcaoTamanhoFonte4: {min: 7, max: 9, tamanhoFonte: 4},
        proporcaoTamanhoFonte6: {min: 10, max: Number.MAX_VALUE, tamanhoFonte: 6},
    }, // proporção 1.666666666666667
};
