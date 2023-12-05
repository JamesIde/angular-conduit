import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abstract-common',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
})
export class AbstractCommonComponent implements OnInit {
  ngOnInit(): void {
    console.log(`inside ng oninti common`);
  }
}
