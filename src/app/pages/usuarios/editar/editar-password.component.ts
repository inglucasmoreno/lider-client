import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { DataService } from 'src/app/services/data.service';
import { AlertService } from '../../../services/alert.service';

import gsap from 'gsap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectError, selectLoading, selectRedirect, selectUsuario } from 'src/app/state/selectors/usuarios.selectors';
import { actualizarUsuario, limpiarEstados, obtenerUsuario } from 'src/app/state/actions/usuarios.actions';

@Component({
  selector: 'app-editar-password',
  templateUrl: './editar-password.component.html',
  styles: [
  ]
})
export class EditarPasswordComponent implements OnInit, OnDestroy {

  // Suscripciones
  public _loading: Subscription;
  public _usuario: Subscription;
  public _redirect: Subscription;
  public _error: Subscription;

  public id: string;
  public loading = true;
  public usuario: Usuario;

  public passwordForm = this.fb.group({
    password: ['', Validators.required],
    repetir: ['', Validators.required]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private store: Store,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService,
              private dataService: DataService) { }

  ngOnInit(): void {

    this.store.dispatch(limpiarEstados());
    
    gsap.from('.gsap-contenido', { y:100, opacity: 0, duration: .2 });
    this.dataService.ubicacionActual = 'Dashboard - Editando password';
      
    this.activatedRoute.params.subscribe(({id}) => {
      this.id = id;      
      this.store.dispatch(obtenerUsuario({ id }));
    });

    this.subscripcion();

  }
  
  subscripcion(): void {
    
    // Usuario - Suscripcion
    this._usuario = this.store.select(selectUsuario).subscribe((usuario)=> {
      this.usuario = usuario;
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

  // Actualizar constraseña
  actualizarPassword(): void | boolean{

    const {password, repetir} = this.passwordForm.value;
    
    // Verificacion - Falta de datos
    if (password.trim() === '' || repetir.trim() === ''){
      this.alertService.formularioInvalido();
      return false;
    }

    // Verificacion - Coincidencia de contraseñas
    if (password !== repetir){
      this.alertService.info('Las contraseñas deben coincidir');
      return false;
    }

    this.store.dispatch(actualizarUsuario({id: this.id, data: { password }}));
        
  }
  
}
