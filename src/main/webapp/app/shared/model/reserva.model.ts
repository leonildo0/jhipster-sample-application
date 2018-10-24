import { Moment } from 'moment';
import { IComputador } from 'app/shared/model//computador.model';
import { IUsuario } from 'app/shared/model//usuario.model';
import { IAdministrador } from 'app/shared/model//administrador.model';
import { ITorneio } from 'app/shared/model//torneio.model';

export interface IReserva {
    id?: number;
    dhReserva?: Moment;
    hInicio?: number;
    hFim?: number;
    computadors?: IComputador[];
    usuario?: IUsuario;
    administrador?: IAdministrador;
    torneio?: ITorneio;
}

export class Reserva implements IReserva {
    constructor(
        public id?: number,
        public dhReserva?: Moment,
        public hInicio?: number,
        public hFim?: number,
        public computadors?: IComputador[],
        public usuario?: IUsuario,
        public administrador?: IAdministrador,
        public torneio?: ITorneio
    ) {}
}
