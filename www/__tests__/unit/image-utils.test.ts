import {
    buildNutricionalAltoTeor,
    converteQuantidadeNutricional,
    extraiUnidadePorcao,
    montagemTipoAltoTeor,
    validacaoListaNutricional,
} from "../../core/util/image-utils";
import {
    ALTO_TEOR_ACUCAR_GORDURA_SATURADA,
    ALTO_TEOR_ACUCAR_GORDURA_SATURADA_SODIO,
    ALTO_TEOR_ACUCAR_SODIO,
    ALTO_TEOR_GORDURA_SATURADA_SODIO,
    ALTO_TEOR_UNICO_ACUCAR,
    ALTO_TEOR_UNICO_GORDURA_SATURADA,
    ALTO_TEOR_UNICO_SODIO,
} from "../../core/constants/imagens-alto-teor";
import {ITEM_ACUCAR, ITEM_GORDURA_SATURADA, ITEM_SODIO} from "../../default";

const buildTextBindings = (sodio: string, acucar: string, gordura: string, porcao: string): any => ({
    porcaoNutricionalV2: porcao,
    parametrosPadroesNutricionalV2: [
        {rotulo: "Valor energético (kcal)", qt100: "505"},
        {rotulo: "  Açúcares adicionados (g)", qt100: acucar},
        {rotulo: " Gorduras saturadas (g)", qt100: gordura},
        {rotulo: "Sódio (mg)", qt100: sodio},
    ],
});

const selecionaSelo = (sodio: string, acucar: string, gordura: string, porcao: string): string =>
    montagemTipoAltoTeor(validacaoListaNutricional(buildNutricionalAltoTeor(buildTextBindings(sodio, acucar, gordura, porcao))));

describe("alto teor - escolha do selo", () => {
    it("escolhe cada um dos sete selos pela combinação de nutrientes no sólido", () => {
        expect(selecionaSelo("600", "0", "0", "100g")).toBe(ALTO_TEOR_UNICO_SODIO);
        expect(selecionaSelo("0", "15", "0", "100g")).toBe(ALTO_TEOR_UNICO_ACUCAR);
        expect(selecionaSelo("0", "0", "6", "100g")).toBe(ALTO_TEOR_UNICO_GORDURA_SATURADA);
        expect(selecionaSelo("600", "15", "0", "100g")).toBe(ALTO_TEOR_ACUCAR_SODIO);
        expect(selecionaSelo("600", "0", "6", "100g")).toBe(ALTO_TEOR_GORDURA_SATURADA_SODIO);
        expect(selecionaSelo("0", "15", "6", "100g")).toBe(ALTO_TEOR_ACUCAR_GORDURA_SATURADA);
        expect(selecionaSelo("600", "15", "6", "100g")).toBe(ALTO_TEOR_ACUCAR_GORDURA_SATURADA_SODIO);
    });

    it("não escolhe selo quando nenhum nutriente atinge o limite", () => {
        expect(selecionaSelo("599", "14.9", "5,9", "100g")).toBe("");
    });

    it("usa os limites do líquido quando a porção é em ml", () => {
        expect(selecionaSelo("300", "7,5", "3", "200 ml")).toBe(ALTO_TEOR_ACUCAR_GORDURA_SATURADA_SODIO);
        expect(selecionaSelo("299", "7.4", "2.9", "200 ml")).toBe("");
    });

    it("trata como sólido a porção em g com espaço ou decimal", () => {
        expect(selecionaSelo("300", "7,5", "3", "100 g")).toBe("");
        expect(selecionaSelo("300", "7,5", "3", "25,5 G")).toBe("");
        expect(selecionaSelo("600", "0", "0", "100 g")).toBe(ALTO_TEOR_UNICO_SODIO);
    });

    it("independe da ordem dos nutrientes na lista", () => {
        expect(montagemTipoAltoTeor([ITEM_SODIO, ITEM_GORDURA_SATURADA, ITEM_ACUCAR])).toBe(ALTO_TEOR_ACUCAR_GORDURA_SATURADA_SODIO);
    });

    it("gera os selos como data uri de svg", () => {
        expect(ALTO_TEOR_UNICO_SODIO.startsWith("data:image/svg+xml;charset=utf-8,%3Csvg")).toBeTruthy();
    });
});

describe("alto teor - leitura dos dados nutricionais", () => {
    it("devolve nulo sem os parâmetros nutricionais V2", () => {
        expect(buildNutricionalAltoTeor({})).toBeNull();
        expect(buildNutricionalAltoTeor(null)).toBeNull();
        expect(validacaoListaNutricional(null)).toEqual([]);
    });

    it("considera zero o nutriente ausente ou não numérico", () => {
        const nutricional = buildNutricionalAltoTeor({
            parametrosPadroesNutricionalV2: [{rotulo: "Sódio (mg)", qt100: "NÃO SE APLICA"}],
        });
        expect(nutricional.sodioQt100).toBe(0);
        expect(nutricional.acucaresAdicionadosQt100).toBe(0);
        expect(nutricional.unidadeTratada).toBe("");
    });

    it("converte quantidade com vírgula decimal", () => {
        expect(converteQuantidadeNutricional("7,5")).toBe(7.5);
        expect(converteQuantidadeNutricional(3)).toBe(3);
        expect(converteQuantidadeNutricional("")).toBe(0);
    });

    it("extrai a unidade da porção sem número nem espaço", () => {
        expect(extraiUnidadePorcao("100g")).toBe("g");
        expect(extraiUnidadePorcao("100 g")).toBe("g");
        expect(extraiUnidadePorcao("200 ml")).toBe("ml");
        expect(extraiUnidadePorcao(undefined)).toBe("");
    });
});
