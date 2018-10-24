/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ComputadorDetailComponent } from 'app/entities/computador/computador-detail.component';
import { Computador } from 'app/shared/model/computador.model';

describe('Component Tests', () => {
    describe('Computador Management Detail Component', () => {
        let comp: ComputadorDetailComponent;
        let fixture: ComponentFixture<ComputadorDetailComponent>;
        const route = ({ data: of({ computador: new Computador(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ComputadorDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ComputadorDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ComputadorDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.computador).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
