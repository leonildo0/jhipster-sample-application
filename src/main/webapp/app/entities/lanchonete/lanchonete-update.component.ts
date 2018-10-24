import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILanchonete } from 'app/shared/model/lanchonete.model';
import { LanchoneteService } from './lanchonete.service';
import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from 'app/entities/usuario';

@Component({
    selector: 'jhi-lanchonete-update',
    templateUrl: './lanchonete-update.component.html'
})
export class LanchoneteUpdateComponent implements OnInit {
    lanchonete: ILanchonete;
    isSaving: boolean;

    usuarios: IUsuario[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private lanchoneteService: LanchoneteService,
        private usuarioService: UsuarioService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ lanchonete }) => {
            this.lanchonete = lanchonete;
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
        if (this.lanchonete.id !== undefined) {
            this.subscribeToSaveResponse(this.lanchoneteService.update(this.lanchonete));
        } else {
            this.subscribeToSaveResponse(this.lanchoneteService.create(this.lanchonete));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILanchonete>>) {
        result.subscribe((res: HttpResponse<ILanchonete>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
