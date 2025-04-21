import { Component } from '@angular/core';
import { LoginFormComponent } from "../../components/form-box/login/login-form.component";
import { BannerComponent } from "../../shared/banner/banner.component";

@Component({
  selector: 'login-page',
  imports: [LoginFormComponent, BannerComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent { }
