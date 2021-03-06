/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GreenlifeTestModule } from '../../../test.module';
import { ResenaComercioDialogComponent } from '../../../../../../main/webapp/app/entities/resena-comercio/resena-comercio-dialog.component';
import { ResenaComercioService } from '../../../../../../main/webapp/app/entities/resena-comercio/resena-comercio.service';
import { ResenaComercio } from '../../../../../../main/webapp/app/entities/resena-comercio/resena-comercio.model';
import { UsuarioService } from '../../../../../../main/webapp/app/entities/usuario';
import { ComercioService } from '../../../../../../main/webapp/app/entities/comercio';

describe('Component Tests', () => {

    describe('ResenaComercio Management Dialog Component', () => {
        let comp: ResenaComercioDialogComponent;
        let fixture: ComponentFixture<ResenaComercioDialogComponent>;
        let service: ResenaComercioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreenlifeTestModule],
                declarations: [ResenaComercioDialogComponent],
                providers: [
                    UsuarioService,
                    ComercioService,
                    ResenaComercioService
                ]
            })
            .overrideTemplate(ResenaComercioDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResenaComercioDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResenaComercioService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ResenaComercio(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.resenaComercio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'resenaComercioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ResenaComercio();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.resenaComercio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'resenaComercioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
