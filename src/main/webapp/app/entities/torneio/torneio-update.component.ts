import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITorneio } from 'app/shared/model/torneio.model';
import { TorneioService } from './torneio.service';
import { IAdministrador } from 'app/shared/model/administrador.model';
import { AdministradorService } from 'app/entities/administrador';

@Component({
    selector: 'jhi-torneio-update',
    templateUrl: './torneio-update.component.html'
})
export class TorneioUpdateComponent implements OnInit {
    torneio: ITorneio;
    isSaving: boolean;

    administradors: IAdministrador[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private torneioService: TorneioService,
        private administradorService: AdministradorService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ torneio }) => {
            this.torneio = torneio;
        });
        this.administradorService.query().subscribe(
            (res: HttpResponse<IAdministrador[]>) => {
                this.administradors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.torneio.id !== undefined) {
            this.subscribeToSaveResponse(this.torneioService.update(this.torneio));
        } else {
            this.subscribeToSaveResponse(this.torneioService.create(this.torneio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITorneio>>) {
        result.subscribe((res: HttpResponse<ITorneio>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAdministradorById(index: number, item: IAdministrador) {
        return item.id;
    }
}
