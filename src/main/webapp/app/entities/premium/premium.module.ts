import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    PremiumComponent,
    PremiumDetailComponent,
    PremiumUpdateComponent,
    PremiumDeletePopupComponent,
    PremiumDeleteDialogComponent,
    premiumRoute,
    premiumPopupRoute
} from './';

const ENTITY_STATES = [...premiumRoute, ...premiumPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PremiumComponent,
        PremiumDetailComponent,
        PremiumUpdateComponent,
        PremiumDeleteDialogComponent,
        PremiumDeletePopupComponent
    ],
    entryComponents: [PremiumComponent, PremiumUpdateComponent, PremiumDeleteDialogComponent, PremiumDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationPremiumModule {}
