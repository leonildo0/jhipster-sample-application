/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { LanchoneteUpdateComponent } from 'app/entities/lanchonete/lanchonete-update.component';
import { LanchoneteService } from 'app/entities/lanchonete/lanchonete.service';
import { Lanchonete } from 'app/shared/model/lanchonete.model';

describe('Component Tests', () => {
    describe('Lanchonete Management Update Component', () => {
        let comp: LanchoneteUpdateComponent;
        let fixture: ComponentFixture<LanchoneteUpdateComponent>;
        let service: LanchoneteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [LanchoneteUpdateComponent]
            })
                .overrideTemplate(LanchoneteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LanchoneteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanchoneteService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Lanchonete(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.lanchonete = entity;
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
                    const entity = new Lanchonete();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.lanchonete = entity;
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
