"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var codeEditor = require("./editor");
require("./fonts/index.css");
require("./index.html");
var index_1 = require("./label/index");
require("./styles.css");
var default_1 = require("./default");
var _ = require('lodash');
var $ = require('jquery');
var modelEditor = codeEditor.createEditor("code");
var valueEditor = codeEditor.createEditor("values");
var STORAGE_NAMESPACE = "impressao4gjs.etiqueta";
var STORAGE_KEY_MODEL = "lastmodel";
var STORAGE_KEY_VALUES = "lastvalues";
var save = function (model, values) {
    localStorage.setItem(STORAGE_NAMESPACE + "." + STORAGE_KEY_MODEL, model);
    localStorage.setItem(STORAGE_NAMESPACE + "." + STORAGE_KEY_VALUES, values);
};
var getModel = function () {
    var savedModel = localStorage.getItem(STORAGE_NAMESPACE + "." + STORAGE_KEY_MODEL);
    return _.isEmpty(savedModel) ? JSON.stringify(default_1.MODEL_DEFAULT) : savedModel;
};
var getValues = function () {
    var savedValue = localStorage.getItem(STORAGE_NAMESPACE + "." + STORAGE_KEY_VALUES);
    savedValue = !!savedValue ? JSON.parse(savedValue) : {};
    return JSON.stringify(_.defaults(savedValue, default_1.DADOS_DEFAULT));
};
document.getElementById("autoformat-btn").onclick = function () {
    codeEditor.autoFormat(modelEditor);
    codeEditor.autoFormat(valueEditor);
};
var showErrors = function (err) {
    if (err instanceof Array) {
        err.forEach(function (error) {
            appendErrorDOM(error.name);
        });
    }
};
var appendErrorDOM = function (error) {
    var label = document.createElement("p");
    var text = document.createTextNode(error);
    label.appendChild(text);
    label.className = "error-label";
    document.getElementById("code-wrapper").appendChild(label);
};
var clearErrors = function () {
    $(".error-label").remove();
};
function onClickCreateButton() {
    return __awaiter(this, void 0, void 0, function () {
        var modelJson, modelObj, valuesObj, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clearErrors();
                    modelJson = modelEditor.getValue();
                    modelObj = parseModelJson(modelJson);
                    valuesObj = _.isEmpty(valueEditor.getValue()) ? default_1.DADOS_DEFAULT : parseValuesJson(valueEditor.getValue());
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, index_1.etiqueta.create("canvas-area", modelObj, valuesObj)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    showErrors(err_1);
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, index_1.etiqueta.create("canvas-area-template", modelObj)];
                case 5:
                    _a.sent();
                    save(modelJson, JSON.stringify(valuesObj));
                    return [2 /*return*/];
            }
        });
    });
}
function onClickExportButton() {
    var modelJson = modelEditor.getValue();
    var canvas = document.getElementById("canvas-area-etiqueta-canvas");
    var canvasFinal = index_1.etiqueta.exportCanvas(canvas.id, parseModelJson(modelJson).impressao.orientacaoEtiquetaGraus);
    var el = document.getElementById("canvas-area-final");
    el.appendChild(canvasFinal);
    save(modelJson, valueEditor.getValue());
}
function parseModelJson(json) {
    try {
        return JSON.parse(json);
    }
    catch (err) {
        appendErrorDOM("O JSON da etiqueta é inválido.");
        throw err;
    }
}
function parseValuesJson(json) {
    try {
        return JSON.parse(json);
    }
    catch (err) {
        appendErrorDOM("O JSON de valores é inválido.");
        throw err;
    }
}
document.getElementById("create-btn").onclick = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, onClickCreateButton()];
            case 1:
                _a.sent();
                onClickExportButton();
                return [2 /*return*/];
        }
    });
}); };
document.getElementById("export-btn").onclick = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                document.getElementById("panel-canvas-area-final").classList.toggle("hidden");
                return [4 /*yield*/, onClickCreateButton()];
            case 1:
                _a.sent();
                onClickExportButton();
                return [2 /*return*/];
        }
    });
}); };
document.getElementById("send-btn").onclick = function () {
    var modelJson = modelEditor.getValue();
    var canvas = document.getElementById("canvas-area-etiqueta-canvas");
    var canvasFinal = index_1.etiqueta.exportCanvas(canvas.id, parseModelJson(modelJson).impressao.orientacaoEtiquetaGraus);
    var el = document.getElementById("canvas-area-final");
    el.appendChild(canvasFinal);
    var dataURL = canvasFinal.toDataURL("image/png", 1.0);
    var formData = new FormData();
    formData.append("etiquetaPngBase64", dataURL.replace("data:image/png;base64,", ""));
    var model = parseModelJson(modelEditor.getValue());
    formData.append("opcoesImpressao", JSON.stringify({ impressao: model.impressao, etiqueta: model.etiqueta }));
    formData.append("nomeImpressora", "\\\\DESKTOP-UCPGNLU\\Argox OS-214 plus PPLA");
    formData.append("modo", "Argox OS-214");
    formData.append("quantidadeEtiquetas", "5");
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:58080/impressoras/jobs/custom");
    request.send(formData);
    save(modelJson, valueEditor.getValue());
};
document.getElementById("values-btn").onclick = function () {
    document.getElementById("value-wrapper").classList.toggle("close");
    document.getElementById("code-wrapper").classList.toggle("open");
};
document.getElementById("template-btn").onclick = function () {
    document.getElementById("panel-canvas-area-template").classList.toggle("hidden");
};
document.getElementById("help-btn").onclick = function () {
    alert("ATALHOS DO EDITOR\nCtrl-F: pesquisar\nCtrl-G: encontrar o próximo\nShift-Ctrl-G: encontrar o anterior\nShift-Ctrl-F: substituir\nShift-Ctrl-R: substituir todos\nF11: editor em tela-cheia");
};
document.addEventListener("DOMContentLoaded", function () {
    var initialModel = getModel();
    var initialValue = getValues();
    modelEditor.setValue(initialModel);
    valueEditor.setValue(initialValue);
    codeEditor.autoFormat(modelEditor);
    codeEditor.autoFormat(valueEditor);
    setTimeout(function () {
        document.getElementById("create-btn").click();
    }, 500);
});
//# sourceMappingURL=index.js.map