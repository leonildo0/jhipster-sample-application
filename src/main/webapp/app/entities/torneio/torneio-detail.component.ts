import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITorneio } from 'app/shared/model/torneio.model';

@Component({
    selector: 'jhi-torneio-detail',
    templateUrl: './torneio-detail.component.html'
})
export class TorneioDetailComponent implements OnInit {
    torneio: ITorneio;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ torneio }) => {
            this.torneio = torneio;
        });
    }

    previousState() {
        window.history.back();
    }
}
