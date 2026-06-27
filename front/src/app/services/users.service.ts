import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DeleteAccountDto, MessageResponse, SafeUser, UpdateEmailDto, UpdatePasswordDto, UpdateUserRoleDto } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly api = environment.apiUrl;
  private readonly http = inject(HttpClient);

  findAll(): Observable<SafeUser[]> {
    return this.http.get<SafeUser[]>(`${this.api}/users`);
  }

  updateRole(id: string, dto: UpdateUserRoleDto): Observable<SafeUser> {
    return this.http.patch<SafeUser>(`${this.api}/users/${id}/role`, dto);
  }

  updatePassword(dto: UpdatePasswordDto ){
    return this.http.patch<MessageResponse>(`${this.api}/users/me/password`, dto);
  }

  updateEmail(dto: UpdateEmailDto ){
    return this.http.patch<MessageResponse>(`${this.api}/users/me/email`, dto);
  }

  deleteAccount(dto: DeleteAccountDto ){
    return this.http.patch<MessageResponse>(`${this.api}/users/me`, dto);
  }
}

