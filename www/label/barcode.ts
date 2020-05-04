import * as Mustache from "mustache";
import {canvasUtils} from "../core/util/canvas-utils";
import {
    AI_CONTEUDO, AI_GTIN,
    AI_LOTE,
    AIS_DATAS,
    AIS_PESO_LIQUIDO, AIS_PRECO_UNIDADE_MEDIDA,
    BARCODE_IMG_ELEMENT_ID,
    DUN14_4G,
    EAN128,
    EAN13_DEFAULT,
    EAN_128,
    GS1128,
    GS1_128_DEFAULT, GS1_DATABAR_EXPANDED_STACKED,
    GS1_DATE_PATTERN,
    INTERCALADO2A5_4G,
    ITF14_DEFAULT,
    ITF_DEFAULT,
} from "./index";
import {mmPartial} from "./mm";
import JsBarcode = require("jsbarcode");
import moment = require("moment");
import {Error} from "../core/common/error";
import {ErrosPrefix, TipoError} from "../core/constants/constants-impressao";

const bwipjs: any = require("bwip-js");
const _: any = require("lodash");

const OPTIONS_DEFAULT = {
    displayValue: true,
    textAlign: "center",
    font: "OCR-B",
};

interface IElementoCodigoBarrasModelPosicao {
    xMm: number;
    yMm: number;
    rotacao: number;
}

interface IElementoCodigoBarrasModelDimensoes {
    larguraUnitariaCodigoBarrasMm: number;
    alturaCodigoBarrasMm: number;
    numeroSegmentosPorLinha: number;
}

interface IElementoCodigoBarrasModelFonte {
    nome: string;
    alturaMm: number;
    alinhar: string;
}

interface IElementoCodigoBarrasModel {
    valores: IValorGS1[];
    mostraTexto: boolean;
    tipo: string;
    posicao: IElementoCodigoBarrasModelPosicao;
    dimensoes: IElementoCodigoBarrasModelDimensoes;
    fonte: IElementoCodigoBarrasModelFonte;
    tipoCodigoBarras: string;
    valor: string;
}

interface ICreateBarcodeOptions {
    textAlign: string;
    displayValue: boolean;
    barCodeHeight: number;
    barcodeWidth: number;
    font?: string;
    segments?: number;
    fontSize: number;
    format: string;
    text: string;
}

interface IValorGS1 {
    identificador: string;
    valor: string;
}

//TODO refatorar para colocar o tipoCodigoBarras como um enum
const formatValue = (model: IElementoCodigoBarrasModel, textBindings: any, tipoCodigoBarras: string) => {
    if (!textBindings) {
        return resolveDefaultValue(tipoCodigoBarras);
    }

    switch (tipoCodigoBarras.toLowerCase()) {
        case EAN13_DEFAULT:
            return formatEan13(Mustache.render(model.valor, textBindings));
        case ITF14_DEFAULT:
            return formatDun14(Mustache.render(model.valor, textBindings));
        case GS1_128_DEFAULT: {
            model.dimensoes.larguraUnitariaCodigoBarrasMm = Math.floor(model.dimensoes.larguraUnitariaCodigoBarrasMm);
            return formatGs1128(model.valores, textBindings);
        }
        case GS1_DATABAR_EXPANDED_STACKED: {
            return formatGs1128(model.valores, textBindings);
        }
        default:
            return formatIntercalado2De5(Mustache.render(model.valor, textBindings));
    }
};
const formatEan13 = (ean: string) => {
    // deixa com 12 digitos para o digito verificador ser
    // gerado pela lib de codigo de barras
    // edita somente se não for vazio
    if (!_.isEmpty(ean)) {
        if (ean.length > 13) {
            ean = ean.substring(1, 13);
        } else if (ean.length === 13) {
            ean = ean.substring(0, 12);
        } else if (ean.length < 12) {
            ean = ean.substring(0, ean.length - 1);
        }
        ean = _.padLeft(ean, 12, "0");
    }
    return ean;
};
const formatDun14 = (ean: string) => {
    // deixa com 13 digitos para o digito verificador ser
    // gerado pela lib de codigo de barras
    // edita somente se não for vazio
    if (!_.isEmpty(ean)) {
        if (ean.length > 14) {
            ean = ean.substring(1, 14);
        } else if (ean.length === 14) {
            ean = ean.substring(0, 13);
        } else if (ean.length < 13) {
            ean = ean.substring(0, ean.length - 1);
        }
        ean = _.padLeft(ean, 13, "0");
    }
    return ean;
};
const formatIntercalado2De5 = (ean: string) => {
    if (!_.isEmpty(ean)) {
        if (ean.length === 13) {
            ean = "0" + ean;
        }
        ean = _.padLeft(ean, 12, "0");
    }
    return ean;
};

function normalizeGS1Value(valor: string, identificador: string) {
    if (isData(identificador)) {
        const parts = valor.split("/");
        return moment({
            d: parts[0],
            m: parts[1],
            y: parts[2],
        } as any).format(GS1_DATE_PATTERN);
    }
    if (identificador.substring(0, identificador.length - 1) === AIS_PESO_LIQUIDO) {
        const casasDecimais = identificador.substring(identificador.length - 1);
        valor = _.padLeft(_.round(valor, casasDecimais).toFixed(casasDecimais).replace(/[.,]+/, ""), 6, "0");
        if (valor.length > 6) {
            valor = valor.substring(valor.length - 6);
        }
    }
    if (identificador === AIS_PRECO_UNIDADE_MEDIDA) {
        valor = _.padLeft(valor.replace(/\D+/, ""), 6, "0");
    }
    if (identificador === AI_GTIN) {
        valor = _.padLeft(valor, 14, "0");
    }
    return valor;
}

function formatGs1128(valores: IValorGS1[], textBindings: any) {
    return _.reduce(valores, (finalValue: string, item: IValorGS1) => {
        let valor = Mustache.render(item.valor, textBindings);
        valor = normalizeGS1Value(valor, item.identificador);
        return finalValue.concat(`(${item.identificador})${valor}`);
    }, "");
}

const resolveDefaultValue = (tipoCodigoBarras: string) => {
    switch (tipoCodigoBarras.toLowerCase()) {
        case EAN13_DEFAULT:
            return "000000000000";
        case ITF14_DEFAULT:
            return "0000000000000";
        case GS1_128_DEFAULT:
            return "(10)00000000000";
        case GS1_DATABAR_EXPANDED_STACKED:
            return "(10)00000000000";
        default:
            return "000000000000";
    }
};

function normalizeType(tipoCodigoBarras: string): string {
    if (!!tipoCodigoBarras && _.contains([GS1128, GS1_128_DEFAULT, EAN128, EAN_128], tipoCodigoBarras.toLowerCase())) {
        return GS1_128_DEFAULT;
    }
    return tipoCodigoBarras;
}

function validate(model: IElementoCodigoBarrasModel, textBindings: any | undefined, tipoCodigoBarras: string): Error[] {
    if (!textBindings) {
        return;
    }
    let errors = Array<Error>();
    if (tipoCodigoBarras.toLowerCase() === GS1_128_DEFAULT || tipoCodigoBarras.toLowerCase() === GS1_DATABAR_EXPANDED_STACKED) {
        model.valores.forEach((item) => {
            const ai = item.identificador;
            const valor = Mustache.render(item.valor, textBindings);
            if (!ai) {
                errors.push(Error.build("impr.ui.js.identificador_nao_informado", `${ErrosPrefix.ERROR_CODIGO_BARRAS} É necessário informar um identificador para cada valor do código de barras.`, TipoError.GS1));
                return;
            }
            if (!valor) {
                errors.push(Error.build("impr.ui.js.valor_identificador_nao_informado", `${ErrosPrefix.ERROR_CODIGO_BARRAS} É necessário informar um valor para cada identificador do código de barras.`, TipoError.GS1));
                return;
            }
            if (_.includes(AI_GTIN, ai) && !(new RegExp(/^\d{1,14}$/).test(valor))) {
                errors.push(Error.build("impr.ui.js.identificador_gtin_conter_14_caracteres", `${ErrosPrefix.ERROR_CODIGO_BARRAS} O valor do identificador ${ai} deve ter até 14 caracteres. Somente números.`, TipoError.GS1, ai));
            }
            if (_.includes(AI_CONTEUDO, ai) && !(new RegExp(/^\d{14}$/).test(valor))) {
                errors.push(Error.build("impr.ui.js.identificador_conteudo_conter_14_caracteres", `${ErrosPrefix.ERROR_CODIGO_BARRAS} O valor do identificador ${ai} deve ter 14 caracteres numéricos.`, TipoError.GS1, ai));
            }
            if (_.includes(AIS_DATAS, ai) && !(new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/).test(valor))) {
                errors.push(Error.build("impr.ui.js.identificador_data_nao_esta_formatado", `${ErrosPrefix.ERROR_CODIGO_BARRAS} O valor do identificador ${ai} deve ter o formato DD/MM/AAAA.`, TipoError.GS1, ai));
            }
            if (ai === AI_LOTE && !(new RegExp(/^.{1,20}$/).test(valor))) {
                errors.push(Error.build("impr.ui.js.identificador_lote_conter_max_20_caracteres", `${ErrosPrefix.ERROR_CODIGO_BARRAS} O valor do identificador ${ai} deve ter no máximo 20 caracteres alfanuméricos.`, TipoError.GS1, ai));
            }
            if (ai.substring(0, ai.length - 1) === AIS_PESO_LIQUIDO && (new RegExp(/^\d{1}$/)).test(ai.substring(ai.length - 1, ai.length)) && !(new RegExp(/^[+]?\d+(\.\d+)?$/).test(valor))) {
                errors.push(Error.build("impr.ui.js.identificador_peso_liquido_conter_6_caracteres", `${ErrosPrefix.ERROR_CODIGO_BARRAS} O valor do identificador ${ai} deve ter no máximo 6 caracteres numéricos.`, TipoError.GS1, ai));
            }
            if (ai === AIS_PRECO_UNIDADE_MEDIDA && valor.replace(/[.,]+/, "").length > 6) {
                errors.push(Error.build("impr.ui.js.identificador_preco_unidade_medida_conter_6_caracteres", `${ErrosPrefix.ERROR_CODIGO_BARRAS} O valor do identificador ${ai} deve ter no máximo 6 caracteres numéricos.`, TipoError.GS1, ai));
            }
            if (ai === AIS_PRECO_UNIDADE_MEDIDA && !(new RegExp(/^[+]?\d+((\.|,)\d+)?$/)).test(valor)) {
                errors.push(Error.build("impr.ui.js.identificador_preco_unidade_medida_deve_ser_numerico", `${ErrosPrefix.ERROR_CODIGO_BARRAS} O valor do identificador ${ai} deve existir e ser um número positivo.`, TipoError.GS1, ai));
            }
        });
        return errors;
    }

}

const drawBarcode = async (id: string, ctx: CanvasRenderingContext2D, dpi: number, model: IElementoCodigoBarrasModel, textBindings?: any): Promise<any> => {
    const mm = mmPartial(dpi);
    let tipoCodigoBarras = mapLabelTypes(Mustache.render(model.tipoCodigoBarras, textBindings));
    tipoCodigoBarras = normalizeType(tipoCodigoBarras);
    const errorsCodigoBarras = validate(model, textBindings, tipoCodigoBarras);
    if (!_.isEmpty(errorsCodigoBarras)) {
        throw errorsCodigoBarras;
    }
    const valor = formatValue(model, textBindings, tipoCodigoBarras);

    if (!_.isEmpty(valor)) {
        const barcodeImg = await barcode.createBarcode(id, dpi, {
            barCodeHeight: model.dimensoes.alturaCodigoBarrasMm,
            barcodeWidth: model.dimensoes.larguraUnitariaCodigoBarrasMm,
            segments: model.dimensoes.numeroSegmentosPorLinha,
            font: model.fonte.nome,
            fontSize: model.fonte.alturaMm,
            format: tipoCodigoBarras,
            text: valor,
            textAlign: model.fonte.alinhar,
            displayValue: model.mostraTexto,
        });

        return new Promise((resolve) => {
            barcodeImg.onload = () => { // aguarda load da imagem no DOM
                const degrees = model.posicao.rotacao || 0;
                ctx.save();
                ctx.rotate(degrees * Math.PI / 180);
                ctx.drawImage(barcodeImg, 0, 0, barcodeImg.width, barcodeImg.height, mm(model.posicao.xMm), mm(model.posicao.yMm), barcodeImg.width, barcodeImg.height);
                ctx.restore();
                resolve();
            };
        });
    }
    return Promise.resolve();
};

const mapLabelTypes = (labelType: string) => {
    switch (labelType.toLowerCase()) {
        case INTERCALADO2A5_4G:
            return ITF_DEFAULT;
        case DUN14_4G:
            return ITF14_DEFAULT;
        default:
            return labelType;
    }
};

const isData = (identificador: string) => _.contains(AIS_DATAS, identificador);

const buildOptionsBwipJs = (options: ICreateBarcodeOptions) => ({
    bcid: options.format,
    text: options.text,
    scaleX: 150,
    scaleY: 3,
    segments: options.segments || 10,
    width: options.barcodeWidth,
    height: options.barCodeHeight,
    includetext: options.displayValue,
    textfont: "OCR-B",
    textsize: Math.round(options.fontSize),
    textxalign: options.textAlign,
});
const buildOptionsJsBarcode = (options: ICreateBarcodeOptions, dpi: number) => {
    const mm = mmPartial(dpi);
    return {
        font: options.font,
        fontSize: mm(options.fontSize),
        displayValue: options.displayValue,
        format: options.format,
        height: mm(options.barCodeHeight),
        margin: 1,
        textMargin: 0,
        textAlign: options.textAlign,
        width: mm(options.barcodeWidth),
    };
};
const createBarcodeWithBwipJs = (options: ICreateBarcodeOptions, img: HTMLImageElement): Promise<HTMLImageElement> => {
    const canvas = canvasUtils.createCanvas("canvas", 0, 0);
    return new Promise((resolve, reject) => {
        bwipjs(canvas, buildOptionsBwipJs(options), (err: any) => {
            if (err) {
                reject("Erro ao gerar o codigo de barras " + options.format);
                console.log("Erro ao gerar o codigo de barras " + options.format);
            } else {
                img.src = canvas.toDataURL("image/png");
            }
            resolve(img);
        });
    });
};
const createBarcodeWithBarcodeJs = (id: string, img: HTMLImageElement, options: ICreateBarcodeOptions, dpi: number): Promise<HTMLImageElement> => new Promise((resolve) => {
    JsBarcode("#" + BARCODE_IMG_ELEMENT_ID, options.text, buildOptionsJsBarcode(options, dpi));
    resolve(img);
});
const createBarcode = (id: string, dpi: number, options: ICreateBarcodeOptions): Promise<HTMLImageElement> => {
    const oldImg = document.getElementById(BARCODE_IMG_ELEMENT_ID);
    if (oldImg) {
        oldImg.remove();
    }
    const img = document.createElement("img");
    img.id = BARCODE_IMG_ELEMENT_ID;
    img.style.display = "none";
    document.getElementById(id).appendChild(img);

    _.defaults(options, OPTIONS_DEFAULT);
    if (options.format === GS1_128_DEFAULT || options.format === GS1_DATABAR_EXPANDED_STACKED) {
        return createBarcodeWithBwipJs(options, img);
    } else {
        return createBarcodeWithBarcodeJs(id, img, options, dpi);
    }
};


// extraido da biblioteca jsBarcode (src/barcodes/EAN_PC/EAN13)
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit
const checksumEan13 = (ean13: string): number => {
    var result = 0;

    var i;
    for (i = 0; i < 12; i += 2) {
        result += parseInt(ean13[i]);
    }
    for (i = 1; i < 12; i += 2) {
        result += parseInt(ean13[i]) * 3;
    }

    return (10 - (result % 10)) % 10;
};


// extraido da biblioteca jsBarcode (src/barcodes/ITF14)
const checksumDun14 = (dun14: string): number => {
    var result = 0;

    for (var i = 0; i < 13; i++) {
        result += parseInt(dun14[i]) * (3 - (i % 2) * 2);
    }

    return Math.ceil(result / 10) * 10 - result;
};

//TODO trocar tipoCodigoBarras para ser um enum contendo os tipos de barra suportados afim de evitar erros
const generateCodigoValue = (tipoCodigoBarras: string, value: string): string => {
    switch (tipoCodigoBarras) {
        case EAN13_DEFAULT: {
            let formatedEan13 = formatEan13(value);
            return formatedEan13 + checksumEan13(formatedEan13);
        }
        case DUN14_4G:
        case ITF14_DEFAULT: {
            let formatedDun14 = formatDun14(value);
            return formatedDun14 + checksumDun14(formatedDun14);
        }
        default:
            return value;
    }
};

const removeZerosEsquerda = (value: string): string => {
    return value.replace(/^0*/, "");
};

//TODO trocar tipoCodigoBarras para ser um enum contendo os tipos de barra suportados afim de evitar erros
const isValid = (tipoCodigoBarras: string, value: string) => {
     if (!value || _.isEmpty(value) || !tipoCodigoBarras || _.isEmpty(tipoCodigoBarras)) {
        return false;
    }
    return removeZerosEsquerda(value) === removeZerosEsquerda(generateCodigoValue(tipoCodigoBarras, value));
};

const visibleForTesting = {
    removeZerosEsquerda,
    checksumEan13,
    checksumDun14,
    formatEan13,
    formatDun14,
    formatIntercalado2De5
};

export const barcode = {createBarcode, drawBarcode, generateCodigoValue, isValid, visibleForTesting};
