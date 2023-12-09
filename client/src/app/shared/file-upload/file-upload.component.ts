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
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  maxFileSize = 1000000;

  FILE_ERROR_MESSAGE: string = '';

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
    const file = this.extractFile(ev);
    console.log(file?.size);
    if (file) {
      if (file.size > this.maxFileSize) {
        this.FILE_ERROR_MESSAGE = 'File size cannot exceed 1MB';
        return;
      } else if (!this.allowedFileTypes.includes(file.type)) {
        this.FILE_ERROR_MESSAGE = 'File must be a jpeg or png';
        return;
      } else {
        this.fileSelected.emit(file);
      }
    }
  }

  extractFile(ev: Event | File): File | undefined {
    if (ev instanceof Event) {
      return (ev.target as HTMLInputElement).files?.[0];
    } else if (ev instanceof File) {
      return ev;
    }

    return undefined;
  }
}
