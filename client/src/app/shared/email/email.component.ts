import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss',
})
export class EmailComponent {
  @Input() control: FormControl = new FormControl();
}
