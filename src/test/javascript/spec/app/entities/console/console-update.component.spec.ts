/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ConsoleUpdateComponent } from 'app/entities/console/console-update.component';
import { ConsoleService } from 'app/entities/console/console.service';
import { Console } from 'app/shared/model/console.model';

describe('Component Tests', () => {
    describe('Console Management Update Component', () => {
        let comp: ConsoleUpdateComponent;
        let fixture: ComponentFixture<ConsoleUpdateComponent>;
        let service: ConsoleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ConsoleUpdateComponent]
            })
                .overrideTemplate(ConsoleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConsoleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsoleService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Console(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.console = entity;
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
                    const entity = new Console();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.console = entity;
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
