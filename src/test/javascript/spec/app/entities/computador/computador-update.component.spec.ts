/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ComputadorUpdateComponent } from 'app/entities/computador/computador-update.component';
import { ComputadorService } from 'app/entities/computador/computador.service';
import { Computador } from 'app/shared/model/computador.model';

describe('Component Tests', () => {
    describe('Computador Management Update Component', () => {
        let comp: ComputadorUpdateComponent;
        let fixture: ComponentFixture<ComputadorUpdateComponent>;
        let service: ComputadorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ComputadorUpdateComponent]
            })
                .overrideTemplate(ComputadorUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ComputadorUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComputadorService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Computador(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.computador = entity;
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
                    const entity = new Computador();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.computador = entity;
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
