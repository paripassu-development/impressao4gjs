"use strict";
exports.__esModule = true;
var EtiquetaUtils = /** @class */ (function () {
    function EtiquetaUtils() {
    }
    EtiquetaUtils.isCampo = function (valor, variaveis) {
        var _this = this;
        var isCampoPeso = false;
        var match;
        this.REGEX_BUSCA_VARIAVEL.lastIndex = 0;
        while ((match = this.REGEX_BUSCA_VARIAVEL.exec(valor)) !== null) {
            if (match.index === this.REGEX_BUSCA_VARIAVEL.lastIndex) {
                this.REGEX_BUSCA_VARIAVEL.lastIndex++;
            }
            match.forEach(function (matchResult, groupIndex) {
                if (variaveis.some(function (variavelPeso) {
                    return matchResult.replace(_this.REGEX_IGNORA_CARACTERES_ESPECIAIS, '') === variavelPeso;
                })) {
                    isCampoPeso = true;
                }
            });
            if (isCampoPeso) {
                break;
            }
        }
        return isCampoPeso;
    };
    EtiquetaUtils.REGEX_BUSCA_VARIAVEL = /{{{[a-z]*}}}/ig;
    EtiquetaUtils.REGEX_IGNORA_CARACTERES_ESPECIAIS = /[^\w\s]/gi;
    return EtiquetaUtils;
}());
exports.EtiquetaUtils = EtiquetaUtils;
//# sourceMappingURL=etiqueta-utils.js.map