import { Component, WritableSignal, signal } from '@angular/core';
import { LoginFormComponent } from "../../components/form-box/login/login-form.component";
import { BannerComponent } from "../../shared/banner/banner.component";
import { AlertComponent } from "../../shared/alert/alert.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login-page',
  imports: [LoginFormComponent, BannerComponent, AlertComponent, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent { 

  isSubmiting: WritableSignal<boolean> = signal(false);
  
  
}
