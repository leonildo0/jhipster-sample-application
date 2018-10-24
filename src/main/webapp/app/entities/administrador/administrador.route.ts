import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Administrador } from 'app/shared/model/administrador.model';
import { AdministradorService } from './administrador.service';
import { AdministradorComponent } from './administrador.component';
import { AdministradorDetailComponent } from './administrador-detail.component';
import { AdministradorUpdateComponent } from './administrador-update.component';
import { AdministradorDeletePopupComponent } from './administrador-delete-dialog.component';
import { IAdministrador } from 'app/shared/model/administrador.model';

@Injectable({ providedIn: 'root' })
export class AdministradorResolve implements Resolve<IAdministrador> {
    constructor(private service: AdministradorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((administrador: HttpResponse<Administrador>) => administrador.body));
        }
        return of(new Administrador());
    }
}

export const administradorRoute: Routes = [
    {
        path: 'administrador',
        component: AdministradorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Administradors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'administrador/:id/view',
        component: AdministradorDetailComponent,
        resolve: {
            administrador: AdministradorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Administradors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'administrador/new',
        component: AdministradorUpdateComponent,
        resolve: {
            administrador: AdministradorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Administradors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'administrador/:id/edit',
        component: AdministradorUpdateComponent,
        resolve: {
            administrador: AdministradorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Administradors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const administradorPopupRoute: Routes = [
    {
        path: 'administrador/:id/delete',
        component: AdministradorDeletePopupComponent,
        resolve: {
            administrador: AdministradorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Administradors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
