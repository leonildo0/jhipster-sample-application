import { Moment } from 'moment';

export interface IPremium {
    id?: number;
    dIncio?: Moment;
    dFim?: Moment;
    desconto?: number;
}

export class Premium implements IPremium {
    constructor(public id?: number, public dIncio?: Moment, public dFim?: Moment, public desconto?: number) {}
}
