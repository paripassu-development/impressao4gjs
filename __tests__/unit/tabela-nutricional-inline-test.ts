import "../../node_modules/@types/jest/index.d.ts";
import {validateModel} from "../../www/label/tabela-nutricional-inline";

describe("#validateModel()", () => {

    const NO_ERRORS = {
        "tipo": "tabelaNutricionalEmLinha",
        "fonte": {
            "nome": "Consolas",
            "alturaMm": 1.7,
            "forcaContorno": 0.55,
        },
        "posicao": {
            "xMm": 2.5,
            "yMm": 25,
        },
        "dimensoes": {
            "larguraMaximaMm": 45,
        },
        "informacoesAdicionais": {
            "texto": "(*) NÃO CONTEM UMA QUANTIDADE SIGNIFICATIVA DE GORDURAS TRANS, GORDURAS SATURADAS E GORDURAS TOTAIS. VALORES DIÁRIOS COM BASE EM UMA DIETA DE 2000KCAL OU 8400KJ. SEUS VALORES PODEM SER MAIORES OU MENORES DEPENDENDO DE SUAS NECESSIDADES ENERGÉTICAS. (**) VD NÃO ESTABELECIDO. NÃO CONTÉM GLÚTEN.",
            "caracteresPorLinha": 65,
        },
        "informacoesNutricionais": {
            "textoPorcaoCaseira": "{{{porcao}}}",
            "textoProporcaoCalorias": "{{{textoProporcaoCalorias}}}",
            "textoQuantidadePorPorcao": "QUANTIDADE POR PORÇÃO",
            "textoAbreviadoValorDiario": "%VD(*)",
            "textoInformacaoNutricional": "INFORMAÇÃO NUTRICIONAL",
            "informacoesNutrientesTabelaNutricional": {
                "sodio": {
                    "nome": "Sódio",
                    "qtPorcao": "{{{sodioQtPorcao}}} mg",
                    "valDiario": "{{{sodioValDiario}}} %",
                },
                "proteinas": {
                    "nome": "Proteínas",
                    "qtPorcao": "{{{proteinasQtPorcao}}} g",
                    "valDiario": "{{{proteinasValDiario}}} %",
                },
                "carboidratos": {
                    "nome": "Carboidratos",
                    "qtPorcao": "{{{carboidratosQtPorcao}}} g",
                    "valDiario": "{{{carboidratosValDiario}}} %",
                },
                "fibraAlimentar": {
                    "nome": "Fibra Alimentar",
                    "qtPorcao": "{{{fibraAlimentarQtPorcao}}} g",
                    "valDiario": "{{{fibraAlimentarValDiario}}} %",
                },
                "valorEnergetico": {
                    "nome": "Valor Energético",
                    "qtPorcao": "{{{valorEnergeticoQtPorcao}}} g",
                    "valDiario": "{{{valorEnergeticoValDiario}}} %",
                },
            },
        },
    };

    const ERRORS = {
        "tipo": "tabelaNutricionalEmLinha",
        "fonte": {
            "nome": "Consolas",
            "alturaMm": 1.7,
            "forcaContorno": 0.55,
        },
        "posicao": {
            "xMm": 2.5,
        },
        "dimensoes": {
            "larguraMaximaMm": 45,
        },
        "informacoesAdicionais": {
            "texto": "(*) NÃO CONTEM UMA QUANTIDADE SIGNIFICATIVA DE GORDURAS TRANS, GORDURAS SATURADAS E GORDURAS TOTAIS. VALORES DIÁRIOS COM BASE EM UMA DIETA DE 2000KCAL OU 8400KJ. SEUS VALORES PODEM SER MAIORES OU MENORES DEPENDENDO DE SUAS NECESSIDADES ENERGÉTICAS. (**) VD NÃO ESTABELECIDO. NÃO CONTÉM GLÚTEN.",
            "caracteresPorLinha": 65,
        },
        "informacoesNutricionais": {
            "textoPorcaoCaseira": "{{{porcao}}}",
            "textoProporcaoCalorias": "{{{textoProporcaoCalorias}}}",
            "textoQuantidadePorPorcao": "QUANTIDADE POR PORÇÃO",
            "textoAbreviadoValorDiario": "%VD(*)",
            "textoInformacaoNutricional": "INFORMAÇÃO NUTRICIONAL",
            "ocultarZerados": true,
            "informacoesNutrientesTabelaNutricional": {
                "valorEnergetico": {
                    "nome": "Valor Energético",
                    "qtPorcao": "{{{valorEnergeticoQtPorcao}}} g",
                },
            },
        },
    };

    it("errors.length = 0", () => {
        const errors = validateModel(NO_ERRORS);
        expect(errors.length).toEqual(0);
    });

    it("errors.length > 0", () => {
        const errors = validateModel(ERRORS);
        expect(errors.length).toEqual(4);
    });

});
