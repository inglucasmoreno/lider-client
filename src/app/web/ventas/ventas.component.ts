import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import { AlertService } from 'src/app/services/alert.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { DataWebService } from 'src/app/services/data-web.service';
import { InmueblesService } from 'src/app/services/inmuebles.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styles: [
  ]
})
export class VentasComponent implements OnInit {

  public showAsesor = false;
  public inmuebleSeleccionado:any;
  public inmuebles:any[];
  
  // Parametros de busqueda
  public parametros = {
    provincia: '',
    tipo: 'Casa',
    localidad: '',
    alquiler_venta: '',
    direccion: 1,
    columna: 'codigo'
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

  constructor(public consultasService: ConsultasService,
              public alertService: AlertService,
              public inmueblesService: InmueblesService) { }

  ngOnInit(): void {
    var tl = gsap.timeline({defaults: { duration: 0.1 }});

    tl.from('.gsap-imagen', { x:-200, opacity: 0, duration: 0.5, ease: 'back' })
      .from('.gsap-buscador', { y:100, opacity: 0, duration: 0.5, ease: 'back' })
      .from('.gsap-tarjetas', { y:100, opacity: 0, duration: 0.5, ease: 'back' });

    this.listarInmuebles();

  }

  listarInmuebles(): void {
    this.alertService.loading();
    this.inmueblesService.listarInmuebles(this.parametros).subscribe({
      next: ({inmuebles}) => {
        this.inmuebles = inmuebles.filter(inmueble => (inmueble.activo && inmueble.alquiler_venta === 'Venta'));
        this.alertService.close();
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }
    });
  }

  contactarAsesor($event){
    this.reiniciarFormularios();
    window.scrollTo(0,0);
    this.inmuebleSeleccionado = $event;
    this.showAsesor = true;
  }

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
