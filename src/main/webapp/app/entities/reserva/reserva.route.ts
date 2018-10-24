import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reserva } from 'app/shared/model/reserva.model';
import { ReservaService } from './reserva.service';
import { ReservaComponent } from './reserva.component';
import { ReservaDetailComponent } from './reserva-detail.component';
import { ReservaUpdateComponent } from './reserva-update.component';
import { ReservaDeletePopupComponent } from './reserva-delete-dialog.component';
import { IReserva } from 'app/shared/model/reserva.model';

@Injectable({ providedIn: 'root' })
export class ReservaResolve implements Resolve<IReserva> {
    constructor(private service: ReservaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((reserva: HttpResponse<Reserva>) => reserva.body));
        }
        return of(new Reserva());
    }
}

export const reservaRoute: Routes = [
    {
        path: 'reserva',
        component: ReservaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reservas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reserva/:id/view',
        component: ReservaDetailComponent,
        resolve: {
            reserva: ReservaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reservas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reserva/new',
        component: ReservaUpdateComponent,
        resolve: {
            reserva: ReservaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reservas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reserva/:id/edit',
        component: ReservaUpdateComponent,
        resolve: {
            reserva: ReservaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reservas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reservaPopupRoute: Routes = [
    {
        path: 'reserva/:id/delete',
        component: ReservaDeletePopupComponent,
        resolve: {
            reserva: ReservaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reservas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
