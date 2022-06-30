import { Component, OnInit } from '@angular/core';
import { DataWebService } from '../../services/data-web.service';
import { AlertService } from '../../services/alert.service';
import { InmueblesService } from 'src/app/services/inmuebles.service';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public inmobiliaria;
  public showMenu = false;
  public showAsesor = false;

  public inmueble;
  public codigo = '';
  public showModalInmueble = false;

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

  constructor(public dataWebService: DataWebService,
              public consultasService: ConsultasService,
              private inmueblesService: InmueblesService,
              public alertService: AlertService) { }

  ngOnInit(): void {
    this.dataWebService.obtenerInmobiliaria();
  }

  obtenerInmueble(): void {

    this.inmueble = {};

    // Se verifica que haya codigo
    if(this.codigo.trim() === ''){
      this.alertService.info('Debe colocar el código del inmueble');
      return;
    }

    this.alertService.loading();
    this.inmueblesService.getInmueblePorCodigo(this.codigo).subscribe({
      next: ({inmueble}) => {
        console.log(inmueble);
        this.inmueble = inmueble;
        this.dataWebService.showModalInmueble = true;
        this.alertService.close();
      },
      error: ({error}) => this.alertService.info(error.message)
    });

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
      this.alertService.info('Debe colocar su teléfono y/o email');
      return;
    }

    this.alertService.loading();

    this.dataConsulta.codigo = this.inmueble.codigo;

    this.consultasService.nuevaConsulta(this.dataConsulta).subscribe({
      next: () => {
        this.alertService.successConfirm('Te contactaremos pronto!');
        this.showAsesor = false;
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }
    });
  }

  // Contactar asesor
  contactarAsesor(){
    this.reiniciarFormularios();
    window.scrollTo(0,0);
    this.dataWebService.showModalInmueble = false;
    this.showAsesor = true;
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
