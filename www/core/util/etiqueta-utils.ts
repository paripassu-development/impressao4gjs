import {Error} from "../common/error";
import * as _ from "lodash";
import {ErrosPrefix, TipoError} from "../constants/constants-impressao";


export class EtiquetaUtils {


    private static REGEX_BUSCA_VARIAVEL = /{{{[a-z]*}}}/ig;
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
        let isCampoPeso = false;
        let match;

        while ((match = this.REGEX_BUSCA_VARIAVEL.exec(valor)) !== null) {
            if (match.index === this.REGEX_BUSCA_VARIAVEL.lastIndex) {
                this.REGEX_BUSCA_VARIAVEL.lastIndex++;
            }

            match.forEach((matchResult, groupIndex) => {
                if (this.VARIAVEIS_PESO.some((variavelPeso: string) => {
                    return matchResult.replace(this.REGEX_IGNORA_CARACTERES_ESPECIAIS, '') === variavelPeso;
                })) {
                    isCampoPeso = true;
                }
            });
            if(isCampoPeso) {
                break;
            }
        }

        return isCampoPeso;
    }

}

