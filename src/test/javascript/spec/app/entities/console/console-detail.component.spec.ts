/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ConsoleDetailComponent } from 'app/entities/console/console-detail.component';
import { Console } from 'app/shared/model/console.model';

describe('Component Tests', () => {
    describe('Console Management Detail Component', () => {
        let comp: ConsoleDetailComponent;
        let fixture: ComponentFixture<ConsoleDetailComponent>;
        const route = ({ data: of({ console: new Console(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ConsoleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ConsoleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConsoleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.console).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
