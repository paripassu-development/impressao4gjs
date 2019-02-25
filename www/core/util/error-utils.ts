import * as _ from "lodash";
import {Error} from "../common/error";
import {ErrosPrefix, TipoError} from "../constants/constants-impressao";

export class ErrorUtils {

    public static captureError(variableName: string, renderedText: string, validacoes: any, errors: Error[]) {
        const validacao = validacoes[variableName];
        if (validacao && validacao.obrigatorio) {
            ErrorUtils.errorEmptyOrNull(variableName, renderedText, errors);
        }
    }

    private static errorEmptyOrNull(variableName: string, renderedText: string, errors: Error[]) {
        if (_.isEmpty(renderedText)) {
            errors.push(Error.build("impr.ui.js.valor_x_indefinido", `${ErrosPrefix.ERROR_OBRIGATORIEDADE} É necessário informar um valor para o ${variableName}`, TipoError.OBRIGATORIO, variableName));
        }
    }

}
