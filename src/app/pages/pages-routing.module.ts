import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from '../guards/auth.guard';
import { PermisosGuard } from '../guards/permisos.guard';

// Componentes
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './usuarios/nuevo-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar/editar-usuario.component';
import { EditarPasswordComponent } from './usuarios/editar/editar-password.component';
import { PerfilComponent } from './perfil/perfil.component';
import { InmueblesComponent } from './inmuebles/inmuebles.component';
import { NuevoInmuebleComponent } from './inmuebles/nuevo-inmueble.component';
import { EditarInmuebleComponent } from './inmuebles/editar/editar-inmueble.component';
import { PropietariosComponent } from './propietarios/propietarios.component';
import { InmobiliariaComponent } from './inmobiliaria/inmobiliaria.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { ProvinciasComponent } from './provincias/provincias.component';
import { LocalidadesComponent } from './provincias/localidades.component';
import { InmuebleDetallesComponent } from './inmuebles/inmueble-detalles.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],    // Guard - Se verifica si el usuario esta logueado
        children: [
            
            // Home
            { path: 'home', component: HomeComponent },

            // Perfil de usuarios
            { path: 'perfil', component: PerfilComponent },

            // Usuarios
            { path: 'usuarios', data: { permisos: 'USUARIOS_NAV' }, canActivate: [PermisosGuard], component: UsuariosComponent },
            { path: 'usuarios/nuevo', data: { permisos: 'USUARIOS_NAV' }, canActivate: [PermisosGuard], component: NuevoUsuarioComponent },
            { path: 'usuarios/editar/:id', data: { permisos: 'USUARIOS_NAV' }, canActivate: [PermisosGuard], component: EditarUsuarioComponent },
            { path: 'usuarios/password/:id', data: { permisos: 'USUARIOS_NAV' }, canActivate: [PermisosGuard], component: EditarPasswordComponent },

            // Propietarios
            { path: 'propietarios', data: { permisos: 'PROPIETARIOS_NAV' }, canActivate: [PermisosGuard], component: PropietariosComponent },

            // Provincias
            { path: 'provincias', data: { permisos: 'PROVINCIAS_NAV' }, canActivate: [PermisosGuard], component: ProvinciasComponent },

            // Provincias - Localidades
            { path: 'provincias/localidades/:id', data: { permisos: 'LOCALIDADES_NAV' }, canActivate: [PermisosGuard], component: LocalidadesComponent },

            // Inmuebles
            { path: 'inmuebles', data: { permisos: 'INMUEBLES_NAV' }, canActivate: [PermisosGuard], component: InmueblesComponent },
            { path: 'inmuebles/nuevo', data: { permisos: 'INMUEBLES_NAV' }, canActivate: [PermisosGuard], component: NuevoInmuebleComponent },
            { path: 'inmuebles/editar/:id', data: { permisos: 'INMUEBLES_NAV' }, canActivate: [PermisosGuard], component: EditarInmuebleComponent },
            { path: 'inmuebles/detalles/:id', data: { permisos: 'INMUEBLES_NAV' }, canActivate: [PermisosGuard], component: InmuebleDetallesComponent },
    
            // Inmobiliaria
            { path: 'inmobiliaria', data: { permisos: 'INMOBILIARIA_NAV' }, canActivate: [PermisosGuard], component: InmobiliariaComponent },

            // Consultas
            { path: 'consultas', data: { permisos: 'CONSULTAS_NAV' }, canActivate: [PermisosGuard], component: ConsultasComponent },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}