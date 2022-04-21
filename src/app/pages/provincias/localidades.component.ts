import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { ProvinciasService } from 'src/app/services/provincias.service';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styles: [
  ]
})
export class LocalidadesComponent implements OnInit {

  constructor(private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private localidadesService: LocalidadesService,
              private provinciasService: ProvinciasService,
              private alertService: AlertService) { }

  // provincia
  public provincia: string;
  public provinciaNombre: string;

  // Modal
  public showLocalidad = false;
  public tipoAccion = 'creando';

  // Localidades       
  public localidades: any;
  public localidadSeleccionada: any;

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

  // Modelo reactivo - Localidad
  public localidadForm = this.fb.group({
    descripcion: ['', Validators.required],
    provincia: ['', Validators.required],
    activo: 'true',
  });

  ngOnInit(): void {
    this.dataService.ubicacionActual = "Dashboard - Provincias - Localidades";
    this.alertService.loading();
    this.activatedRoute.params.subscribe(({id}) => { 
      this.provincia = id;
      this.reiniciarFormulario();
      this.provinciasService.getProvincia(id).subscribe({
        next: ({provincia}) => {
          this.provinciaNombre = provincia.descripcion;
          this.listarLocalidades();
        },
        error: ({error}) => {
          this.alertService.errorApi(error.msg);
        }
      })
    });
  }

  // Listar localidades
  listarLocalidades(): void {
    this.localidadesService.listarLocalidadesPorProvincia(this.ordenar.direccion, this.ordenar.columna, this.provincia).subscribe({
    
      next: ({ localidades }) => {
        this.localidades = localidades;
        this.showLocalidad = false;
        this.alertService.close();
      },

      error: ({error}) => {
        this.alertService.errorApi(error.msg);
      }

    });
  }

  // Nueva localidad
  crearLocalidad(): void {

    // Validacion de campos
    if(!this.localidadForm.valid || 
      this.localidadForm.value.descripcion.trim() === '' ||
      this.localidadForm.value.provincia.trim() === ''
    ){
      this.alertService.info('Debe colocar una descripción');
      return;
    }

    // Creando localidad
    this.alertService.loading();
    this.localidadesService.nuevaLocalidad(this.localidadForm.value).subscribe({

      next: () => {
        this.listarLocalidades();
      },

      error: ({ error }) => {
        this.alertService.errorApi(error.msg);
      }

    });

  }

  // Actualizar estado Activo/Inactivo
  actualizarEstado(localidad: any): void {
    
    const { _id, activo } = localidad;

    // if(!this.permisos.all) return this.alertService.info('Usted no tiene permiso para realizar esta acción');

    this.alertService.question({ msg: '¿Quieres actualizar el estado?', buttonText: 'Actualizar' })
    .then(({isConfirmed}) => {  
      
      if (isConfirmed) {
        this.alertService.loading();
        this.localidadesService.actualizarLocalidad(_id, {activo: !activo}).subscribe({

        next: () => {
          this.alertService.loading();
          this.listarLocalidades();       
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
  abrirModal(tipo: string, localidad: any = null): void {

    this.tipoAccion = tipo;

    this.reiniciarFormulario();

    if(tipo === 'editando'){

    this.localidadSeleccionada = localidad;

    this.localidadForm.patchValue({
      descripcion: localidad.descripcion,
      activo: localidad.activo,         
    })

    }

    this.showLocalidad = true;   

  }

  // Actualizar localidad
  actualizarLocalidad(): void {
    this.alertService.loading();
    this.localidadesService.actualizarLocalidad(this.localidadSeleccionada._id, this.localidadForm.value).subscribe({
      next: () => {
        this.listarLocalidades();        
      },
      error: ({error}) => {
        this.alertService.errorApi(error.msg);
      }
    });
  }

  // Reiniciando formulario
  reiniciarFormulario(): void {
    this.localidadForm.patchValue({
      descripcion: '',
      provincia: this.provincia,
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
    this.listarLocalidades();
  }

}
