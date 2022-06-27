import { Component, OnInit } from '@angular/core';
import { DataWebService } from '../../services/data-web.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public inmobiliaria;
  public showMenu = false;

  constructor(public dataWebService: DataWebService) { }

  ngOnInit(): void {
    this.dataWebService.obtenerInmobiliaria();
  }

}
