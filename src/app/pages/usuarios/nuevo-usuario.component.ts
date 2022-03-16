import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlertService } from '../../services/alert.service';

import gsap from 'gsap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectLoading } from 'src/app/state/selectors/usuarios.selectors';
import { nuevoUsuario } from 'src/app/state/actions/usuarios.actions';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: [
  ]
})
export class NuevoUsuarioComponent implements OnInit, OnDestroy {

  // Suscripciones
  public loading$: Subscription;

  // Permisos
  public permisos = {
    usuarios: 'USUARIOS_NOT_ACCESS',
  };

  // Modelo reactivo
  public usuarioForm: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store,
              private router: Router,
              private usuariosService: UsuariosService,
              private alertService: AlertService,
              private dataService: DataService
              ) { }
  
  ngOnInit(): void {
    
    // Animaciones y Datos de ruta
    gsap.from('.gsap-contenido', { y:100, opacity: 0, duration: .2 });
    this.dataService.ubicacionActual = 'Dashboard - Creando usuario';

    // Formulario reactivo
    this.usuarioForm = this.fb.group({
      usuario: ['yfet', Validators.required],
      apellido: ['Fet', Validators.required],
      nombre: ['Yamil Daher', Validators.required],
      dni: ['34060311', Validators.required],
      email: ['yfet@gmail.com', Validators.required],
      password: ['craneo', Validators.required],
      repetir: ['craneo', Validators.required],
      role: ['USER_ROLE', Validators.required],
      activo: ['true', Validators.required]
    });

    // Loading - Suscripcion
    this.loading$ = this.store.select(selectLoading).subscribe((loading)=> {
      loading ? this.alertService.loading() : this.alertService.close();
    });

  }

  ngOnDestroy(): void {
    this.loading$.unsubscribe();
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
    this.store.dispatch(nuevoUsuario(data));

    // this.usuariosService.nuevoUsuario(data).subscribe(() => {
    //   this.alertService.close();  // Finaliza el loading
    //   this.router.navigateByUrl('dashboard/usuarios');
    // },( ({error}) => {
    //   this.alertService.close();  // Finaliza el loading
    //   this.alertService.errorApi(error.message);
    //   return;  
    // }));

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
