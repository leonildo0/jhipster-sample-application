import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IInscricao } from 'app/shared/model/inscricao.model';
import { InscricaoService } from './inscricao.service';
import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from 'app/entities/usuario';
import { ITorneio } from 'app/shared/model/torneio.model';
import { TorneioService } from 'app/entities/torneio';

@Component({
    selector: 'jhi-inscricao-update',
    templateUrl: './inscricao-update.component.html'
})
export class InscricaoUpdateComponent implements OnInit {
    inscricao: IInscricao;
    isSaving: boolean;

    usuarios: IUsuario[];

    torneios: ITorneio[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private inscricaoService: InscricaoService,
        private usuarioService: UsuarioService,
        private torneioService: TorneioService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ inscricao }) => {
            this.inscricao = inscricao;
        });
        this.usuarioService.query().subscribe(
            (res: HttpResponse<IUsuario[]>) => {
                this.usuarios = res.body;
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
        if (this.inscricao.id !== undefined) {
            this.subscribeToSaveResponse(this.inscricaoService.update(this.inscricao));
        } else {
            this.subscribeToSaveResponse(this.inscricaoService.create(this.inscricao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInscricao>>) {
        result.subscribe((res: HttpResponse<IInscricao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTorneioById(index: number, item: ITorneio) {
        return item.id;
    }
}
