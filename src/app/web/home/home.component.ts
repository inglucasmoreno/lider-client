import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import { DataWebService } from 'src/app/services/data-web.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  // Modal
  public showAsesor = false;
  public showDetalle = false;

  public imagenes = [
    { title: 'Potrero de los funes', src: 'https://www.serargentino.com/public/images/2020/10/16038162220-Potrero-de-los-Funes-773x458.jpg' },
    { title: 'La florida', src: 'https://tripin.travel/wp-content/uploads/2016/10/Dique-La-Florida-San-Luis-Argentina.jpg' },
    { title: 'Trapiche', src: 'https://www.serargentino.com/public/images/2020/10/16037372200-trapiche-773x458.jpg' },
    { title: 'Cruz de piedra', src: 'https://viapais.com.ar/resizer/kWBOqktVGS2GzANnHlI3UPEtZLU=/982x551/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/MZSTINLGGJTDCMRRGZSDSZJTMY.jpg' },
  ];

  public elementos = [
    { 
      detalles: 'Potrero de los funes', 
      tipo: 'casa', 
      venta: true, 
      ubicacion: 'Potrero de los Funes (San Luis)', 
      precio: {
        valor: 12000000,
        usd: true,
      },
      codigo: 'CA001',
      img: 'https://www.serargentino.com/public/images/2020/10/16038162220-Potrero-de-los-Funes-773x458.jpg' 
    },
    { 
      detalles: 'La florida', 
      tipo: 'departamento', 
      venta: false, 
      ubicacion: 'La florida (San Luis)', 
      precio: {
        valor: 30000,
        usd: true,
      },
      codigo: 'DE001',
      img: 'https://tripin.travel/wp-content/uploads/2016/10/Dique-La-Florida-San-Luis-Argentina.jpg' 
    },
    { 
      detalles: 'Trapiche', 
      tipo: 'terreno', 
      venta: true, 
      ubicacion: 'El trapiche (San Luis)', 
      precio: {
        valor: 12000000,
        usd: false,
      },
      codigo: 'TE001',
      img: 'https://www.serargentino.com/public/images/2020/10/16037372200-trapiche-773x458.jpg' 
    },
    { 
      detalles: 'Cruz de piedra', 
      tipo: 'lote', 
      venta: false, 
      ubicacion: 'Cruz de piedra (San Luis)', 
      precio: {
        valor: 20000,
        usd: true,
      }, 
      codigo: 'LT001',
      img: 'https://viapais.com.ar/resizer/kWBOqktVGS2GzANnHlI3UPEtZLU=/982x551/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/MZSTINLGGJTDCMRRGZSDSZJTMY.jpg' 
    },
  ];

  private imgNumber = 1;
  public imgSelect: any = this.imagenes[this.imgNumber]; 

  constructor(public dataWebService: DataWebService) { }

  ngOnInit(): void {
   
    var tl = gsap.timeline({defaults: { duration: 0.1 }});

    tl.from('.gsap-imagen', { x:-200, opacity: 0, duration: 0.5, ease: 'back' })
      .from('.gsap-buscador', { y:100, opacity: 0, duration: 0.5, ease: 'back' })
      .from('.gsap-tarjetas', { y:100, opacity: 0, duration: 0.5, ease: 'back' });
      
  }

  // cambiarImagen(accion: string): void {
  //   if(accion === 'incrementar' && this.imgNumber < this.imagenes.length - 1) this.imgNumber += 1;
  //   if(accion === 'decrementar' && this.imgNumber > 0) this.imgNumber -= 1;
  //   this.imgSelect = this.imagenes[this.imgNumber];
  //   console.log(this.imgSelect);
  // }

}
