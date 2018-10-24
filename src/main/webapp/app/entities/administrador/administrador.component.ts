import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAdministrador } from 'app/shared/model/administrador.model';
import { Principal } from 'app/core';
import { AdministradorService } from './administrador.service';

@Component({
    selector: 'jhi-administrador',
    templateUrl: './administrador.component.html'
})
export class AdministradorComponent implements OnInit, OnDestroy {
    administradors: IAdministrador[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private administradorService: AdministradorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.administradorService.query().subscribe(
            (res: HttpResponse<IAdministrador[]>) => {
                this.administradors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAdministradors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAdministrador) {
        return item.id;
    }

    registerChangeInAdministradors() {
        this.eventSubscriber = this.eventManager.subscribe('administradorListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
