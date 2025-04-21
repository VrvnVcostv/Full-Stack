import { Component, input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'banner',
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent {

  title = input('');
  subtitle = input('');

}
