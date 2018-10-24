import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPremium } from 'app/shared/model/premium.model';

type EntityResponseType = HttpResponse<IPremium>;
type EntityArrayResponseType = HttpResponse<IPremium[]>;

@Injectable({ providedIn: 'root' })
export class PremiumService {
    public resourceUrl = SERVER_API_URL + 'api/premiums';

    constructor(private http: HttpClient) {}

    create(premium: IPremium): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(premium);
        return this.http
            .post<IPremium>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(premium: IPremium): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(premium);
        return this.http
            .put<IPremium>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPremium>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPremium[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(premium: IPremium): IPremium {
        const copy: IPremium = Object.assign({}, premium, {
            dIncio: premium.dIncio != null && premium.dIncio.isValid() ? premium.dIncio.format(DATE_FORMAT) : null,
            dFim: premium.dFim != null && premium.dFim.isValid() ? premium.dFim.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dIncio = res.body.dIncio != null ? moment(res.body.dIncio) : null;
        res.body.dFim = res.body.dFim != null ? moment(res.body.dFim) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((premium: IPremium) => {
            premium.dIncio = premium.dIncio != null ? moment(premium.dIncio) : null;
            premium.dFim = premium.dFim != null ? moment(premium.dFim) : null;
        });
        return res;
    }
}
