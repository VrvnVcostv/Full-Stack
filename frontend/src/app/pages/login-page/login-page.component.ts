import { Router, RouterLink } from '@angular/router';
import { Component, WritableSignal, signal } from '@angular/core';
import { LoginFormComponent } from "../../components/form-box/login/login-form.component";
import { BannerComponent } from "../../shared/banner/banner.component";
import { AlertComponent } from "../../shared/alert/alert.component";
import { CommonModule } from '@angular/common';
import { SessionService } from '../../services/sessionService';

@Component({
  selector: 'login-page',
  imports: [LoginFormComponent, BannerComponent, AlertComponent, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  constructor(private routes: Router, private sessionService: SessionService) {sessionService.clear()}

  // Booleanos de validación de campos
  isAlertVisible: WritableSignal<boolean> = signal(false);

  //Señales internas
  color: WritableSignal<"success" | "danger" | "warning"> = signal("success");
  icon: WritableSignal<"success" | "loading" | "failed"> = signal("success");
  alertMessage: WritableSignal<string> = signal("");

  handleLoginStatus(status: 'success' | 'notFound' | 'wrongPassword' | 'invalidForm') {
    switch (status) {
      case 'success':
        this.isAlertVisible.set(true);
        this.alertMessage.set("Iniciando Sesión");
        this.icon.set('loading');
        this.color.set('success');
        setTimeout(() => {
          this.isAlertVisible.set(false);
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
