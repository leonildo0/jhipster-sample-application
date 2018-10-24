/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { SessaoDetailComponent } from 'app/entities/sessao/sessao-detail.component';
import { Sessao } from 'app/shared/model/sessao.model';

describe('Component Tests', () => {
    describe('Sessao Management Detail Component', () => {
        let comp: SessaoDetailComponent;
        let fixture: ComponentFixture<SessaoDetailComponent>;
        const route = ({ data: of({ sessao: new Sessao(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [SessaoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SessaoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SessaoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sessao).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
