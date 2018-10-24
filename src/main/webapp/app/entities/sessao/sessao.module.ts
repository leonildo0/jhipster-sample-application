import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    SessaoComponent,
    SessaoDetailComponent,
    SessaoUpdateComponent,
    SessaoDeletePopupComponent,
    SessaoDeleteDialogComponent,
    sessaoRoute,
    sessaoPopupRoute
} from './';

const ENTITY_STATES = [...sessaoRoute, ...sessaoPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SessaoComponent, SessaoDetailComponent, SessaoUpdateComponent, SessaoDeleteDialogComponent, SessaoDeletePopupComponent],
    entryComponents: [SessaoComponent, SessaoUpdateComponent, SessaoDeleteDialogComponent, SessaoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationSessaoModule {}
