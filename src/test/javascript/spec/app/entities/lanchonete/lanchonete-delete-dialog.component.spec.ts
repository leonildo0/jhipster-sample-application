/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { LanchoneteDeleteDialogComponent } from 'app/entities/lanchonete/lanchonete-delete-dialog.component';
import { LanchoneteService } from 'app/entities/lanchonete/lanchonete.service';

describe('Component Tests', () => {
    describe('Lanchonete Management Delete Component', () => {
        let comp: LanchoneteDeleteDialogComponent;
        let fixture: ComponentFixture<LanchoneteDeleteDialogComponent>;
        let service: LanchoneteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [LanchoneteDeleteDialogComponent]
            })
                .overrideTemplate(LanchoneteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LanchoneteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanchoneteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
