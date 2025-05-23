import { Router } from '@angular/router';
import { Component, WritableSignal, signal } from '@angular/core';
import { LoginFormComponent } from "../../components/form-box/login/login-form-box.component";
import { BannerComponent } from "../../shared/banner/banner.component";
import { AlertComponent } from "../../shared/alert/alert.component";
import { CommonModule } from '@angular/common';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [LoginFormComponent, BannerComponent, AlertComponent, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  constructor(private routes: Router, private sessionService: SessionService) {}

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
        this.customizeAlert("Iniciando Sesión", "loading", "success");
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

  private customizeAlert(message: string, icon : "success" | "loading" | "failed", color : "success" | "danger" | "warning") {
    this.alertMessage.set(message);
    this.icon.set(icon);
    this.color.set(color);
  }
}
