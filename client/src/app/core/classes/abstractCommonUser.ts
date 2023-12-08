import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthSuccess } from '../interfaces/auth.success';
import { AbstractCommonNotifier } from './abstractCommonNotifier';
@Component({
  selector: 'app-abstract-common-notifier',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
})
export class AbstractCommonUser
  extends AbstractCommonNotifier
  implements OnInit, OnDestroy
{
  user: AuthSuccess | null = null;
  constructor(protected userService: UserService) {
    super();
  }
  ngOnInit(): void {
    this.userService.$userSubject
      .pipe(takeUntil(this.notifier))
      .subscribe((user) => {
        if (user === null) {
          // This is ugly. Fix later
          if (localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user')!);
          } else {
            this.user = null;
          }
        } else {
          this.user = user;
        }
      });
  }

  canDeactivate() {}
}
