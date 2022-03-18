import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

import { AlertService } from '../../services/alert.service';

import gsap from 'gsap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectError, selectLoading, selectRedirect } from 'src/app/state/selectors/usuarios.selectors';
import { limpiarEstados, nuevoUsuario } from 'src/app/state/actions/usuarios.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: [
  ]
})
export class NuevoUsuarioComponent implements OnInit, OnDestroy {

  // Suscripciones
  public _loading: Subscription;
  public _error: Subscription;
  public _redirect: Subscription;

  // Permisos
  public permisos = {
    usuarios: 'USUARIOS_NOT_ACCESS',
  };

  // Modelo reactivo
  public usuarioForm: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store,
              private router: Router,
              private alertService: AlertService,
              private dataService: DataService
              ) { }
  
  ngOnInit(): void {
    
    this.store.dispatch(limpiarEstados());

    // Animaciones y Datos de ruta
    gsap.from('.gsap-contenido', { y:100, opacity: 0, duration: .2 });
    this.dataService.ubicacionActual = 'Dashboard - Creando usuario';

    // Formulario reactivo
    this.usuarioForm = this.fb.group({
      usuario: ['', Validators.required],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repetir: ['', Validators.required],
      role: ['USER_ROLE', Validators.required],
      activo: ['true', Validators.required]
    });

    this.subscripciones();

  }

  subscripciones(): void {

    // Loading - Suscripcion
    this._loading = this.store.select(selectLoading).subscribe((loading)=> {
      loading ? this.alertService.loading() : this.alertService.close();
    });

    // Redirect - Suscripcion
    this._redirect = this.store.select(selectRedirect).subscribe((redirect)=> {
      redirect ? this.router.navigateByUrl('dashboard/usuarios')  : null;
    });

    // Error - Suscripcion
    this._error = this.store.select(selectError).subscribe((error)=> {
      error.trim() !== '' ? this.alertService.errorApi(error) : null;
    });

  }

  ngOnDestroy(): void {
    this._loading.unsubscribe();
    this._redirect.unsubscribe();
    this._error.unsubscribe();
  }

  // Crear nuevo usuario
  nuevoUsuario(): void {

    const { status } = this.usuarioForm;
    const {usuario, apellido, nombre, dni, email, role, password, repetir} = this.usuarioForm.value;
    
    // Se verifica que los campos no tengan un espacio vacio
    const campoVacio = usuario.trim() === '' || 
                       apellido.trim() === '' ||
                       dni.trim() === '' || 
                       email.trim() === '' || 
                       nombre.trim() === '' ||
                       password.trim() === '' ||
                       repetir.trim() === '';

    // Se verifica si los campos son invalidos
    if(status === 'INVALID' || campoVacio){
      this.alertService.formularioInvalido();
      return;
    }

    // Se verifica si las contraseñas coinciden
    if(password !== repetir){
      this.alertService.info('Las contraseñas deben coincidir');
      return;   
    }

    // Se agregan los permisos
    let data: any = this.usuarioForm.value;
    
    if(role !== 'ADMIN_ROLE') data.permisos = this.adicionarPermisos();
    else data.permisos = [];

    this.alertService.loading();  // Comienzo de loading

    // Se crear el nuevo usuario
    this.store.dispatch(limpiarEstados());
    this.store.dispatch(nuevoUsuario(data));

  }
  
  // Se arma el arreglo de permisos
  adicionarPermisos(): any {

    let permisos: any[] = [];    
    
    // Seccion usuarios
    if(this.permisos.usuarios !== 'USUARIOS_NOT_ACCESS'){
      permisos.push('USUARIOS_NAV');
      permisos.push(this.permisos.usuarios);
    }
        
    return permisos;  
  
  }

}
