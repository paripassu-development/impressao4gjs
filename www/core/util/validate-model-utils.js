"use strict";
exports.__esModule = true;
var _ = require("lodash");
var label_configuration_1 = require("../../label/label-configuration");
var tipo_erro_enum_1 = require("../enum/tipo-erro-enum");
var etiqueta_utils_1 = require("./etiqueta-utils");
var constants_impressao_1 = require("../constants/constants-impressao");
var tipo_alerta_1 = require("../enum/tipo-alerta");
var ValidateModelUtils = /** @class */ (function () {
    function ValidateModelUtils() {
    }
    ValidateModelUtils.validaAlturaSeForCampoPeso = function (elemento, alerts, index) {
        if (elemento.tipo === 'texto' && !!elemento.valor) {
            if (!!elemento.valor && etiqueta_utils_1.EtiquetaUtils.isCampo(elemento.valor, this.VARIAVEIS_PESO)) {
                ValidateModelUtils.validaAlturaCampoPeso(elemento.fonte, alerts, index);
            }
            if (!!elemento.valor && etiqueta_utils_1.EtiquetaUtils.isCampo(elemento.valor, this.VARIAVEIS_NUTRICIONAIS)) {
                ValidateModelUtils.validaAlturaCampoNutricional(elemento.fonte, alerts, index);
            }
        }
    };
    ValidateModelUtils.validaAlturaCampoPeso = function (fonte, alerts, index) {
        var intervaloFonte = constants_impressao_1.intervaloTamanhoFonte[fonte.nome];
        var campo = 'desenho.elementos.' + index + '.fonte.alturaMm';
        if (fonte.alturaMm === intervaloFonte.proporcaoTamanhoFonte2.min) {
            alerts.push({ campo: campo, message: "ras4.ui.template.etiqueta.atende_peso_maximo_X_gramas_ou_litros", parametros: { max: 50 }, tipoAlerta: tipo_alerta_1.TipoAlerta.INFORMACAO });
        }
        else if (fonte.alturaMm >= intervaloFonte.proporcaoTamanhoFonte3.min && fonte.alturaMm <= intervaloFonte.proporcaoTamanhoFonte3.max) {
            alerts.push({ campo: campo, message: "ras4.ui.template.etiqueta.atende_peso_maximo_X_gramas_ou_litros", parametros: { max: 200 }, tipoAlerta: tipo_alerta_1.TipoAlerta.INFORMACAO });
        }
        else if (fonte.alturaMm >= intervaloFonte.proporcaoTamanhoFonte4.min && fonte.alturaMm <= intervaloFonte.proporcaoTamanhoFonte4.max) {
            alerts.push({ campo: campo, message: "ras4.ui.template.etiqueta.atende_peso_maximo_X_gramas_ou_litros", parametros: { max: 1000 }, tipoAlerta: tipo_alerta_1.TipoAlerta.INFORMACAO });
        }
        else if (fonte.alturaMm >= intervaloFonte.proporcaoTamanhoFonte6.min) {
            alerts.push({ campo: campo, message: "ras4.ui.txt.etiqueta.atende_todos_peso_gramas_ou_litros", parametros: "", tipoAlerta: tipo_alerta_1.TipoAlerta.INFORMACAO });
        }
        else {
            alerts.push({ campo: campo, message: "ras4.ui.txt.erro.etiqueta.nao_atende_ao_peso_minimo_50_gramas_ou_litros", parametros: "", tipoAlerta: tipo_alerta_1.TipoAlerta.ERRO });
        }
    };
    ValidateModelUtils.validaAlturaCampoNutricional = function (fonte, alerts, index) {
        var intervaloFonte = constants_impressao_1.intervaloTamanhoFonte[fonte.nome];
        var campo = "desenho.elementos." + index + ".fonte.alturaMm";
        if (fonte.alturaMm < intervaloFonte.proporcaoTamanhoFonte1.max) {
            alerts.push({ campo: campo, message: "ras4.ui.template.etiqueta.atende_tamanho_minimo_1mm", parametros: { max: 50 }, tipoAlerta: tipo_alerta_1.TipoAlerta.ERRO });
        }
    };
    ValidateModelUtils.validaRequisito = function (item, model, tipo) {
        var preRequisitos = _.filter(item.preRequisito, { tipo: tipo });
        var validacoes = _.map(preRequisitos, function (preRequisito) {
            if (preRequisito != null) {
                if (preRequisito.tipo === ValidacaoEnum.EXISTENCIA) {
                    return ValidateModelUtils.validaRequisitoExistencia(preRequisito, model);
                }
                if (preRequisito.tipo === ValidacaoEnum.CONFLITO) {
                    return ValidateModelUtils.validaRequisitoConflito(preRequisito, model);
                }
            }
            return ValidacaoEnum.SEM_REQUISITO;
        });
        return _.every(validacoes, function (validacao) { return validacao === tipo || validacao === ValidacaoEnum.SEM_REQUISITO; })
            ? tipo
            : ValidacaoEnum.NAO_CUMPRIDO;
    };
    ValidateModelUtils.validaRequisitoConflito = function (preRequisito, model) {
        var valor = this.getCampo(preRequisito.campo, model);
        var preRequisitoCumprido = preRequisito.oposto ? valor == null : valor != null;
        return preRequisitoCumprido ? ValidacaoEnum.CONFLITO : ValidacaoEnum.NAO_CUMPRIDO;
    };
    ValidateModelUtils.validaRequisitoExistencia = function (preRequisito, model) {
        var valor = this.getCampo(preRequisito.campo, model);
        var preRequisitoCumprido;
        if (preRequisito.valor == null && preRequisito.valores == null) {
            preRequisitoCumprido = preRequisito.oposto ? valor == null : valor != null;
        }
        else if (preRequisito.valor != null) {
            preRequisitoCumprido = preRequisito.oposto ? preRequisito.valor !== valor : preRequisito.valor === valor;
        }
        else if (preRequisito.valores != null) {
            preRequisitoCumprido = preRequisito.oposto ? !_.any(preRequisito.valores, function (valorRequisito) { return valorRequisito === valor; }) : _.any(preRequisito.valores, function (valorRequisito) { return valorRequisito === valor; });
        }
        return preRequisitoCumprido ? ValidacaoEnum.EXISTENCIA : ValidacaoEnum.NAO_CUMPRIDO;
    };
    ValidateModelUtils.percorreElementos = function (campoConfiguravel, model, errors, path) {
        if (campoConfiguravel.tipo === "OBJECT") {
            _.forEach(campoConfiguravel.itens, function (item) {
                ValidateModelUtils.percorreElementos(item, model, errors, path);
            });
        }
        else if (campoConfiguravel.tipo === "LIST") {
            ValidateModelUtils.adicionaErro(campoConfiguravel, model, errors, path);
            _.forEach(campoConfiguravel.listaTipo, function (item) {
                ValidateModelUtils.percorreElementosLista(item, model, errors, path.concat(campoConfiguravel.campo.split(".")));
            });
        }
        else {
            ValidateModelUtils.adicionaErro(campoConfiguravel, model, errors, path);
        }
    };
    ValidateModelUtils.percorreElementosLista = function (campoConfiguravel, model, errors, path) {
        if (campoConfiguravel.tipo === "OBJECT") {
            _.forEach(campoConfiguravel.itens, function (item) {
                ValidateModelUtils.percorreElementosLista(item, model, errors, path);
            });
        }
        else {
            _.forEach(this.getCampo(path, model), function (item, indice) {
                ValidateModelUtils.adicionaErro(campoConfiguravel, model, errors, path.concat([indice]));
            });
        }
    };
    ValidateModelUtils.adicionaErro = function (item, model, errors, path) {
        var erroObrigatoriedade = false;
        var requisitoValidado = this.validaRequisito(item, this.getCampo(path, model), ValidacaoEnum.EXISTENCIA);
        if (item.obrigatorio && (requisitoValidado === ValidacaoEnum.EXISTENCIA || requisitoValidado === ValidacaoEnum.SEM_REQUISITO)) {
            var obrigatorio = this.getCampo(path.concat(item.campo.split(".")), model);
            if (obrigatorio == null || obrigatorio === "" || (Array.isArray(obrigatorio) && obrigatorio.length === 0)) {
                errors.push({
                    campo: path.join(".") + "." + item.campo,
                    tipo: tipo_erro_enum_1.TipoErro.CAMPO_OBRIGATORIO,
                    message: "ras.ui.4g.campo_obrigatorio",
                    tipoAlerta: tipo_alerta_1.TipoAlerta.ERRO
                });
                erroObrigatoriedade = true;
            }
        }
        if (item.tipo === "NUMERIC" && !erroObrigatoriedade) {
            var numeric = this.getCampo(path.concat(item.campo.split(".")), model);
            if (numeric != null && isNaN(numeric)) {
                errors.push({
                    campo: path.join(".") + "." + item.campo,
                    tipo: tipo_erro_enum_1.TipoErro.NAO_NUMERO,
                    message: "ras.ui.4g.campo_obrigatorio",
                    tipoAlerta: tipo_alerta_1.TipoAlerta.ERRO
                });
            }
            else if (numeric <= 0 && item.subtipo === "POSITIVE") {
                errors.push({ campo: path.join(".") + "." + item.campo, tipo: tipo_erro_enum_1.TipoErro.NAO_NUMERO_POSITIVO });
            }
        }
    };
    ValidateModelUtils.REGEX_SOMENTE_LETRAS = /[^\d]/;
    ValidateModelUtils.VARIAVEIS_PESO = [
        "campoPesoLiquidoNutricional",
        "pesoLiquidoNutricional",
        "pesoLiquidoAgranelNutricional"
    ];
    ValidateModelUtils.VARIAVEIS_NUTRICIONAIS = [
        "contemGluten",
        "advertenciaSobreAlergenicos",
        "advertenciaSobreLactose",
    ];
    ValidateModelUtils.validateAll = function (model) {
        var alerts = [];
        ValidateModelUtils.validatePDF(model, alerts);
        ValidateModelUtils.validateEtiqueta(model, alerts);
        ValidateModelUtils.validateImpressao(model, alerts);
        ValidateModelUtils.validateElementos(model, alerts);
        ValidateModelUtils.validateCampoPeso(model, alerts);
        return alerts;
    };
    ValidateModelUtils.validateCampoPeso = function (model, alerts) {
        model.desenho.elementos.forEach(function (elemento, index) {
            ValidateModelUtils.validaAlturaSeForCampoPeso(elemento, alerts, index);
        });
    };
    ValidateModelUtils.validateElementos = function (model, errors) {
        _.forEach(ValidateModelUtils.getCampo("desenho.elementos", model), function (elementoModel, index) {
            ValidateModelUtils.validate(model, errors, _.find(label_configuration_1.labelConfiguration.getMetadadosElementos(), function (metadadosElemento) { return metadadosElemento.tipo === elementoModel.tipo; }), ["desenho", "elementos", index]);
        });
    };
    ValidateModelUtils.validateImpressao = function (model, errors) {
        ValidateModelUtils.validate(model, errors, label_configuration_1.labelConfiguration.getMetadadosImpressao(), ["impressao"]);
    };
    ValidateModelUtils.validatePDF = function (model, errors) {
        ValidateModelUtils.validate(model, errors, label_configuration_1.labelConfiguration.getMetadadosPDF(), ["pdf"]);
    };
    ValidateModelUtils.validateEtiqueta = function (model, errors) {
        ValidateModelUtils.validate(model, errors, label_configuration_1.labelConfiguration.getMetadadosEtiqueta(), ["etiqueta"]);
    };
    ValidateModelUtils.validateTesteImpressao = function (testeImpressao) {
        var errors = [];
        if (testeImpressao.quantidadeImpressao == null || testeImpressao.quantidadeImpressao <= 0 || ValidateModelUtils.REGEX_SOMENTE_LETRAS.exec(testeImpressao.quantidadeImpressao)) {
            errors.push({
                campo: "testeImpressao.quantidadeImpressao",
                tipo: tipo_erro_enum_1.TipoErro.CAMPO_OBRIGATORIO,
                message: "ras.ui.4g.campo_obrigatorio",
                tipoAlerta: tipo_alerta_1.TipoAlerta.ERRO
            });
        }
        if (testeImpressao.modoImpressao == null || testeImpressao.modoImpressao == "") {
            errors.push({
                campo: "testeImpressao.modoImpressao",
                tipo: tipo_erro_enum_1.TipoErro.CAMPO_OBRIGATORIO,
                message: "ras.ui.4g.campo_obrigatorio",
                tipoAlerta: tipo_alerta_1.TipoAlerta.ERRO
            });
        }
        if (testeImpressao.impressoraLocal == null || testeImpressao.impressoraLocal == "") {
            errors.push({
                campo: "testeImpressao.improssoraLocal",
                tipo: tipo_erro_enum_1.TipoErro.CAMPO_OBRIGATORIO,
                message: "ras.ui.4g.campo_obrigatorio",
                tipoAlerta: tipo_alerta_1.TipoAlerta.ERRO
            });
        }
        return errors;
    };
    ValidateModelUtils.validate = function (model, errors, metadados, path) {
        _.forEach(metadados.camposConfiguraveis, function (campoConfiguravel) {
            ValidateModelUtils.percorreElementos(campoConfiguravel, model, errors, path);
        });
    };
    ValidateModelUtils.getCampo = function (p, o) { return (Array.isArray(p) ? p : p.split(".")).reduce(function (xs, x) { return (xs != null && xs[x] != null) ? xs[x] : null; }, o); };
    return ValidateModelUtils;
}());
exports.ValidateModelUtils = ValidateModelUtils;
var ValidacaoEnum;
(function (ValidacaoEnum) {
    ValidacaoEnum["CONFLITO"] = "CONFLITO";
    ValidacaoEnum["EXISTENCIA"] = "EXISTENCIA";
    ValidacaoEnum["SEM_REQUISITO"] = "SEM_REQUISITO";
    ValidacaoEnum["NAO_CUMPRIDO"] = "NAO_CUMPRIDO";
})(ValidacaoEnum = exports.ValidacaoEnum || (exports.ValidacaoEnum = {}));
//# sourceMappingURL=validate-model-utils.js.map