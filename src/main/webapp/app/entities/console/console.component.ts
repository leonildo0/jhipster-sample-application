import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IConsole } from 'app/shared/model/console.model';
import { Principal } from 'app/core';
import { ConsoleService } from './console.service';

@Component({
    selector: 'jhi-console',
    templateUrl: './console.component.html'
})
export class ConsoleComponent implements OnInit, OnDestroy {
    consoles: IConsole[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private consoleService: ConsoleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.consoleService.query().subscribe(
            (res: HttpResponse<IConsole[]>) => {
                this.consoles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInConsoles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IConsole) {
        return item.id;
    }

    registerChangeInConsoles() {
        this.eventSubscriber = this.eventManager.subscribe('consoleListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
