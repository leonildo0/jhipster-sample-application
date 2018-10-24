import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILanchonete } from 'app/shared/model/lanchonete.model';

@Component({
    selector: 'jhi-lanchonete-detail',
    templateUrl: './lanchonete-detail.component.html'
})
export class LanchoneteDetailComponent implements OnInit {
    lanchonete: ILanchonete;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ lanchonete }) => {
            this.lanchonete = lanchonete;
        });
    }

    previousState() {
        window.history.back();
    }
}
