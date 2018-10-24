/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TorneioDetailComponent } from 'app/entities/torneio/torneio-detail.component';
import { Torneio } from 'app/shared/model/torneio.model';

describe('Component Tests', () => {
    describe('Torneio Management Detail Component', () => {
        let comp: TorneioDetailComponent;
        let fixture: ComponentFixture<TorneioDetailComponent>;
        const route = ({ data: of({ torneio: new Torneio(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TorneioDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TorneioDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TorneioDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.torneio).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
