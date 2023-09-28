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

export const calcularPosicaoCentralizadaTabelaNutricional = (chave: string, posicaoXg: number, parametroQt: number): number => {
    const parametroQtString = parametroQt.toString();

    const tamanhoParametroQt = parametroQtString.length;
   
    const valorAlinhamento: PosicoesCentralizadasTabelaNutricional = objetoPosicoesCentralizadasTabelaNutricional(chave, parametroQtString)

    return valorAlinhamento[tamanhoParametroQt.toString()] ? posicaoXg - valorAlinhamento[tamanhoParametroQt.toString()] : posicaoXg;
}

const objetoPosicoesCentralizadasTabelaNutricional = (chave: string, parametroQt: string) : PosicoesCentralizadasTabelaNutricional => {
    if (chave === 'qt100') {
         return {
            "1": + 3.4,
            "2": + 2.6,
            "3": + temPontoDecimal(parametroQt) ? 2.3 : 1.9,
            "4": + 1.3,
            "5": + 1,
            "7": - 0.7
        };
    }
    
    if (chave === 'qtPorcao') {
        return {
            "1": + 3,
            "2": + 2.2,
            "3": + temPontoDecimal(parametroQt) ? 1.9 : 1.5,
            "4": + 0.7,
            "5": + 0.4,
            "6": - 0.4,
            "7": - 1.10
        };
    }

    if (chave === 'valorDiario') {
        return {
            "1": + 2.6,
            "2": + 2,
            "3": + temPontoDecimal(parametroQt) ? 1.6 : 1.2,
            "4": + 0.5,
            "5": + 0.2,
            "6": - 0.6,
            "7": - 1.3
        };
    }
}

function temPontoDecimal(numeroString: string): boolean {
    const pontoIndex = numeroString.indexOf('.');
    return pontoIndex !== -1;
}
