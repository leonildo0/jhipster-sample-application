import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sessao } from 'app/shared/model/sessao.model';
import { SessaoService } from './sessao.service';
import { SessaoComponent } from './sessao.component';
import { SessaoDetailComponent } from './sessao-detail.component';
import { SessaoUpdateComponent } from './sessao-update.component';
import { SessaoDeletePopupComponent } from './sessao-delete-dialog.component';
import { ISessao } from 'app/shared/model/sessao.model';

@Injectable({ providedIn: 'root' })
export class SessaoResolve implements Resolve<ISessao> {
    constructor(private service: SessaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((sessao: HttpResponse<Sessao>) => sessao.body));
        }
        return of(new Sessao());
    }
}

export const sessaoRoute: Routes = [
    {
        path: 'sessao',
        component: SessaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sessaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sessao/:id/view',
        component: SessaoDetailComponent,
        resolve: {
            sessao: SessaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sessaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sessao/new',
        component: SessaoUpdateComponent,
        resolve: {
            sessao: SessaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sessaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sessao/:id/edit',
        component: SessaoUpdateComponent,
        resolve: {
            sessao: SessaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sessaos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sessaoPopupRoute: Routes = [
    {
        path: 'sessao/:id/delete',
        component: SessaoDeletePopupComponent,
        resolve: {
            sessao: SessaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sessaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
