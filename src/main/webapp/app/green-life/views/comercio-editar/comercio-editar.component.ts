import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

import { ActivatedRoute } from '@angular/router';
import { CargaImagenesComponent } from '../../dialogos/carga-imagenes/carga-imagenes.component';
import { Comercio } from '../../../entities/comercio';
import { ComercioService } from '../../../entities/comercio/comercio.service';
import { CommonAdapterService } from '../../shared/services/common-adapter.service';
import { ConfirmacionDialogComponent } from '../../dialogos/confirmacion-dialog/confirmacion-dialog.component';
import { Location } from '@angular/common';
import { SERVER_API_URL } from '../../../app.constants';

@Component({
  selector: 'jhi-comercio-editar',
  templateUrl: './comercio-editar.component.html',
  styleUrls: [`comercio-editar.component.scss`]
})
export class ComercioEditarComponent implements OnInit {

  comercio: Comercio;
  comercioForm: FormGroup;
  hostPath = SERVER_API_URL;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private comercioService: ComercioService,
    private commonAdapterService: CommonAdapterService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.comercioService.find(params.comercioId).subscribe((httpResponse) => {
        this.comercio = httpResponse.body;

        console.log(this.comercio);

        this.comercio.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(this.comercio.fechaCreacion);

        this.comercioForm.get('razonSocial').setValue(this.comercio.razonSocial);
        this.comercioForm.get('nombreComercial').setValue(this.comercio.nombreComercial);
        this.comercioForm.get('cedJuridica').setValue(this.comercio.cedJuridica);
        this.comercioForm.get('tipo').setValue(this.comercio.tipo);
      });
    });

    this.comercioForm = this.formBuilder.group({
      razonSocial: ['', [Validators.required]],
      nombreComercial: ['', [Validators.required]],
      cedJuridica: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
      ]],
      tipo: ['', [Validators.required]]
    });
  }

  abrirDialogoImagen() {
    this.dialog.open(CargaImagenesComponent).afterClosed().subscribe((imageName: string) => {
      if (imageName) {
        this.comercio.logoUrl = `/api/images/${imageName}`;
        this.comercio.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(this.comercio.fechaCreacion);
        this.comercioService.update(this.comercio).subscribe((httpResponse) => {
          console.log(httpResponse.body);
        });
      }
    });
  }

  guardar() {
    console.log(this.comercioForm.valid);
    if (this.comercioForm.valid) {

      // this.comercio.fechaCreacion = new Date(this.comercio.fechaCreacion);

      this.comercio.razonSocial = this.comercioForm.get('razonSocial').value;
      this.comercio.nombreComercial = this.comercioForm.get('nombreComercial').value;
      this.comercio.cedJuridica = this.comercioForm.get('cedJuridica').value;
      this.comercio.tipo = this.comercioForm.get('tipo').value;
      // this.comercio.fechaCreacion = this.commonAdapterService.dateToJHILocalDate(this.comercio.fechaCreacion);

      this.comercioService.update(this.comercio).subscribe((httpResponse) => {
        console.log(httpResponse);
        if (httpResponse.status === 200) {
          this.snackBar.open('El comercio ha sido actualizado', undefined, { duration: 2000 });
        } else {
          this.snackBar.open('Se generó un error', undefined, { duration: 2000 });
        }
      });
    }
  }

  eliminar() {
    console.log('click');
    const ref = this.dialog.open(ConfirmacionDialogComponent);
    ref.componentInstance.texto = `¿Desea eliminar el comercio ${this.comercio.razonSocial}?`;
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.comercioService.delete(this.comercio.id).subscribe((httpResponse) => {
          // console.log(httpResponse.body);
          this.location.back();
        });
      }
    });
  }

}
