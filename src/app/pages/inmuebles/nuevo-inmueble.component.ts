import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { InmueblesService } from 'src/app/services/inmuebles.service';
import { PropietariosService } from 'src/app/services/propietarios.service';
import { ProvinciasService } from 'src/app/services/provincias.service';

@Component({
  selector: 'app-nuevo-inmueble',
  templateUrl: './nuevo-inmueble.component.html',
  styles: [
  ]
})
export class NuevoInmuebleComponent implements OnInit {

  public propietarios: any;
  public provincias: any;

  // Modelo reactivo - Propietario
  public inmuebleForm = this.fb.group({
    propietario: ['', Validators.required],
    tipo: ['Casa', Validators.required],
    alquiler_venta: ['Alquiler', Validators.required],
    ubicacion_publica: ['', Validators.required],
    ubicacion_privada: ['', Validators.required],
    provincia: ['', Validators.required],
    descripcion_corta: ['', Validators.required],
    descripcion_completa: ['', Validators.required],
    precio_valor: [null, Validators.required],
    precio_dolar: ['Pesos', Validators.required],
    precio_mostrar: ['false', Validators.required],
  });

  constructor(private dataService: DataService,
              private fb: FormBuilder,
              private alertService: AlertService,
              private propietariosService: PropietariosService,
              private provinciasService: ProvinciasService,
              private inmueblesService: InmueblesService) { }

  ngOnInit(): void {
    this.dataService.ubicacionActual = "Dashboard - Inmuebles - Creando";
    this.listarPropietarios();
  }

  // Listado de propietarios
  listarPropietarios(): void {
    this.alertService.loading();
    this.propietariosService.listarPropietarios(1,'descripcion').subscribe({
      next: ({ propietarios }) => {
        this.propietarios = propietarios;
        this.listarProvincias();
      },
      error: ({error}) => {
        this.alertService.errorApi(error.msg);
      }
    });
  }

  // Listado de provincias
  listarProvincias(): void {
    this.provinciasService.listarProvincias(1, 'descripcion').subscribe({
      next: ({provincias}) => {
        this.provincias = provincias;
        this.alertService.close();
      }, 
      error: ({error}) => {
        this.alertService.errorApi(error.msg);
      }
    }); 
  }

}
