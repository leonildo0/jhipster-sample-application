import { IReserva } from 'app/shared/model//reserva.model';
import { ISessao } from 'app/shared/model//sessao.model';

export interface IComputador {
    id?: number;
    jogos?: string;
    programas?: string;
    preco?: number;
    reserva?: IReserva;
    sessaos?: ISessao[];
}

export class Computador implements IComputador {
    constructor(
        public id?: number,
        public jogos?: string,
        public programas?: string,
        public preco?: number,
        public reserva?: IReserva,
        public sessaos?: ISessao[]
    ) {}
}
