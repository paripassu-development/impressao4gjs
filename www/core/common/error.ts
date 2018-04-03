export class Error {
    private _token: string;
    private _name: string;
    private _campo: string;

    get token(): string {
        return this._token;
    }

    get name(): string {
        return this._name;
    }

    get campo(): string {
        return this._campo;
    }

    public static build(token: string, name: string, campo?: string): Error {
        const error = new Error();
        error._name = name;
        error._token = token;
        error._campo = campo;
        return error;
    }

}