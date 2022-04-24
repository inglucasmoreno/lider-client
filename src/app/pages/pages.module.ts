import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './usuarios/nuevo-usuario.component';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './usuarios/editar/editar-usuario.component';
import { EditarPasswordComponent } from './usuarios/editar/editar-password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DirectivesModule } from '../directives/directives.module';
import { PerfilComponent } from './perfil/perfil.component';
import { InmueblesComponent } from './inmuebles/inmuebles.component';
import { NuevoInmuebleComponent } from './inmuebles/nuevo-inmueble.component';
import { EditarInmuebleComponent } from './inmuebles/editar/editar-inmueble.component';
import { PropietariosComponent } from './propietarios/propietarios.component';
import { InmobiliariaComponent } from './inmobiliaria/inmobiliaria.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { ProvinciasComponent } from './provincias/provincias.component';
import { LocalidadesComponent } from './provincias/localidades.component';
import { InmuebleDetallesComponent } from './inmuebles/inmueble-detalles.component';

@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    UsuariosComponent,
    NuevoUsuarioComponent,
    EditarUsuarioComponent,
    EditarPasswordComponent,
    PerfilComponent,
    InmueblesComponent,
    NuevoInmuebleComponent,
    EditarInmuebleComponent,
    PropietariosComponent,
    InmobiliariaComponent,
    ConsultasComponent,
    ProvinciasComponent,
    LocalidadesComponent,
    InmuebleDetallesComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    DirectivesModule,
    SharedModule,
    PipesModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    DirectivesModule
  ]
})
export class PagesModule { }
