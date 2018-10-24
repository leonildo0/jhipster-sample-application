import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISessao } from 'app/shared/model/sessao.model';

@Component({
    selector: 'jhi-sessao-detail',
    templateUrl: './sessao-detail.component.html'
})
export class SessaoDetailComponent implements OnInit {
    sessao: ISessao;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sessao }) => {
            this.sessao = sessao;
        });
    }

    previousState() {
        window.history.back();
    }
}
