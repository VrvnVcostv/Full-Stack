import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'image-box',
  imports: [CommonModule],
  templateUrl: './image-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageBoxComponent {

  selectedFile: File | null = null;
  photoPreviewUrl = signal<string | null>(null);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const url = URL.createObjectURL(file);
      this.photoPreviewUrl.set(url); // 🔥 ¡Esto sí dispara el cambio al instante!
    }
  }
}
