import * as _ from "lodash";
import {isNumber} from "util";
import {labelConfiguration} from "../../label/label-configuration";
import {TipoErro} from "../../label/tipo-erro-enum";

export class ValidateModelUtils {

    public static validateAll = (model: any) => {
        const errors: any[] = [];
        ValidateModelUtils.validatePDF(model, errors);
        ValidateModelUtils.validateEtiqueta(model, errors);
        ValidateModelUtils.validateImpressao(model, errors);
        ValidateModelUtils.validateElementos(model, errors);
        return errors;
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

    public static validate = (model: any, errors: any[], metadados: any, path: any[]) => {
        _.forEach(metadados.camposConfiguraveis, (campoConfiguravel: any) => {
            ValidateModelUtils.percorreElementos(campoConfiguravel, model, errors, path);
        });
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
        }
        else if (preRequisito.valores != null) {
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
            if (obrigatorio == null || obrigatorio === "") {
                errors.push({
                    campo: path.join(".") + "." + item.campo,
                    tipo: TipoErro.CAMPO_OBRIGATORIO,
                    message: "ras.ui.4g.campo_obrigatorio",
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
