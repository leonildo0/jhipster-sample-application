import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILanchonete } from 'app/shared/model/lanchonete.model';

type EntityResponseType = HttpResponse<ILanchonete>;
type EntityArrayResponseType = HttpResponse<ILanchonete[]>;

@Injectable({ providedIn: 'root' })
export class LanchoneteService {
    public resourceUrl = SERVER_API_URL + 'api/lanchonetes';

    constructor(private http: HttpClient) {}

    create(lanchonete: ILanchonete): Observable<EntityResponseType> {
        return this.http.post<ILanchonete>(this.resourceUrl, lanchonete, { observe: 'response' });
    }

    update(lanchonete: ILanchonete): Observable<EntityResponseType> {
        return this.http.put<ILanchonete>(this.resourceUrl, lanchonete, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILanchonete>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILanchonete[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
