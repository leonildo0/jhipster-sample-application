/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ComputadorComponent } from 'app/entities/computador/computador.component';
import { ComputadorService } from 'app/entities/computador/computador.service';
import { Computador } from 'app/shared/model/computador.model';

describe('Component Tests', () => {
    describe('Computador Management Component', () => {
        let comp: ComputadorComponent;
        let fixture: ComponentFixture<ComputadorComponent>;
        let service: ComputadorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ComputadorComponent],
                providers: []
            })
                .overrideTemplate(ComputadorComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ComputadorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComputadorService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Computador(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.computadors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
