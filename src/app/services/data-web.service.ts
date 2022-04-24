import { Injectable } from '@angular/core';
import { InmobiliariaService } from './inmobiliaria.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class DataWebService {

  public inmobiliaria;

  constructor(private inmobiliariaService: InmobiliariaService,
              private alertService: AlertService) { }

  obtenerInmobiliaria(): void {
    this.alertService.loading();
    this.inmobiliariaService.listarInmobiliarias().subscribe({
      next: ({inmobiliarias}) => {
        this.inmobiliaria = inmobiliarias[0];
        this.alertService.close();
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }
    });
  }

}
