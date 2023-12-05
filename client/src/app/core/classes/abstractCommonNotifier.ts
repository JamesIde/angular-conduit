import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-abstract-common-notifier',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
})
export class AbstractCommonNotifier implements OnInit, OnDestroy {
  notifier = new Subject<void>();

  ngOnInit(): void {
    console.log(`inside ng on init notifier common`);
  }

  canDeactivate() {}

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
