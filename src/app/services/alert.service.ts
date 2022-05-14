import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public buttonColor: string = '#186D96';

  constructor() { }
  
  // Alerta - Pregunta
  question({ msg, buttonText }): any {
    return Swal.fire({
      title: '¿Estas seguro?',
      text: msg,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: buttonText,
      cancelButtonText: 'Cancelar', 
      confirmButtonColor: this.buttonColor
    });
  }

  // Alerta - Completado
  success(msg: string = 'Acción completada!'): void {
    Swal.fire({
      icon: 'success',
      title: 'Completado',
      text: msg,
      timer: 1000,
      showConfirmButton: false
    });
  }

  // Alerta - Completado
  successConfirm(msg: string = 'Acción completada!'): void {
    Swal.fire({
      icon: 'success',
      title: 'Consulta enviada',
      text: msg,
      confirmButtonText: 'Entendido',
      confirmButtonColor: this.buttonColor
    });
  }

  // Alerta - Información
  info(msg: string): void {
    Swal.fire({
      icon: 'info',
      title: 'Información',
      text: msg,
      confirmButtonText: 'Entendido',
      confirmButtonColor: this.buttonColor
    });  
  }

  // Alerta - Formulario inválido
  formularioInvalido(): void {
    Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'Formulario Inválido',
        confirmButtonText: 'Entendido',
        confirmButtonColor: this.buttonColor
      });    
  }   

  // Alerta - Error desde servidor
  errorApi(msg: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: msg,
      confirmButtonText: 'Entendido',
      confirmButtonColor: this.buttonColor
    });    
  }

  // Alerta - Cargando...
  loading(msg: string = 'Espere un momento'): void {
    Swal.fire({
      title: 'Cargando',
      text: msg,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });  
  }

  // Alerta - Cierra cualquier alerta
  close(): void { Swal.close(); }

}
