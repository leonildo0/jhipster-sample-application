import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConsole } from 'app/shared/model/console.model';
import { ConsoleService } from './console.service';

@Component({
    selector: 'jhi-console-delete-dialog',
    templateUrl: './console-delete-dialog.component.html'
})
export class ConsoleDeleteDialogComponent {
    console: IConsole;

    constructor(private consoleService: ConsoleService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.consoleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'consoleListModification',
                content: 'Deleted an console'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-console-delete-popup',
    template: ''
})
export class ConsoleDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ console }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ConsoleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.console = console;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
