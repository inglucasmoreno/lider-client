import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
import { AlertService } from '../../services/alert.service';
import { Usuario } from 'src/app/models/usuario.model';
import { DataService } from 'src/app/services/data.service';
import gsap from 'gsap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { limpiarEstados, obtenerUsuario } from 'src/app/state/actions/usuarios.actions';
import { Subscription } from 'rxjs';
import { selectError, selectLoading, selectUsuario } from 'src/app/state/selectors/usuarios.selectors';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit, OnDestroy {

  public _usuario: Subscription;
  public _loading: Subscription;
  public _error: Subscription;
  public usuarioLogin: Usuario;

  constructor(private authService: AuthService,
              private store: Store,
              private dataService: DataService,
              private fb: FormBuilder,
              private usuariosService: UsuariosService,
              private alertService: AlertService) { }

  public passwordForm: FormGroup;

  ngOnInit(): void {
    
    this.store.dispatch(limpiarEstados());                                                // Se limpian los estados
    this.store.dispatch(obtenerUsuario({id: this.authService.usuario.userId}));           // Se obtienen el usuario
    
    gsap.from('.gsap-contenido', { y:100, opacity: 0, duration: .2 });
    this.dataService.ubicacionActual = "Dashboard - Perfil";
    
    // Formulario reactivo para password
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      repetir: ['', Validators.required]
    });

    this.subscripciones();

  }

  // Subscriptions
  subscripciones(): void {
    
    // Subscription - Usuario
    this._loading = this.store.select(selectUsuario).subscribe((usuario) => {
      this.usuarioLogin = usuario;
    });

    // Subscription - Loading
    this._usuario = this.store.select(selectLoading).subscribe((loading) => {
      loading ? this.alertService.loading() : this.alertService.close();     
    });

    // Error - Suscripcion
    this._error = this.store.select(selectError).subscribe((error)=> {
      error.trim() !== '' ? this.alertService.errorApi(error) : null;
    });
  
  }

  ngOnDestroy(): void {
    this._loading.unsubscribe();
    this._usuario.unsubscribe();
  }

  // Actualizar password
  actualizarPassword(): void {
    this.alertService.loading();
    this.usuariosService.actualizarUsuario(this.usuarioLogin._id, this.passwordForm.value).subscribe( () => {
      this.reiniciarValores();
      this.alertService.success('Contraseña actualizada');
    },({error}) => { 
      this.alertService.errorApi(error.msg)
    });
  }

  // Reiniciar valores
  reiniciarValores(): void {
    this.passwordForm.patchValue({
      password: '',
      repetir: ''
    });
  }

}
