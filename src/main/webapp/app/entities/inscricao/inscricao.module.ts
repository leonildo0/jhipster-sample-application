import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    InscricaoComponent,
    InscricaoDetailComponent,
    InscricaoUpdateComponent,
    InscricaoDeletePopupComponent,
    InscricaoDeleteDialogComponent,
    inscricaoRoute,
    inscricaoPopupRoute
} from './';

const ENTITY_STATES = [...inscricaoRoute, ...inscricaoPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InscricaoComponent,
        InscricaoDetailComponent,
        InscricaoUpdateComponent,
        InscricaoDeleteDialogComponent,
        InscricaoDeletePopupComponent
    ],
    entryComponents: [InscricaoComponent, InscricaoUpdateComponent, InscricaoDeleteDialogComponent, InscricaoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationInscricaoModule {}
