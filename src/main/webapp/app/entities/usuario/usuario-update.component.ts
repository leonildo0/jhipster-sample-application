import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from './usuario.service';
import { ILanchonete } from 'app/shared/model/lanchonete.model';
import { LanchoneteService } from 'app/entities/lanchonete';
import { IConsole } from 'app/shared/model/console.model';
import { ConsoleService } from 'app/entities/console';
import { ISessao } from 'app/shared/model/sessao.model';
import { SessaoService } from 'app/entities/sessao';

@Component({
    selector: 'jhi-usuario-update',
    templateUrl: './usuario-update.component.html'
})
export class UsuarioUpdateComponent implements OnInit {
    usuario: IUsuario;
    isSaving: boolean;

    lanchonetes: ILanchonete[];

    consoles: IConsole[];

    sessaos: ISessao[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private usuarioService: UsuarioService,
        private lanchoneteService: LanchoneteService,
        private consoleService: ConsoleService,
        private sessaoService: SessaoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ usuario }) => {
            this.usuario = usuario;
        });
        this.lanchoneteService.query().subscribe(
            (res: HttpResponse<ILanchonete[]>) => {
                this.lanchonetes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.consoleService.query().subscribe(
            (res: HttpResponse<IConsole[]>) => {
                this.consoles = res.body;
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
        if (this.usuario.id !== undefined) {
            this.subscribeToSaveResponse(this.usuarioService.update(this.usuario));
        } else {
            this.subscribeToSaveResponse(this.usuarioService.create(this.usuario));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>) {
        result.subscribe((res: HttpResponse<IUsuario>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLanchoneteById(index: number, item: ILanchonete) {
        return item.id;
    }

    trackConsoleById(index: number, item: IConsole) {
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
