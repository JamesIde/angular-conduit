import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exists } from '../interfaces/exists';
import { environment } from '../../../environment/environment';
import { ApiConstants } from '../constants/api.constants';
import { Login } from '../interfaces/login';
import { AuthSuccess } from '../interfaces/auth.success';
import { Register } from '../interfaces/register';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  jwtService = new JwtHelperService();
  constructor(private http: HttpClient) {}

  login(user: Login) {
    return this.http.post<AuthSuccess>(
      environment.apiBaseUrl + ApiConstants.LOGIN,
      user,
      {
        observe: 'response',
      },
    );
  }

  register(user: Register) {
    return this.http.post<AuthSuccess>(
      environment.apiBaseUrl + ApiConstants.REGISTER,
      user,
      {
        observe: 'response',
      },
    );
  }

  checkEmailExists(email: string) {
    return this.http.post<Exists>(
      environment.apiBaseUrl + ApiConstants.EMAIL_EXISTS,
      { email },
    );
  }

  checkUsernameExists(username: string) {
    return this.http.post<Exists>(
      environment.apiBaseUrl + ApiConstants.USERNAME_EXISTS,
      { username },
    );
  }

  isAuthenticated() {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user')!) as AuthSuccess;
      return user && !this.jwtService.isTokenExpired(user.token);
    }
    return false;
  }
}
