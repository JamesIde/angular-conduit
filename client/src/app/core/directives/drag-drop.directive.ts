import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDragDrop]',
  standalone: true,
})
export class DragDropDirective {
  constructor() {}
  @Output() fileDropped: EventEmitter<File> = new EventEmitter();
  @HostBinding('class.fileover') fileOver = false;

  @HostListener('dragover', ['$event']) onDragOver(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event']) public ondrop(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = (evt as DragEvent).dataTransfer!.files;
    if (files.length > 0) {
      this.fileDropped.emit(files[0]);
    }
  }
}
