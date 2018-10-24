import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISessao } from 'app/shared/model/sessao.model';
import { Principal } from 'app/core';
import { SessaoService } from './sessao.service';

@Component({
    selector: 'jhi-sessao',
    templateUrl: './sessao.component.html'
})
export class SessaoComponent implements OnInit, OnDestroy {
    sessaos: ISessao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sessaoService: SessaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.sessaoService.query().subscribe(
            (res: HttpResponse<ISessao[]>) => {
                this.sessaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSessaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISessao) {
        return item.id;
    }

    registerChangeInSessaos() {
        this.eventSubscriber = this.eventManager.subscribe('sessaoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
