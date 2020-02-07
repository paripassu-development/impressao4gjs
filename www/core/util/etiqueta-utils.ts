import {Error} from "../common/error";
import * as _ from "lodash";
import {ErrosPrefix, TipoError} from "../constants/constants-impressao";


export class EtiquetaUtils {


    private static REGEX_BUSCA_VARIAVEL = /{{{[a-z]*}}}/i;
    private static REGEX_IGNORA_CARACTERES_ESPECIAIS = /[^\w\s]/gi;

    private static VARIAVEIS_PESO: string[] = [
        "campoPesoLiquidoNutricional",
        "pesoLiquidoNutricional",
        "pesoLiquidoAgranelNutricional",
        "pesoLiquido",
        "pesoLiquidoAgranel",
        "pesoLiquidoNumerico"
    ];

    public static isCampoPeso(valor: string) {
        const variaveis = valor.match(this.REGEX_BUSCA_VARIAVEL);
        // @ts-ignore
        return !!variaveis && variaveis.some((variavelNoTexto: string) => {
            return this.VARIAVEIS_PESO.some((variavelPeso: string) => {
                return variavelNoTexto.replace(this.REGEX_IGNORA_CARACTERES_ESPECIAIS, '') === variavelPeso;
            })
        });
    }

}

