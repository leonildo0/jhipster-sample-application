import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Premium } from 'app/shared/model/premium.model';
import { PremiumService } from './premium.service';
import { PremiumComponent } from './premium.component';
import { PremiumDetailComponent } from './premium-detail.component';
import { PremiumUpdateComponent } from './premium-update.component';
import { PremiumDeletePopupComponent } from './premium-delete-dialog.component';
import { IPremium } from 'app/shared/model/premium.model';

@Injectable({ providedIn: 'root' })
export class PremiumResolve implements Resolve<IPremium> {
    constructor(private service: PremiumService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((premium: HttpResponse<Premium>) => premium.body));
        }
        return of(new Premium());
    }
}

export const premiumRoute: Routes = [
    {
        path: 'premium',
        component: PremiumComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Premiums'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'premium/:id/view',
        component: PremiumDetailComponent,
        resolve: {
            premium: PremiumResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Premiums'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'premium/new',
        component: PremiumUpdateComponent,
        resolve: {
            premium: PremiumResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Premiums'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'premium/:id/edit',
        component: PremiumUpdateComponent,
        resolve: {
            premium: PremiumResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Premiums'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const premiumPopupRoute: Routes = [
    {
        path: 'premium/:id/delete',
        component: PremiumDeletePopupComponent,
        resolve: {
            premium: PremiumResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Premiums'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
