import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { InmueblesService } from 'src/app/services/inmuebles.service';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { PropietariosService } from 'src/app/services/propietarios.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import gsap from 'gsap';
import { DomSanitizer } from '@angular/platform-browser';
import { CodigosService } from 'src/app/services/codigos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-inmueble',
  templateUrl: './nuevo-inmueble.component.html',
  styles: [
  ]
})
export class NuevoInmuebleComponent implements OnInit {

  public showModal = false;

  // Codigo
  public codigo: string;

  // Propietario
  public propietarios: any;
  
  // Provincia
  public provincias: any;
  public provinciaSeleccionada: any;
  
  // Localidad
  public localidades: any[];
  public localidadSeleccionada: any;

   // Subida de archivo
   public file;
   public previsualizacion: string;
   public imagenParaSubir: any;

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
    precio_moneda: ['Pesos', Validators.required],
    precio_mostrar: ['false', Validators.required],
  });

  constructor(private dataService: DataService,
              private fb: FormBuilder,
              private alertService: AlertService,
              private codigosService: CodigosService,
              private propietariosService: PropietariosService,
              private provinciasService: ProvinciasService,
              private localidadesService: LocalidadesService,
              private sanitizer: DomSanitizer,
              private router: Router,
              private inmueblesService: InmueblesService) { }

  ngOnInit(): void {
    this.dataService.ubicacionActual = "Dashboard - Inmuebles - Creando";
    gsap.from('.gsap-contenido', { y:100, opacity: 0, duration: .2 });
    this.listarPropietarios();
  }

  // Abrir modal
  abrirModal(): void {
    this.showModal = true;
  }

  // Nuevo inmueble
  nuevoInmueble(): void {

    const { propietario, 
            ubicacion_publica, 
            ubicacion_privada,
            provincia,
            localidad,
            descripcion_corta,
            descripcion_completa,
            precio_valor,                     
          } = this.inmuebleForm.value;

    // Verificacion de datos
    if(!this.inmuebleForm.valid ||
        propietario.trim() === '' ||
        ubicacion_publica.trim() === '' ||
        ubicacion_privada.trim() === '' ||
        provincia.trim() === '' ||
        localidad.trim() === '' ||
        descripcion_corta.trim() === '' ||
        descripcion_completa.trim() === '' ||
        precio_valor === null ||
        precio_valor <= 0 
      ){
        this.alertService.info('Completar los campos obligatorios');
        return;
    }

    this.alertService.loading();
    this.inmueblesService.nuevoInmueble(this.inmuebleForm.value).subscribe({
      next: ({inmueble}) => {
        this.reiniciarFormulario();
        this.alertService.close();
        this.router.navigateByUrl('dashboard/inmuebles/detalles/' + inmueble._id); 
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }

    });
  }

  // Reiniciar formulario
  reiniciarFormulario(): void {
    this.inmuebleForm.patchValue({
      propietario: '',
      tipo: 'Casa',
      alquiler_venta: 'Alquiler',
      ubicacion_publica: '',
      ubicacion_privada: '',
      provincia: '',
      localidad: '',
      descripcion_corta: '',
      descripcion_completa: '',
      precio_valor: null,
      precio_moneda: 'Pesos',
      precio_mostrar: 'false',
    });
  }

  // Listado de propietarios
  listarPropietarios(): void {
    this.alertService.loading();
    this.propietariosService.listarPropietarios(1,'descripcion').subscribe({
      next: ({ propietarios }) => {
        this.propietarios = propietarios.filter(propietario => (propietario.activo));
        this.listarProvincias();
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
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
        this.alertService.errorApi(error.message);
      }
    }); 
  }

  // Listar localidades
  listarLocalidades(id: string): void {
    this.localidadesService.listarLocalidadesPorProvincia(1,'descripcion',id).subscribe({
      next: ({localidades}) => {
        this.inmuebleForm.patchValue({ localidad: '' });
        this.localidades = localidades.filter(localidad => localidad.activo);
        this.seleccionarCodigo();
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);  
      }
    });
  }

  // -- Seleccion de provincia --

  // Seleccionar provincia inicial
  provinciaInicial(): void {
    const provincia_inicial = this.provincias.find(provincia => (provincia.descripcion === "SAN LUIS"));
    this.inmuebleForm.patchValue({ provincia: provincia_inicial ? provincia_inicial._id : '' });
    provincia_inicial ? this.seleccionarProvincia() : null; 
  }

  // Nombre de provincia
  seleccionarProvincia(): void {
    if(this.inmuebleForm.value.provincia.trim() !== ''){
      this.provinciaSeleccionada = this.provincias.find(provincia => provincia._id === this.inmuebleForm.value.provincia);
      this.alertService.loading();
      this.listarLocalidades(this.provinciaSeleccionada._id);
    }else{
      this.inmuebleForm.patchValue({ 
        localidad: '' 
      });
      this.localidades = [];  
    }
  }

  // -- Seleccion de localidad --
  
  // Nombre de localidad
  seleccionarLocalidad(): void {
    if(this.inmuebleForm.value.localidad.trim() !== '')
      this.localidadSeleccionada = this.localidades.find(localidad => localidad._id === this.inmuebleForm.value.localidad);
  }

  // -- Imagen --

  // Se captura la imagen a subir
  capturarImagen(event: any): void {
    if(event.target.files[0]){ // Se captura si hay imagen seleccionada
      
      this.imagenParaSubir = event.target.files[0];
      
      // Se verifica que sea una imagen
      const formato = this.imagenParaSubir.type.split('/')[1];
      const condicion = formato !== 'png' && formato !== 'jpg' && formato !== 'jpeg' && formato !== 'gif';
      
      // Limpiamos si no se selecciona nada
      if(condicion){
        this.previsualizacion = '';
        this.file = '';
        return this.alertService.errorApi('El archivo debe ser una imagen');
      }
      
      // Vista previa - Base64
      this.extraerBase64(this.imagenParaSubir).then( (imagen: any) => {
        this.previsualizacion = imagen.base;
        this.showModal = false;
      });

    }
  }

  // Extraer base 64
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  // Eliminar imagen
  eliminarImagenSeleccionada(): void {
    this.previsualizacion = '';
    this.file = '';
    this.imagenParaSubir = null;
  }

  // -- Codigos
  seleccionarCodigo(): void {
    this.alertService.loading();
    this.codigosService.getCodigosPorTipo(this.inmuebleForm.value.tipo).subscribe({
      next: ({ codigo }) => {
        this.codigo = codigo;
        this.alertService.close();
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }
    });  
  }

}
