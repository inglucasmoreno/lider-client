import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class InmobiliariaService {

  constructor(private http: HttpClient) {}

  // Inmobiliaria por ID
  getInmobiliaria(id: string): Observable<any>{
    return this.http.get(`${base_url}/inmobiliaria/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
  } 

  // Listar inmobiliarias
  listarInmobiliarias( direccion : number = 1, columna: string = 'descripcion' ): Observable<any>{
    return this.http.get(`${base_url}/inmobiliaria`, {
      params: {
        direccion: String(direccion),
        columna              
      }     
    });
  }

  // Nueva inmobiliaria
  nuevaInmobiliaria(data: any): Observable<any>{
    return this.http.post(`${base_url}/inmobiliaria`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });  
  }

  // Actualizar inmobiliaria
  actualizarInmobiliaria(id: string, data: any): Observable<any>{
    return this.http.put(`${base_url}/inmobiliaria/${id}`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }  
    });
  }

}
