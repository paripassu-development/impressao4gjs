import * as codeEditor from "./editor";
import "./fonts/index.css";
import "./index.html";
import {
    etiqueta,
    IEtiquetaDocModel
} from "./label/index";
import "./styles.css";
import {Error} from "./core/common/error";
import {
    dadosDefault,
    modelDefault
} from "./default";
import {canvasUtils} from "./core/util/canvas-utils";
import {mmPartial} from "./label/mm";

declare var require: any;
const _: any = require('lodash');
const $: any = require('jquery');

const modelEditor = codeEditor.createEditor("code");
const valueEditor = codeEditor.createEditor("values");
const STORAGE_NAMESPACE = "impressao4gjs.etiqueta";
const STORAGE_KEY_MODEL = "lastmodel";
const STORAGE_KEY_VALUES = "lastvalues";

const save = (model: string, values: string) => {
    localStorage.setItem(STORAGE_NAMESPACE + "." + STORAGE_KEY_MODEL, model);
    localStorage.setItem(STORAGE_NAMESPACE + "." + STORAGE_KEY_VALUES, values);
};

const getModel = function () {
    const savedModel = localStorage.getItem(STORAGE_NAMESPACE + "." + STORAGE_KEY_MODEL);
    return _.isEmpty(savedModel) ? JSON.stringify(modelDefault) : savedModel;
};

const getValues = function () {
    let savedValue = localStorage.getItem(STORAGE_NAMESPACE + "." + STORAGE_KEY_VALUES);
    savedValue = !!savedValue ? JSON.parse(savedValue) : {};
    return JSON.stringify(_.defaults(savedValue, dadosDefault));
};

document.getElementById("autoformat-btn").onclick = () => {
    codeEditor.autoFormat(modelEditor);
    codeEditor.autoFormat(valueEditor);
};

let showErrors = function (err: Array<Error>) {
    if (err instanceof Array) {
        err.forEach((error: Error) => {
            appendErrorDOM(error.name)
        });
    }
};

let appendErrorDOM = function (error: string) {
    const label = document.createElement("p") as HTMLParagraphElement;
    const text = document.createTextNode(error);
    label.appendChild(text);
    label.className = "error-label";
    document.getElementById("code-wrapper").appendChild(label);
}

let clearErrors = function () {
    $(".error-label").remove();
};

async function onClickCreateButton() {
    clearErrors();
    const modelJson = modelEditor.getValue();
    const modelObj: IEtiquetaDocModel = parseModelJson(modelJson);
    const valuesObj = _.isEmpty(valueEditor.getValue()) ? dadosDefault : parseValuesJson(valueEditor.getValue());
    try {
        const canvas = await etiqueta.create("canvas-area", modelObj, valuesObj);
        const ctx = canvasUtils.createContext(canvas);
        drawRulers(ctx, modelObj);
    } catch (err) {
        showErrors(err);
    }
    await etiqueta.create("canvas-area-template", modelObj);
    save(modelJson, JSON.stringify(valuesObj));
}

function drawRulers(ctx: any, model: IEtiquetaDocModel) {
    const mm = mmPartial(model.impressao.resolucaoDpi);
    const width = model.etiqueta.dimensoes.larguraMm;
    const height = model.etiqueta.dimensoes.alturaMm;
    drawVerticalRuler(ctx, model, mm, width, height);
    drawHorizontalRuler(ctx, model, mm, width, height);
}

function drawVerticalRuler(ctx: CanvasRenderingContext2D, model: IEtiquetaDocModel, mm: any, width: number, height: number) {
    for (let y = 1; y < height; y += 1) {
        let lineWidth = 0.1;
        let centimeterMark = false;
        if (y % 5 == 0) {
            lineWidth = 0.4;
        }
        if (y % 10 == 0) {
            lineWidth = 0.6;
            centimeterMark = true;
        }
        ctx.strokeRect(0, mm(y), mm(lineWidth), 0.5);
        ctx.strokeRect(mm(width-lineWidth), mm(y), mm(lineWidth), 0.5);

        if (centimeterMark) {
            ctx.strokeText(String(y), mm(lineWidth), mm(y)+3);
        }
    }
}

function drawHorizontalRuler(ctx: CanvasRenderingContext2D, model: IEtiquetaDocModel, mm: any, width: number, height: number) {
    for (let x = 1; x < width; x += 1) {
        let lineHeight = 0.1;
        let centimeterMark = false;
        if (x % 5 == 0) {
            lineHeight = 0.4;
        }
        if (x % 10 == 0) {
            lineHeight = 0.6;
            centimeterMark = true;
        }
        ctx.strokeRect(mm(x), 0,0.5, mm(lineHeight));
        ctx.strokeRect(mm(x), mm(height-lineHeight), 0.5, mm(lineHeight));

        if (centimeterMark) {
            ctx.strokeText(String(x), mm(x)-3, mm(lineHeight)+3);
        }
    }
}

function onClickExportButton() {
    const modelJson = modelEditor.getValue();
    const canvas = document.getElementById("canvas-area-etiqueta-canvas") as HTMLCanvasElement;
    const canvasFinal = etiqueta.exportCanvas(canvas.id, parseModelJson(modelJson).impressao.orientacaoEtiquetaGraus);
    const el = document.getElementById("canvas-area-final");
    el.appendChild(canvasFinal);
    save(modelJson, valueEditor.getValue());
}

function parseModelJson(json: string): IEtiquetaDocModel {
    try {
        return JSON.parse(json);
    } catch (err) {
        appendErrorDOM("O JSON da etiqueta é inválido.");
        throw err;
    }
}

function parseValuesJson(json: string): any {
    try {
        return JSON.parse(json);
    } catch (err) {
        appendErrorDOM("O JSON de valores é inválido.");
        throw err;
    }
}

document.getElementById("create-btn").onclick = async () => {
    await onClickCreateButton();
    onClickExportButton();
};

document.getElementById("export-btn").onclick = async () => {
    document.getElementById("panel-canvas-area-final").classList.toggle("hidden");
    await onClickCreateButton();
    onClickExportButton();
};

document.getElementById("send-btn").onclick = () => {
    const modelJson = modelEditor.getValue();
    const canvas = document.getElementById("canvas-area-etiqueta-canvas") as HTMLCanvasElement;
    const canvasFinal = etiqueta.exportCanvas(canvas.id, parseModelJson(modelJson).impressao.orientacaoEtiquetaGraus);
    const el = document.getElementById("canvas-area-final");
    el.appendChild(canvasFinal);
    const dataURL = canvasFinal.toDataURL("image/png", 1.0);
    const formData = new FormData();
    formData.append("etiquetaPngBase64", dataURL.replace("data:image/png;base64,", ""));
    const model = parseModelJson(modelEditor.getValue());
    formData.append("opcoesImpressao", JSON.stringify({impressao: model.impressao, etiqueta: model.etiqueta}));
    formData.append("nomeImpressora", "\\\\DESKTOP-UCPGNLU\\Argox OS-214 plus PPLA");
    formData.append("modo", "Argox OS-214");
    formData.append("quantidadeEtiquetas", "5");
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:58080/impressoras/jobs/custom");
    request.send(formData);
    save(modelJson, valueEditor.getValue());
};

document.getElementById("values-btn").onclick = () => {
    document.getElementById("value-wrapper").classList.toggle("close");
    document.getElementById("code-wrapper").classList.toggle("open");
};

document.getElementById("template-btn").onclick = () => {
    document.getElementById("panel-canvas-area-template").classList.toggle("hidden");
};

document.getElementById("help-btn").onclick = () => {
    alert("ATALHOS DO EDITOR\nCtrl-F: pesquisar\nCtrl-G: encontrar o próximo\nShift-Ctrl-G: encontrar o anterior\nShift-Ctrl-F: substituir\nShift-Ctrl-R: substituir todos\nF11: editor em tela-cheia");
};

document.addEventListener("DOMContentLoaded", () => {
    const initialModel = getModel();
    const initialValue = getValues();

    modelEditor.setValue(initialModel);
    valueEditor.setValue(initialValue);
    codeEditor.autoFormat(modelEditor);
    codeEditor.autoFormat(valueEditor);

    setTimeout(() => {
        document.getElementById("create-btn").click();
    }, 500);
});
