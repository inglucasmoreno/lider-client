import { Injectable } from '@angular/core';
import { InmobiliariaService } from './inmobiliaria.service';
import { AlertService } from './alert.service';
import { InmueblesService } from './inmuebles.service';

@Injectable({
  providedIn: 'root'
})
export class DataWebService {

  public inmobiliaria;
  public inmuebles;
  public inmueblesVenta;
  public inmueblesAlquiler;

  constructor(private inmobiliariaService: InmobiliariaService,
              private inmueblesService: InmueblesService,
              private alertService: AlertService) { }

  obtenerInmobiliaria(): void {
    this.alertService.loading();
    this.inmobiliariaService.listarInmobiliarias().subscribe({
      next: ({inmobiliarias}) => {
        this.inmobiliaria = inmobiliarias[0];
        this.obtenerInmuebles();
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }
    });
  }

  obtenerInmuebles(): void {
    this.inmueblesService.listarInmuebles(-1, 'createdAt').subscribe({
      next: ({inmuebles}) => {
        this.inmuebles = inmuebles.filter( inmueble => (inmueble.activo));
        this.inmueblesVenta = inmuebles.filter( inmueble => ( inmueble.alquiler_venta === 'Venta' && inmueble.activo));
        this.inmueblesAlquiler = inmuebles.filter( inmueble => ( inmueble.alquiler_venta === 'Alquiler' && inmueble.activo));
        this.alertService.close();
      },
      error: (error) => {
        this.alertService.errorApi(error.message);
      }
    });  
  }

}
