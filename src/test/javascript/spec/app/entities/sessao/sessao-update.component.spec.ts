/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { SessaoUpdateComponent } from 'app/entities/sessao/sessao-update.component';
import { SessaoService } from 'app/entities/sessao/sessao.service';
import { Sessao } from 'app/shared/model/sessao.model';

describe('Component Tests', () => {
    describe('Sessao Management Update Component', () => {
        let comp: SessaoUpdateComponent;
        let fixture: ComponentFixture<SessaoUpdateComponent>;
        let service: SessaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [SessaoUpdateComponent]
            })
                .overrideTemplate(SessaoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SessaoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SessaoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Sessao(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sessao = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Sessao();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sessao = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
