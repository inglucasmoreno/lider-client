import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styles: [
  ]
})
export class CarrouselComponent implements OnInit {

  @Input('imagenes') imagenes: any;

  constructor() { }

  ngOnInit(): void {
  }

}
