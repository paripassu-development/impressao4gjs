import * as _ from "lodash";
import {labelConfiguration} from "../../label/label-configuration";
import {TipoErro} from "../enum/tipo-erro-enum";
import {EtiquetaUtils} from "./etiqueta-utils";
import {intervaloTamanhoFonte} from "../constants/constants-impressao";
import {TipoAlerta} from "../enum/tipo-alerta";

export class ValidateModelUtils {

    private static REGEX_SOMENTE_LETRAS = /[^\d]/;
    private static VARIAVEIS_PESO: string[] = [
        "campoPesoLiquidoNutricional",
        "pesoLiquidoNutricional",
        "pesoLiquidoAgranelNutricional"
    ];

    private static VARIAVEIS_NUTRICIONAIS: string[] = [
        "contemGluten",
    ];

    public static validateAll = (model: any) => {
        const alerts: any[] = [];
        ValidateModelUtils.validatePDF(model, alerts);
        ValidateModelUtils.validateEtiqueta(model, alerts);
        ValidateModelUtils.validateImpressao(model, alerts);
        ValidateModelUtils.validateElementos(model, alerts);
        ValidateModelUtils.validateCampoPeso(model, alerts);
        return alerts;
    }

    public static validateCampoPeso = (model: any, alerts: any[]) => {
        model.desenho.elementos.forEach((elemento: any, index: number) => {
            ValidateModelUtils.validaAlturaSeForCampoPeso(elemento, alerts, index);
        })
    }

    public static validateElementos = (model: any, errors: any[]) => {
        _.forEach(ValidateModelUtils.getCampo("desenho.elementos", model), (elementoModel: any, index: number) => {
            ValidateModelUtils.validate(model, errors, _.find(labelConfiguration.getMetadadosElementos(), (metadadosElemento: any) => metadadosElemento.tipo === elementoModel.tipo), ["desenho", "elementos", index]);
        });
    }

    public static validateImpressao = (model: any, errors: any[]) => {
        ValidateModelUtils.validate(model, errors, labelConfiguration.getMetadadosImpressao(), ["impressao"]);
    }

    public static validatePDF = (model: any, errors: any[]) => {
        ValidateModelUtils.validate(model, errors, labelConfiguration.getMetadadosPDF(), ["pdf"]);
    }

    public static validateEtiqueta = (model: any, errors: any[]) => {
        ValidateModelUtils.validate(model, errors, labelConfiguration.getMetadadosEtiqueta(), ["etiqueta"]);
    }

    public static validateTesteImpressao = (testeImpressao: any) => {
        let errors: any[] = [];
        if (testeImpressao.quantidadeImpressao == null || testeImpressao.quantidadeImpressao <= 0 || ValidateModelUtils.REGEX_SOMENTE_LETRAS.exec(testeImpressao.quantidadeImpressao)) {
            errors.push({
                campo: "testeImpressao.quantidadeImpressao",
                tipo: TipoErro.CAMPO_OBRIGATORIO,
                message: "ras.ui.4g.campo_obrigatorio",
                tipoAlerta: TipoAlerta.ERRO
            });
        }

        if (testeImpressao.modoImpressao == null || testeImpressao.modoImpressao == "") {
            errors.push({
                campo: "testeImpressao.modoImpressao",
                tipo: TipoErro.CAMPO_OBRIGATORIO,
                message: "ras.ui.4g.campo_obrigatorio",
                tipoAlerta: TipoAlerta.ERRO,
            });
        }

        if (testeImpressao.impressoraLocal == null || testeImpressao.impressoraLocal == "") {
            errors.push({
                campo: "testeImpressao.improssoraLocal",
                tipo: TipoErro.CAMPO_OBRIGATORIO,
                message: "ras.ui.4g.campo_obrigatorio",
                tipoAlerta: TipoAlerta.ERRO,
            });
        }
        return errors;
    }

    public static validate = (model: any, errors: any[], metadados: any, path: any[]) => {
        _.forEach(metadados.camposConfiguraveis, (campoConfiguravel: any) => {
            ValidateModelUtils.percorreElementos(campoConfiguravel, model, errors, path);
        });
    }

    private static validaAlturaSeForCampoPeso(elemento: any, alerts: any[], index: number) {
        if (elemento.tipo === 'texto' && !!elemento.valor) {
            if (!!elemento.valor && EtiquetaUtils.isCampo(elemento.valor, this.VARIAVEIS_PESO)) {
                ValidateModelUtils.validaAlturaCampoPeso(elemento.fonte, alerts, index);
            }
            if (!!elemento.valor && EtiquetaUtils.isCampo(elemento.valor, this.VARIAVEIS_NUTRICIONAIS)) {
                ValidateModelUtils.validaAlturaCampoNutricional(elemento.fonte, alerts, index);
            }
        }
    }

    private static validaAlturaCampoPeso(fonte: any, alerts: any[], index: number) {
        const intervaloFonte = intervaloTamanhoFonte[fonte.nome];
        const campo = 'desenho.elementos.' + index + '.fonte.alturaMm';
        if (fonte.alturaMm === intervaloFonte.proporcaoTamanhoFonte2.min)  {
            alerts.push({campo: campo, message: "ras4.ui.template.etiqueta.atende_peso_maximo_X_gramas_ou_litros", parametros: {max: 50}, tipoAlerta: TipoAlerta.INFORMACAO});
        } else if (fonte.alturaMm >= intervaloFonte.proporcaoTamanhoFonte3.min && fonte.alturaMm <= intervaloFonte.proporcaoTamanhoFonte3.max) {
            alerts.push({campo: campo, message: "ras4.ui.template.etiqueta.atende_peso_maximo_X_gramas_ou_litros", parametros: {max: 200}, tipoAlerta: TipoAlerta.INFORMACAO});
        } else if (fonte.alturaMm >= intervaloFonte.proporcaoTamanhoFonte4.min && fonte.alturaMm <= intervaloFonte.proporcaoTamanhoFonte4.max) {
            alerts.push({campo: campo, message: "ras4.ui.template.etiqueta.atende_peso_maximo_X_gramas_ou_litros", parametros: {max: 1000}, tipoAlerta: TipoAlerta.INFORMACAO});
        } else if(fonte.alturaMm >= intervaloFonte.proporcaoTamanhoFonte6.min){
            alerts.push({campo: campo, message: "ras4.ui.txt.etiqueta.atende_todos_peso_gramas_ou_litros", parametros: "", tipoAlerta: TipoAlerta.INFORMACAO});
        } else {
            alerts.push({campo: campo, message: "ras4.ui.txt.erro.etiqueta.nao_atende_ao_peso_minimo_50_gramas_ou_litros", parametros: "", tipoAlerta: TipoAlerta.ERRO});
        }

    }

    private static validaAlturaCampoNutricional(fonte: any, alerts: any[], index: number) {
        const intervaloFonte = intervaloTamanhoFonte[fonte.nome];
        const campo = "desenho.elementos." + index + ".fonte.alturaMm";
        if (fonte.alturaMm < intervaloFonte.proporcaoTamanhoFonte1.max) {
            alerts.push({campo: campo, message: "ras4.ui.template.etiqueta.atende_tamanho_minimo_1mm", parametros: {max: 50}, tipoAlerta: TipoAlerta.ERRO});
        }
    }

    public static validaRequisito(item: any, model: any, tipo: any) {
        const preRequisitos: any = _.filter(item.preRequisito, {tipo});
        const validacoes = _.map(preRequisitos, (preRequisito: any) => {
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
        return _.every(validacoes, (validacao: ValidacaoEnum) => validacao === tipo || validacao === ValidacaoEnum.SEM_REQUISITO)
            ? tipo
            : ValidacaoEnum.NAO_CUMPRIDO;
    }

    private static validaRequisitoConflito(preRequisito: any, model: any) {
        const valor = this.getCampo(preRequisito.campo, model);
        const preRequisitoCumprido = preRequisito.oposto ? valor == null : valor != null;
        return preRequisitoCumprido ? ValidacaoEnum.CONFLITO : ValidacaoEnum.NAO_CUMPRIDO;
    }

    private static validaRequisitoExistencia(preRequisito: any, model: any) {
        const valor = this.getCampo(preRequisito.campo, model);
        let preRequisitoCumprido;
        if (preRequisito.valor == null && preRequisito.valores == null) {
            preRequisitoCumprido = preRequisito.oposto ? valor == null : valor != null;
        } else if (preRequisito.valor != null) {
            preRequisitoCumprido = preRequisito.oposto ? preRequisito.valor !== valor : preRequisito.valor === valor;
        } else if (preRequisito.valores != null) {
            preRequisitoCumprido = preRequisito.oposto ? !_.any(preRequisito.valores, (valorRequisito: any) => valorRequisito === valor) : _.any(preRequisito.valores, (valorRequisito: any) => valorRequisito === valor);
        }
        return preRequisitoCumprido ? ValidacaoEnum.EXISTENCIA : ValidacaoEnum.NAO_CUMPRIDO;
    }

    private static percorreElementos(campoConfiguravel: any, model: any, errors: any[], path: any[]) {
        if (campoConfiguravel.tipo === "OBJECT") {
            _.forEach(campoConfiguravel.itens, (item: any) => {
                ValidateModelUtils.percorreElementos(item, model, errors, path);
            });
        } else if (campoConfiguravel.tipo === "LIST") {
            ValidateModelUtils.adicionaErro(campoConfiguravel, model, errors, path);
            _.forEach(campoConfiguravel.listaTipo, (item: any) => {
                ValidateModelUtils.percorreElementosLista(item, model, errors, [...path, ...campoConfiguravel.campo.split(".")]);
            });
        } else {
            ValidateModelUtils.adicionaErro(campoConfiguravel, model, errors, path);
        }
    }

    private static percorreElementosLista(campoConfiguravel: any, model: any, errors: any[], path: any[]) {
        if (campoConfiguravel.tipo === "OBJECT") {
            _.forEach(campoConfiguravel.itens, (item: any) => {
                ValidateModelUtils.percorreElementosLista(item, model, errors, path);
            });
        } else {
            _.forEach(this.getCampo(path, model), (item: any, indice: number) => {
                ValidateModelUtils.adicionaErro(campoConfiguravel, model, errors, [...path, indice]);
            });
        }
    }

    private static adicionaErro(item: any, model: any, errors: any[], path: any) {
        let erroObrigatoriedade = false;
        const requisitoValidado = this.validaRequisito(item, this.getCampo(path, model), ValidacaoEnum.EXISTENCIA);
        if (item.obrigatorio && (requisitoValidado === ValidacaoEnum.EXISTENCIA || requisitoValidado === ValidacaoEnum.SEM_REQUISITO)) {
            const obrigatorio = this.getCampo([...path, ...item.campo.split(".")], model);
            if (obrigatorio == null || obrigatorio === "" || (Array.isArray(obrigatorio) && obrigatorio.length === 0)) {
                errors.push({
                    campo: path.join(".") + "." + item.campo,
                    tipo: TipoErro.CAMPO_OBRIGATORIO,
                    message: "ras.ui.4g.campo_obrigatorio",
                    tipoAlerta: TipoAlerta.ERRO
                });
                erroObrigatoriedade = true;
            }
        }
        if (item.tipo === "NUMERIC" && !erroObrigatoriedade) {
            const numeric = this.getCampo([...path, ...item.campo.split(".")], model);
            if (numeric != null && isNaN(numeric)) {
                errors.push({
                    campo: path.join(".") + "." + item.campo,
                    tipo: TipoErro.NAO_NUMERO,
                    message: "ras.ui.4g.campo_obrigatorio",
                    tipoAlerta: TipoAlerta.ERRO
                });
            } else if (numeric <= 0 && item.subtipo === "POSITIVE") {
                errors.push({campo: path.join(".") + "." + item.campo, tipo: TipoErro.NAO_NUMERO_POSITIVO});
            }
        }
    }

    private static getCampo = (p: any, o: any) => (Array.isArray(p) ? p : p.split(".")).reduce((xs: any, x: any) => (xs != null && xs[x] != null) ? xs[x] : null, o);

}

export enum ValidacaoEnum {
    CONFLITO = "CONFLITO",
    EXISTENCIA = "EXISTENCIA",
    SEM_REQUISITO = "SEM_REQUISITO",
    NAO_CUMPRIDO = "NAO_CUMPRIDO",
}
