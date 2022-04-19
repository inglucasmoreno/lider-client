import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { ProvinciasService } from 'src/app/services/provincias.service';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styles: [
  ]
})
export class ProvinciasComponent implements OnInit {

  constructor(private dataService: DataService,
              private fb: FormBuilder,
              private provinciasService: ProvinciasService,
              private alertService: AlertService) { }

  // Modal
  public showProvincia = false;
  public tipoAccion = 'creando';

  // Provincias          
  public provincias: any;
  public provinciaSeleccionada: any;

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
  columna: 'descripcion'
  }

  // Modelo reactivo - Provincia
  public provinciaForm = this.fb.group({
    descripcion: ['', Validators.required],
    activo: 'true',
  });

  ngOnInit(): void {
    this.dataService.ubicacionActual = "Dashboard - Provincias";
    this.alertService.loading();
    this.listarProvincias();
  }

  // Listar provincias
  listarProvincias(): void {
  this.provinciasService.listarProvincias(this.ordenar.direccion, this.ordenar.columna).subscribe({
    next: ({ provincias }) => {
      this.provincias = provincias;
      this.showProvincia = false;
      this.alertService.close();
    },

    error: ({error}) => {
      this.alertService.errorApi(error.msg);
    }

    });
  }

  // Nueva provincia
  crearProvincia(): void {

    // Validacion de campos
    if(!this.provinciaForm.valid || 
      this.provinciaForm.value.descripcion.trim() === ''){
      this.alertService.info('Debe colocar una descripción');
      return;
    }

    // Creando provincia
    this.alertService.loading();
    this.provinciasService.nuevaProvincia(this.provinciaForm.value).subscribe({

        next: () => {
          this.listarProvincias();
        },

        error: ({ error }) => {
          this.alertService.errorApi(error.msg);
        }

      });

  }

  // Actualizar estado Activo/Inactivo
  actualizarEstado(provincia: any): void {
    const { _id, activo } = provincia;

    // if(!this.permisos.all) return this.alertService.info('Usted no tiene permiso para realizar esta acción');

    this.alertService.question({ msg: '¿Quieres actualizar el estado?', buttonText: 'Actualizar' })
    .then(({isConfirmed}) => {  
      if (isConfirmed) {
        this.alertService.loading();
        this.provinciasService.actualizarProvincia(_id, {activo: !activo}).subscribe({
          
          next: () => {
            this.alertService.loading();
            this.listarProvincias();       
          },

          error: ({error}) => {
            this.alertService.close();
            this.alertService.errorApi(error.message);
          }
          
        });
      }
    });
  }

  // Abrir modal - Creacion y Edicion
  abrirModal(tipo: string, provincia: any = null): void {

    this.tipoAccion = tipo;

    this.reiniciarFormulario();

    if(tipo === 'editando'){

      this.provinciaSeleccionada = provincia;

      this.provinciaForm.patchValue({
        descripcion: provincia.descripcion,
        activo: provincia.activo,         
      })

    }

    this.showProvincia = true;   

  }

  // Actualizar provincia
  actualizarProvincia(): void {
    this.alertService.loading();
    this.provinciasService.actualizarProvincia(this.provinciaSeleccionada._id, this.provinciaForm.value).subscribe({
      next: () => {
        this.listarProvincias();        
      },
      error: ({error}) => {
        this.alertService.errorApi(error.msg);
      }
    });
  }

  // Reiniciando formulario
  reiniciarFormulario(): void {
    this.provinciaForm.patchValue({
      descripcion: '',
      activo: 'true', 
    });
  }

  // Filtrar Activo/Inactivo
  filtrarActivos(activo: any): void{
    this.paginaActual = 1;
    this.filtro.activo = activo;
  }

  // Filtrar por Parametro
  filtrarParametro(parametro: string): void{
    this.paginaActual = 1;
    this.filtro.parametro = parametro;
  }

  // Ordenar por columna
  ordenarPorColumna(columna: string){
    this.ordenar.columna = columna;
    this.ordenar.direccion = this.ordenar.direccion == 1 ? -1 : 1; 
    this.alertService.loading();
    this.listarProvincias();
  }

}
