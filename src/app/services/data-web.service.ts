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
  public showMenu = false;

  constructor(private inmobiliariaService: InmobiliariaService,
              private alertService: AlertService) { }

  obtenerInmobiliaria(): void {
    this.inmobiliariaService.listarInmobiliarias().subscribe({
      next: ({inmobiliarias}) => {
        this.inmobiliaria = inmobiliarias[0];
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }
    });
  }
}
