import {Component, OnInit, Inject} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Local, LocalService} from '../../../entities/local';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'jhi-local-eliminar',
    templateUrl: './local-eliminar.component.html',
    styleUrls: [
        'local-eliminar.component.scss'
    ]
})
export class LocalEliminarComponent implements OnInit {

    local: Local;
    horaApertura: string;
    horaCierre: string;

    constructor(
        private localService: LocalService,
        public dialogRef: MatDialogRef<LocalEliminarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.loadLocal();
    }

    deleteLocal() {
        this.localService.delete(this.local.id).subscribe((localResponse: HttpResponse<Local>) => {
            this.dialogRef.close();
        });
    }

    private loadLocal() {
        this.localService.find(this.data.localId).subscribe((localResponse: HttpResponse<Local>) => {
            this.local = localResponse.body;
        });
    }

}
