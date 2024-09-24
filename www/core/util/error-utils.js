"use strict";
exports.__esModule = true;
var _ = require("lodash");
var error_1 = require("../common/error");
var constants_impressao_1 = require("../constants/constants-impressao");
var ErrorUtils = /** @class */ (function () {
    function ErrorUtils() {
    }
    ErrorUtils.captureError = function (variableName, renderedText, validacoes, errors) {
        var validacao = validacoes[variableName];
        if (validacao && validacao.obrigatorio) {
            ErrorUtils.errorEmptyOrNull(variableName, renderedText, errors);
        }
    };
    ErrorUtils.errorEmptyOrNull = function (variableName, renderedText, errors) {
        if (_.isEmpty(renderedText)) {
            errors.push(error_1.Error.build("impr.ui.js.valor_x_indefinido", constants_impressao_1.ErrosPrefix.ERROR_OBRIGATORIEDADE + " \u00C9 necess\u00E1rio informar um valor para o " + variableName, constants_impressao_1.TipoError.OBRIGATORIO, variableName));
        }
    };
    return ErrorUtils;
}());
exports.ErrorUtils = ErrorUtils;
//# sourceMappingURL=error-utils.js.map