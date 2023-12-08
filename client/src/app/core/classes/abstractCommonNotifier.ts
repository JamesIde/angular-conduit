import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AbstractCommonUser } from './abstractCommonUser';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-abstract-common-notifer',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
})
export class AbstractCommonNotifier implements OnDestroy {
  notifier = new Subject<void>();

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
