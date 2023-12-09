import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { AppConstants } from '../../core/constants/app.constants';
import { DragDropDirective } from '../../core/directives/drag-drop.directive';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MaterialModule, DragDropDirective],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  animations: AppConstants.ANIMATIONS.SLIDE,
})
export class FileUploadComponent {
  showUploadDiv: boolean = false;

  uploading: boolean = false;

  @Output() fileSelected = new EventEmitter<File>();

  toggleUploadDiv() {
    this.showUploadDiv = !this.showUploadDiv;
  }

  toggleUploading(override?: boolean) {
    if (override) {
      this.uploading = override;
    } else {
      this.uploading = !this.uploading;
    }
  }

  onFileChange(ev: Event | File) {
    let file: File | undefined;
    if (ev instanceof Event) {
      file = (ev.target as HTMLInputElement).files![0];
    } else if (ev instanceof File) {
      file = ev;
    }
    this.fileSelected.emit(file);
  }
}
