import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WebComponent } from './web.component';

const routes: Routes = [
    {
        path: 'web',
        component: WebComponent,
        canActivate: [ ],    
        children: [
            
            // Home - WEB
            { path: 'home', component: HomeComponent },
     
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebRoutingModule {}