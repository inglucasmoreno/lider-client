import { Component, OnInit } from '@angular/core';
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

  constructor(private dataService: DataService,
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
