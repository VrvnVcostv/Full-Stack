import { Component, signal, input, output } from '@angular/core';

@Component({
  selector: 'input-box',
  imports: [],
  templateUrl: './input-box.component.html',
})
export class InputBoxComponent {
  title = input.required<string>();
  placeholder = input.required<string>();
  type = input.required<string>();
  isEnabled = input<boolean>();

  valueChanged = output<string>()

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChanged.emit(value);
  }

}
