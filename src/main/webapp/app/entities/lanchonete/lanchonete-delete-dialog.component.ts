import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILanchonete } from 'app/shared/model/lanchonete.model';
import { LanchoneteService } from './lanchonete.service';

@Component({
    selector: 'jhi-lanchonete-delete-dialog',
    templateUrl: './lanchonete-delete-dialog.component.html'
})
export class LanchoneteDeleteDialogComponent {
    lanchonete: ILanchonete;

    constructor(private lanchoneteService: LanchoneteService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lanchoneteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'lanchoneteListModification',
                content: 'Deleted an lanchonete'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lanchonete-delete-popup',
    template: ''
})
export class LanchoneteDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ lanchonete }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LanchoneteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.lanchonete = lanchonete;
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
