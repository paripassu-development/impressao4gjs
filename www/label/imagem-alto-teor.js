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
var image_utils_1 = require("../core/util/image-utils");
var tabela_nutricional_utils_1 = require("../core/util/tabela-nutricional-utils");
var default_1 = require("../default");
var mm_1 = require("./mm");
var drawAltoTeor = function (id, ctx, fabricCanvas, dpi, model, textBindings) { return __awaiter(_this, void 0, void 0, function () {
    var mm, textbindsTratada, posicaoYMm, posicaoXMm, alturaMm, larguraMm, degrees, mapeiaNutrientes, sodioQt100, acucaresAdicionadosQt100, gorduraSaturadaQt100, unidadeTratada, listaNutricional, tipoImagem, imgSvgAltoTeor;
    return __generator(this, function (_a) {
        mm = mm_1.mmPartial(dpi);
        textbindsTratada = textBindings ? textBindings : default_1.DADOS_DEFAULT;
        posicaoYMm = mm(model.posicao.yMm);
        posicaoXMm = mm(model.posicao.xMm);
        alturaMm = mm(model.dimensoes.alturaMm);
        larguraMm = mm(model.dimensoes.larguraMm);
        degrees = model.posicao.rotacao || 0;
        mapeiaNutrientes = textbindsTratada.parametrosPadroesNutricionalV2.reduce(function (mapa, item) {
            var rotuloLimpo = item.rotulo.trim();
            mapa[rotuloLimpo] = item.qt100;
            return mapa;
        }, {});
        sodioQt100 = tabela_nutricional_utils_1.substituiVirgulaPorPonto(mapeiaNutrientes[default_1.ROTULO_SODIO] || 0);
        acucaresAdicionadosQt100 = tabela_nutricional_utils_1.substituiVirgulaPorPonto(mapeiaNutrientes[default_1.ROTULO_ACUCARES_ADICIONADOS] || 0);
        gorduraSaturadaQt100 = tabela_nutricional_utils_1.substituiVirgulaPorPonto(mapeiaNutrientes[default_1.ROTULO_GORDURA_SATURADA] || 0);
        unidadeTratada = tabela_nutricional_utils_1.extraiPorcao(textbindsTratada.porcaoNutricionalV2);
        listaNutricional = image_utils_1.validacaoListaNutricional({
            sodioQt100: sodioQt100,
            acucaresAdicionadosQt100: acucaresAdicionadosQt100,
            gorduraSaturadaQt100: gorduraSaturadaQt100,
            unidadeTratada: unidadeTratada
        });
        tipoImagem = image_utils_1.montagemTipoAltoTeor(listaNutricional);
        imgSvgAltoTeor = createImgAltoTeor(id, {
            imageSvg: tipoImagem
        });
        return [2 /*return*/, new Promise(function (resolve, reject) {
                imgSvgAltoTeor.onload = function () {
                    try {
                        ctx.save();
                        ctx.rotate((degrees * Math.PI) / 180);
                        ctx.drawImage(imgSvgAltoTeor, posicaoXMm, posicaoYMm, larguraMm, alturaMm);
                        ctx.restore();
                        resolve();
                    }
                    catch (error) {
                        // tslint:disable-next-line:no-console
                        console.error("Erro ao desenhar imagem.", error);
                        reject(error);
                    }
                };
                imgSvgAltoTeor.onerror = function (error) {
                    // tslint:disable-next-line:no-console
                    console.error("Falha ao carregar a imagem.", error);
                    reject(error);
                };
            })];
    });
}); };
var createImgAltoTeor = function (id, options) {
    var oldAltoTeorDiv = document.getElementById("altoTeor-div");
    if (oldAltoTeorDiv) {
        oldAltoTeorDiv.remove();
    }
    var altoTeorDiv = document.createElement("div");
    altoTeorDiv.id = "altoTeor-div";
    altoTeorDiv.style.display = "none";
    document.getElementById(id).appendChild(altoTeorDiv);
    var imgAltoTeor = document.createElement("img");
    imgAltoTeor.src = options.imageSvg;
    altoTeorDiv.appendChild(imgAltoTeor);
    return altoTeorDiv.getElementsByTagName("img")[0];
};
exports.altoTeor = { drawAltoTeor: drawAltoTeor };
//# sourceMappingURL=imagem-alto-teor.js.map