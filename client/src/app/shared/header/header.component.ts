import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { takeUntil } from 'rxjs';
import { AbstractCommonNotifier } from '../../core/classes/abstractCommonNotifier';
import { AuthSuccess } from '../../core/interfaces/auth.success';
import { BannerComponent } from '../banner/banner.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, BannerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends AbstractCommonNotifier implements OnInit {
  constructor(protected userService: UserService) {
    super();
  }
  user: AuthSuccess | null = null;

  override ngOnInit() {
    this.userService.$userSubject
      // .pipe(takeUntil(this.notifier))
      .subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
  }
}
