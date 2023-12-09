import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exists } from '../interfaces/exists';
import { environment } from '../../../environment/environment';
import { ApiConstants } from '../constants/api.constants';
import { Login } from '../interfaces/login';
import { AuthSuccess } from '../interfaces/auth.success';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
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
}
