import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styles: [
  ]
})
export class InmueblesComponent implements OnInit {

  constructor(private alertService: AlertService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.ubicacionActual = 'Dashboard - Inmuebles' ;
  }

  

}
