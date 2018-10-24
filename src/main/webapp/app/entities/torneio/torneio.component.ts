import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITorneio } from 'app/shared/model/torneio.model';
import { Principal } from 'app/core';
import { TorneioService } from './torneio.service';

@Component({
    selector: 'jhi-torneio',
    templateUrl: './torneio.component.html'
})
export class TorneioComponent implements OnInit, OnDestroy {
    torneios: ITorneio[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private torneioService: TorneioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.torneioService.query().subscribe(
            (res: HttpResponse<ITorneio[]>) => {
                this.torneios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTorneios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITorneio) {
        return item.id;
    }

    registerChangeInTorneios() {
        this.eventSubscriber = this.eventManager.subscribe('torneioListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
