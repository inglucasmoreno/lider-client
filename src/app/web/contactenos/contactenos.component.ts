import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import { AlertService } from 'src/app/services/alert.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { DataWebService } from 'src/app/services/data-web.service';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styles: [
  ]
})
export class ContactenosComponent implements OnInit {

  constructor(public dataWebService: DataWebService,
              private consultasService: ConsultasService,
              private alertService: AlertService) { }

  public dataConsulta = {
    apellido: '',
    nombre: '',
    telefono: '',
    email: '',
    asunto: '',
    mensaje: ''
  }

  ngOnInit(): void {
    var tl = gsap.timeline({defaults: { duration: 0.1 }});
    tl.from('.gsap-formulario', { x:-200, opacity: 0, duration: 0.5, ease: 'back' })
      .from('.gsap-canales', { y:100, opacity: 0, duration: 0.5, ease: 'back' });
  }

  // Enviar consulta
  enviarConsulta(): void {

    if(this.verificacionDatos()) return;

    this.alertService.loading();
    this.consultasService.nuevaConsulta(this.dataConsulta).subscribe({
      next: () => {
        this.reiniciarFormulario();
        this.alertService.successConfirm('Nos estaremos comunicando pronto!');
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }
    })

    console.log(this.dataConsulta);
  }

  // Verificacion de datos
  verificacionDatos(): boolean {
    const { telefono, email, apellido, nombre, asunto, mensaje } = this.dataConsulta;


    const verificacion_nombre = apellido.trim() === '' || nombre.trim() === '';
    const verificacion_comunicacion = telefono.trim() === '' && email.trim() === '';
    const verificacion_mensaje = asunto.trim() === '' || mensaje.trim() === '';
    
    if(verificacion_nombre){
      this.alertService.info('Debe colocar su apellido y nombre');
      return true;
    }else if(verificacion_comunicacion){
      this.alertService.info('Debe colocar su número de teléfono o correo');
      return true;
    }else if(verificacion_mensaje){
      this.alertService.info('Debe colocar un asunto y un mensaje');
      return true;
    }

    return false;

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
