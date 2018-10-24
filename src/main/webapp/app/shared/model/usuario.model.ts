import { IReserva } from 'app/shared/model//reserva.model';
import { IInscricao } from 'app/shared/model//inscricao.model';
import { ILanchonete } from 'app/shared/model//lanchonete.model';
import { IConsole } from 'app/shared/model//console.model';
import { ISessao } from 'app/shared/model//sessao.model';

export interface IUsuario {
    id?: number;
    login?: string;
    senha?: string;
    name?: string;
    credito?: number;
    vip?: boolean;
    reservas?: IReserva[];
    inscricaos?: IInscricao[];
    lanchonetes?: ILanchonete[];
    consoles?: IConsole[];
    sessaos?: ISessao[];
}

export class Usuario implements IUsuario {
    constructor(
        public id?: number,
        public login?: string,
        public senha?: string,
        public name?: string,
        public credito?: number,
        public vip?: boolean,
        public reservas?: IReserva[],
        public inscricaos?: IInscricao[],
        public lanchonetes?: ILanchonete[],
        public consoles?: IConsole[],
        public sessaos?: ISessao[]
    ) {
        this.vip = this.vip || false;
    }
}
