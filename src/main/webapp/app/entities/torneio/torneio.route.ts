import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Torneio } from 'app/shared/model/torneio.model';
import { TorneioService } from './torneio.service';
import { TorneioComponent } from './torneio.component';
import { TorneioDetailComponent } from './torneio-detail.component';
import { TorneioUpdateComponent } from './torneio-update.component';
import { TorneioDeletePopupComponent } from './torneio-delete-dialog.component';
import { ITorneio } from 'app/shared/model/torneio.model';

@Injectable({ providedIn: 'root' })
export class TorneioResolve implements Resolve<ITorneio> {
    constructor(private service: TorneioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((torneio: HttpResponse<Torneio>) => torneio.body));
        }
        return of(new Torneio());
    }
}

export const torneioRoute: Routes = [
    {
        path: 'torneio',
        component: TorneioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Torneios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'torneio/:id/view',
        component: TorneioDetailComponent,
        resolve: {
            torneio: TorneioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Torneios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'torneio/new',
        component: TorneioUpdateComponent,
        resolve: {
            torneio: TorneioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Torneios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'torneio/:id/edit',
        component: TorneioUpdateComponent,
        resolve: {
            torneio: TorneioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Torneios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const torneioPopupRoute: Routes = [
    {
        path: 'torneio/:id/delete',
        component: TorneioDeletePopupComponent,
        resolve: {
            torneio: TorneioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Torneios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
