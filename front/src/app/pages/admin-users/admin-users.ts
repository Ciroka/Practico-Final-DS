import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { UsersService, AuthService, ToastService } from '../../services';
import { SafeUser, UserRole } from '../../interfaces';

@Component({
  selector: 'app-admin-users',
  imports: [DatePipe, FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsersPage implements OnInit {
  private usersService = inject(UsersService);
  authService = inject(AuthService);
  toastService = inject(ToastService);

  users = signal<SafeUser[]>([]);
  error = '';

  async ngOnInit(): Promise<void> {
    try {
      const users = await firstValueFrom(this.usersService.findAll());
      this.users.set(users);
    } catch {
      this.error = 'Error al cargar usuarios';
      this.mostrarMsjError();
    }
  }

  async changeRole(userId: string, role: UserRole): Promise<void> {
    try {
      const updated = await firstValueFrom(this.usersService.updateRole(userId, { role }));
      this.users.update((users) =>
        users.map((u) => (u.id === updated.id ? updated : u)),
      );
    } catch (err: any) {
      this.error = 'Error al cambiar rol';
      this.mostrarMsjError()
    }
  }

  mostrarMsjError() {
    this.toastService.error({ message: this.error });
  }
}
