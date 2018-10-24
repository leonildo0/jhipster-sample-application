import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInscricao } from 'app/shared/model/inscricao.model';

@Component({
    selector: 'jhi-inscricao-detail',
    templateUrl: './inscricao-detail.component.html'
})
export class InscricaoDetailComponent implements OnInit {
    inscricao: IInscricao;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ inscricao }) => {
            this.inscricao = inscricao;
        });
    }

    previousState() {
        window.history.back();
    }
}
