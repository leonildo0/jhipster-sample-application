import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    ComputadorComponent,
    ComputadorDetailComponent,
    ComputadorUpdateComponent,
    ComputadorDeletePopupComponent,
    ComputadorDeleteDialogComponent,
    computadorRoute,
    computadorPopupRoute
} from './';

const ENTITY_STATES = [...computadorRoute, ...computadorPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ComputadorComponent,
        ComputadorDetailComponent,
        ComputadorUpdateComponent,
        ComputadorDeleteDialogComponent,
        ComputadorDeletePopupComponent
    ],
    entryComponents: [ComputadorComponent, ComputadorUpdateComponent, ComputadorDeleteDialogComponent, ComputadorDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationComputadorModule {}
