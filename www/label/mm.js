"use strict";
exports.__esModule = true;
var mmPartial = function (dpi) {
    return function (mm) {
        var MM_INCH_RATIO = 25.4;
        var ppm = dpi / MM_INCH_RATIO;
        return mm * ppm;
    };
};
exports.mmPartial = mmPartial;
//# sourceMappingURL=mm.js.map