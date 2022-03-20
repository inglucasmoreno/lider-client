import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { WebComponent } from './web.component';
import { AppRoutingModule } from '../app-routing.module';
import { CarrouselComponent } from './home/components/carrousel/carrousel.component';
import { TarjetaComponent } from './home/components/tarjeta/tarjeta.component';
import { PipesModule } from '../pipes/pipes.module';
import { HeaderComponent } from './header/header.component';
import { AlquileresComponent } from './alquileres/alquileres.component';
import { VentasComponent } from './ventas/ventas.component';
import { ContactenosComponent } from './contactenos/contactenos.component';

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
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    PipesModule
  ]
})
export class WebModule { }
