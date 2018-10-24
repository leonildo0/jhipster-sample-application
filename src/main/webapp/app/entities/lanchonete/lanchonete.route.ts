import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lanchonete } from 'app/shared/model/lanchonete.model';
import { LanchoneteService } from './lanchonete.service';
import { LanchoneteComponent } from './lanchonete.component';
import { LanchoneteDetailComponent } from './lanchonete-detail.component';
import { LanchoneteUpdateComponent } from './lanchonete-update.component';
import { LanchoneteDeletePopupComponent } from './lanchonete-delete-dialog.component';
import { ILanchonete } from 'app/shared/model/lanchonete.model';

@Injectable({ providedIn: 'root' })
export class LanchoneteResolve implements Resolve<ILanchonete> {
    constructor(private service: LanchoneteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((lanchonete: HttpResponse<Lanchonete>) => lanchonete.body));
        }
        return of(new Lanchonete());
    }
}

export const lanchoneteRoute: Routes = [
    {
        path: 'lanchonete',
        component: LanchoneteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lanchonetes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lanchonete/:id/view',
        component: LanchoneteDetailComponent,
        resolve: {
            lanchonete: LanchoneteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lanchonetes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lanchonete/new',
        component: LanchoneteUpdateComponent,
        resolve: {
            lanchonete: LanchoneteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lanchonetes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lanchonete/:id/edit',
        component: LanchoneteUpdateComponent,
        resolve: {
            lanchonete: LanchoneteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lanchonetes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lanchonetePopupRoute: Routes = [
    {
        path: 'lanchonete/:id/delete',
        component: LanchoneteDeletePopupComponent,
        resolve: {
            lanchonete: LanchoneteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lanchonetes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
