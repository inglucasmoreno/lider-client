import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { InmueblesService } from 'src/app/services/inmuebles.service';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { PropietariosService } from 'src/app/services/propietarios.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import gsap from 'gsap';

@Component({
  selector: 'app-nuevo-inmueble',
  templateUrl: './nuevo-inmueble.component.html',
  styles: [
  ]
})
export class NuevoInmuebleComponent implements OnInit {

  public provinciaSeleccionada: any;
  public propietarios: any;
  public provincias: any;
  public localidades: any[];

  // Modelo reactivo - Propietario
  public inmuebleForm = this.fb.group({
    propietario: ['', Validators.required],
    tipo: ['Casa', Validators.required],
    alquiler_venta: ['Alquiler', Validators.required],
    ubicacion_publica: ['', Validators.required],
    ubicacion_privada: ['', Validators.required],
    provincia: ['', Validators.required],
    localidad: ['', Validators.required],
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
              private localidadesService: LocalidadesService,
              private inmueblesService: InmueblesService) { }

  ngOnInit(): void {
    this.dataService.ubicacionActual = "Dashboard - Inmuebles - Creando";
    gsap.from('.gsap-contenido', { y:100, opacity: 0, duration: .2 });
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
        this.provincias = provincias.filter(provincias => provincias.activo);
        this.provinciaInicial();
      }, 
      error: ({error}) => {
        this.alertService.errorApi(error.msg);
      }
    }); 
  }

  // Listar localidades
  listarLocalidades(id: string): void {
    this.localidadesService.listarLocalidadesPorProvincia(1,'descripcion',id).subscribe({
      next: ({localidades}) => {
        this.inmuebleForm.patchValue({ localidad: '' });
        this.localidades = localidades.filter(localidad => localidad.activo);
        this.alertService.close();
      },
      error: ({error}) => {
        this.alertService.errorApi(error.msg);  
      }
    });
  }

  // Seleccionar provincia inicial
  provinciaInicial(): void {
    const provincia_inicial = this.provincias.find(provincia => provincia.descripcion === 'SAN LUIS');
    this.inmuebleForm.patchValue({ provincia: provincia_inicial ? provincia_inicial._id : '' });
    provincia_inicial ? this.seleccionarProvincia() : null; 
    this.alertService.close();
  }

  // Nombre de provincia
  seleccionarProvincia(): void {
    if(this.inmuebleForm.value.provincia.trim() !== ''){
      this.provinciaSeleccionada = this.provincias.find(provincia => provincia._id === this.inmuebleForm.value.provincia);
      this.alertService.loading();
      this.listarLocalidades(this.provinciaSeleccionada._id);
    }else{
      this.inmuebleForm.patchValue({ localidad: '' });
      this.localidades = [];  
    }
  }


}
