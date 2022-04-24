import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FechaPipe } from './fecha.pipe';
import { RolPipe } from './rol.pipe';
import { MonedaPipe } from './moneda.pipe';
import { FiltroUsuariosPipe } from './filtro-usuarios.pipe';
import { FiltroInmueblesPipe } from './filtro-inmuebles.pipe';
import { FiltroPropietariosPipe } from './filtro-propietarios.pipe';
import { FiltroProvinciasPipe } from './filtro-provincias.pipe';

@NgModule({
  declarations: [
    FechaPipe,
    RolPipe,
    MonedaPipe,
    FiltroUsuariosPipe,
    FiltroInmueblesPipe,
    FiltroPropietariosPipe,
    FiltroProvinciasPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FechaPipe,
    RolPipe,
    MonedaPipe,
    FiltroUsuariosPipe,
    FiltroInmueblesPipe,
    FiltroPropietariosPipe,
    FiltroProvinciasPipe,
  ]
})
export class PipesModule { }
