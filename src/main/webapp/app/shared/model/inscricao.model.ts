import { IUsuario } from 'app/shared/model//usuario.model';
import { ITorneio } from 'app/shared/model//torneio.model';

export interface IInscricao {
    id?: number;
    equipe?: string;
    usuario?: IUsuario;
    torneio?: ITorneio;
}

export class Inscricao implements IInscricao {
    constructor(public id?: number, public equipe?: string, public usuario?: IUsuario, public torneio?: ITorneio) {}
}
