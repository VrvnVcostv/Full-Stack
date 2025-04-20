import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterFormBoxComponent } from "./components/form-box/register/register-form-box.component";
import { LoginFormComponent } from "./components/form-box/login/login-form.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RegisterFormBoxComponent, LoginFormComponent]
})
export class AppComponent {
  title = 'frontend';
}
