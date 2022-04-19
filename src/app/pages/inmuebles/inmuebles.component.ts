import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble.model';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { InmueblesService } from 'src/app/services/inmuebles.service';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styles: [
  ]
})
export class InmueblesComponent implements OnInit {

  // Permisos
  public permiso_escritura: string[] = ['INMUEBLES_ALL'];

  // Permisos de usuarios login
  public permisos = { all: false };

  // Inmuebles
  public inmuebles: Inmueble[];

  // Paginacion
  public paginaActual: number = 1;
  public cantidadItems: number = 10;

  // Filtrado
  public filtro = {
    activo: 'true',
    parametro: ''
  }

  // Ordenar
  public ordenar = {
    direccion: 1,  // Asc (1) | Desc (-1)
    columna: 'codigo'
  }

  constructor(private alertService: AlertService,
              private inmueblesService: InmueblesService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.ubicacionActual = 'Dashboard - Inmuebles' ;
    this.alertService.loading();
    this.listarInmuebles();
  }
  listarInmuebles(): void {
    this.inmueblesService.listarInmuebles(this.ordenar.direccion, this.ordenar.columna).subscribe({

      next: ({ inmuebles }) => {
        this.inmuebles = inmuebles;
        this.alertService.close();
      },

      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }

    });  
  }

  // Actualizar estado Activo/Inactivo
  actualizarEstado(inmueble: Inmueble): void {
    const { _id, activo } = inmueble;

    if(!this.permisos.all) return this.alertService.info('Usted no tiene permiso para realizar esta acción');

    this.alertService.question({ msg: '¿Quieres actualizar el estado?', buttonText: 'Actualizar' })
        .then(({isConfirmed}) => {  
          if (isConfirmed) {
            this.alertService.loading();
            this.inmueblesService.actualizarInmueble(_id, {activo: !activo}).subscribe({
              
              next: () => {
                this.alertService.loading();
                this.listarInmuebles();       
              },

              error: ({error}) => {
              this.alertService.close();
              this.alertService.errorApi(error.message);
              }
              
            });
          }
        });
  }
  
  // Filtrar Activo/Inactivo
  filtrarActivos(activo: any): void{
    this.paginaActual = 1;
    this.filtro.activo = activo;
  }

  // Filtrar por parametro
  filtrarParametro(parametro: string): void{
    this.paginaActual = 1;
    this.filtro.parametro = parametro;
  }
  
  // Ordenar por columna
  ordenarPorColumna(columna: string){
    this.ordenar.columna = columna;
    this.ordenar.direccion = this.ordenar.direccion == 1 ? -1 : 1; 
    this.alertService.loading();
    this.listarInmuebles();
  }


}
