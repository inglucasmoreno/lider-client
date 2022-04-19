import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  constructor(private http: HttpClient) {}

  // Provincia por ID
  getProvincia(id: string): Observable<any>{
    return this.http.get(`${base_url}/provincias/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
  } 

  // Listar provincias
  listarProvincias( direccion : number = 1, columna: string = 'descripcion' ): Observable<any>{
    return this.http.get(`${base_url}/provincias`, {
      params: {
        direccion: String(direccion),
        columna              
      },
      headers: {
        'Authorization': localStorage.getItem('token')
      }      
    });
  }

  // Nueva provincia
  nuevaProvincia(data: any): Observable<any>{
    return this.http.post(`${base_url}/provincias`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });  
  }

  // Actualizar provincia
  actualizarProvincia(id: string, data: any): Observable<any>{
    return this.http.put(`${base_url}/provincias/${id}`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }  
    });
  }

}
