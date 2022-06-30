import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import gsap from 'gsap';
import { AlertService } from 'src/app/services/alert.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { InmueblesService } from 'src/app/services/inmuebles.service';
import { DataWebService } from '../../services/data-web.service';

@Component({
  selector: 'app-detalles-inmueble',
  templateUrl: './detalles-inmueble.component.html',
  styles: [
  ]
})
export class DetallesInmuebleComponent implements OnInit {

  public imagenPrincipal = 'https://www.serargentino.com/public/images/2020/10/16038162220-Potrero-de-los-Funes-773x458.jpg';
  
  public index = 0;

  public imagenes = [
    {
      index: 0,
      url: 'https://tripin.travel/wp-content/uploads/2016/10/Dique-La-Florida-San-Luis-Argentina.jpg',
      nombre: 'Foto 1'
    },
    {
      index: 1,
      url: 'https://www.serargentino.com/public/images/2020/10/16037372200-trapiche-773x458.jpg',
      nombre: 'Foto 2'
    },
    {
      index: 2,
      url: 'https://viapais.com.ar/resizer/kWBOqktVGS2GzANnHlI3UPEtZLU=/982x551/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/MZSTINLGGJTDCMRRGZSDSZJTMY.jpg',
      nombre: 'Foto 3'
    },
    {
      index: 3,
      url: 'https://viapais.com.ar/resizer/kWBOqktVGS2GzANnHlI3UPEtZLU=/982x551/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/MZSTINLGGJTDCMRRGZSDSZJTMY.jpg',
      nombre: 'Foto 3'
    },
    {
      index: 4,
      url: 'https://viapais.com.ar/resizer/kWBOqktVGS2GzANnHlI3UPEtZLU=/982x551/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/MZSTINLGGJTDCMRRGZSDSZJTMY.jpg',
      nombre: 'Foto 3'
    },
    {
      index: 5,
      url: 'https://viapais.com.ar/resizer/kWBOqktVGS2GzANnHlI3UPEtZLU=/982x551/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/MZSTINLGGJTDCMRRGZSDSZJTMY.jpg',
      nombre: 'Foto 3'
    },

  ];

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
  
  public imagenSeleccionada = this.imagenes[0];

  // Inmueble
  public idInmueble;
  public inmueble: any;

  // Modal asesor
  public showAsesor = false;

  // Modal imagenes
  public showModalImagenes = false;

  constructor(private inmuebleService: InmueblesService,
              public dataWebService: DataWebService,
              private consultasService: ConsultasService,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.dataWebService.showModalInmueble = false;
    this.activatedRoute.params.subscribe(({id}) => this.idInmueble = id);
    var tl = gsap.timeline({defaults: { duration: 0.1 }});
    tl.from('.gsap-imagen', { x:-200, opacity: 0, duration: 0.5, ease: 'back' });
    this.obtenerInmueble();
  }

  obtenerInmueble(): void {
    this.alertService.loading();
    this.inmuebleService.getInmueble(this.idInmueble).subscribe({
      next: ({inmueble}) => {
        this.inmueble = inmueble;
        console.log(inmueble);
        this.alertService.close();
      },
      error: (error) => this.alertService.errorApi(error)
    });
  }

  abrirModalImagenes(imagen: any): void {
    window.scrollTo(0,0);
    this.imagenSeleccionada = imagen;
    this.showModalImagenes = true;
  }

  cambiarImagen(accion: string): void {
    
    if(accion === 'proxima' && this.imagenSeleccionada.index === this.imagenes.length - 1) return;
    if(accion === 'anterior' && this.imagenSeleccionada.index === 0) return;

    accion === 'proxima' ? this.index = this.imagenSeleccionada.index + 1 : this.index = this.imagenSeleccionada.index - 1;
    this.imagenSeleccionada = this.imagenes[this.index];
  
  }

  // Contactar asesor
  contactarAsesor(){
    this.reiniciarFormularios();
    window.scrollTo(0,0);
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
