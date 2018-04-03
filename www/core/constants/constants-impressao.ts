import { Enum } from "typescript-string-enums";

export const barraOrigemRastreadaConstants = {
    LARGURA_BARRA: 776,
    ALTURA_BARRA: 32,
};

export const ErrosPrefix = {
    ERROR_CODIGO_BARRAS:  "[Código de barras]",
    ERROR_OBRIGATORIEDADE:  "[Campo obrigatório]",
};


export const TipoError = Enum({
    GS1: "gs1",
    OBRIGATORIO: "obrigatorio"
});

export type TipoError = Enum<typeof TipoError>;

