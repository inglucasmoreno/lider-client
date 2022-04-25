import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from '../../services/data.service';
import { InmueblesService } from '../../services/inmuebles.service';
import gsap from 'gsap';

@Component({
  selector: 'app-inmueble-detalles',
  templateUrl: './inmueble-detalles.component.html',
  styleUrls: []
})
export class InmuebleDetallesComponent implements OnInit {

  public id: string;
  public inmueble: any;

  constructor(private dataService: DataService,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private inmueblesService: InmueblesService ) { }

  // Inicio
  ngOnInit(): void {
    this.dataService.ubicacionActual = 'Dashboard - Inmuebles - Detalles';
    gsap.from('.gsap-contenido', { y:100, opacity: 0, duration: .2 });
    this.activatedRoute.params.subscribe(({id}) => {
      this.id = id;
      this.alertService.loading();
      this.obtenerInmueble();
    })
  }

  // Alta de inmueble
  altaBajaInmueble(activo: boolean): void {
    this.alertService.loading();
    this.inmueblesService.actualizarInmueble(this.id, { activo }).subscribe({
      next: ({ inmueble }) => {
        this.inmueble.activo = activo;
        this.alertService.success(activo ? 'Inmueble dado de alta' : 'Inuemble dado de baja');
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);  
      }
    })  
  }

  // Obtener datos de inmueble
  obtenerInmueble(): void {
    this.inmueblesService.getInmueble(this.id).subscribe({
      next: ({inmueble}) => {
        this.inmueble = inmueble[0];
        this.alertService.close();
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }
    });
  }

}
