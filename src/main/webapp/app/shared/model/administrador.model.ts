import { IReserva } from 'app/shared/model//reserva.model';
import { ITorneio } from 'app/shared/model//torneio.model';

export interface IAdministrador {
    id?: number;
    login?: string;
    senha?: string;
    name?: string;
    reservas?: IReserva[];
    torneios?: ITorneio[];
}

export class Administrador implements IAdministrador {
    constructor(
        public id?: number,
        public login?: string,
        public senha?: string,
        public name?: string,
        public reservas?: IReserva[],
        public torneios?: ITorneio[]
    ) {}
}
