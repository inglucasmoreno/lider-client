import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class InmueblesService {

  constructor(private http: HttpClient) {}

  // Inmueble por ID
  getInmueble(id: string): Observable<any>{
    return this.http.get(`${base_url}/inmuebles/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
  } 

  // Listar inmuebles
  listarInmuebles( direccion : number = 1, columna: string = 'codigo' ): Observable<any>{
    return this.http.get(`${base_url}/inmuebles`, {
      params: {
        direccion: String(direccion),
        columna              
      }    
    })
  }

  // Nuevo inmueble
  nuevoInmueble(data: any): Observable<any>{
    return this.http.post(`${base_url}/inmuebles`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })  
  }

  // Actualizar inmueble
  actualizarInmueble(id: string, data: any): Observable<any>{
    return this.http.put(`${base_url}/inmuebles/${id}`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }  
    })
  }

}
