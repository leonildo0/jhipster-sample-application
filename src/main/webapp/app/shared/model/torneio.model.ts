import { IReserva } from 'app/shared/model//reserva.model';
import { IInscricao } from 'app/shared/model//inscricao.model';
import { IAdministrador } from 'app/shared/model//administrador.model';

export interface ITorneio {
    id?: number;
    jogo?: string;
    categoria?: string;
    premiacao?: string;
    reservas?: IReserva[];
    inscricaos?: IInscricao[];
    administrador?: IAdministrador;
}

export class Torneio implements ITorneio {
    constructor(
        public id?: number,
        public jogo?: string,
        public categoria?: string,
        public premiacao?: string,
        public reservas?: IReserva[],
        public inscricaos?: IInscricao[],
        public administrador?: IAdministrador
    ) {}
}
