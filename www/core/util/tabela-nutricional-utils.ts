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

type PosicoesCentralizadasTabelaNutricional = {
    [key: string]: number;
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
    "6"?: number;
    "7": number;
};

export const calcularPosicaoCentralizadaTextoQuantidadePorcao = (larguraMaxima: number, textoPorcao: string): number => {
    const lenghtTextoPorcao = textoPorcao.length.toString();
    console.log(lenghtTextoPorcao)
    const valoresPosicoes: PosicoesCentralizadasTabelaNutricional = {
        "1": 1.3,
        "2": 1.9,
        "3": 1.2,
        "4": 0.45,
        "5": - 0.2,
        "6": - 0.87,
        "7": - 1.35
    }

    return valoresPosicoes[lenghtTextoPorcao] ? larguraMaxima - valoresPosicoes[lenghtTextoPorcao] : larguraMaxima
}

export const calcularPosicaoCentralizadaTabelaNutricional = (chave: string, posicaoXg: number, parametroQt: number): number => {
    const parametroQtString = parametroQt.toString();

    const tamanhoParametroQt = parametroQtString.length;
   
    const valorAlinhamento: PosicoesCentralizadasTabelaNutricional = objetoPosicoesCentralizadasTabelaNutricional(chave, parametroQtString)

    return valorAlinhamento[tamanhoParametroQt.toString()] ? posicaoXg - valorAlinhamento[tamanhoParametroQt.toString()] : posicaoXg;
}

const objetoPosicoesCentralizadasTabelaNutricional = (chave: string, parametroQt: string) : PosicoesCentralizadasTabelaNutricional => {
    if (chave === 'qt100') {
         return {
            "1": + 3.1,
            "2": + 2.4,
            "3": + temPontoDecimal(parametroQt) ? 2.1 : 1.8,
            "4": + 1.05,
            "5": + 0.75,
            "7": - 0.7
        };
    }
    
    if (chave === 'qtPorcao') {
        return {
            "1": + 2.7,
            "2": + 2.05,
            "3": + temPontoDecimal(parametroQt) ? 1.8 : 1.35,
            "4": + 0.7,
            "5": + 0.27,
            "6": - 0.4,
            "7": - 1.10
        };
    }

    if (chave === 'valorDiario') {
        return {
            "1": + 2.5,
            "2": + 1.9,
            "3": + temPontoDecimal(parametroQt) ? 1.5 : 1.15,
            "4": + 0.4,
            "5": + 0.1,
            "6": - 0.6,
            "7": - 1.3
        };
    }
}

function temPontoDecimal(numeroString: string): boolean {
    const pontoIndex = numeroString.indexOf('.');
    return pontoIndex !== -1;
}
