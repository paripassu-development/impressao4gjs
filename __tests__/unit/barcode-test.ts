import "../../node_modules/@types/jest/index.d.ts";
import {validateModel} from "../../www/label/barcode";

describe("#validateModel()", () => {

    const NO_ERRORS = {
        "tipo": "codigoBarras",
        "fonte": {
            "nome": "Consolas",
            "alturaMm": 3,
        },
        "valor": "{{{ean13}}}",
        "posicao": {
            "xMm": 72,
            "yMm": 33,
        },
        "dimensoes": {
            "alturaCodigoBarrasMm": 7,
            "larguraUnitariaCodigoBarrasMm": 0.3,
        },
        "tipoCodigoBarras": "{{{tipoCodigoBarras}}}",
    };

    const ERRORS = {
        "tipo": "codigoBarras",
        "valor": "{{{ean13}}}",
        "posicao": {
            "xMm": "asd",
            "yMm": 33,
        },
        "dimensoes": {
            "alturaCodigoBarrasMm": 7,
            "larguraUnitariaCodigoBarrasMm": 0.3,
        },
        "tipoCodigoBarras": "{{{tipoCodigoBarras}}}",
        "mostraTexto": true,
    };

    it("errors.length = 0", () => {
        const errors = validateModel(NO_ERRORS);
        expect(errors.length).toEqual(0);
    });

    it("errors.length > 0", () => {
        const errors = validateModel(ERRORS);
        expect(errors.length).toEqual(3);
    });

});
