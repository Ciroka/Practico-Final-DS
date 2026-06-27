import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastr = inject(ToastrService);

  success(message: {message: string}, title: string = 'Operación Exitosa'): void {
    this.toastr.success(message.message, title, {
      timeOut: 2500, 
      progressBar: true,
      closeButton: true
    });
  }

  error(message: {message: string}, title: string = 'Ha ocurrido un error'): void {
    this.toastr.error(message.message, title, {
      timeOut: 2500,
      progressBar: true,
      closeButton: true
    })
  }

  info(message: {message: string}, title: string = 'Aviso'): void {
    this.toastr.info(message.message, title, {
      timeOut: 2500,
      progressBar: true,
      closeButton: true
    })
  }
}
