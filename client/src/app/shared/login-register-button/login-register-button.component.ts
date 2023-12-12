import { Component, Input } from '@angular/core';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-login-register-button',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login-register-button.component.html',
  styleUrl: './login-register-button.component.scss',
})
export class LoginRegisterButtonComponent {
  @Input() label: string = '';

  @Input() disabled: boolean = false;
}
