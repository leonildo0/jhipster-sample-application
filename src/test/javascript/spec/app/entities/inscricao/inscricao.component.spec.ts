/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { InscricaoComponent } from 'app/entities/inscricao/inscricao.component';
import { InscricaoService } from 'app/entities/inscricao/inscricao.service';
import { Inscricao } from 'app/shared/model/inscricao.model';

describe('Component Tests', () => {
    describe('Inscricao Management Component', () => {
        let comp: InscricaoComponent;
        let fixture: ComponentFixture<InscricaoComponent>;
        let service: InscricaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [InscricaoComponent],
                providers: []
            })
                .overrideTemplate(InscricaoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InscricaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscricaoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Inscricao(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.inscricaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
