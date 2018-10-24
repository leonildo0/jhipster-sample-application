/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { InscricaoUpdateComponent } from 'app/entities/inscricao/inscricao-update.component';
import { InscricaoService } from 'app/entities/inscricao/inscricao.service';
import { Inscricao } from 'app/shared/model/inscricao.model';

describe('Component Tests', () => {
    describe('Inscricao Management Update Component', () => {
        let comp: InscricaoUpdateComponent;
        let fixture: ComponentFixture<InscricaoUpdateComponent>;
        let service: InscricaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [InscricaoUpdateComponent]
            })
                .overrideTemplate(InscricaoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InscricaoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscricaoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Inscricao(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.inscricao = entity;
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
                    const entity = new Inscricao();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.inscricao = entity;
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
