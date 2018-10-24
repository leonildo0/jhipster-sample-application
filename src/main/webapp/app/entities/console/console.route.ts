import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Console } from 'app/shared/model/console.model';
import { ConsoleService } from './console.service';
import { ConsoleComponent } from './console.component';
import { ConsoleDetailComponent } from './console-detail.component';
import { ConsoleUpdateComponent } from './console-update.component';
import { ConsoleDeletePopupComponent } from './console-delete-dialog.component';
import { IConsole } from 'app/shared/model/console.model';

@Injectable({ providedIn: 'root' })
export class ConsoleResolve implements Resolve<IConsole> {
    constructor(private service: ConsoleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((console: HttpResponse<Console>) => console.body));
        }
        return of(new Console());
    }
}

export const consoleRoute: Routes = [
    {
        path: 'console',
        component: ConsoleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consoles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'console/:id/view',
        component: ConsoleDetailComponent,
        resolve: {
            console: ConsoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consoles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'console/new',
        component: ConsoleUpdateComponent,
        resolve: {
            console: ConsoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consoles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'console/:id/edit',
        component: ConsoleUpdateComponent,
        resolve: {
            console: ConsoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consoles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const consolePopupRoute: Routes = [
    {
        path: 'console/:id/delete',
        component: ConsoleDeletePopupComponent,
        resolve: {
            console: ConsoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consoles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
