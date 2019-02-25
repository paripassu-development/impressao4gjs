import "../../node_modules/@types/jest/index.d.ts";
import {validateModel} from "../../www/label/qrcode";

describe("#validateModel()", () => {

    const NO_ERRORS = {
        "tipo": "qrcode",
        "valor": "{{{urlQrCode}}}",
        "posicao": {
            "xMm": 90,
            "yMm": 2.6,
        },
        "dimensoes": {
            "alturaMm": 23,
            "larguraMm": 23,
        },
    };

    const ERRORS = {
        "tipo": "qrcode",
        "valor": "",
        "dimensoes": {
            "alturaMm": 23,
            "larguraMm": "dsadsa",
        },
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
