import { Moment } from 'moment';
import { IReserva } from 'app/shared/model//reserva.model';
import { IUsuario } from 'app/shared/model//usuario.model';
import { IComputador } from 'app/shared/model//computador.model';

export interface ISessao {
    id?: number;
    data?: Moment;
    hInicio?: number;
    reserva?: IReserva;
    usuarios?: IUsuario[];
    computadors?: IComputador[];
}

export class Sessao implements ISessao {
    constructor(
        public id?: number,
        public data?: Moment,
        public hInicio?: number,
        public reserva?: IReserva,
        public usuarios?: IUsuario[],
        public computadors?: IComputador[]
    ) {}
}
