"use strict";
exports.__esModule = true;
var DrawUtils = /** @class */ (function () {
    function DrawUtils(ctx) {
        this.ctx = ctx;
    }
    DrawUtils.prototype.polygon = function (coordenadas, corPreenchimento) {
        var _this = this;
        this.ctx.beginPath();
        coordenadas.forEach(function (coordenada) {
            _this.ctx.lineTo(coordenada.x, coordenada.y);
        });
        this.ctx.closePath();
        this.ctx.fillStyle = corPreenchimento;
        this.ctx.fill();
    };
    return DrawUtils;
}());
exports.DrawUtils = DrawUtils;
//# sourceMappingURL=draw-utils.js.map