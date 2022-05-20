import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styles: [
  ]
})
export class TarjetaComponent implements OnInit {

  @Input('elemento') elemento: any;
  @Output() contactarAsesorEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  contactarAsesor(): void {
    this.contactarAsesorEvent.emit(this.elemento);
  }

}
