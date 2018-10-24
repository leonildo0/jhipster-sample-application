import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsole } from 'app/shared/model/console.model';

@Component({
    selector: 'jhi-console-detail',
    templateUrl: './console-detail.component.html'
})
export class ConsoleDetailComponent implements OnInit {
    console: IConsole;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ console }) => {
            this.console = console;
        });
    }

    previousState() {
        window.history.back();
    }
}
