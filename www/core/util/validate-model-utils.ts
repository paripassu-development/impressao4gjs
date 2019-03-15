import * as _ from "lodash";
import {labelConfiguration} from "../../label/label-configuration";
import {TipoErro} from "../../label/tipo-erro-enum";

export class ValidateModelUtils {

    public static validate = (model: any, errors: any[], tipo: string) => {
        const elemento: any = _.filter(labelConfiguration.getMetadadosElementos(), {tipo})[0];
        _.forEach(elemento.camposConfiguraveis, (campoConfiguravel) => {
            ValidateModelUtils.percorreElementos(campoConfiguravel, model, errors);
        });
    }

    private static percorreElementos(campoConfiguravel: any, model: any, errors: any[]) {
        if (campoConfiguravel.tipo === "OBJECT") {
            _.forEach(campoConfiguravel.itens, (item) => {
                ValidateModelUtils.percorreElementos(item, model, errors);
            });
        } else if (campoConfiguravel.tipo === "LIST") {
            _.forEach(campoConfiguravel.listaTipo, (item) => {
                ValidateModelUtils.percorreElementosLista(item, model, errors, campoConfiguravel.campo);
            });
        } else {
            ValidateModelUtils.adicionaErro(campoConfiguravel, model, errors);
        }
    }

    private static percorreElementosLista(campoConfiguravel: any, model: any, errors: any[], caminhoLista: string) {
        if (campoConfiguravel.tipo === "OBJECT") {
            _.forEach(campoConfiguravel.itens, (item) => {
                ValidateModelUtils.percorreElementosLista(item, model, errors, caminhoLista);
            });
        } else {
            _.forEach(this.getCampo(caminhoLista, model), (item: any, indice: number) => {
                ValidateModelUtils.adicionaErro(campoConfiguravel, model, errors, indice, caminhoLista);
            });
        }
    }

    private static adicionaErro(item: any, model: any, errors: any[], indiceCampo?: number, caminhoLista?: string) {
        let erroObrigatoriedade = false;
        const requisitoValidado = this.validaRequisito(item, model, ValidacaoEnum.EXISTENCIA);
        if (item.obrigatorio && (requisitoValidado === ValidacaoEnum.EXISTENCIA || requisitoValidado === ValidacaoEnum.SEM_REQUISITO)) {
            const obrigatorio = this.getCampo(item.campo, model, indiceCampo, caminhoLista);
            if (obrigatorio == null) {
                errors.push({campo: indiceCampo != null ? caminhoLista + "." +  item.campo + "[" + indiceCampo + "]" : item.campo, tipo: TipoErro.CAMPO_OBRIGATORIO});
                erroObrigatoriedade = true;
            }
        }
        const preRequisito: any = _.filter(item.preRequisito, {tipo: ValidacaoEnum.CONFLITO})[0];
        if (this.validaRequisito(item, model, ValidacaoEnum.CONFLITO) === ValidacaoEnum.NAO_CUMPRIDO && this.getCampo(item.campo, model) != null) {
            errors.push({campo: item.campo, tipo: TipoErro.CAMPO_CONFLITANTE, conflito: preRequisito.campo});
        }
        if (item.tipo === "NUMERIC" && !erroObrigatoriedade) {
            const numeric = this.getCampo(item.campo, model, indiceCampo, caminhoLista);
            if (numeric != null && isNaN(numeric)) {
                errors.push({campo: item.campo, tipo: TipoErro.NAO_NUMERO});
            } else if (numeric <= 0 && item.subtipo === "POSITIVE") {
                errors.push({campo: item.campo, tipo: TipoErro.NAO_NUMERO_POSITIVO});
            }
        }
    }

    private static validaRequisito(item: any, model: any, tipo: any) {
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

    private static getCampo(campo: any, model: any, indiceCampo?: any, caminhoLista?: string) {
        const strings = caminhoLista != null ? caminhoLista.split(".") : campo.split(".");
        let valorCampo = model;
        _.forEach(strings, (caminho: string) => {
            if (valorCampo != null) {
                valorCampo = valorCampo[caminho];
            } else {
                return null;
            }
        });
        return indiceCampo != null ? valorCampo[indiceCampo][campo] : valorCampo;
    }

}

export enum ValidacaoEnum {
    CONFLITO = "CONFLITO",
    EXISTENCIA = "EXISTENCIA",
    SEM_REQUISITO = "SEM_REQUISITO",
    NAO_CUMPRIDO = "NAO_CUMPRIDO",
}
