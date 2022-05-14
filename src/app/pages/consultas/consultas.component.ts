import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { DataService } from 'src/app/services/data.service';
import gsap from 'gsap';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styles: [
  ]
})
export class ConsultasComponent implements OnInit {

  public consultas = [];
  public consultasTotales: any[] = [];

  constructor(private consultasService: ConsultasService,
              private dataService: DataService,
              private alertService: AlertService) { }

  public showModal = false;
  public consultaSeleccionada: any;

  public dataConsulta = {
    apellido: '',
    nombre: '',
    telefono: '',
    email: '',
    asunto: '',
    mensaje: ''
  }

  public filtros = {
    activo: 'true',
  }

  // Paginacion
  public paginaActual: number = 1;
  public cantidadItems: number = 5;


  ngOnInit(): void {
    gsap.from('.gsap-contenido', { y:100, opacity: 0, duration: .2 });
    this.dataService.ubicacionActual = 'Dashboard - Consultas';  
    this.listarConsultas();
  }

  // Abrir modal
  abrirModal(consulta: any): void {
    this.obtenerConsulta(consulta._id);
  }

  // Obtener consulta
  obtenerConsulta(id: string): void {
    this.alertService.loading();
    this.consultasService.getConsulta(id).subscribe({
      next: ({consulta}) => {
        this.consultaSeleccionada = consulta;
        this.showModal = true;
        this.alertService.close();
      },
      error: ({error}) => {
        this.alertService.errorApi(error);
      }
    });
  }

  // Listar consultas
  listarConsultas(): void {
    this.alertService.loading();
    this.consultasService.listarConsultas().subscribe({
      next: ({consultas}) => {
        this.consultasTotales = consultas;
        this.filtradoConsultas();
        this.showModal = false;
        this.alertService.close();
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }
    });
  }

  // Filtrado
  filtradoConsultas(): void {
    
    let consultasTmp: any[];

    // Filtro - Activos o Inactivos
    if(this.filtros.activo === 'true'){
      consultasTmp = this.consultasTotales.filter(consultas => consultas.activo);
    }else if(this.filtros.activo === 'false'){
      consultasTmp = this.consultasTotales.filter(consultas => !consultas.activo);    
    }

    this.reiniciarPaginacion();

    this.consultas = consultasTmp;

  }

  // Atender consulta
  atenderConsulta(consulta: any){

    this.alertService.question({ msg: '¿Quieres atender esta consulta?', buttonText: 'Atender' })
    .then(({isConfirmed}) => {  
      if (isConfirmed) {
        this.alertService.loading();
        this.consultasService.actualizarConsulta(consulta._id, { activo: false }).subscribe({
          next: () => {
            this.listarConsultas(); 
          },
          error: ({error}) => {
            this.alertService.errorApi(error.message);
          }
        })
      }
    });
  
  }

  // Reiniciar paginacion
  reiniciarPaginacion(): void {
    this.paginaActual = 1;
  }

  // Reiniciar formulario
  reiniciarFormulario(): void {
    this.dataConsulta = {
      apellido: '',
      nombre: '',
      telefono: '',
      email: '',
      asunto: '',
      mensaje: ''
    }    
  }

}
