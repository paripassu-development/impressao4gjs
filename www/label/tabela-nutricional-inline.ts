import {
    IElementoTextoModelmultiplasLinhas,
    text
} from "./text";
import {setInformacoesPadraoZero} from "../core/util/tabela-nutricional-utils";
import {fillTemplate} from "../core/util/param-utils";
import {strokeAlignedText, TextAlign} from "../core/util/text-utils";

const _ = require("lodash");

interface IElementoTabelaNutricionalModelPosicao {
    xMm: number;
    yMm: number;
    rotacao: number;
}

interface IElementoTabelaNutricionalModelDimensoes {
    larguraMaximaMm: number;
}

interface IElementoTabelaNutricionalModelFonte {
    nome: string;
    alturaMm: number;
    negrito?: boolean;
    forcaContorno?: number;
}

interface IElementoTabelaNutricionalInformacoesAdicionais {
    texto: string;
}

interface IInformacoesNutrientesTabelaNutricional {
    [key: string]: IInformacoesNutriente;
}

interface IInformacoesNutriente {
    nome: string;
    qtPorcao: string;
    valDiario: string;
}

interface IElementoTabelaNutricionalModelInformacoesNutricionais {
    textoInformacaoNutricional: string;
    textoQuantidadePorPorcao: string;
    textoAbreviadoValorDiario: string;
    textoPorcaoCaseira: string;
    textoProporcaoCalorias: string;
    informacoesNutrientesTabelaNutricional: IInformacoesNutrientesTabelaNutricional;
}

interface IElementoTabelaNutricionalInlineModel {
    tipo: string;
    posicao: IElementoTabelaNutricionalModelPosicao;
    dimensoes: IElementoTabelaNutricionalModelDimensoes;
    fonte: IElementoTabelaNutricionalModelFonte;
    informacoesNutricionais: IElementoTabelaNutricionalModelInformacoesNutricionais;
    informacoesAdicionais: IElementoTabelaNutricionalInformacoesAdicionais;
    multiplasLinhas: IElementoTextoModelmultiplasLinhas;
    larguraMaximaMm: number;
}

const drawTable = (ctx: CanvasRenderingContext2D, dpi: number, model: IElementoTabelaNutricionalInlineModel, textBindings?: any) => {
    const elemento: any = mountTextElement(model.posicao, model, mountTextTabelaNutricional(model, textBindings));
    let degrees = model.posicao.rotacao || 0;
    ctx.save();
    ctx.rotate(degrees * Math.PI / 180);
    text.drawText(ctx, dpi, elemento, textBindings);
    ctx.restore();
};

function calculaKJ(valor: any) {
    if (valor) {
        valor = parseFloat(valor.replace(/[,]/g, "."));
    }
    return Math.round((valor * 4.2) || 0);
}

function setProporcaoKJValorEnergeticoPorcao(textBindings?: any) {
    const valorEnergeticoQtPorcao = _.get(textBindings, "valorEnergeticoQtPorcao");
    _.set(textBindings, "valorEnergeticoQtPorcaoKj", calculaKJ(valorEnergeticoQtPorcao));
}

function mountTextTabelaNutricional(model: IElementoTabelaNutricionalInlineModel, textBindings?: any) {
    setInformacoesPadraoZero(textBindings);
    setProporcaoKJValorEnergeticoPorcao(textBindings);
    const tabela = "INFORMAÇÃO NUTRICIONAL:";

    const informacoes: string[] = [];

    informacoes.push("PORÇÃO {{{porcao}}}");

    if (model.informacoesNutricionais.informacoesNutrientesTabelaNutricional) {
        const valorEnergeticoQtPorcao = _.get(textBindings, "valorEnergeticoQtPorcao");
        const valorEnergeticoValDiario = _.get(textBindings, "valorEnergeticoValDiario");
        if (!textBindings || (valorEnergeticoQtPorcao && valorEnergeticoValDiario)) {
            informacoes.push("Valor energético {{{valorEnergeticoQtPorcao}}}kcal = {{{valorEnergeticoQtPorcaoKj}}}kj ({{{valorEnergeticoValDiario}}} %VD)");
        }

        const carboidratosQtPorcao = _.get(textBindings, "carboidratosQtPorcao");
        const carboidratosValDiario = _.get(textBindings, "carboidratosValDiario");
        if (!textBindings || (carboidratosQtPorcao && carboidratosValDiario)) {
            informacoes.push("Carboidratos {{{carboidratosQtPorcao}}}g ({{{carboidratosValDiario}}} %VD)");
        }

        const proteinasQtPorcao = _.get(textBindings, "proteinasQtPorcao");
        const proteinasValDiario = _.get(textBindings, "proteinasValDiario");
        if (!textBindings || (proteinasQtPorcao && proteinasValDiario)) {
            informacoes.push(`Proteínas {{{proteinasQtPorcao}}}g ({{{proteinasValDiario}}} %VD)`);
        }

        const gordurasTotaisQtPorcao = _.get(textBindings, "gordurasTotaisQtPorcao");
        const gordurasTotaisValDiario = _.get(textBindings, "gordurasTotaisValDiario");
        if (!textBindings || (gordurasTotaisQtPorcao && gordurasTotaisValDiario)) {
            informacoes.push(`Gorduras totais {{{gordurasTotaisQtPorcao}}}g ({{{gordurasTotaisValDiario}}} %VD)`);
        }

        const gorduraSaturadaQtPorcao = _.get(textBindings, "gorduraSaturadaQtPorcao");
        const gorduraSaturadaValDiario = _.get(textBindings, "gorduraSaturadaValDiario");
        if (!textBindings || (gorduraSaturadaQtPorcao && gorduraSaturadaValDiario)) {
            informacoes.push(`Gorduras saturadas {{{gorduraSaturadaQtPorcao}}}g ({{{gorduraSaturadaValDiario}}} %VD)`);
        }

        const gorduraTransQtPorcao = _.get(textBindings, "gorduraTransQtPorcao");
        if (!textBindings || gorduraTransQtPorcao) {
            informacoes.push(`Gorduras trans {{{gorduraTransQtPorcao}}}g (VD não estabelecido)`);
        }

        const fibraAlimentarQtPorcao = _.get(textBindings, "fibraAlimentarQtPorcao");
        const fibraAlimentarValDiario = _.get(textBindings, "fibraAlimentarValDiario");
        if (!textBindings || (fibraAlimentarQtPorcao && fibraAlimentarValDiario)) {
            informacoes.push(`Fibra alimentar {{{fibraAlimentarQtPorcao}}}g ({{{fibraAlimentarValDiario}}} %VD)`);
        }

        const sodioQtPorcao = _.get(textBindings, "sodioQtPorcao");
        const sodioValDiario = _.get(textBindings, "sodioValDiario");
        if (!textBindings || (sodioQtPorcao && sodioValDiario)) {
            informacoes.push(`Sódio {{{sodioQtPorcao}}}mg ({{{sodioValDiario}}} %VD)`);
        }
    } else {
        textBindings.parametrosPadroes.forEach((parametro: any) => {
            if (parametro.rotulo === "Valor Energético") {
                informacoes.push("Valor energético {{{valorEnergeticoQtPorcao}}}kcal = {{{valorEnergeticoQtPorcaoKj}}}kj ({{{valorEnergeticoValDiario}}} %VD)");
            } else if (parametro.rotulo === "Gorduras trans") {
                informacoes.push(`Gorduras trans {{{gorduraTransQtPorcao}}}g (VD não estabelecido)`);
            } else {
                informacoes.push(parametro.rotulo + ` ` + parametro.qtPorcao.trim() + ` ` + `(` + parametro.valorDiario + `VD)`);
            }
        });
        textBindings.parametrosExtras.forEach((parametro: any) => {
            informacoes.push(parametro.rotulo + ` ` + parametro.qtPorcao.trim() + ` ` + `(` + parametro.valorDiario + `VD)`);
        });
    }

    let informacoesAdicionais = "*% Valores diários com base em uma dieta de 2.000 kcal ou 8.400 kJ. Seus valores diários podem ser maiores ou menores dependendo de suas necessidades energéticas.";

    if (_.get(model, "informacoesAdicionais.texto")) {
        informacoesAdicionais = model.informacoesAdicionais.texto;
    }

    return fillTemplate(tabela + " " + informacoes.join("; ") + ". " + informacoesAdicionais, textBindings);
}

function mountTextElement(posicao: IElementoTabelaNutricionalModelPosicao, model: IElementoTabelaNutricionalInlineModel, texto: string) {
    return {
        "tipo": "texto",
        "posicao": {
            "xMm": posicao.xMm,
            "yMm": posicao.yMm,
        },
        "dimensoes": {
            "larguraMaximaMm": model.dimensoes.larguraMaximaMm,
        },
        "multiplasLinhas": model.multiplasLinhas,
        "fonte": model.fonte,
        "valor": texto,
    };
}

export const tabelaNutricionalInline = {drawTable};
