import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styles: [
  ]
})
export class TarjetaComponent implements OnInit {

  @Input('elemento') elemento: any;

  constructor() { }

  ngOnInit(): void {
  }

}
