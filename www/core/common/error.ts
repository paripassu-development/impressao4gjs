import {TipoError} from "../constants/constants-impressao";

export class Error {
    private _token: string;
    private _name: string;
    private _campo: string;
    private _tipoError: TipoError;

    get token(): string {
        return this._token;
    }

    get name(): string {
        return this._name;
    }

    get campo(): string {
        return this._campo;
    }

    get tipoError(): TipoError {
        return this._tipoError;
    }

    public static build(token: string, name: string, tipoError: TipoError, campo?: string): Error {
        const error = new Error();
        error._name = name;
        error._token = token;
        error._tipoError = tipoError;
        error._campo = campo;
        return error;
    }

}