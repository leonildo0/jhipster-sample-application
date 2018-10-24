import { IUsuario } from 'app/shared/model//usuario.model';

export interface IConsole {
    id?: number;
    jogos?: string;
    preco?: number;
    usuarios?: IUsuario[];
}

export class Console implements IConsole {
    constructor(public id?: number, public jogos?: string, public preco?: number, public usuarios?: IUsuario[]) {}
}
