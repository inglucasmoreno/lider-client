import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlquileresComponent } from './alquileres/alquileres.component';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { HomeComponent } from './home/home.component';
import { VentasComponent } from './ventas/ventas.component';
import { WebComponent } from './web.component';

const routes: Routes = [
    {
        path: 'web',
        component: WebComponent,
        canActivate: [ ],    
        children: [
            
            // Home - WEB
            { path: 'home', component: HomeComponent },
            { path: 'ventas', component: VentasComponent },
            { path: 'alquileres', component: AlquileresComponent },
            { path: 'contactenos', component: ContactenosComponent },
     
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebRoutingModule {}