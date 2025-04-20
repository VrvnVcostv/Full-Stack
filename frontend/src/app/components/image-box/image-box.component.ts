import { CommonModule } from '@angular/common';
import { Component, signal, output } from '@angular/core';

@Component({
  selector: 'image-box',
  imports: [CommonModule],
  templateUrl: './image-box.component.html',
})
export class ImageBoxComponent {

  photoPreviewUrl = signal<string | null>(null);
  photo = output<File>();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
        this.photo.emit(file);
        this.photoPreviewUrl.set(URL.createObjectURL(file))
    }
  }
}
