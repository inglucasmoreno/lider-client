import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {

  constructor(private http: HttpClient) {}

  // Localidad por ID
  getLocalidad(id: string): Observable<any>{
    return this.http.get(`${base_url}/localidades/${id}`, {});
  } 

  // Listar localidades
  listarLocalidades( direccion : number = 1, columna: string = 'descripcion' ): Observable<any>{
    return this.http.get(`${base_url}/localidades`, {
      params: {
        direccion: String(direccion),
        columna              
      }    
    });
  }

  // Listar localidades por provincia
  listarLocalidadesPorProvincia( direccion : number = 1, columna: string = 'descripcion', provincia: string = '' ): Observable<any>{
    return this.http.get(`${base_url}/localidades/param/provincia`, {
      params: {
        direccion: String(direccion),
        columna,
        provincia              
      },     
    });
  }

  // Nueva localidad
  nuevaLocalidad(data: any): Observable<any>{
    return this.http.post(`${base_url}/localidades`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });  
  }

  // Actualizar localidad
  actualizarLocalidad(id: string, data: any): Observable<any>{
    return this.http.put(`${base_url}/localidades/${id}`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }  
    });
  }

}
