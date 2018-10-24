import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInscricao } from 'app/shared/model/inscricao.model';
import { InscricaoService } from './inscricao.service';

@Component({
    selector: 'jhi-inscricao-delete-dialog',
    templateUrl: './inscricao-delete-dialog.component.html'
})
export class InscricaoDeleteDialogComponent {
    inscricao: IInscricao;

    constructor(private inscricaoService: InscricaoService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.inscricaoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'inscricaoListModification',
                content: 'Deleted an inscricao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-inscricao-delete-popup',
    template: ''
})
export class InscricaoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ inscricao }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InscricaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.inscricao = inscricao;
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
