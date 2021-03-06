/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PremiumService } from 'app/entities/premium/premium.service';
import { IPremium, Premium } from 'app/shared/model/premium.model';

describe('Service Tests', () => {
    describe('Premium Service', () => {
        let injector: TestBed;
        let service: PremiumService;
        let httpMock: HttpTestingController;
        let elemDefault: IPremium;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PremiumService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Premium(0, currentDate, currentDate, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dIncio: currentDate.format(DATE_FORMAT),
                        dFim: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Premium', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dIncio: currentDate.format(DATE_FORMAT),
                        dFim: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dIncio: currentDate,
                        dFim: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Premium(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Premium', async () => {
                const returnedFromService = Object.assign(
                    {
                        dIncio: currentDate.format(DATE_FORMAT),
                        dFim: currentDate.format(DATE_FORMAT),
                        desconto: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dIncio: currentDate,
                        dFim: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Premium', async () => {
                const returnedFromService = Object.assign(
                    {
                        dIncio: currentDate.format(DATE_FORMAT),
                        dFim: currentDate.format(DATE_FORMAT),
                        desconto: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dIncio: currentDate,
                        dFim: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Premium', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
