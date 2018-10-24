import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IComputador } from 'app/shared/model/computador.model';

type EntityResponseType = HttpResponse<IComputador>;
type EntityArrayResponseType = HttpResponse<IComputador[]>;

@Injectable({ providedIn: 'root' })
export class ComputadorService {
    public resourceUrl = SERVER_API_URL + 'api/computadors';

    constructor(private http: HttpClient) {}

    create(computador: IComputador): Observable<EntityResponseType> {
        return this.http.post<IComputador>(this.resourceUrl, computador, { observe: 'response' });
    }

    update(computador: IComputador): Observable<EntityResponseType> {
        return this.http.put<IComputador>(this.resourceUrl, computador, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IComputador>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IComputador[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
