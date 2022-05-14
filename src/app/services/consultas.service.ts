import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient) {}

  // Consulta por ID
  getConsulta(id: string): Observable<any>{
    return this.http.get(`${base_url}/consultas/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
  } 

  // Listar consultas
  listarConsultas( direccion : number = -1, columna: string = 'createdAt' ): Observable<any>{
    return this.http.get(`${base_url}/consultas`, {
      params: {
        direccion: String(direccion),
        columna              
      },
      headers: {
        'Authorization': localStorage.getItem('token')
      }      
    });
  }

  // Nueva consulta
  nuevaConsulta(data: any): Observable<any>{
    return this.http.post(`${base_url}/consultas`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });  
  }

  // Actualizar consulta
  actualizarConsulta(id: string, data: any): Observable<any>{
    return this.http.put(`${base_url}/consultas/${id}`, data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }  
    });
  }


  
}
