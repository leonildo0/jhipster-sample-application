import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IComputador } from 'app/shared/model/computador.model';
import { Principal } from 'app/core';
import { ComputadorService } from './computador.service';

@Component({
    selector: 'jhi-computador',
    templateUrl: './computador.component.html'
})
export class ComputadorComponent implements OnInit, OnDestroy {
    computadors: IComputador[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private computadorService: ComputadorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.computadorService.query().subscribe(
            (res: HttpResponse<IComputador[]>) => {
                this.computadors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInComputadors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IComputador) {
        return item.id;
    }

    registerChangeInComputadors() {
        this.eventSubscriber = this.eventManager.subscribe('computadorListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
