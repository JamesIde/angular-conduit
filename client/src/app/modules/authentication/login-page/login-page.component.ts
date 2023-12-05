import { Component, OnInit } from '@angular/core';
import { AbstractCommonComponent } from '../../../core/common/abstractCommon';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent
  extends AbstractCommonComponent
  implements OnInit
{
  override ngOnInit(): void {
    super.ngOnInit();
  }
}
