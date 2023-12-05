import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AbstractCommonNotifier } from './abstractCommonNotifier';

@Component({
  selector: 'app-abstract-common',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
})
export class AbstractCommonFormComponent
  extends AbstractCommonNotifier
  implements OnInit
{
  form = new UntypedFormGroup({});

  override ngOnInit(): void {}

  override canDeactivate() {
    return this.form.dirty || !this.form.valid;
  }
}
