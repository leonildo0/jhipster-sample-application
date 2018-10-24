/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ConsoleComponent } from 'app/entities/console/console.component';
import { ConsoleService } from 'app/entities/console/console.service';
import { Console } from 'app/shared/model/console.model';

describe('Component Tests', () => {
    describe('Console Management Component', () => {
        let comp: ConsoleComponent;
        let fixture: ComponentFixture<ConsoleComponent>;
        let service: ConsoleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ConsoleComponent],
                providers: []
            })
                .overrideTemplate(ConsoleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConsoleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsoleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Console(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.consoles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
