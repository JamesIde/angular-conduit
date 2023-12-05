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
import { AuthenticationService } from '../authentication.service';
import { takeUntil } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    EmailComponent,
    PasswordComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent
  extends AbstractCommonFormComponent
  implements OnInit
{
  constructor(private authService: AuthenticationService) {
    super();
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
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      FormUtils.printFormErrors(this.form);
    }

    const user = {} as Login;
    user.email = this.form.value.email || '';
    user.password = this.form.value.password || '';
    this.loading = true;
    this.authService.login(user).subscribe({
      next: (response) => {
        this.loading = false;
        console.log(response);
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
    });
  }
}
