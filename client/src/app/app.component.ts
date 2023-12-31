import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule, SpinnerVisibilityService } from 'ng-http-loader';
import { HeaderComponent } from './shared/header/header.component';
import { AuthenticationService } from './core/services/authentication.service';
import { UserService } from './core/services/user.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    NgHttpLoaderModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    } else {
      this.userService.logout();
    }
  }

  title = 'client';
}
