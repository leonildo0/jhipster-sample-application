import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Computador } from 'app/shared/model/computador.model';
import { ComputadorService } from './computador.service';
import { ComputadorComponent } from './computador.component';
import { ComputadorDetailComponent } from './computador-detail.component';
import { ComputadorUpdateComponent } from './computador-update.component';
import { ComputadorDeletePopupComponent } from './computador-delete-dialog.component';
import { IComputador } from 'app/shared/model/computador.model';

@Injectable({ providedIn: 'root' })
export class ComputadorResolve implements Resolve<IComputador> {
    constructor(private service: ComputadorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((computador: HttpResponse<Computador>) => computador.body));
        }
        return of(new Computador());
    }
}

export const computadorRoute: Routes = [
    {
        path: 'computador',
        component: ComputadorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Computadors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'computador/:id/view',
        component: ComputadorDetailComponent,
        resolve: {
            computador: ComputadorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Computadors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'computador/new',
        component: ComputadorUpdateComponent,
        resolve: {
            computador: ComputadorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Computadors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'computador/:id/edit',
        component: ComputadorUpdateComponent,
        resolve: {
            computador: ComputadorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Computadors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const computadorPopupRoute: Routes = [
    {
        path: 'computador/:id/delete',
        component: ComputadorDeletePopupComponent,
        resolve: {
            computador: ComputadorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Computadors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
