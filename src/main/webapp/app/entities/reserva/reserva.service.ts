import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReserva } from 'app/shared/model/reserva.model';

type EntityResponseType = HttpResponse<IReserva>;
type EntityArrayResponseType = HttpResponse<IReserva[]>;

@Injectable({ providedIn: 'root' })
export class ReservaService {
    public resourceUrl = SERVER_API_URL + 'api/reservas';

    constructor(private http: HttpClient) {}

    create(reserva: IReserva): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reserva);
        return this.http
            .post<IReserva>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(reserva: IReserva): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reserva);
        return this.http
            .put<IReserva>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IReserva>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IReserva[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(reserva: IReserva): IReserva {
        const copy: IReserva = Object.assign({}, reserva, {
            dhReserva: reserva.dhReserva != null && reserva.dhReserva.isValid() ? reserva.dhReserva.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dhReserva = res.body.dhReserva != null ? moment(res.body.dhReserva) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((reserva: IReserva) => {
            reserva.dhReserva = reserva.dhReserva != null ? moment(reserva.dhReserva) : null;
        });
        return res;
    }
}