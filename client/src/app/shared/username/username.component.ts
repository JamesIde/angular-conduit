import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-username',
  standalone: true,
  imports: [RouterModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './username.component.html',
  styleUrl: './username.component.scss',
})
export class UsernameComponent {
  @Input() control = new UntypedFormControl();
}
