import { ChangeDetectionStrategy, Component, signal, input, output } from '@angular/core';

@Component({
  selector: 'input-box',
  imports: [],
  templateUrl: './input-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputBoxComponent {
  title = input.required<string>();
  placeholder = input.required<string>();
  type = input.required<string>();

  valueChanged = output<string>()

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChanged.emit(value);
  }
}
