import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../../modules/profile/profile.component';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private dialog: MatDialog) {}

  openProfile() {
    this.dialog.open(ProfileComponent, {
      minWidth: '350px',
      minHeight: '350px',
      disableClose: true,
    });
  }
}
