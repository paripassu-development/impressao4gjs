"use strict";
exports.__esModule = true;
var Mustache = require("mustache");
function fillTemplate(valor, textBindings) {
    return textBindings ? Mustache.render(valor, textBindings) : valor.replace(/{{{/g, "<").replace(/}}}/g, ">");
}
exports.fillTemplate = fillTemplate;
function getOrDefault(object, param) {
    return object[param] ? object[param] : "<" + param + ">";
}
exports.getOrDefault = getOrDefault;
//# sourceMappingURL=param-utils.js.map