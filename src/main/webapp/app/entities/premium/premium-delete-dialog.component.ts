import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPremium } from 'app/shared/model/premium.model';
import { PremiumService } from './premium.service';

@Component({
    selector: 'jhi-premium-delete-dialog',
    templateUrl: './premium-delete-dialog.component.html'
})
export class PremiumDeleteDialogComponent {
    premium: IPremium;

    constructor(private premiumService: PremiumService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.premiumService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'premiumListModification',
                content: 'Deleted an premium'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-premium-delete-popup',
    template: ''
})
export class PremiumDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ premium }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PremiumDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.premium = premium;
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
