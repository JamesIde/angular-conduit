import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthenticationRoutingModule, LoginPageComponent],
})
export class AuthenticationModule {}
