"use strict";
exports.__esModule = true;
var Error = /** @class */ (function () {
    function Error() {
    }
    Object.defineProperty(Error.prototype, "token", {
        get: function () {
            return this._token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Error.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Error.prototype, "campo", {
        get: function () {
            return this._campo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Error.prototype, "tipoError", {
        get: function () {
            return this._tipoError;
        },
        enumerable: true,
        configurable: true
    });
    Error.build = function (token, name, tipoError, campo) {
        var error = new Error();
        error._name = name;
        error._token = token;
        error._tipoError = tipoError;
        error._campo = campo;
        return error;
    };
    return Error;
}());
exports.Error = Error;
//# sourceMappingURL=error.js.map