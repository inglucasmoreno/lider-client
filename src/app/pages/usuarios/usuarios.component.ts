import { Component, OnInit, OnDestroy } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';
import { AlertService } from '../../services/alert.service';
import { DataService } from 'src/app/services/data.service';

import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { loadUsuarios } from 'src/app/state/actions/usuarios.actions';
import { selectListUsuarios, selectLoading } from 'src/app/state/selectors/usuarios.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  // Permisos
  public permiso_escritura: string[] = ['USUARIOS_ALL'];

  // Usuarios Listados
  // public usuarios$: Observable<any> = new Observable();
  public usuarios;
  public usuarios$: Subscription;
  public loading$: Subscription;

  // public usuarios: Usuario[];

  public total = 0;

  // Paginacion
  public paginaActual: number = 1;
  public cantidadItems: number = 10;

  // Filtrado
  public filtro = {
    activo: 'true',
    parametro: ''
  }

  // Ordenar
  public ordenar = {
    direccion: 1,  // Asc (1) | Desc (-1)
    columna: 'apellido'
  }

  // Para reportes
  public totalReporte = 0;
  public usuariosReporte = [];

  constructor(private usuariosService: UsuariosService,
              private store: Store<any>,
              private alertService: AlertService,
              private dataService: DataService) { }

  ngOnInit(): void {
    
    this.dataService.ubicacionActual = 'Dashboard - Usuarios' ;
    this.usuarios = this.store.select(selectListUsuarios);
    
    // Usuarios - Suscripcion
    this.usuarios$ = this.store.select(selectListUsuarios).subscribe((usuarios)=> {
      this.usuarios = usuarios;
    }); 

    // Loading - Suscripcion
    this.loading$ = this.store.select(selectLoading).subscribe((loading)=> {
      loading ? this.alertService.loading() : this.alertService.close();
    });

    this.listarUsuarios();
  
  }

  ngOnDestroy(): void {
    // Cancelacion de suscripciones
    this.usuarios$.unsubscribe();
    this.loading$.unsubscribe();
  }

  // Listar usuarios
  listarUsuarios(): void{ this.store.dispatch(loadUsuarios({direccion: this.ordenar.direccion, columna: this.ordenar.columna})); }

  // Actualizar estado Activo/Inactivo
  actualizarEstado(usuario: Usuario): void {
    const { _id, activo } = usuario;
      this.alertService.question({ msg: '¿Quieres actualizar el estado?', buttonText: 'Actualizar' })
          .then(({isConfirmed}) => {  
            if (isConfirmed) {
              this.usuariosService.actualizarUsuario(_id, {activo: !activo}).subscribe(() => {
                this.listarUsuarios();
              }, ({error}) => {
                this.alertService.close();
                this.alertService.errorApi(error.message);
              });
            }
          });
  }
  
  // Filtrar Activo/Inactivo
  filtrarActivos(activo: any): void{
    this.paginaActual = 1;
    this.filtro.activo = activo;
  }

  // Filtrar por Parametro
  filtrarParametro(parametro: string): void{
    this.paginaActual = 1;
    this.filtro.parametro = parametro;
  }
  
  // Ordenar por columna
  ordenarPorColumna(columna: string){
    this.ordenar.columna = columna;
    this.ordenar.direccion = this.ordenar.direccion == 1 ? -1 : 1; 
    this.alertService.loading();
    this.listarUsuarios();
  }

}
