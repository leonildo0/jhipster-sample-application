import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPremium } from 'app/shared/model/premium.model';
import { Principal } from 'app/core';
import { PremiumService } from './premium.service';

@Component({
    selector: 'jhi-premium',
    templateUrl: './premium.component.html'
})
export class PremiumComponent implements OnInit, OnDestroy {
    premiums: IPremium[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private premiumService: PremiumService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.premiumService.query().subscribe(
            (res: HttpResponse<IPremium[]>) => {
                this.premiums = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPremiums();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPremium) {
        return item.id;
    }

    registerChangeInPremiums() {
        this.eventSubscriber = this.eventManager.subscribe('premiumListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
