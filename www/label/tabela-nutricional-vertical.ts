import {fabric} from "fabric";
import {
    calculaTamanhoFonteByAlturaMMEFontePadraoPT,
    converterPTparaMM,
    converterPtParaPX,
} from "../core/util/conversor-utils";
import {fillTemplate, getOrDefault} from "../core/util/param-utils";
import {setInformacoesV2PadraoZero} from "../core/util/tabela-nutricional-utils";
import {
    splitLines,
    strokeAlignedText,
    TextAlign,
    writeFabricText,
} from "../core/util/text-utils";
import {
    BLACK,
    ESPACAMENTO_CONTORNO_TABELA_EM_PT,
    EXPESSURA_LINHA_GROSSA_EM_PT,
    PARAMETROS_PADROES_NUTRICIONAL_V2, TAMANHO_FONTE_INFORMACOES_ADICIONAIS_EM_PT,
    TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT,
    TAMANHO_FONTE_PADRAO_TITULO_EM_PT, TAMANHO_LINHA_PADRAO_TABELA_VERTICAL_EM_PT,
} from "../default";
import {mmPartial} from "./mm";

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

interface IInformacoesNutriente {
    nome: string;
    qtPorcao: string;
    qt100: string;
    valDiario: string;
}

interface IInformacoesNutrientesTabelaNutricional {
    [key: string]: IInformacoesNutriente;
}

// TODO: alterar interface para suportar o ** além de * na tabela Reduzida também
interface IElementoTabelaNutricionalInformacoesAdicionais {
    texto: string;
    caracteresPorLinha: number;
}

interface IElementoTabelaNutricionalModelInformacoesNutricionais {
    textoInformacaoNutricional: string;
    textoQuantidadePorPorcao: string;
    porcaoNutricionalV2: string;
    textoQuantidadeEmbalagem: string;
    textoPorcaoCaseira: string;
    textoQt100: string;
    textoAbreviadoValorDiario: string;
    textoProporcaoCalorias: string;
    informacoesNutrientesTabelaNutricional: IInformacoesNutrientesTabelaNutricional;
    ocultarZerados: boolean;
    parametrosPadroesNutricionalV2: [any];
}

interface IElementoTabelaNutricionalOpcoes {
    ocultarLinhas?: boolean;
}

const nutrientes = [
    "valorEnergetico",
    "carboidratos",
    "acucaresTotais",
    "acucaresAdicionados",
    "proteinas",
    "gordurasTotais",
    "gorduraSaturada",
    "gorduraTrans",
    "fibraAlimentar",
    "sodio",
];

interface IElementoTabelaNutricionalModel {
    tipo: string;
    posicao: IElementoTabelaNutricionalModelPosicao;
    dimensoes: IElementoTabelaNutricionalModelDimensoes;
    fonte: IElementoTabelaNutricionalModelFonte;
    informacoesNutricionais: IElementoTabelaNutricionalModelInformacoesNutricionais;
    informacoesAdicionais: IElementoTabelaNutricionalInformacoesAdicionais;
    opcoes?: IElementoTabelaNutricionalOpcoes;
}

const drawTable = (ctx: CanvasRenderingContext2D, fabricCanvas: fabric.Canvas, dpi: number, model: IElementoTabelaNutricionalModel, textBindings?: any) => {
    setInformacoesV2PadraoZero(textBindings);
    const mm = mmPartial(dpi);
    ctx.save();
    const degrees = model.posicao.rotacao || 0;
    ctx.rotate(degrees * Math.PI / 180);
    ctx.fillStyle = BLACK;
    ctx.strokeStyle = BLACK;
    ctx.lineWidth = model.fonte.forcaContorno || 0;
    const larguraMaxima = model.dimensoes.larguraMaximaMm;
    let yMm = model.posicao.yMm;
    // Por que 1.2?
    const alturaLinhaMm = model.fonte.alturaMm * 1.2;
    // 3?
    const lineStrokeGap = alturaLinhaMm / 3;

    // tslint:disable-next-line:no-console
    console.log(model);

    // Contorno de cima
    desenharLinhaContornoHorizontal(ctx, model, yMm, mm);
    yMm += lineStrokeGap;
    yMm += alturaLinhaMm;

    // Configurando fonte do Titulo
    ctx.font = `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_PADRAO_TITULO_EM_PT)}mm ${model.fonte.nome}`;

    // Titulo INFORMAÇÕES NUTRICIONAIS ---------------------------------------------------------------------------------
    strokeAlignedText(
        ctx,
        fabricCanvas,
        larguraMaxima,
        getOrDefault(model.informacoesNutricionais, "textoInformacaoNutricional"),
        model.posicao.xMm,
        yMm,
        mm,
        TextAlign.CENTER,
        degrees,
    );

    // Linha normal ----------------------------------------------------------------------------------------------------
    yMm += lineStrokeGap;
    desenharLinha(ctx, model, yMm, mm);
    yMm += alturaLinhaMm;

    // Configurando fonte de Informações e labels nutricionais
    ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;

    // -----------------------------------------------------------------------------------------------------------------
    // Porções por embalagem:
    strokeAlignedText(
        ctx,
        fabricCanvas,
        larguraMaxima,
        ("Porções por embalagem: " + fillTemplate(model.informacoesNutricionais.textoQuantidadeEmbalagem, textBindings)),
        model.posicao.xMm,
        yMm,
        mm,
        TextAlign.LEFT,
        degrees,
    );

    yMm += lineStrokeGap;
    yMm += alturaLinhaMm;

    // Porção: ()
    strokeAlignedText(
        ctx,
        fabricCanvas,
        larguraMaxima,
        ("Porção: " + fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, textBindings)
            + "(" + fillTemplate(model.informacoesNutricionais.textoPorcaoCaseira, textBindings)) + ")",
        model.posicao.xMm,
        yMm,
        mm,
        TextAlign.LEFT,
        degrees,
    );

    // Linha grossa ----------------------------------------------------------------------------------------------------
    yMm += lineStrokeGap;
    desenharLinhaGrossa(ctx, model, yMm, mm);
    // Espaço maior pós linha grossa
    yMm += (2 * alturaLinhaMm);
    // yMm += alturaLinhaMm;

    // -----------------------------------------------------------------------------------------------------------------
    // 100 g 000 g e %VD*
    ctx.font = `bold ${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;

    ctx.textAlign = TextAlign.RIGHT;
    const textoValorDiario = getOrDefault(model.informacoesNutricionais, "textoAbreviadoValorDiario");
    const porcao = fillTemplate(model.informacoesNutricionais.textoQuantidadePorPorcao, textBindings);
    // TODO: Concatenar com * quando for alimento pronto para consumo
    const porcao100g = getOrDefault(model.informacoesNutricionais, "textoQt100");

    if (!!fabricCanvas) {
        writeFabricText(fabricCanvas, ctx, porcao100g, model.posicao.xMm  - (alturaLinhaMm * 7),
            yMm, larguraMaxima, mm, {degrees});

        writeFabricText(fabricCanvas, ctx, porcao, model.posicao.xMm - (alturaLinhaMm * 3.5),
            yMm, larguraMaxima, mm, {degrees});

        writeFabricText(fabricCanvas, ctx, textoValorDiario, model.posicao.xMm - (alturaLinhaMm / 2),
            yMm, larguraMaxima, mm, {degrees});
    } else {
        strokeAlignedText(ctx, fabricCanvas, larguraMaxima, porcao100g, model.posicao.xMm - (alturaLinhaMm * 7),
            yMm, mm, TextAlign.RIGHT, degrees);
        strokeAlignedText(ctx, fabricCanvas, larguraMaxima, porcao, model.posicao.xMm - (alturaLinhaMm * 3.5),
            yMm, mm, TextAlign.RIGHT, degrees);
        strokeAlignedText(ctx, fabricCanvas, larguraMaxima, textoValorDiario, model.posicao.xMm - (alturaLinhaMm / 2),
            yMm, mm, TextAlign.RIGHT, degrees);
    }

    ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_PADRAO_INFORMACOES_EM_PT)}mm ${model.fonte.nome}`;
    yMm += lineStrokeGap;
    desenharLinha(ctx, model, yMm, mm);
    // -----------------------------------------------------------------------------------------------------------------

    // Informações nutricionais
    if (model.informacoesNutricionais !== undefined && model.informacoesNutricionais.informacoesNutrientesTabelaNutricional !== undefined) {
        nutrientes.forEach((nutriente: any) => {
            const informacoesNutriente = model.informacoesNutricionais.informacoesNutrientesTabelaNutricional[nutriente];
            if (informacoesNutriente !== undefined) {
                yMm += alturaLinhaMm;
                ctx.textAlign = TextAlign.LEFT;

                const nomeNutriente = getOrDefault(informacoesNutriente, "nome");
                if (!!fabricCanvas) {
                    writeFabricText(fabricCanvas, ctx, nomeNutriente, model.posicao.xMm, yMm, larguraMaxima, mm, {degrees});
                } else {
                    ctx.strokeText(nomeNutriente, mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                }
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, fillTemplate(informacoesNutriente.qt100, textBindings),
                    model.posicao.xMm - (alturaLinhaMm * 7), yMm, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, fillTemplate(informacoesNutriente.qtPorcao, textBindings),
                    model.posicao.xMm - (alturaLinhaMm * 3.5), yMm, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, fillTemplate(informacoesNutriente.valDiario, textBindings),
                    model.posicao.xMm - alturaLinhaMm / 2, yMm, mm, TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                desenharLinha(ctx, model, yMm, mm);
                // -----------------------------------------------------------------------------------------------------
            }
        });
    } else {
        const parametrosPadroesNutricionalV2 = !!textBindings ? textBindings.parametrosPadroesNutricionalV2 : PARAMETROS_PADROES_NUTRICIONAL_V2;
        parametrosPadroesNutricionalV2.forEach((parametro: any) => {
            const matchArray: any[] = parametro.qtPorcao.match(/[0-9]/mg, "");
            if (!model.informacoesNutricionais.ocultarZerados || !matchArray.every((elemento: any) => elemento === "0")) {
                yMm += alturaLinhaMm;
                ctx.textAlign = TextAlign.LEFT;
                if (!!fabricCanvas) {
                    writeFabricText(fabricCanvas, ctx, parametro.rotulo, model.posicao.xMm, yMm, larguraMaxima, mm, {degrees});
                } else {
                    ctx.strokeText(parametro.rotulo, mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                }
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qt100, model.posicao.xMm - (alturaLinhaMm * 7),
                    yMm, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, model.posicao.xMm - (alturaLinhaMm * 3.5),
                    yMm, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.valorDiario, model.posicao.xMm - alturaLinhaMm / 2,
                    yMm, mm, TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                desenharLinha(ctx, model, yMm, mm);
                // -----------------------------------------------------------------------------------------------------
            }
        });

        // -----------------------------------------------------------------------------------------------------------------

        // Parametros extras
        if (!!textBindings) {
            textBindings.parametrosExtrasNutricionalV2.forEach((parametro: any) => {
                yMm += alturaLinhaMm;
                ctx.textAlign = TextAlign.LEFT;

                if (!!fabricCanvas) {
                    writeFabricText(fabricCanvas, ctx, parametro.rotulo, model.posicao.xMm, yMm, larguraMaxima, mm, {degrees});
                } else {
                    ctx.strokeText(parametro.rotulo, mm(model.posicao.xMm), mm(yMm), mm(model.dimensoes.larguraMaximaMm));
                }
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qt100, model.posicao.xMm - (alturaLinhaMm * 7),
                    yMm, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.qtPorcao, model.posicao.xMm - (alturaLinhaMm * 3.5),
                    yMm, mm, TextAlign.RIGHT, degrees);
                strokeAlignedText(ctx, fabricCanvas, larguraMaxima, parametro.valorDiario, model.posicao.xMm - alturaLinhaMm / 2,
                    yMm, mm, TextAlign.RIGHT, degrees);
                yMm += lineStrokeGap;
                desenharLinha(ctx, model, yMm, mm);
                // -----------------------------------------------------------------------------------------------------
            });
            let texto = "NÃO CONTÉM QUANTIDADES SIGNIFICATIVAS DE ";
            if (model.informacoesNutricionais.ocultarZerados && !possuiAvisoNutricionaisZerados(model.informacoesAdicionais.texto, texto)) {
                const naoVisiveis = textBindings.parametrosPadroesNutricionalV2.filter((parametro: any) =>
                    parametro.qtPorcao.match(/[0-9]/mg, "").every((elemento: any) => elemento === "0"),
                );
                if (naoVisiveis.length > 0) {
                    texto = texto.concat(naoVisiveis.map((parametro: any) => {
                        return parametro.rotulo.toUpperCase();
                    }).join(", ")).concat(". ");
                    model.informacoesAdicionais.texto = texto.concat(model.informacoesAdicionais.texto);
                }
            }
        }
    }

    yMm += alturaLinhaMm;

    // -----------------------------------------------------------------------------------------------------------------
    // Rodapé (informações adicionais)

    ctx.font = `${calculaTamanhoFonteByAlturaMMEFontePadraoPT(model.fonte.alturaMm, TAMANHO_FONTE_INFORMACOES_ADICIONAIS_EM_PT)}mm ${model.fonte.nome}`;

    // TODO: colocar o ** também, nessa e na tabela reduzida
    if (!model.informacoesAdicionais.texto) {
        strokeAlignedText(ctx, fabricCanvas, larguraMaxima, "<informacoesAdicionais.texto>", model.posicao.xMm, yMm, mm, TextAlign.LEFT, degrees);
    } else {
        const linhasInformacoesAdicionais = splitLines(model.informacoesAdicionais.texto, model.informacoesAdicionais.caracteresPorLinha);
        linhasInformacoesAdicionais.forEach((linha: string) => {
            strokeAlignedText(ctx, fabricCanvas, larguraMaxima, linha, model.posicao.xMm, yMm, mm, TextAlign.LEFT, degrees);
            yMm += alturaLinhaMm;
        });
    }

    // Contorno de baixo
    desenharLinhaContornoHorizontal(ctx, model, yMm, mm);
    yMm += lineStrokeGap;

    ctx.restore();
};

const possuiAvisoNutricionaisZerados = (textoInformacoesAdicionais: string, texto: string) => {
    return _.includes(textoInformacoesAdicionais, texto);
};

const desenharLinha = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, mm: any) => {
    ctx.textAlign = TextAlign.LEFT;

    // x, y, largura e altura
    ctx.strokeRect(
        mm(model.posicao.xMm),
        mm(yMm),
        mm(model.dimensoes.larguraMaximaMm),
        1,
    );
};

const desenharLinhaGrossa = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, mm: any) => {
    ctx.textAlign = TextAlign.LEFT;
    ctx.lineWidth = converterPtParaPX(EXPESSURA_LINHA_GROSSA_EM_PT);
    // x, y, largura e altura
    ctx.strokeRect(
        mm(model.posicao.xMm),
        mm(yMm),
        mm(model.dimensoes.larguraMaximaMm),
        1,
    );
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};

const desenharLinhaContornoHorizontal = (ctx: CanvasRenderingContext2D, model: IElementoTabelaNutricionalModel, yMm: number, mm: any) => {
    const espacoDireitaEEsquerda = 2;
    const espacoMargemInterna = converterPTparaMM(ESPACAMENTO_CONTORNO_TABELA_EM_PT);
    const tamanhoLinhaContornoTotalMM = model.dimensoes.larguraMaximaMm + (espacoDireitaEEsquerda * espacoMargemInterna);

    ctx.textAlign = TextAlign.LEFT;

    // x, y, largura e altura
    ctx.strokeRect(
        mm(model.posicao.xMm - espacoMargemInterna), // Começa antes da linha da tabela
        mm(yMm),
        mm(tamanhoLinhaContornoTotalMM),
        1,
    );
    ctx.lineWidth = model.fonte.forcaContorno || 0;
};

export const tabelaNutricionalVertical = {drawTable};
