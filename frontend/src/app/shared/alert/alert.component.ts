import { trigger, transition, style, animate } from '@angular/animations';
import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { AlertModule } from '@coreui/angular';
import { cilCheckCircle, cilWarning } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';


@Component({
  selector: 'alert-component',
  imports: [AlertModule, IconDirective],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  animations: [trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-10px)' }),
      animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
      animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
    ])
  ])
  ]
})
export class AlertComponent {

  color: InputSignal<'success' | 'danger' | 'warning'> = input.required();
  iconName: InputSignal<'success' | 'loading' | 'failed'> = input.required();
  message: InputSignal<string> = input.required();
  iconsCollection = { cilCheckCircle, cilWarning};

  setIcon(): string[] {
    switch (this.iconName()) {
      case 'success':
        return this.iconsCollection.cilCheckCircle;
      case 'loading':
        return this.iconsCollection.cilCheckCircle;
        break;
      case 'failed':
        return this.iconsCollection.cilWarning;
        break;
    }
  }
}
