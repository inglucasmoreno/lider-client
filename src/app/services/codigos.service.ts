import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class CodigosService {

  constructor(private http: HttpClient) {}

  // Codigos por ID
  getCodigos(id: string): Observable<any>{
    return this.http.get(`${base_url}/codigos/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
  } 

  // Codigos por tipo
  getCodigosPorTipo(tipo: string): Observable<any>{
    return this.http.get(`${base_url}/codigos/tipo/${tipo}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
  } 

  // Listar codigos
  listarCodigos( direccion : number = 1, columna: string = 'tipo' ): Observable<any>{
    return this.http.get(`${base_url}/codigos`, {
      params: {
        direccion: String(direccion),
        columna              
      },
      headers: {
        'Authorization': localStorage.getItem('token')
      }      
    });
  }

  // Nuevo codigo
  nuevoCodigo(data: any): Observable<any>{
    return this.http.post(`${base_url}/codigos`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });  
  }

  // Actualizar codigo
  actualizarCodigo(id: string, data: any): Observable<any>{
    return this.http.put(`${base_url}/codigos/${id}`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }  
    });
  }
  
}
