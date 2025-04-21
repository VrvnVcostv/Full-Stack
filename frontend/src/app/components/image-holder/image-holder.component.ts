import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'image-holder',
  imports: [],
  templateUrl: './image-holder.component.html',
})
export class ImageHolderComponent {
  photoPreviewUrl = input<string>();
}
