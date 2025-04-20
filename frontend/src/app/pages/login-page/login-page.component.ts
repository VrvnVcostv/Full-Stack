import { Component } from '@angular/core';
import { LoginFormComponent } from "../../components/form-box/login/login-form.component";

@Component({
  selector: 'login-page',
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent { }
