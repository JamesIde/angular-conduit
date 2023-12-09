import { Component, OnInit } from '@angular/core';
import { AbstractCommonFormComponent } from '../../../core/classes/abstractCommonForm';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmailComponent } from '../../../shared/email/email.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { FormUtils } from '../../../core/utils/FormUtils';
import { PasswordComponent } from '../../../shared/password/password.component';
import { Login } from '../../../core/interfaces/login';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { takeUntil } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginRegisterButtonComponent } from '../../../shared/login-register-button/login-register-button.component';
import { UserService } from '../../../core/services/user.service';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    EmailComponent,
    PasswordComponent,
    RouterModule,
    LoginRegisterButtonComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent
  extends AbstractCommonFormComponent
  implements OnInit
{
  constructor(
    private authService: AuthenticationService,
    userService: UserService,
  ) {
    super(userService);
  }
  loading: boolean = false;

  override form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  override ngOnInit(): void {
    super.ngOnInit();
  }

  handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      FormUtils.printFormErrors(this.form);
      return;
    }

    const user = {} as Login;
    user.email = this.form.value.email || '';
    user.password = this.form.value.password || '';
    this.loading = true;
    this.authService
      .login(user)
      .pipe(takeUntil(this.notifier))
      .subscribe({
        next: (response) => {
          this.loading = false;
          console.log(response);
          if (response.body) {
            this.userService.handleAuthSuccess(response.body);
          }
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        },
      });
  }
}
