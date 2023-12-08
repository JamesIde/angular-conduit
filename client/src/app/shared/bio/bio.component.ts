import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './bio.component.html',
  styleUrl: './bio.component.scss',
})
export class BioComponent {
  @Input() control = new UntypedFormControl();
}
