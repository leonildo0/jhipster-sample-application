import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInscricao } from 'app/shared/model/inscricao.model';

type EntityResponseType = HttpResponse<IInscricao>;
type EntityArrayResponseType = HttpResponse<IInscricao[]>;

@Injectable({ providedIn: 'root' })
export class InscricaoService {
    public resourceUrl = SERVER_API_URL + 'api/inscricaos';

    constructor(private http: HttpClient) {}

    create(inscricao: IInscricao): Observable<EntityResponseType> {
        return this.http.post<IInscricao>(this.resourceUrl, inscricao, { observe: 'response' });
    }

    update(inscricao: IInscricao): Observable<EntityResponseType> {
        return this.http.put<IInscricao>(this.resourceUrl, inscricao, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IInscricao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInscricao[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
