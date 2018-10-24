/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TorneioUpdateComponent } from 'app/entities/torneio/torneio-update.component';
import { TorneioService } from 'app/entities/torneio/torneio.service';
import { Torneio } from 'app/shared/model/torneio.model';

describe('Component Tests', () => {
    describe('Torneio Management Update Component', () => {
        let comp: TorneioUpdateComponent;
        let fixture: ComponentFixture<TorneioUpdateComponent>;
        let service: TorneioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TorneioUpdateComponent]
            })
                .overrideTemplate(TorneioUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TorneioUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TorneioService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Torneio(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.torneio = entity;
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
                    const entity = new Torneio();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.torneio = entity;
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
