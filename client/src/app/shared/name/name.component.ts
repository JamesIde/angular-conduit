import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-name',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './name.component.html',
  styleUrl: './name.component.scss',
})
export class NameComponent {
  @Input() control = new UntypedFormControl();
}
