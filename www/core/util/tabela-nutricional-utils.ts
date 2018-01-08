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

export function setInformacoesPadraoZero(textBindings ?: any) {
    if (textBindings) {
        informacoesPadraoZero.forEach((nomeInfo: string) => {
            if (textBindings[nomeInfo] === undefined) {
                textBindings[nomeInfo] = "0";
            }
        });
    }
}
