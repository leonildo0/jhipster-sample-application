import { IUsuario } from 'app/shared/model//usuario.model';

export interface ILanchonete {
    id?: number;
    bebidas?: string;
    lanches?: string;
    combos?: string;
    precos?: number;
    usuarios?: IUsuario[];
}

export class Lanchonete implements ILanchonete {
    constructor(
        public id?: number,
        public bebidas?: string,
        public lanches?: string,
        public combos?: string,
        public precos?: number,
        public usuarios?: IUsuario[]
    ) {}
}
