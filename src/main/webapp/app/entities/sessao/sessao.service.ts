import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISessao } from 'app/shared/model/sessao.model';

type EntityResponseType = HttpResponse<ISessao>;
type EntityArrayResponseType = HttpResponse<ISessao[]>;

@Injectable({ providedIn: 'root' })
export class SessaoService {
    public resourceUrl = SERVER_API_URL + 'api/sessaos';

    constructor(private http: HttpClient) {}

    create(sessao: ISessao): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sessao);
        return this.http
            .post<ISessao>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(sessao: ISessao): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sessao);
        return this.http
            .put<ISessao>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISessao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISessao[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(sessao: ISessao): ISessao {
        const copy: ISessao = Object.assign({}, sessao, {
            data: sessao.data != null && sessao.data.isValid() ? sessao.data.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.data = res.body.data != null ? moment(res.body.data) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((sessao: ISessao) => {
            sessao.data = sessao.data != null ? moment(sessao.data) : null;
        });
        return res;
    }
}
