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
        const preRequisito: any = _.filter(item.preRequisito, {tipo})[0];
        if (preRequisito != null) {
            if (preRequisito.tipo === ValidacaoEnum.EXISTENCIA) {
                const valor = this.getCampo(preRequisito.campo, model);
                let preRequisitoCumprido;
                if (preRequisito.valor == null) {
                    preRequisitoCumprido = preRequisito.oposto ? valor == null : valor != null;
                } else {
                    preRequisitoCumprido = preRequisito.oposto ? preRequisito.valor !== valor : preRequisito.valor === valor;
                }
                return preRequisitoCumprido ? ValidacaoEnum.EXISTENCIA : ValidacaoEnum.NAO_CUMPRIDO;
            }
            if (preRequisito.tipo === ValidacaoEnum.CONFLITO) {
                const valor = this.getCampo(preRequisito.campo, model);
                const preRequisitoCumprido = preRequisito.oposto ? valor == null : valor != null;
                return preRequisitoCumprido ? ValidacaoEnum.CONFLITO : ValidacaoEnum.NAO_CUMPRIDO;
            }
        }
        return ValidacaoEnum.SEM_REQUISITO;
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
