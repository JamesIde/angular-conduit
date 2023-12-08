import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AbstractCommonUser } from './abstractCommonUser';

@Component({
  selector: 'app-abstract-common',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
})
export class AbstractCommonFormComponent
  extends AbstractCommonUser
  implements OnInit
{
  form = new UntypedFormGroup({});

  override ngOnInit(): void {}

  override canDeactivate() {
    return this.form.dirty || !this.form.valid;
  }
}
