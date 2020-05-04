import {barcode} from "../../label/barcode";
import {DUN14_4G, EAN13_DEFAULT, ITF14_DEFAULT} from "../../label";

describe("barcode util", () => {
    it("valid ean", () => {
        expect(barcode.isValid(EAN13_DEFAULT, "123")).toBeTruthy();
        expect(barcode.isValid(EAN13_DEFAULT, "0123")).toBeTruthy();
        /*TODO verificar se esse caso faz sentido - 1 caracter a menos que o tamanho (13) não está sendo tratado
        expect(barcode.isValid(EAN13_DEFAULT, "000000000123")).toBeTruthy();
        */
        expect(barcode.isValid(EAN13_DEFAULT, "0000000000123")).toBeTruthy();
        expect(barcode.isValid(EAN13_DEFAULT, "00000000000123")).toBeTruthy();
        expect(barcode.isValid(EAN13_DEFAULT, "07898507968724")).toBeTruthy();
    });

    it("invalid ean", () => {
        expect(barcode.isValid(EAN13_DEFAULT, null)).toBeFalsy();
        expect(barcode.isValid(EAN13_DEFAULT, undefined)).toBeFalsy();
        expect(barcode.isValid(EAN13_DEFAULT, "")).toBeFalsy();
        expect(barcode.isValid(EAN13_DEFAULT, "1234")).toBeFalsy();
        expect(barcode.isValid(EAN13_DEFAULT, "17895000441607")).toBeFalsy();
    });

    it("valid dun", () => {
        expect(barcode.isValid(DUN14_4G, "123")).toBeTruthy();
        expect(barcode.isValid(ITF14_DEFAULT, "123")).toBeTruthy();
        expect(barcode.isValid(DUN14_4G, "0123")).toBeTruthy();
        expect(barcode.isValid(ITF14_DEFAULT, "0123")).toBeTruthy();
        /*TODO verificar se esse caso faz sentido - 1 caracter a menos que o tamanho (14) não está sendo tratado
        expect(barcode.isValid(DUN14_4G, "0000000000123")).toBeTruthy();
        expect(barcode.isValid(ITF14_DEFAULT, "0000000000123")).toBeTruthy();
        */
        expect(barcode.isValid(DUN14_4G, "00000000000123")).toBeTruthy();
        expect(barcode.isValid(ITF14_DEFAULT, "00000000000123")).toBeTruthy();
        expect(barcode.isValid(DUN14_4G, "07898507968724")).toBeTruthy();
        expect(barcode.isValid(ITF14_DEFAULT, "07898507968724")).toBeTruthy();
        expect(barcode.isValid(DUN14_4G, "17895000441607")).toBeTruthy();
        expect(barcode.isValid(ITF14_DEFAULT, "17895000441607")).toBeTruthy();
    });

    it("invalid dun", () => {
        expect(barcode.isValid(DUN14_4G, null)).toBeFalsy();
        expect(barcode.isValid(DUN14_4G, undefined)).toBeFalsy();
        expect(barcode.isValid(DUN14_4G, "")).toBeFalsy();
        expect(barcode.isValid(DUN14_4G, "1234")).toBeFalsy();
        expect(barcode.isValid(ITF14_DEFAULT, "1234")).toBeFalsy();
        expect(barcode.isValid(DUN14_4G, "17898507968724")).toBeFalsy();
        expect(barcode.isValid(ITF14_DEFAULT, "17898507968724")).toBeFalsy();
    });

    it("invalid sem tipo", () => {
        expect(barcode.isValid(null, "123")).toBeFalsy();
        expect(barcode.isValid(undefined, "123")).toBeFalsy();
        expect(barcode.isValid("", "123")).toBeFalsy();
    });

    it("generate codigo value ean", () => {
        expect(barcode.generateCodigoValue(EAN13_DEFAULT, "123")).toEqual("0000000000123");
        expect(barcode.generateCodigoValue(EAN13_DEFAULT, "0123")).toEqual("0000000000123");
        expect(barcode.generateCodigoValue(EAN13_DEFAULT, "0000000000123")).toEqual("0000000000123");
        expect(barcode.generateCodigoValue(EAN13_DEFAULT, "00000000000123")).toEqual("0000000000123");
        expect(barcode.generateCodigoValue(EAN13_DEFAULT, "07898507968724")).toEqual("7898507968724");
        expect(barcode.generateCodigoValue(EAN13_DEFAULT, "17895000441607")).toEqual("7895000441600");

    });

    it("generate codigo value dun", () => {
        expect(barcode.generateCodigoValue(DUN14_4G, "123")).toEqual("00000000000123");
        expect(barcode.generateCodigoValue(ITF14_DEFAULT, "123")).toEqual("00000000000123");
        expect(barcode.generateCodigoValue(DUN14_4G, "0123")).toEqual("00000000000123");
        expect(barcode.generateCodigoValue(ITF14_DEFAULT, "0123")).toEqual("00000000000123");
        expect(barcode.generateCodigoValue(DUN14_4G, "00000000000123")).toEqual("00000000000123");
        expect(barcode.generateCodigoValue(ITF14_DEFAULT, "00000000000123")).toEqual("00000000000123");
        expect(barcode.generateCodigoValue(DUN14_4G, "07898507968724")).toEqual("07898507968724");
        expect(barcode.generateCodigoValue(ITF14_DEFAULT, "07898507968724")).toEqual("07898507968724");
        expect(barcode.generateCodigoValue(DUN14_4G, "17895000441607")).toEqual("17895000441607");
        expect(barcode.generateCodigoValue(ITF14_DEFAULT, "17895000441607")).toEqual("17895000441607");
        expect(barcode.generateCodigoValue(DUN14_4G, "12345678912345")).toEqual("12345678912343");
        expect(barcode.generateCodigoValue(ITF14_DEFAULT, "12345678912345")).toEqual("12345678912343");
    });

    it("remover zeros a esquerda", () => {
        expect(barcode.visibleForTesting.removeZerosEsquerda("0")).toEqual("");
        expect(barcode.visibleForTesting.removeZerosEsquerda("01")).toEqual("1");
        expect(barcode.visibleForTesting.removeZerosEsquerda("0000000001")).toEqual("1");
        expect(barcode.visibleForTesting.removeZerosEsquerda("10")).toEqual("10");
        expect(barcode.visibleForTesting.removeZerosEsquerda("010")).toEqual("10");
        expect(barcode.visibleForTesting.removeZerosEsquerda("101")).toEqual("101");
        expect(barcode.visibleForTesting.removeZerosEsquerda("11")).toEqual("11");
    });

    it("checksum ean", () => {
        expect(barcode.visibleForTesting.checksumEan13("000000000012")).toEqual(3);
        expect(barcode.visibleForTesting.checksumEan13("789850796872")).toEqual(4);
    });

    it("checksum dun", () => {
        expect(barcode.visibleForTesting.checksumDun14("0000000000012")).toEqual(3);
        expect(barcode.visibleForTesting.checksumDun14("0789850796872")).toEqual(4);
        expect(barcode.visibleForTesting.checksumDun14("1234567891234")).toEqual(3);
    });

    it("format ean", () => {
        expect(barcode.visibleForTesting.formatEan13("123")).toEqual("000000000012");
        expect(barcode.visibleForTesting.formatEan13("0123")).toEqual("000000000012");
        expect(barcode.visibleForTesting.formatEan13("0000123")).toEqual("000000000012");
        expect(barcode.visibleForTesting.formatEan13("000000000012")).toEqual("000000000012");
        expect(barcode.visibleForTesting.formatEan13("0000000000123")).toEqual("000000000012");
        expect(barcode.visibleForTesting.formatEan13("00000000000123")).toEqual("000000000012");
        expect(barcode.visibleForTesting.formatEan13("00000000000123000000000000")).toEqual("000000000012");
        expect(barcode.visibleForTesting.formatEan13("178985079687")).toEqual("178985079687");
        expect(barcode.visibleForTesting.formatEan13("1789850796872")).toEqual("178985079687");
        expect(barcode.visibleForTesting.formatEan13("17898507968720")).toEqual("789850796872");
        expect(barcode.visibleForTesting.formatEan13("178985079687200")).toEqual("789850796872");
    });


    it("format dun", () => {
        expect(barcode.visibleForTesting.formatDun14( "123")).toEqual("0000000000012");
        expect(barcode.visibleForTesting.formatDun14( "0123")).toEqual("0000000000012");
        expect(barcode.visibleForTesting.formatDun14( "0000123")).toEqual("0000000000012");
        expect(barcode.visibleForTesting.formatDun14( "0000000000012")).toEqual("0000000000012");
        expect(barcode.visibleForTesting.formatDun14( "00000000000123")).toEqual("0000000000012");
        expect(barcode.visibleForTesting.formatDun14( "000000000000123")).toEqual("0000000000012");
        expect(barcode.visibleForTesting.formatDun14( "000000000000123000000000000")).toEqual("0000000000012");
        expect(barcode.visibleForTesting.formatDun14("1078985079687")).toEqual("1078985079687");
        expect(barcode.visibleForTesting.formatDun14("10789850796872")).toEqual("1078985079687");
        expect(barcode.visibleForTesting.formatDun14("107898507968720")).toEqual("0789850796872");
        expect(barcode.visibleForTesting.formatDun14("1078985079687200")).toEqual("0789850796872");
    });
});
