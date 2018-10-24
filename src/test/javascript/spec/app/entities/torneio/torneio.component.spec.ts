/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TorneioComponent } from 'app/entities/torneio/torneio.component';
import { TorneioService } from 'app/entities/torneio/torneio.service';
import { Torneio } from 'app/shared/model/torneio.model';

describe('Component Tests', () => {
    describe('Torneio Management Component', () => {
        let comp: TorneioComponent;
        let fixture: ComponentFixture<TorneioComponent>;
        let service: TorneioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TorneioComponent],
                providers: []
            })
                .overrideTemplate(TorneioComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TorneioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TorneioService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Torneio(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.torneios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
