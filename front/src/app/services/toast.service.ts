import { Injectable, signal } from '@angular/core';

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

  private addToast(toast: Omit<Toast, 'id'>) {
    const id = Date.now();
    this.toasts.update(prev => [...prev, { ...toast, id, leaving: false }]);

    setTimeout(() => {
      this.toasts.update(prev =>
        prev.map(t =>
          t.id === id ? { ...t, leaving: true } : t
        )
      );

      setTimeout(() => {
        this.removeToast(id);
      }, 300);
    }, 2500);
  }

  removeToast(id: number) {
    this.toasts.update(prev => prev.filter(t => t.id !== id));
  }

  success(message: { message: string }): void {
    this.addToast({ message: message.message, type: 'success', title: 'Operación exitosa'});
  }

  error(message: { message: string }): void {
    this.addToast({ message: message.message, type: 'error', title: 'Ha ocurrido un error' });
  }

  info(message: { message: string }): void {
    this.addToast({ message: message.message, type: 'info', title: 'Aviso'});
  }
}
