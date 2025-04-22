import { Component, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  constructor(private routes: Router) {}

  handleLoginStatus(status: 'success' | 'notFound' | 'wrongPassword' | 'invalidForm') {
    switch (status) {
      case 'success':

        setTimeout(() => {
        }, 1250);
        setTimeout(() => {
          this.routes.navigate(['main']);
        }, 2000);
        break;
      case 'notFound':
        //TODO
        break;
      case 'wrongPassword':
        //TODO
        break;
      case 'invalidForm':
        //TODO
        break;
    }
  }
}
