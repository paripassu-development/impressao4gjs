import "../../node_modules/@types/jest/index.d.ts";
import {validateModel} from "../../www/label/barra-origem-rastreada";

describe("#validateModel()", () => {

    const NO_ERRORS = {
        "tipo": "barraOrigemRastreada",
        "fonte": {
            "nome": "Consolas",
            "negrito": false,
            "forcaContorno": 1.3,
        },
        "posicao": {
            "xMm": 5,
            "yMm": 45,
        },
        "dimensoes": {
            "alturaMm": 3,
            "larguraMm": 108,
        },
    };

    const ERRORS = {
        "tipo": "barraOrigemRastreada",
        "fonte": {
            "nome": "Consolas",
        },
        "posicao": {
            "yMm": "asdsa",
        },
        "dimensoes": {
            "alturaMm": 3,
        },
    };

    it("errors.length = 0", () => {
        const errors = validateModel(NO_ERRORS);
        expect(errors.length).toEqual(0);
    });

    it("errors.length > 0", () => {
        const errors = validateModel(ERRORS);
        expect(errors.length).toEqual(2);
    });

});
