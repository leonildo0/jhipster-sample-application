/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { LanchoneteComponent } from 'app/entities/lanchonete/lanchonete.component';
import { LanchoneteService } from 'app/entities/lanchonete/lanchonete.service';
import { Lanchonete } from 'app/shared/model/lanchonete.model';

describe('Component Tests', () => {
    describe('Lanchonete Management Component', () => {
        let comp: LanchoneteComponent;
        let fixture: ComponentFixture<LanchoneteComponent>;
        let service: LanchoneteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [LanchoneteComponent],
                providers: []
            })
                .overrideTemplate(LanchoneteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LanchoneteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanchoneteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Lanchonete(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.lanchonetes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
