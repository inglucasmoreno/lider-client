import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import { DataWebService } from 'src/app/services/data-web.service';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styles: [
  ]
})
export class ContactenosComponent implements OnInit {

  constructor(public dataWebService: DataWebService) { }

  ngOnInit(): void {
    var tl = gsap.timeline({defaults: { duration: 0.1 }});

    tl.from('.gsap-formulario', { x:-200, opacity: 0, duration: 0.5, ease: 'back' })
      .from('.gsap-canales', { y:100, opacity: 0, duration: 0.5, ease: 'back' });
  }

}
