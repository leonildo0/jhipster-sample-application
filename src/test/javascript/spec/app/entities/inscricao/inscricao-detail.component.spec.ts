/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { InscricaoDetailComponent } from 'app/entities/inscricao/inscricao-detail.component';
import { Inscricao } from 'app/shared/model/inscricao.model';

describe('Component Tests', () => {
    describe('Inscricao Management Detail Component', () => {
        let comp: InscricaoDetailComponent;
        let fixture: ComponentFixture<InscricaoDetailComponent>;
        const route = ({ data: of({ inscricao: new Inscricao(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [InscricaoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InscricaoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InscricaoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.inscricao).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
