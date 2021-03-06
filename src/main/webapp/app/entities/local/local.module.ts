import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    LocalComponent,
    LocalDeleteDialogComponent,
    LocalDeletePopupComponent,
    LocalDetailComponent,
    LocalDialogComponent,
    LocalPopupComponent,
    LocalPopupService,
    LocalService,
    localPopupRoute,
    localRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

const ENTITY_STATES = [
    ...localRoute,
    ...localPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LocalComponent,
        LocalDetailComponent,
        LocalDialogComponent,
        LocalDeleteDialogComponent,
        LocalPopupComponent,
        LocalDeletePopupComponent,
    ],
    entryComponents: [
        LocalComponent,
        LocalDialogComponent,
        LocalPopupComponent,
        LocalDeleteDialogComponent,
        LocalDeletePopupComponent,
    ],
    providers: [
        LocalService,
        LocalPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeLocalModule {}
