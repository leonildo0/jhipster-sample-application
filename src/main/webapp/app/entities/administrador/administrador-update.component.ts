import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAdministrador } from 'app/shared/model/administrador.model';
import { AdministradorService } from './administrador.service';

@Component({
    selector: 'jhi-administrador-update',
    templateUrl: './administrador-update.component.html'
})
export class AdministradorUpdateComponent implements OnInit {
    administrador: IAdministrador;
    isSaving: boolean;

    constructor(private administradorService: AdministradorService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ administrador }) => {
            this.administrador = administrador;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.administrador.id !== undefined) {
            this.subscribeToSaveResponse(this.administradorService.update(this.administrador));
        } else {
            this.subscribeToSaveResponse(this.administradorService.create(this.administrador));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAdministrador>>) {
        result.subscribe((res: HttpResponse<IAdministrador>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
