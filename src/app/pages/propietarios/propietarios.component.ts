import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { PropietariosService } from 'src/app/services/propietarios.service';

@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
  styles: [
  ]
})
export class PropietariosComponent implements OnInit {

  constructor(private dataService: DataService,
              private fb: FormBuilder,
              private propietariosService: PropietariosService,
              private alertService: AlertService) { }

  // Modal
  public showPropietario = false;
  public tipoAccion = 'creando';

  // Propietarios             
  public propietarios: any;
  public propietarioSeleccionado: any;

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

    // Modelo reactivo - Propietario
  public propietarioForm = this.fb.group({
    descripcion: ['', Validators.required],
    telefono: '',
    identificacion_tipo: ['DNI', Validators.required],
    identificacion: '',
    direccion: '',
    email: '',
  });
  
  ngOnInit(): void {
    this.dataService.ubicacionActual = "Dashboard - Propietarios";
    this.alertService.loading();
    this.listarPropietarios();
  }

  // Listar propietarios
  listarPropietarios(): void {
    this.propietariosService.listarPropietarios(this.ordenar.direccion, this.ordenar.columna).subscribe({

      next: ({ propietarios }) => {
        this.propietarios = propietarios;
        this.showPropietario = false;
        this.alertService.close();
      },

      error: ({error}) => {
        this.alertService.errorApi(error.msg);
      }

    });
  }

  // Nuevo propietario
  crearPropietario(): void {
    
    // Validacion de campos
    if(!this.propietarioForm.valid || 
       this.propietarioForm.value.descripcion.trim() === ''){
      this.alertService.info('Completar campos obligatorios');
      return;
    }

    // Creando propietario
    this.alertService.loading();
    this.propietariosService.nuevoPropietario(this.propietarioForm.value).subscribe({

      next: () => {
        this.listarPropietarios();
      },

      error: ({ error }) => {
        this.alertService.errorApi(error.msg);
      }

    });

  }

  // Actualizar estado Activo/Inactivo
  actualizarEstado(propietario: any): void {
    const { _id, activo } = propietario;

    // if(!this.permisos.all) return this.alertService.info('Usted no tiene permiso para realizar esta acción');

    this.alertService.question({ msg: '¿Quieres actualizar el estado?', buttonText: 'Actualizar' })
        .then(({isConfirmed}) => {  
          if (isConfirmed) {
            this.alertService.loading();
            this.propietariosService.actualizarPropietario(_id, {activo: !activo}).subscribe({
              
              next: () => {
                this.alertService.loading();
                this.listarPropietarios();       
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
  abrirModal(tipo: string, propietario: any = null): void {
    
    this.tipoAccion = tipo;

    this.reiniciarFormulario();

    if(tipo === 'editando'){

      this.propietarioSeleccionado = propietario;

      this.propietarioForm.patchValue({
        descripcion: propietario.descripcion,
        telefono: propietario.telefono,
        identificacion_tipo: propietario.identificacion_tipo,
        identificacion: propietario.identificacion,
        direccion: propietario.direccion,
        email: propietario.email,         
      })
    }

    this.showPropietario = true;   
  
  }

  // Actualizar propietario
  actualizarPropietario(): void {
    this.alertService.loading();
    this.propietariosService.actualizarPropietario(this.propietarioSeleccionado._id, this.propietarioForm.value).subscribe({
      next: () => {
        this.listarPropietarios();        
      },
      error: ({error}) => {
        this.alertService.errorApi(error.msg);
      }
    });
  }

  // Reiniciando formulario
  reiniciarFormulario(): void {
    this.propietarioForm.patchValue({
      descripcion: '',
      telefono: '',
      identificacion_tipo: 'DNI',
      identificacion: '',
      direccion: '',
      email: '', 
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
    this.listarPropietarios();
  }



}
