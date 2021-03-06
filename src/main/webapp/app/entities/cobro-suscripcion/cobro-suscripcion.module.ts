import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
    CobroSuscripcionComponent,
    CobroSuscripcionDeleteDialogComponent,
    CobroSuscripcionDeletePopupComponent,
    CobroSuscripcionDetailComponent,
    CobroSuscripcionDialogComponent,
    CobroSuscripcionPopupComponent,
    CobroSuscripcionPopupService,
    CobroSuscripcionService,
    cobroSuscripcionPopupRoute,
    cobroSuscripcionRoute,
} from './';

import { CMS_PATH } from '../../app.constants';
import { GreenlifeSharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

const ENTITY_STATES = [
    ...cobroSuscripcionRoute,
    ...cobroSuscripcionPopupRoute,
];

@NgModule({
    imports: [
        GreenlifeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CobroSuscripcionComponent,
        CobroSuscripcionDetailComponent,
        CobroSuscripcionDialogComponent,
        CobroSuscripcionDeleteDialogComponent,
        CobroSuscripcionPopupComponent,
        CobroSuscripcionDeletePopupComponent,
    ],
    entryComponents: [
        CobroSuscripcionComponent,
        CobroSuscripcionDialogComponent,
        CobroSuscripcionPopupComponent,
        CobroSuscripcionDeleteDialogComponent,
        CobroSuscripcionDeletePopupComponent,
    ],
    providers: [
        CobroSuscripcionService,
        CobroSuscripcionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeCobroSuscripcionModule {}
