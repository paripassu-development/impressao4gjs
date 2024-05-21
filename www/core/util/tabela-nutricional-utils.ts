import {
    ABRE_PARENTESES,
    APENAS_G,
    APENAS_MG,
    ESPACO_E,
    FECHA_PARENTESES,
    G,
    KCAL,
    L,
    MG,
    ML,
    NAO_CONTEM_QUANTIDADES_SIGNIFICATIVAS_DE,
    PONTO_FINAL, REGEX_APENAS_NUMEROS,
    REGEX_REMOVE_NUMEROS,
    REGEX_ULTIMA_VIRGULA,
    STRING_VAZIA, VALOR_PORCAO_100,
    VIRGULA,
    VIRGULA_ESPACO,
} from "../../default";
import {text} from "../../label/text";

const informacoesPadraoZero = [
    "valorEnergeticoQtPorcao",
    "valorEnergeticoValDiario",
    "sodioQtPorcao",
    "sodioValDiario",
    "proteinasQtPorcao",
    "proteinasValDiario",
    "gordurasTotaisQtPorcao",
    "gordurasTotaisValDiario",
    "gorduraTransQtPorcao",
    "gorduraTransValDiario",
    "gorduraSaturadaQtPorcao",
    "gorduraSaturadaValDiario",
    "fibraAlimentarQtPorcao",
    "fibraAlimentarValDiario",
    "carboidratosQtPorcao",
    "carboidratosValDiario",
];

const informacoesV2PadraoZero = [
    "valorEnergeticoQtPorcao",
    "valorEnergeticoQt100",
    "valorEnergeticoValDiario",
    "sodioQtPorcao",
    "sodioQt100",
    "sodioValDiario",
    "acucaresTotaisQtPorcao",
    "acucaresTotaisQt100",
    "acucaresTotaisValDiario",
    "acucaresAdicionadosQtPorcao",
    "acucaresAdicionadosQt100",
    "acucaresAdicionadosValDiario",
    "proteinasQtPorcao",
    "proteinasQt100",
    "proteinasValDiario",
    "gordurasTotaisQtPorcao",
    "gordurasTotaisQt100",
    "gordurasTotaisValDiario",
    "gorduraTransQtPorcao",
    "gorduraTransQt100",
    "gorduraTransValDiario",
    "gorduraSaturadaQtPorcao",
    "gorduraSaturadaQt100",
    "gorduraSaturadaValDiario",
    "fibraAlimentarQtPorcao",
    "fibraAlimentarQt100",
    "fibraAlimentarValDiario",
    "carboidratosQtPorcao",
    "carboidratosQt100",
    "carboidratosValDiario",
];

export function setInformacoesPadraoZero(textBindings ?: any) {
    if (textBindings) {
        informacoesPadraoZero.forEach((nomeInfo: string) => {
            if (textBindings[nomeInfo] === undefined) {
                textBindings[nomeInfo] = "0";
            }
        });
    }
}

export function setInformacoesV2PadraoZero(textBindings ?: any) {
    if (textBindings) {
        informacoesV2PadraoZero.forEach((nomeInfo: string) => {
            if (textBindings[nomeInfo] === undefined) {
                textBindings[nomeInfo] = "0";
            }
        });
    }
}

export function alimentoProntoParaConsumo(textBindings: any) {
    if (!textBindings) { return false; }
    return textBindings.alimentoProntoParaConsumo ? textBindings.alimentoProntoParaConsumo : false;
}

/* -- TODO ----------------------------------------------------------------------------------------------------
- Para realizar a centralização dos valores na tabela:
     Foi necessário mapear as posições conforme o length do valor a ser inserido, devido a forma que a tabela foi construida.
- Como as linhas verticais são apenas sobreposições das linhas horizontais as mesmas não formam retângulos reais,
    não sendo possível centralizar de forma dinâmica.
*/

// Manter chaves e valores com o mesmo nome
export const tipoTabela = {
    v2Normal: "v2Normal",
    v2Reduzida: "v2Reduzida",
};

export const colunas = {
    qt100: "qt100",
    qtPorcao: "qtPorcao",
    valorDiario: "valorDiario",
};

type TipoTabelaNutricional = keyof typeof tipoTabela;

type ColunaNutricional = keyof typeof colunas;

// tslint:disable-next-line:interface-name
interface PosicoesCentralizadasTabelaNutricional {
    [key: string]: number;
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
    "6"?: number;
    "7"?: number;
}

// Função que centraliza apenas o textoQuantidadePorPorcao tabela nutricional normal e reduzida
export const calcularPosicaoCentralizadaTextoQuantidadePorcao = (parametroTipoTabela: TipoTabelaNutricional, larguraMaxima: number, textoPorcao: string): number => {
    const lenghtTextoPorcao = textoPorcao.length.toString();

    const valoresPosicoes: PosicoesCentralizadasTabelaNutricional = posicoesCentralizadasTextoQuantidadePorcao(parametroTipoTabela);

    return valoresPosicoes[lenghtTextoPorcao] ? larguraMaxima - valoresPosicoes[lenghtTextoPorcao] : larguraMaxima;
};

const posicoesCentralizadasTextoQuantidadePorcao = (parametroTipoTabela: TipoTabelaNutricional): PosicoesCentralizadasTabelaNutricional => {
    if (parametroTipoTabela === tipoTabela.v2Reduzida) {
        return {
            "1": 1.3,
            "2": 1.3,
            "3": 0.4,
            "4": - 0.2,
            "5": - 0.8,
            "6": - 1.38,
            "7": - 2,
        };
    }

    return {
        "1": 2.7,
        "2": 2.05,
        "3": 1.6,
        "4": 0.9,
        "5": + 0.2,
        "6": - 0.47,
        "7": - 1.3,
    };
};

export const calcularPosicaoCentralizadaTabelaNutricional = (parametroTipoTabela: TipoTabelaNutricional, coluna: ColunaNutricional, posicaoXg: number, parametroQt: number): number => {
    const parametroQtString = parametroQt.toString();

    const tamanhoParametroQt = parametroQtString.length;

    const valorAlinhamento: PosicoesCentralizadasTabelaNutricional =
        parametroTipoTabela === tipoTabela.v2Reduzida ?
            valoresPosicoesCentralizadasTabelaNutricionalReduzida(coluna, parametroQtString)
            : valoresPosicoesCentralizadasTabelaNutricional(coluna, parametroQtString);

    return valorAlinhamento[tamanhoParametroQt.toString()] ? posicaoXg - valorAlinhamento[tamanhoParametroQt.toString()] : posicaoXg;
};

// Positivo posiciona os valores para esquerda - Negativo para direita

const valoresPosicoesCentralizadasTabelaNutricional = (coluna: ColunaNutricional, parametroQt: string): PosicoesCentralizadasTabelaNutricional => {
    if (coluna === colunas.qt100) {
        return {
            "1": + 3.1,
            "2": + 2.4,
            "3": + temPontoDecimal(parametroQt) ? 2.1 : 1.8,
            "4": + 1.05,
            "5": + 0.75,
            "7": - 0.7,
        };
    }

    if (coluna === colunas.qtPorcao) {
        return {
            "1": + 2.7,
            "2": + 2.05,
            "3": + temPontoDecimal(parametroQt) ? 1.8 : 1.35,
            "4": + 0.7,
            "5": + 0.27,
            "6": - 0.4,
            "7": - 1.10,
        };
    }

    if (coluna === colunas.valorDiario) {
        return {
            "1": + 2.5,
            "2": + 1.9,
            "3": + temPontoDecimal(parametroQt) ? 1.5 : 1.15,
            "4": + 0.4,
            "5": + 0.1,
            "6": - 0.6,
            "7": - 1.3,
        };
    }
};

const valoresPosicoesCentralizadasTabelaNutricionalReduzida = (coluna: ColunaNutricional, parametroQt: string): PosicoesCentralizadasTabelaNutricional => {
    if (coluna === colunas.qt100) {
        return {
            "1": + 2.3,
            "2": + 1.7,
            "3": + temPontoDecimal(parametroQt) ? 1.4 : 1.1,
            "4": + 0.5,
            "5": + 0.22,
            "6": - 0.4,
            "7": - 1,
        };
    }

    if (coluna === colunas.qtPorcao) {
        return {
            "1": + 1.25,
            "2": + 0.7,
            "3": + temPontoDecimal(parametroQt) ? 0.46 : 0.2,
            "4": - 0.45,
            "5": - 0.7,
            "6": - 1.34,
            "7": - 1.9,
        };
    }

    if (coluna === colunas.valorDiario) {
        return {
            "1": + 1.6,
            "2": + 1,
            "3": + temPontoDecimal(parametroQt) ? 0.8 : 0.48,
            "4": - 0.2,
            "5": - 0.5,
            "6": - 1.1,
            "7": - 1.7,
        };
    }
};

function temPontoDecimal(numeroString: string): boolean {
    const pontoIndex = numeroString.indexOf(".");
    return pontoIndex !== -1;
}
// ---------------------------------- Fim Centralização -------------------------------------------------------

export const nutrienteZerado = (nutriente: any) => {
    return !!(
        (
            nutriente.valorDiario === "0" &&
            nutriente.qt100 === "0" &&
            nutriente.qtPorcao === "0"
        )
        || (
            nutriente.valorDiario.trim().length === 0 &&
            nutriente.qt100.trim().length === 0 &&
            nutriente.qtPorcao.trim().length === 0
        )
    );
};

export const removeUnidadeRotulos = (rotulo: any) => {
    return rotulo
        .replace(KCAL, STRING_VAZIA)
        .replace(G, STRING_VAZIA)
        .replace(MG, STRING_VAZIA)
        .replace(L, STRING_VAZIA)
        .replace(ML, STRING_VAZIA)
        .trimStart()
        .trimEnd();
};

export const extraiNutrientesVazios = (nutrientes: any) => {
    return nutrientes.filter(nutrienteZerado).map((nutriente: any) => removeUnidadeRotulos(nutriente.rotulo));
};

export const montaTextoNaoContemQuantidadesSignificativasDe = (nutrientes: any) => {
    return NAO_CONTEM_QUANTIDADES_SIGNIFICATIVAS_DE
        + nutrientes
            .toString()
            .replaceAll(VIRGULA, VIRGULA_ESPACO)
            .replace(REGEX_ULTIMA_VIRGULA, ESPACO_E)
        + PONTO_FINAL;
};

export const extraiPorcao = (textoPorcao: string) => {
    return textoPorcao.replace(REGEX_REMOVE_NUMEROS, STRING_VAZIA);
};

export const montaRotuloDinamicoUnidadePorcaoTabelaVertical = (rotulo: string, unidadePorcao: string) => {
    return rotulo.replace(
        G,
        `${ABRE_PARENTESES}${extraiPorcao(unidadePorcao)}${FECHA_PARENTESES}`,
    );
};

export const montaRotuloDinamicoUnidadePorcaoTabelaLinear = (unidade: string, unidadePorcao: string) => {
    if (unidade === APENAS_MG) { return unidade; }
    return unidade.replace(
        APENAS_G, unidadePorcao.replace(REGEX_REMOVE_NUMEROS, STRING_VAZIA),
    );
};

export const contemTodasRegrasTabelaSimplificada = async (porcao: string, configuracao: any) => {
    if (!configuracao.tabelaSimplificada || configuracao.tabelaSimplificada === false) { return false; }
    const apenasValorPorcao = porcao.replace(REGEX_APENAS_NUMEROS, STRING_VAZIA);
    return (apenasValorPorcao === VALOR_PORCAO_100);
};
