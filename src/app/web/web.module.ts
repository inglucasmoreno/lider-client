import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { WebComponent } from './web.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    WebComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class WebModule { }
