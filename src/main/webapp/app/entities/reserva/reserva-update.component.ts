import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IReserva } from 'app/shared/model/reserva.model';
import { ReservaService } from './reserva.service';
import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from 'app/entities/usuario';
import { IAdministrador } from 'app/shared/model/administrador.model';
import { AdministradorService } from 'app/entities/administrador';
import { ITorneio } from 'app/shared/model/torneio.model';
import { TorneioService } from 'app/entities/torneio';

@Component({
    selector: 'jhi-reserva-update',
    templateUrl: './reserva-update.component.html'
})
export class ReservaUpdateComponent implements OnInit {
    reserva: IReserva;
    isSaving: boolean;

    usuarios: IUsuario[];

    administradors: IAdministrador[];

    torneios: ITorneio[];
    dhReservaDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private reservaService: ReservaService,
        private usuarioService: UsuarioService,
        private administradorService: AdministradorService,
        private torneioService: TorneioService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ reserva }) => {
            this.reserva = reserva;
        });
        this.usuarioService.query().subscribe(
            (res: HttpResponse<IUsuario[]>) => {
                this.usuarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.administradorService.query().subscribe(
            (res: HttpResponse<IAdministrador[]>) => {
                this.administradors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.torneioService.query().subscribe(
            (res: HttpResponse<ITorneio[]>) => {
                this.torneios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.reserva.id !== undefined) {
            this.subscribeToSaveResponse(this.reservaService.update(this.reserva));
        } else {
            this.subscribeToSaveResponse(this.reservaService.create(this.reserva));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReserva>>) {
        result.subscribe((res: HttpResponse<IReserva>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUsuarioById(index: number, item: IUsuario) {
        return item.id;
    }

    trackAdministradorById(index: number, item: IAdministrador) {
        return item.id;
    }

    trackTorneioById(index: number, item: ITorneio) {
        return item.id;
    }
}
