import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Usuario } from '../../../models/usuario.model';
import { UsuariosService } from '../../../services/usuarios.service';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';

import gsap from 'gsap';
import { Store } from '@ngrx/store';
import { actualizarUsuario, limpiarEstados, obtenerUsuario } from 'src/app/state/actions/usuarios.actions';
import { selectError, selectLoading, selectRedirect, selectUsuario } from 'src/app/state/selectors/usuarios.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styles: [
  ]
})
export class EditarUsuarioComponent implements OnInit, OnDestroy {

  public _loading: Subscription;
  public _usuario: Subscription;
  public _redirect: Subscription;
  public _error: Subscription;

  // Permisos
  public permisos = {
    usuarios: 'USUARIOS_NOT_ACCESS',  
  };

  public id: string;
  public usuario: Usuario;
  public usuarioForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private store: Store,
              private activatedRoute: ActivatedRoute,
              private usuariosService: UsuariosService,
              private alertService: AlertService,
              private dataService: DataService) { }

  ngOnInit(): void {

    this.store.dispatch(limpiarEstados());

    // Animaciones y Datos de ruta
    gsap.from('.gsap-contenido', { y:100, opacity: 0, duration: .2 });
    this.dataService.ubicacionActual = 'Dashboard - Editando usuario';

    // Formulario reactivo
    this.usuarioForm = this.fb.group({
      usuario: ['', Validators.required],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', Validators.email],
      role: ['USER_ROLE', Validators.required],
      activo: ['true', Validators.required],
    });
  
    this.subscripciones();

    this.activatedRoute.params.subscribe(({id}) => { 
      this.id = id; 
      this.store.dispatch(obtenerUsuario({ id }));    
    });

    // this.getUsuario(); // Datos iniciales de usuarios

  }

  subscripciones(): void {
    
    // Usuario - Suscripcion
    this._usuario = this.store.select(selectUsuario).subscribe((usuarioRes: any)=> {
      
      usuarioRes ? this.getPermisos(usuarioRes.permisos) : null; // Se obtienen los permisos

      this.usuario = usuarioRes;
      
      if(usuarioRes){
        const {usuario, apellido, nombre, dni, email, role, activo} = this.usuario;
  
        this.usuarioForm.patchValue({
          usuario,
          apellido,
          nombre,
          dni,
          email,
          role,
          activo: String(activo)
        });
      }
    
    });    

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
    this._usuario.unsubscribe();
    this._redirect.unsubscribe();
    this._error.unsubscribe();
  }

  // Se obtienen los permisos
  getPermisos(permisosFnc: Array<string>): void {
    
    permisosFnc.forEach( permiso => {
    
      // Usuarios
      (permiso === 'USUARIOS_ALL' || permiso === 'USUARIOS_READ') ? this.permisos.usuarios = permiso : null;
    
    });

  }

  // Editar usuario
  editarUsuario(): void | boolean{
      
    const {usuario, apellido, dni, role, nombre, email} = this.usuarioForm.value;

    // Se verifica que los campos no tengan un espacio vacio
    const campoVacio = usuario.trim() === '' || 
                       apellido.trim() === '' || 
                       dni.trim() === '' || 
                       email.trim() === '' || 
                       nombre.trim() === '';

    // Se verifica que todos los campos esten rellenos
    if (this.usuarioForm.status === 'INVALID' || campoVacio){
      this.alertService.formularioInvalido()
      return false;
    }

    // Se agregan los permisos
    let data: any = this.usuarioForm.value;

    if(role !== 'ADMIN_ROLE') data.permisos = this.adicionarPermisos(); // Se adicionan los permisos a la data para actualizacion
    else data.permisos = [];

    this.store.dispatch(actualizarUsuario({id: this.id, data}));

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

  // Funcion del boton regresar
  regresar(): void{
    this.router.navigateByUrl('/dashboard/usuarios');
  }

}
