import {Component, OnInit} from '@angular/core';
import {Comercio} from '../../../entities/comercio';
import {ComercioService} from './../../../entities/comercio/comercio.service';
import {User} from '../../../shared';
import {UserService} from './../../../shared/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiAlertService} from 'ng-jhipster';
import {Observable} from '../../../../../../../node_modules/rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Usuario, UsuarioService} from '../../../entities/usuario';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ComerciosRegistroComponent} from '../../dialogos/comercios-registro/comercios-registro.component';
import {ConfirmacionDialogComponent} from '../../dialogos/confirmacion-dialog/confirmacion-dialog.component';
import {EtiquetasConsultarComponent} from '../../dialogos/etiquetas-consultar/etiquetas-consultar.component';
import {AccountService} from '../../../shared/auth/account.service';
import {Contrato, ContratoService} from '../../../entities/contrato';
import {TIPO_SERVICIO_SUSCRIPCION} from '../../../app.constants';
import {CommonAdapterService} from '../../shared/services/common-adapter.service';

@Component({
    selector: 'jhi-configuracion-comercios',
    templateUrl: './configuracion-comercios.component.html',
    styleUrls: ['./configuracion-comercios.component.scss']
})
export class ConfiguracionComerciosComponent implements OnInit {

    comercios: IComercio[] = [];
    currentSearch: string;
    isContratoActivo = false;
    user: User;
    usuario: Usuario;

    constructor(
        private comercioService: ComercioService,
        private route: ActivatedRoute,
        private router: Router,
        private jhiAlertService: JhiAlertService,
        private userService: UserService,
        private usuarioService: UsuarioService,
        private matDialog: MatDialog,
        private matSnackBar: MatSnackBar,
        private account: AccountService,
        private contratoService: ContratoService,
        private commonAdapterService: CommonAdapterService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            if (params && params.login) {
                this.getComercios(this.usuarioService.findByUserLogin(params.login), this.userService.find(params.login));
            } else {
                this.account.get().subscribe((httpResponse) => {
                    this.getComercios(this.usuarioService.findByUserLogin(httpResponse.body['login']), this.userService.find(httpResponse.body['login']));
                });
            }
        });

        this.verificarServicioSuscripcion();
    }

    getComercios(observableUsuario: Observable<HttpResponse<Usuario>>, observableUser: Observable<HttpResponse<User>>): void {
        Observable.zip(observableUsuario, observableUser).subscribe((resul) => {
            this.usuario = resul[0].body;
            this.user = resul[1].body;

            this.comercioService.findComerciosByDueno(this.usuario.id).subscribe((comercioResponse: HttpResponse<Comercio[]>) => {
                for (const index of comercioResponse.body) {
                    this.comercios.push({
                        comercio: index
                    });
                }
            });
        });
    }

    agregarComercio() {
        const diagRef = this.matDialog.open(ComerciosRegistroComponent);
        diagRef.componentInstance.dueno = this.usuario;
        diagRef.afterClosed().subscribe((res) => {
            if (res && this.isContratoActivo === true) {
                const newContrato = new Contrato();
                newContrato.tipoId = TIPO_SERVICIO_SUSCRIPCION;
                newContrato.comercioId = res.id;
                newContrato.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(new Date());

                this.contratoService.create(newContrato).subscribe((responseContrato) => {
                    if (responseContrato.status === 201) {
                        this.comercios.push({
                            comercio: res
                        });
                    }
                });
            } else if (res) {
                this.comercios.push({
                    comercio: res
                });
            }
        });
    }

    eliminarComercio(comercio: Comercio) {
        const ref = this.matDialog.open(ConfirmacionDialogComponent);
        ref.componentInstance.texto = `¿Desea eliminar el comercio ${comercio.razonSocial}?`;
        ref.afterClosed().subscribe((result) => {
            if (result) {
                this.contratoService.deleteByComercio(comercio.id).subscribe((responseContrato) => {
                    if (responseContrato.status === 200) {
                        this.comercioService.delete(comercio.id).subscribe((httpResponse) => {
                            this.matSnackBar.open(`El comercio ${comercio.nombreComercial} fue eliminado`, undefined, {duration: 2000});
                            const index = this.comercios.findIndex((d) => d.comercio.id === comercio.id);
                            this.comercios.splice(index, 1);
                        });
                    } else {
                        this.matSnackBar.open(`El comercio ${comercio.nombreComercial} no se ha podido eliminar`, undefined, {duration: 2000});
                    }
                });
            } else if (result) {
                this.comercioService.delete(comercio.id).subscribe((httpResponse) => {
                    this.matSnackBar.open(`El comercio ${comercio.nombreComercial} fue eliminado`, undefined, {duration: 2000});
                    const index = this.comercios.findIndex((d) => d.comercio.id === comercio.id);
                    this.comercios.splice(index, 1);
                });
            }
        });
    }

    consultarEtiquetas(pcomercio: Comercio) {
        const ref = this.matDialog.open(EtiquetasConsultarComponent, {
            width: '500px',
            data: pcomercio.id
        });
    }

    verificarServicioSuscripcion() {
        this.account.get().subscribe((accountResponse) => {
            this.usuarioService.findByUserLogin(accountResponse.body['login']).subscribe((responseUser) => {
                this.comercioService.findComerciosByDueno(responseUser.body.id).subscribe((responseComercio) => {
                    for (const comercio of responseComercio.body) {
                        this.contratoService.findAllByComercio(comercio.id).subscribe((responseContratos) => {
                            if (responseContratos.body.length > 0) {
                                for (const contrato of responseContratos.body) {
                                    if (contrato.tipoId === TIPO_SERVICIO_SUSCRIPCION) {
                                        this.isContratoActivo = true;
                                    }
                                }
                            } else {
                                this.isContratoActivo = false;
                            }
                        });
                    }
                });
            });
        });
    }

}

interface IComercio {
    comercio: Comercio;
}
