import { Component, Input } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class PasswordComponent {
  @Input() control = new UntypedFormControl();
  @Input() showRegisterPasswordHint: boolean = false;
  @Input() label: string = '';

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
