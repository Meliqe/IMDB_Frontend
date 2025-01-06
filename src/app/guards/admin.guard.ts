import { CanActivateFn } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');
  if(token){
    const role = authService.getRoleFromToken(token);
    if(role==='admin')
    {
      return true;
    }
  }
  console.error('Admin olmayan kullanıcı admin-dashboard erişmeye çalıştı.');
  window.location.href = '/login';
  return false;
};
