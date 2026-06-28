import { Component, inject } from '@angular/core';

import { ToastService } from '../../services';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class ToastComponent {
  protected toastService = inject(ToastService);
  protected toasts = this.toastService.toasts;
}
