import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import { AlertService } from 'src/app/services/alert.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { InmueblesService } from 'src/app/services/inmuebles.service';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { ProvinciasService } from 'src/app/services/provincias.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  // Modal
  public showAsesor = false;
  public inmuebleSeleccionado:any;
  public inmuebles:any[];
  public provincias: any[];
  public localidades: any[];

  // Parametros de busqueda
  public parametros = {
    provincia: '',
    tipo: 'Casa',
    localidad: '',
    alquiler_venta: ''
  }
  
  // Formulario consulta
  public dataConsulta = {
    codigo: '',
    apellido: '',
    nombre: '',
    telefono: '',
    email: '',
    asunto: 'Consulta por inmueble',
    mensaje: 'Contactar asesor'
  }

  constructor(private alertService: AlertService,
              private provinciasService: ProvinciasService,
              private localidadesService: LocalidadesService,
              private consultasService: ConsultasService,
              private inmueblesService: InmueblesService) { }

  ngOnInit(): void {
    
    var tl = gsap.timeline({defaults: { duration: 0.1 }});

    tl.from('.gsap-imagen', { x:-200, opacity: 0, duration: 0.5, ease: 'back' })
      .from('.gsap-buscador', { y:100, opacity: 0, duration: 0.5, ease: 'back' })
      .from('.gsap-tarjetas', { y:100, opacity: 0, duration: 0.5, ease: 'back' });
      
    this.alertService.loading();
    this.inmueblesService.listarInmuebles().subscribe({
      next: ({inmuebles}) => {
        this.inmuebles = inmuebles.filter(inmueble => inmueble.activo);
        this.listarProvincias();
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }
    });

  }

  listarInmuebles(): void {
    this.alertService.loading();
    this.inmueblesService.listarInmuebles().subscribe({
      next: ({inmuebles}) => {
        this.inmuebles = inmuebles.filter(inmueble => inmueble.activo);
        this.alertService.close();
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }
    });
  }

  // Contactar asesor
  contactarAsesor($event){
    this.reiniciarFormularios();
    window.scrollTo(0,0);
    this.inmuebleSeleccionado = $event;
    this.showAsesor = true;
  }

  // Generar consulta
  generarConsulta(): void {

    const { apellido, nombre, telefono, email } = this.dataConsulta;

    const verificacion_1 = apellido.trim() === '' || nombre.trim() === '';
    const verificacion_2 = telefono.trim() === '' && email.trim() === '';

    if(verificacion_1){
      this.alertService.info('Debe colocar su apellido y nombre');
      return;
    }

    if(verificacion_2){
      this.alertService.info('Debe colocar su teléfono o email');
      return;
    }

    this.alertService.loading();

    this.dataConsulta.codigo = this.inmuebleSeleccionado.codigo;

    this.consultasService.nuevaConsulta(this.dataConsulta).subscribe({
      next: () => {
        this.alertService.successConfirm('Nos contactaremos pronto contigo!');
        this.showAsesor = false;
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }
    });
  }

  // Listar provincias
  listarProvincias(): void {
    this.provinciasService.listarProvincias().subscribe({
      next: ({provincias}) => {
        this.provincias = provincias;
        this.alertService.close();
        console.log(provincias);
      },
      error: ({error}) => this.alertService.errorApi(error.message) 
    });
  }

  // Cambio de provincia
  cambioProvincia(): void {
    if(this.parametros?.provincia.trim() !== ''){
      this.alertService.loading();
      this.localidadesService.listarLocalidadesPorProvincia(1, 'descripcion', this.parametros.provincia).subscribe({
        next: ({localidades}) => {
          this.localidades = localidades;
          // this.localidades = localidades.filter(localidad => localidad.provincia !== this.parametros.provincia);
          this.alertService.close();
        },
        error: ({error}) => this.alertService.errorApi(error.message)
      })
    }else{
      this.parametros.provincia = '';
    }
  }

  // Reiniciar formulario
  reiniciarFormularios(): void {
    this.dataConsulta = {
      codigo: '',
      apellido: '',
      nombre: '',
      telefono: '',
      email: '',
      asunto: 'Consulta por inmueble',
      mensaje: 'Contactar asesor'      
    }
  }

}
