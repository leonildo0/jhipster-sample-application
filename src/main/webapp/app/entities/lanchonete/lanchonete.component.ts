import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILanchonete } from 'app/shared/model/lanchonete.model';
import { Principal } from 'app/core';
import { LanchoneteService } from './lanchonete.service';

@Component({
    selector: 'jhi-lanchonete',
    templateUrl: './lanchonete.component.html'
})
export class LanchoneteComponent implements OnInit, OnDestroy {
    lanchonetes: ILanchonete[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private lanchoneteService: LanchoneteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.lanchoneteService.query().subscribe(
            (res: HttpResponse<ILanchonete[]>) => {
                this.lanchonetes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLanchonetes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILanchonete) {
        return item.id;
    }

    registerChangeInLanchonetes() {
        this.eventSubscriber = this.eventManager.subscribe('lanchoneteListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
