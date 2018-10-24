import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IComputador } from 'app/shared/model/computador.model';
import { ComputadorService } from './computador.service';
import { IReserva } from 'app/shared/model/reserva.model';
import { ReservaService } from 'app/entities/reserva';
import { ISessao } from 'app/shared/model/sessao.model';
import { SessaoService } from 'app/entities/sessao';

@Component({
    selector: 'jhi-computador-update',
    templateUrl: './computador-update.component.html'
})
export class ComputadorUpdateComponent implements OnInit {
    computador: IComputador;
    isSaving: boolean;

    reservas: IReserva[];

    sessaos: ISessao[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private computadorService: ComputadorService,
        private reservaService: ReservaService,
        private sessaoService: SessaoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ computador }) => {
            this.computador = computador;
        });
        this.reservaService.query().subscribe(
            (res: HttpResponse<IReserva[]>) => {
                this.reservas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.sessaoService.query().subscribe(
            (res: HttpResponse<ISessao[]>) => {
                this.sessaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.computador.id !== undefined) {
            this.subscribeToSaveResponse(this.computadorService.update(this.computador));
        } else {
            this.subscribeToSaveResponse(this.computadorService.create(this.computador));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IComputador>>) {
        result.subscribe((res: HttpResponse<IComputador>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackReservaById(index: number, item: IReserva) {
        return item.id;
    }

    trackSessaoById(index: number, item: ISessao) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
