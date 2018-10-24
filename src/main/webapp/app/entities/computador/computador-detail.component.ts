import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComputador } from 'app/shared/model/computador.model';

@Component({
    selector: 'jhi-computador-detail',
    templateUrl: './computador-detail.component.html'
})
export class ComputadorDetailComponent implements OnInit {
    computador: IComputador;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ computador }) => {
            this.computador = computador;
        });
    }

    previousState() {
        window.history.back();
    }
}
