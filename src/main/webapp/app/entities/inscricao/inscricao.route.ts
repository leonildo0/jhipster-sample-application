import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inscricao } from 'app/shared/model/inscricao.model';
import { InscricaoService } from './inscricao.service';
import { InscricaoComponent } from './inscricao.component';
import { InscricaoDetailComponent } from './inscricao-detail.component';
import { InscricaoUpdateComponent } from './inscricao-update.component';
import { InscricaoDeletePopupComponent } from './inscricao-delete-dialog.component';
import { IInscricao } from 'app/shared/model/inscricao.model';

@Injectable({ providedIn: 'root' })
export class InscricaoResolve implements Resolve<IInscricao> {
    constructor(private service: InscricaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((inscricao: HttpResponse<Inscricao>) => inscricao.body));
        }
        return of(new Inscricao());
    }
}

export const inscricaoRoute: Routes = [
    {
        path: 'inscricao',
        component: InscricaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Inscricaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'inscricao/:id/view',
        component: InscricaoDetailComponent,
        resolve: {
            inscricao: InscricaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Inscricaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'inscricao/new',
        component: InscricaoUpdateComponent,
        resolve: {
            inscricao: InscricaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Inscricaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'inscricao/:id/edit',
        component: InscricaoUpdateComponent,
        resolve: {
            inscricao: InscricaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Inscricaos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const inscricaoPopupRoute: Routes = [
    {
        path: 'inscricao/:id/delete',
        component: InscricaoDeletePopupComponent,
        resolve: {
            inscricao: InscricaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Inscricaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
