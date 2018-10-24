import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConsole } from 'app/shared/model/console.model';

type EntityResponseType = HttpResponse<IConsole>;
type EntityArrayResponseType = HttpResponse<IConsole[]>;

@Injectable({ providedIn: 'root' })
export class ConsoleService {
    public resourceUrl = SERVER_API_URL + 'api/consoles';

    constructor(private http: HttpClient) {}

    create(console: IConsole): Observable<EntityResponseType> {
        return this.http.post<IConsole>(this.resourceUrl, console, { observe: 'response' });
    }

    update(console: IConsole): Observable<EntityResponseType> {
        return this.http.put<IConsole>(this.resourceUrl, console, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IConsole>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IConsole[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
