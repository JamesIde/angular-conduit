import { Injectable, Signal, signal } from '@angular/core';
import { AuthSuccess } from '../interfaces/auth.success';
import { Router } from '@angular/router';
import { RoutingConstants } from '../constants/routing.constants';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {}

  $userSubject = new BehaviorSubject<AuthSuccess | null>(null);

  handleAuthSuccess(user: AuthSuccess) {
    this.$userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/' + RoutingConstants.DASHBOARD]);
  }

  logout() {
    localStorage.removeItem('user');
    this.$userSubject.next(null);
    this.router.navigate(['/auth/' + RoutingConstants.LOGIN]);
  }
}
