import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-detalles-inmueble',
  templateUrl: './detalles-inmueble.component.html',
  styles: [
  ]
})
export class DetallesInmuebleComponent implements OnInit {

  public imagenPrincipal = 'https://www.serargentino.com/public/images/2020/10/16038162220-Potrero-de-los-Funes-773x458.jpg';
  
  public imagenes = [
    {
      url: 'https://tripin.travel/wp-content/uploads/2016/10/Dique-La-Florida-San-Luis-Argentina.jpg',
      nombre: 'Foto 1'
    },
    {
      url: 'https://www.serargentino.com/public/images/2020/10/16037372200-trapiche-773x458.jpg',
      nombre: 'Foto 2'
    },
    {
      url: 'https://viapais.com.ar/resizer/kWBOqktVGS2GzANnHlI3UPEtZLU=/982x551/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/MZSTINLGGJTDCMRRGZSDSZJTMY.jpg',
      nombre: 'Foto 3'
    },
    {
      url: 'https://viapais.com.ar/resizer/kWBOqktVGS2GzANnHlI3UPEtZLU=/982x551/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/MZSTINLGGJTDCMRRGZSDSZJTMY.jpg',
      nombre: 'Foto 3'
    },
    {
      url: 'https://viapais.com.ar/resizer/kWBOqktVGS2GzANnHlI3UPEtZLU=/982x551/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/MZSTINLGGJTDCMRRGZSDSZJTMY.jpg',
      nombre: 'Foto 3'
    },
    {
      url: 'https://viapais.com.ar/resizer/kWBOqktVGS2GzANnHlI3UPEtZLU=/982x551/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/MZSTINLGGJTDCMRRGZSDSZJTMY.jpg',
      nombre: 'Foto 3'
    },

  ];
  
  public imagenSeleccionada = this.imagenes[0];
  
  constructor() { }

  ngOnInit(): void {
    var tl = gsap.timeline({defaults: { duration: 0.1 }});

    tl.from('.gsap-imagen', { x:-200, opacity: 0, duration: 0.5, ease: 'back' })
      .from('.gsap-datos', { y:100, opacity: 0, duration: 0.5, ease: 'back' })
      // .from('.gsap-tarjetas', { y:100, opacity: 0, duration: 0.5, ease: 'back' });
  }

}
