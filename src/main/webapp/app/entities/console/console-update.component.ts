import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IConsole } from 'app/shared/model/console.model';
import { ConsoleService } from './console.service';
import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from 'app/entities/usuario';

@Component({
    selector: 'jhi-console-update',
    templateUrl: './console-update.component.html'
})
export class ConsoleUpdateComponent implements OnInit {
    console: IConsole;
    isSaving: boolean;

    usuarios: IUsuario[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private consoleService: ConsoleService,
        private usuarioService: UsuarioService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ console }) => {
            this.console = console;
        });
        this.usuarioService.query().subscribe(
            (res: HttpResponse<IUsuario[]>) => {
                this.usuarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.console.id !== undefined) {
            this.subscribeToSaveResponse(this.consoleService.update(this.console));
        } else {
            this.subscribeToSaveResponse(this.consoleService.create(this.console));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IConsole>>) {
        result.subscribe((res: HttpResponse<IConsole>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
