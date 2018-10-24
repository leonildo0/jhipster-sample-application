import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    ConsoleComponent,
    ConsoleDetailComponent,
    ConsoleUpdateComponent,
    ConsoleDeletePopupComponent,
    ConsoleDeleteDialogComponent,
    consoleRoute,
    consolePopupRoute
} from './';

const ENTITY_STATES = [...consoleRoute, ...consolePopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ConsoleComponent,
        ConsoleDetailComponent,
        ConsoleUpdateComponent,
        ConsoleDeleteDialogComponent,
        ConsoleDeletePopupComponent
    ],
    entryComponents: [ConsoleComponent, ConsoleUpdateComponent, ConsoleDeleteDialogComponent, ConsoleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationConsoleModule {}
