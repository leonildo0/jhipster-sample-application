import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { ISessao } from 'app/shared/model/sessao.model';
import { SessaoService } from './sessao.service';
import { IReserva } from 'app/shared/model/reserva.model';
import { ReservaService } from 'app/entities/reserva';
import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from 'app/entities/usuario';
import { IComputador } from 'app/shared/model/computador.model';
import { ComputadorService } from 'app/entities/computador';

@Component({
    selector: 'jhi-sessao-update',
    templateUrl: './sessao-update.component.html'
})
export class SessaoUpdateComponent implements OnInit {
    sessao: ISessao;
    isSaving: boolean;

    reservas: IReserva[];

    usuarios: IUsuario[];

    computadors: IComputador[];
    dataDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private sessaoService: SessaoService,
        private reservaService: ReservaService,
        private usuarioService: UsuarioService,
        private computadorService: ComputadorService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sessao }) => {
            this.sessao = sessao;
        });
        this.reservaService.query({ filter: 'sessao-is-null' }).subscribe(
            (res: HttpResponse<IReserva[]>) => {
                if (!this.sessao.reserva || !this.sessao.reserva.id) {
                    this.reservas = res.body;
                } else {
                    this.reservaService.find(this.sessao.reserva.id).subscribe(
                        (subRes: HttpResponse<IReserva>) => {
                            this.reservas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.usuarioService.query().subscribe(
            (res: HttpResponse<IUsuario[]>) => {
                this.usuarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.computadorService.query().subscribe(
            (res: HttpResponse<IComputador[]>) => {
                this.computadors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sessao.id !== undefined) {
            this.subscribeToSaveResponse(this.sessaoService.update(this.sessao));
        } else {
            this.subscribeToSaveResponse(this.sessaoService.create(this.sessao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISessao>>) {
        result.subscribe((res: HttpResponse<ISessao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUsuarioById(index: number, item: IUsuario) {
        return item.id;
    }

    trackComputadorById(index: number, item: IComputador) {
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
