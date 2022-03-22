import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styles: [
  ]
})
export class ContactenosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var tl = gsap.timeline({defaults: { duration: 0.1 }});

    tl.from('.gsap-formulario', { x:-200, opacity: 0, duration: 0.5, ease: 'back' })
      .from('.gsap-canales', { y:100, opacity: 0, duration: 0.5, ease: 'back' });
  }

}
