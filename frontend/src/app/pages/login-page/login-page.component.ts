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

  // Booleanos de validación de campos
  isSubmiting: WritableSignal<boolean> = signal(false);
  isEmailValid: WritableSignal<boolean> = signal(false);
  isEmailEmpty: WritableSignal<boolean> = signal(false);
  isPasswordEmpty: WritableSignal<boolean> = signal(false);
  isFormEmpty: WritableSignal<boolean> = signal(false);

  //Señales internas
  color: WritableSignal<"success" | "danger" | "warning"> = signal("success");
  icon: WritableSignal<"logued" | "loading" | "failed"> = signal("logued");
  message: WritableSignal<string> = signal("");
  alertMessage: WritableSignal<string> = signal("");

  handleLoginStatus(status: 'success' | 'notFound' | 'wrongPassword' | 'invalidForm') {
    switch (status) {
      case 'success':
        this.message.set("");
        this.alertMessage.set("Iniciando Sesión");
        this.icon.set('loading');
        this.color.set('success');
        break;
      case 'notFound':
        this.message.set("Usuario no encontrado");
        break;
      case 'wrongPassword':
        this.message.set("Contraseña o usuario incorrecto");
        break;
      case 'invalidForm':
        this.message.set("Formulario inválido");
        break;
    }
  }
}
