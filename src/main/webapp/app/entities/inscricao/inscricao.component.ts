import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInscricao } from 'app/shared/model/inscricao.model';
import { Principal } from 'app/core';
import { InscricaoService } from './inscricao.service';

@Component({
    selector: 'jhi-inscricao',
    templateUrl: './inscricao.component.html'
})
export class InscricaoComponent implements OnInit, OnDestroy {
    inscricaos: IInscricao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private inscricaoService: InscricaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.inscricaoService.query().subscribe(
            (res: HttpResponse<IInscricao[]>) => {
                this.inscricaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInscricaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInscricao) {
        return item.id;
    }

    registerChangeInInscricaos() {
        this.eventSubscriber = this.eventManager.subscribe('inscricaoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
