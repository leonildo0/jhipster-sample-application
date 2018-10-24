/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { SessaoComponent } from 'app/entities/sessao/sessao.component';
import { SessaoService } from 'app/entities/sessao/sessao.service';
import { Sessao } from 'app/shared/model/sessao.model';

describe('Component Tests', () => {
    describe('Sessao Management Component', () => {
        let comp: SessaoComponent;
        let fixture: ComponentFixture<SessaoComponent>;
        let service: SessaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [SessaoComponent],
                providers: []
            })
                .overrideTemplate(SessaoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SessaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SessaoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Sessao(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sessaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
