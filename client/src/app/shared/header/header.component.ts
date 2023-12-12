import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { takeUntil } from 'rxjs';
import { AbstractCommonUser } from '../../core/classes/abstractCommonUser';
import { AuthSuccess } from '../../core/interfaces/auth.success';
import { BannerComponent } from '../banner/banner.component';
import { AppService } from '../../core/services/app.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, BannerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends AbstractCommonUser implements OnInit {
  constructor(
    protected appService: AppService,
    userService: UserService,
  ) {
    super(userService);
    super.ngOnInit();
  }
  override ngOnInit(): void {}
}
