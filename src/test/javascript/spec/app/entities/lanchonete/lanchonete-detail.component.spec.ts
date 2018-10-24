/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { LanchoneteDetailComponent } from 'app/entities/lanchonete/lanchonete-detail.component';
import { Lanchonete } from 'app/shared/model/lanchonete.model';

describe('Component Tests', () => {
    describe('Lanchonete Management Detail Component', () => {
        let comp: LanchoneteDetailComponent;
        let fixture: ComponentFixture<LanchoneteDetailComponent>;
        const route = ({ data: of({ lanchonete: new Lanchonete(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [LanchoneteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LanchoneteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LanchoneteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.lanchonete).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
