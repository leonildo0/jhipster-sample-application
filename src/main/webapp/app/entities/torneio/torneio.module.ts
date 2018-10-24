import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    TorneioComponent,
    TorneioDetailComponent,
    TorneioUpdateComponent,
    TorneioDeletePopupComponent,
    TorneioDeleteDialogComponent,
    torneioRoute,
    torneioPopupRoute
} from './';

const ENTITY_STATES = [...torneioRoute, ...torneioPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TorneioComponent,
        TorneioDetailComponent,
        TorneioUpdateComponent,
        TorneioDeleteDialogComponent,
        TorneioDeletePopupComponent
    ],
    entryComponents: [TorneioComponent, TorneioUpdateComponent, TorneioDeleteDialogComponent, TorneioDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationTorneioModule {}
