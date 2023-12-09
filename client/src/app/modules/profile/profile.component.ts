import { Component } from '@angular/core';
import { AbstractCommonUser } from '../../core/classes/abstractCommonUser';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BioComponent } from '../../shared/bio/bio.component';
import { MaterialModule } from '../../shared/material/material.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BioComponent, MaterialModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent extends AbstractCommonUser {
  constructor(
    private dialog: MatDialog,
    userService: UserService,
  ) {
    super(userService);
  }

  form = new FormGroup({
    bio: new FormControl('', [Validators.maxLength(250)]),
  });

  override ngOnInit() {
    super.ngOnInit();

    if (this.user?.bio) {
      this.form.setValue({
        bio: this.user?.bio,
      });
    }
  }

  closeModal() {
    this.dialog.closeAll();
  }

  save() {}
}
