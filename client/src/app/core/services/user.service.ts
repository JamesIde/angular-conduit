import { Injectable, Signal, signal } from '@angular/core';
import { AuthSuccess } from '../interfaces/auth.success';
import { Router } from '@angular/router';
import { RoutingConstants } from '../constants/routing.constants';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UploadImageSuccess } from '../interfaces/upload.image.success';
import { ApiConstants } from '../constants/api.constants';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  $userSubject = new BehaviorSubject<AuthSuccess | null>(null);

  handleAuthSuccess(user: AuthSuccess) {
    this.updateUser(user);
    this.router.navigate(['/' + RoutingConstants.DASHBOARD]);
  }

  logout() {
    localStorage.removeItem('user');
    this.$userSubject.next(null);
    this.router.navigate(['/auth/' + RoutingConstants.LOGIN]);
  }

  uploadImage(file: File) {
    const fd = new FormData();
    fd.append('image', file);
    // There will be a user because we are only calling this function when they are logged in!
    const user = this.$userSubject.getValue() as AuthSuccess;

    this.http
      .post<UploadImageSuccess>(ApiConstants.UPLOAD_IMAGE, fd)
      .subscribe((res) => {
        user.image = res.image;
        this.updateUser(user);
      });
  }

  updateUser(user: AuthSuccess) {
    this.$userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
