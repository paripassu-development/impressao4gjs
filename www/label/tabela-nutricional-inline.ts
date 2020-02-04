import {fillTemplate} from "../core/util/param-utils";
import {setInformacoesPadraoZero} from "../core/util/tabela-nutricional-utils";
import {ValidateModelUtils} from "../core/util/validate-model-utils";
import {
    IElementoTextoModelmultiplasLinhas,
    text,
} from "./text";
import {PARAMETROS_PADROES_NUTRICIONAL} from "../default";
import {fabric} from "fabric";

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
    parametrosPadroes: [object];
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

const drawTable = (ctx: CanvasRenderingContext2D, fabricCanvas: fabric.Canvas, dpi: number, model: IElementoTabelaNutricionalInlineModel, textBindings?: any) => {
    const elemento: any = mountTextElement(model.posicao, model, mountTextTabelaNutricional(model, textBindings));
    const degrees = model.posicao.rotacao || 0;
    ctx.save();
    ctx.rotate(degrees * Math.PI / 180);
    text.drawText(ctx, fabricCanvas, dpi, elemento, textBindings);
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

    let parametros;
    if (model.informacoesNutricionais !== undefined && model.informacoesNutricionais.informacoesNutrientesTabelaNutricional !== undefined) {
        const valorEnergeticoQtPorcao = _.get(textBindings, "valorEnergeticoQtPorcao");
        const valorEnergeticoValDiario = _.get(textBindings, "valorEnergeticoValDiario");
        if (!textBindings || (valorEnergeticoQtPorcao && valorEnergeticoValDiario)) {
            const valorEnergeticoNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico, "nome", "Valor energético");
            informacoes.push(valorEnergeticoNome + " {{{valorEnergeticoQtPorcao}}}kcal = {{{valorEnergeticoQtPorcaoKj}}}kj ({{{valorEnergeticoValDiario}}} %VD)");
        }

        const carboidratosQtPorcao = _.get(textBindings, "carboidratosQtPorcao");
        const carboidratosValDiario = _.get(textBindings, "carboidratosValDiario");
        if (!textBindings || (carboidratosQtPorcao && carboidratosValDiario)) {
            const carboidratosNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos, "nome", "Carboidratos");
            informacoes.push(carboidratosNome + " {{{carboidratosQtPorcao}}}g ({{{carboidratosValDiario}}} %VD)");
        }

        const proteinasQtPorcao = _.get(textBindings, "proteinasQtPorcao");
        const proteinasValDiario = _.get(textBindings, "proteinasValDiario");
        if (!textBindings || (proteinasQtPorcao && proteinasValDiario)) {
            const proteinasNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas, "nome", "Proteinas");
            informacoes.push(proteinasNome + ` {{{proteinasQtPorcao}}}g ({{{proteinasValDiario}}} %VD)`);
        }

        const gordurasTotaisQtPorcao = _.get(textBindings, "gordurasTotaisQtPorcao");
        const gordurasTotaisValDiario = _.get(textBindings, "gordurasTotaisValDiario");
        if (!textBindings || (gordurasTotaisQtPorcao && gordurasTotaisValDiario)) {
            const gordurasTotaisNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais, "nome", "Gorduras totais");
            informacoes.push(gordurasTotaisNome + ` {{{gordurasTotaisQtPorcao}}}g ({{{gordurasTotaisValDiario}}} %VD)`);
        }

        const gorduraSaturadaQtPorcao = _.get(textBindings, "gorduraSaturadaQtPorcao");
        const gorduraSaturadaValDiario = _.get(textBindings, "gorduraSaturadaValDiario");
        if (!textBindings || (gorduraSaturadaQtPorcao && gorduraSaturadaValDiario)) {
            const gordurasSaturadasNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada, "nome", "Gorduras saturadas");
            informacoes.push(gordurasSaturadasNome + ` {{{gorduraSaturadaQtPorcao}}}g ({{{gorduraSaturadaValDiario}}} %VD)`);
        }

        const gorduraTransQtPorcao = _.get(textBindings, "gorduraTransQtPorcao");
        if (!textBindings || gorduraTransQtPorcao) {
            const gordurasTransNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans, "nome", "Gorduras trans");
            informacoes.push(gordurasTransNome + ` {{{gorduraTransQtPorcao}}}g (VD não estabelecido)`);
        }

        const fibraAlimentarQtPorcao = _.get(textBindings, "fibraAlimentarQtPorcao");
        const fibraAlimentarValDiario = _.get(textBindings, "fibraAlimentarValDiario");
        if (!textBindings || (fibraAlimentarQtPorcao && fibraAlimentarValDiario)) {
            const fibraAlimentarNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar, "nome", "Fibra alimentar");
            informacoes.push(fibraAlimentarNome + ` {{{fibraAlimentarQtPorcao}}}g ({{{fibraAlimentarValDiario}}} %VD)`);
        }

        const sodioQtPorcao = _.get(textBindings, "sodioQtPorcao");
        const sodioValDiario = _.get(textBindings, "sodioValDiario");
        if (!textBindings || (sodioQtPorcao && sodioValDiario)) {
            const sodioNome = _.get(model.informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio, "nome", "Sódio");
            informacoes.push(sodioNome + ` {{{sodioQtPorcao}}}mg ({{{sodioValDiario}}} %VD)`);
        }
    } else {
        const parametrosPadroes = !!textBindings ? textBindings.parametrosPadroes :  PARAMETROS_PADROES_NUTRICIONAL;
        parametrosPadroes.forEach((parametro: any) => {
            const matchArray: any[] = parametro.qtPorcao.match(/[0-9]/mg, "");
            if (parametro.rotulo === "Gorduras trans") {
                informacoes.push(parametro.rotulo + ` ` + parametro.qtPorcao.replace(/ +/g, "")  + ` (VD não estabelecido)`);
            } else {
                informacoes.push(parametro.rotulo + ` ` + parametro.qtPorcao.replace(/ +/g, "") + ` ` + `(` + parametro.valorDiario + `VD)`);
            }
        });
        if (!!textBindings) {
            textBindings.parametrosExtras.forEach((parametro: any) => {
                informacoes.push(parametro.rotulo + ` ` + parametro.qtPorcao.replace(/ +/g, "") + ` ` + `(` + parametro.valorDiario + `VD)`);
            });
        }
    }

    let informacoesAdicionais = "% Valores diários com base em uma dieta de 2.000 kcal ou 8.400 kJ. Seus valores diários podem ser maiores ou menores dependendo de suas necessidades energéticas.";
    if (_.get(model, "informacoesAdicionais.texto")) {
        informacoesAdicionais = model.informacoesAdicionais.texto;
    }

    return fillTemplate(tabela + " " + (parametros != null ? parametros : informacoes.join("; ")) + ". " + informacoesAdicionais, textBindings);
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
