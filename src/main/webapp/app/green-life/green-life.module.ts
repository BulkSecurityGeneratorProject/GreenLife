import {
  MatCheckboxModule,
  MatDividerModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CargaImagenesComponent } from './dialogos/carga-imagenes/carga-imagenes.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { CategoriasRegistroComponent } from './dialogos/categorias-registro/categorias-registro.component';
import { ComercioEditarComponent } from './views/comercio-editar/comercio-editar.component';
import { ComerciosProductosComponent } from './views/comercios-productos/comercios-productos.component';
import { ComerciosRegistroComponent } from './dialogos/comercios-registro/comercios-registro.component';
import { CommonAdapterService } from './shared/services/common-adapter.service';
import { CommonModule } from '@angular/common';
import { ConfirmacionDialogComponent } from './dialogos/confirmacion-dialog/confirmacion-dialog.component';
import { ConvertidorFechaPipe } from './shared/pipes/convertidor-fecha.pipe';
import { FooterGreenlifeComponent } from './layout/footer-greenlife/footer-greenlife.component';
import { LandingComponent } from './views/landing/landing.component';
import { ListaComerciosComponent } from './fragments/lista-comercios/lista-comercios.component';
import { LocalEliminarComponent } from './dialogos/local-eliminar/local-eliminar.component';
import { LocalModificarComponent } from './views/local-modificar/local-modificar.component';
import { LocalRegistroComponent } from './views/local-registro/local-registro.component';
import { LoginComponent } from './dialogos/login/login.component';
import { NavbarGreenlifeComponent } from './layout/navbar-greenlife/navbar-greenlife.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RootComponent } from './root/root.component';
import { RouterModule } from '@angular/router';
import { SelectorEtiquetasComponent } from './fragments/selector-etiquetas/selector-etiquetas.component';
import { UsuarioModificarComponent } from './views/usuario-modificar/usuario-modificar.component';
import { UsuarioPerfilComponent } from './views/usuario-perfil/usuario-perfil.component';
import { UsuarioRegistroComponent } from './views/usuario-registro/usuario-registro.component';
import { UsuarioRolesComponent } from './views/usuario-roles/usuario-roles.component';
import { ValidadorNumeroDirective } from './shared/directives/validador-numero.directive';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAKK8_ZbHnWx9CD9b4NZFGRKe8rMw83wmI'
    }),
    ReactiveFormsModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule
  ],
  declarations: [
    LandingComponent,
    NavbarGreenlifeComponent,
    FooterGreenlifeComponent,
    RootComponent,
    UsuarioPerfilComponent,
    LoginComponent,
    UsuarioRegistroComponent,
    ValidadorNumeroDirective,
    UsuarioRolesComponent,
    ConvertidorFechaPipe,
    ComerciosProductosComponent,
    LocalRegistroComponent,
    ComerciosRegistroComponent,
    UsuarioModificarComponent,
    ListaComerciosComponent,
    ComercioEditarComponent,
    SelectorEtiquetasComponent,
    CategoriasComponent,
    CategoriasRegistroComponent,
    CargaImagenesComponent,
    ConfirmacionDialogComponent,
    LocalModificarComponent,
    LocalEliminarComponent
  ],
  entryComponents: [
    LoginComponent,
    ComerciosRegistroComponent,
    CategoriasRegistroComponent,
    CargaImagenesComponent,
    ConfirmacionDialogComponent,
    LocalEliminarComponent
  ],
  providers: [
    CommonAdapterService,
    CategoriasComponent,
  ],
})
export class GreenLifeModule { }
