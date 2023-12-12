import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';
import { AuthSuccess } from '../interfaces/auth.success';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  let headers = new HttpHeaders();

  if (authService.isAuthenticated()) {
    const user = JSON.parse(localStorage.getItem('user')!) as AuthSuccess;
    headers = req.headers.set('Authorization', 'Bearer ' + user.token);
  }

  const clonedReq = req.clone({
    headers,
  });

  return next(clonedReq);
};
