import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PropietariosService {

  constructor(private http: HttpClient) {}

  // Propietarios por ID
  getPropietario(id: string): Observable<any>{
    return this.http.get(`${base_url}/propietarios/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
  } 

  // Listar propietarios
  listarPropietarios( direccion : number = 1, columna: string = 'descripcion' ): Observable<any>{
    return this.http.get(`${base_url}/propietarios`, {
      params: {
        direccion: String(direccion),
        columna              
      },
      headers: {
        'Authorization': localStorage.getItem('token')
      }      
    });
  }

  // Nuevo propietario
  nuevoPropietario(data: any): Observable<any>{
    return this.http.post(`${base_url}/propietarios`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });  
  }

  // Actualizar propietario
  actualizarPropietario(id: string, data: any): Observable<any>{
    return this.http.put(`${base_url}/propietarios/${id}`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }  
    });
  }

}
