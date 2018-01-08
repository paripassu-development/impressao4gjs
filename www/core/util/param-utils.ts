import * as Mustache from "mustache";

export function fillTemplate(valor: string, textBindings: any) {
    return textBindings ? Mustache.render(valor, textBindings) : valor.replace(/{{{/g, "<").replace(/}}}/g, ">");
}

export function getOrDefault(object: any, param: string): string {
    return object[param] ? object[param] : "<" + param + ">";
}
