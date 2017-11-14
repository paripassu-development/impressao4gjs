var Mustache = require("mustache");
var mm_1 = require("./mm");
var drawText = function (ctx, dpi, model, textBindings) {
    if (!isVariableBindingEmpty(model, textBindings)) {
        var mm = mm_1.mmPartial(dpi);
        var degrees = model.posicao.rotacao || 0;
        ctx.save();
        ctx.textAlign = model.posicao.alinhar || "start";
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.rotate(degrees * Math.PI / 180);
        ctx.font = (model.fonte.negrito ? "bold" : "") + " " + mm(model.fonte.alturaMm) + "px " + model.fonte.nome;
        var renderedText = textBindings ? Mustache.render(model.valor, textBindings) : model.valor.replace("{{{", "<").replace("}}}", ">");
        if (textFunctions[model.fn] && textBindings) {
            renderedText = textFunctions[model.fn](renderedText);
        }
        ctx.lineWidth = model.fonte.forcaContorno || 0;
        ctx.strokeText(renderedText, mm(model.posicao.xMm), mm(model.posicao.yMm), mm(model.dimensoes.larguraMaximaMm));
        ctx.fillText(renderedText, mm(model.posicao.xMm), mm(model.posicao.yMm), mm(model.dimensoes.larguraMaximaMm));
        ctx.restore();
    }
};
var isVariableBindingEmpty = function (model, textBindings) {
    var valor = model.valor;
    if (textBindings && indexStartVariable(valor) > 0 && indexLastVariable(valor) > 0) {
        var variable = valor.substr(indexStartVariable(valor), indexLastVariable(valor));
        return !Mustache.render(variable, textBindings);
    }
    return false;
};
var indexStartVariable = function (valor) {
    return valor.indexOf('{');
};
var indexLastVariable = function (valor) {
    return valor.lastIndexOf('}');
};
var textFunctions = {
    "caixaAlta": function (text) { return text.toUpperCase(); }
};
exports.text = { drawText: drawText };
//# sourceMappingURL=text.js.map