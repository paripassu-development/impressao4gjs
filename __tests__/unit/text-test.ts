import "../../node_modules/@types/jest/index.d.ts";
import {validateModel} from "../../www/label/text";

describe("#validateModel()", () => {

    const NO_ERRORS = {
        "tipo": "texto",
        "fonte": {
            "nome": "Consolas",
            "alturaMm": 1.9,
            "forcaContorno": 0.7,
        },
        "valor": "{{{infoConsumo}}}",
        "posicao": {
            "xMm": 8,
            "yMm": 86,
        },
        "dimensoes": {
            "larguraMaximaMm": 45,
        },
        "fn": "caixaAlta",
    };

    const ERRORS = {
        "tipo": "texto",
        "fonte": {
            "alturaMm": 1.9,
            "forcaContorno": 0.7,
        },
        "posicao": {
            "xMm": 8,
            "yMm": "asd1",
        },
        "dimensoes": {
        },
        "fn": "caixaAlta",
    };

    it("errors.length = 0", () => {
        const errors = validateModel(NO_ERRORS);
        expect(errors.length).toEqual(0);
    });

    it("errors.length > 0", () => {
        const errors = validateModel(ERRORS);
        expect(errors.length).toEqual(4);
    });

});
