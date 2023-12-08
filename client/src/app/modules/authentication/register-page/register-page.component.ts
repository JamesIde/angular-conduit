import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AbstractCommonFormComponent } from '../../../core/classes/abstractCommonForm';
import { FormUtils } from '../../../core/utils/FormUtils';
import { AuthenticationService } from '../authentication.service';
import { AppConstants } from '../../../core/constants/app.constants';
import { EmailComponent } from '../../../shared/email/email.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { UsernameComponent } from '../../../shared/username/username.component';
import { PasswordComponent } from '../../../shared/password/password.component';
import { Register } from '../../../core/interfaces/register';
import { LoginRegisterButtonComponent } from '../../../shared/login-register-button/login-register-button.component';
import { NameComponent } from '../../../shared/name/name.component';
import { takeUntil } from 'rxjs';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    EmailComponent,
    UsernameComponent,
    PasswordComponent,
    MaterialModule,
    LoginRegisterButtonComponent,
    NameComponent,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent extends AbstractCommonFormComponent {
  constructor(
    private authService: AuthenticationService,
    userService: UserService,
  ) {
    super(userService);
  }
  loading: boolean = false;
  override ngOnInit(): void {}

  override form = new FormGroup(
    {
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(AppConstants.REGEX.EMAIL_REGEX),
        ],
        [FormUtils.EmailExistsValidator(this.authService)],
      ),
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(
            AppConstants.REGEX.INCLUDE_ONE_NUMBER_AND_UPPERCASE,
          ),
        ],
        [FormUtils.UsernameExistsValidator(this.authService)],
      ),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3),
        Validators.pattern(AppConstants.REGEX.ENGLISH_KEYBOARD_PATTERN),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(AppConstants.REGEX.INCLUDE_ONE_NUMBER_AND_UPPERCASE),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(AppConstants.REGEX.INCLUDE_ONE_NUMBER_AND_UPPERCASE),
      ]),
    },
    {
      validators: [
        FormUtils.PasswordsMatchValidator('password', 'confirmPassword'),
      ],
    },
  );

  handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      FormUtils.printFormErrors(this.form);
      return;
    }

    const user = {
      email: this.form.value.email || '',
      username: this.form.value.username || '',
      name: this.form.value.name || '',
      password: this.form.value.password || '',
    } as Register;
    this.loading = true;
    this.authService
      .register(user)
      .pipe(takeUntil(this.notifier))
      .subscribe({
        next: (res) => {
          this.loading = false;
          console.log(res);
          if (res.body) {
            this.userService.handleAuthSuccess(res.body);
          }
        },
        error: (err) => {
          this.loading = false;
          console.log(err);
        },
      });
  }
}
