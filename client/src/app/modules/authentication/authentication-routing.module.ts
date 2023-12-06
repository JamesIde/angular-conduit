import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RoutingConstants } from '../../core/constants/routing.constants';

const routes: Routes = [
  {
    path: RoutingConstants.LOGIN,
    component: LoginPageComponent,
    title: RoutingConstants.LOGIN,
  },
  {
    path: RoutingConstants.REGISTER,
    component: RegisterPageComponent,
    title: RoutingConstants.REGISTER,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
