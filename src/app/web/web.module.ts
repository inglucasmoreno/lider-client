import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { WebComponent } from './web.component';
import { AppRoutingModule } from '../app-routing.module';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { PipesModule } from '../pipes/pipes.module';
import { HeaderComponent } from './header/header.component';
import { AlquileresComponent } from './alquileres/alquileres.component';
import { VentasComponent } from './ventas/ventas.component';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { ComponentsModule } from '../components/components.module';
import { DetallesInmuebleComponent } from './detalles-inmueble/detalles-inmueble.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    WebComponent,
    CarrouselComponent,
    TarjetaComponent,
    HeaderComponent,
    AlquileresComponent,
    VentasComponent,
    ContactenosComponent,
    DetallesInmuebleComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    PipesModule,
    FormsModule
  ]
})
export class WebModule { }
