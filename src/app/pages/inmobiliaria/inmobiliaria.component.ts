import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { InmobiliariaService } from 'src/app/services/inmobiliaria.service';

@Component({
  selector: 'app-inmobiliaria',
  templateUrl: './inmobiliaria.component.html',
  styles: [
  ]
})
export class InmobiliariaComponent implements OnInit {

  // Modal
  public showModal = false;

  // Inmobiliaria
  public inmobiliaria: any;

  // Modelo reactivo
  public inmobiliariaForm = this.fb.group({
    nombre: ['', Validators.required],
    telefono: ['', Validators.required],
    direccion: ['', Validators.required],
    email: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  constructor(private dataService: DataService,
              private fb: FormBuilder,
              private inmobiliariaService: InmobiliariaService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.dataService.ubicacionActual = "Dashboard - Inmobiliaria";
    this.alertService.loading();
    this.obtenerInmobiliaria();
  }

  // Obtener datos de inmobiliaria
  obtenerInmobiliaria(): void {
    this.inmobiliariaService.listarInmobiliarias().subscribe({
      next: ({inmobiliarias}) => {
        inmobiliarias.length !== 0 ? this.inmobiliaria = inmobiliarias[0] : null; 
        this.alertService.close();
        this.showModal = false;
      },
      error: ({error}) => {
        this.alertService.errorApi(error.msg);
      }
    });
  }

  // Crear o actualizar inmobiliaria
  actualizarInmobiliaria(): void {

    if(!this.inmobiliariaForm.valid ||
        this.inmobiliariaForm.value.nombre.trim() === '' ||
        this.inmobiliariaForm.value.telefono.trim() === '' ||
        this.inmobiliariaForm.value.direccion.trim() === '' ||
        this.inmobiliariaForm.value.email.trim() === '' ||
        this.inmobiliariaForm.value.descripcion.trim() === ''
      ){
      this.alertService.info('Completar los campos obligatorios');
      return;
    }

    this.alertService.loading();

    if(this.inmobiliaria){ // Actualizar datos
      this.inmobiliariaService.actualizarInmobiliaria(this.inmobiliaria._id, this.inmobiliariaForm.value).subscribe({
        next: () => {
          this.obtenerInmobiliaria();  
        },
        error: ({error}) => {
          this.alertService.errorApi(error.msg);
        }
      });
    }else{ // Crear inmobiliaria
      this.inmobiliariaService.nuevaInmobiliaria(this.inmobiliariaForm.value).subscribe({
        next: () => {
          this.obtenerInmobiliaria();
        },
        error: ({error}) => {
          this.alertService.errorApi(error.msg);
        }
      });    
    }
  }

  // Abrir modal
  abrirModal(): void {
    if(this.inmobiliaria){
      this.inmobiliariaForm.patchValue({
        nombre: this.inmobiliaria.nombre,
        telefono: this.inmobiliaria.telefono,
        direccion: this.inmobiliaria.direccion,
        email: this.inmobiliaria.email,
        descripcion: this.inmobiliaria.descripcion,
      });
    }else{
      this.inmobiliariaForm.patchValue({
        nombre: '',
        telefono: '',
        direccion: '',
        email: '',
        descripcion: '',
      });
    }
    this.showModal = true;    
  }

}
