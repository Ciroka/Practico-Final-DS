import { Injectable, signal } from '@angular/core';

import { MessageResponse } from '../interfaces';

interface Toast {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
  leaving?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly toasts = signal<Toast[]>([]);

  private addToast(toast: Omit<Toast, 'id'>): void {
    const id = Date.now();
    this.toasts.update(prev => [...prev, { ...toast, id, leaving: false }]);

    setTimeout(() => {
      this.toasts.update(prev =>
        prev.map(toast =>
          toast.id === id ? { ...toast, leaving: true } : toast
        )
      );

      setTimeout(() => {
        this.removeToast(id);
      }, 300);
    }, 2500);
  }

  removeToast(id: number) {
    this.toasts.update(prev => prev.filter(toast => toast.id !== id));
  }

  success(messageResponse: MessageResponse): void {
    this.addToast({
      message: messageResponse.message,
      type: 'success',
      title: 'Operación exitosa'
    });
  }

  error(messageResponse: MessageResponse): void {
    this.addToast({
      message: messageResponse.message,
      type: 'error',
      title: 'Ha ocurrido un error'
    });
  }

  info(messageResponse: MessageResponse): void {
    this.addToast({
      message: messageResponse.message,
      type: 'info',
      title: 'Aviso'
    });
  }
}
