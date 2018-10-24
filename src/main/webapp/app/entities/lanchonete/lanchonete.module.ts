import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    LanchoneteComponent,
    LanchoneteDetailComponent,
    LanchoneteUpdateComponent,
    LanchoneteDeletePopupComponent,
    LanchoneteDeleteDialogComponent,
    lanchoneteRoute,
    lanchonetePopupRoute
} from './';

const ENTITY_STATES = [...lanchoneteRoute, ...lanchonetePopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LanchoneteComponent,
        LanchoneteDetailComponent,
        LanchoneteUpdateComponent,
        LanchoneteDeleteDialogComponent,
        LanchoneteDeletePopupComponent
    ],
    entryComponents: [LanchoneteComponent, LanchoneteUpdateComponent, LanchoneteDeleteDialogComponent, LanchoneteDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationLanchoneteModule {}
