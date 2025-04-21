import { Component, signal, WritableSignal } from '@angular/core';
import { RegisterFormBoxComponent } from '../../components/form-box/register/register-form-box.component';
import { BannerComponent } from "../../shared/banner/banner.component";
import { CommonModule } from '@angular/common';
import { AlertComponent } from "../../shared/alert/alert.component";
import { Router } from '@angular/router';

@Component({
  selector: 'register-page',
  imports: [RegisterFormBoxComponent, BannerComponent, CommonModule, AlertComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  constructor(private routes: Router){}

  // Booleanos de validación de campos
  isAlertVisible: WritableSignal<boolean> = signal(false);

  //Señales internas
  color: WritableSignal<"success" | "danger" | "warning"> = signal("success");
  icon: WritableSignal<"success" | "loading" | "failed"> = signal("success");
  alertMessage: WritableSignal<string> = signal("");

  handleRegisterStatus(status: 'success' | 'error'): void {
    switch (status) {
      case 'success':
        this.isAlertVisible.set(true);
        this.alertMessage.set('Usuario registrado correctamente');
        this.icon.set('success');
        this.color.set('success');
        setTimeout(() => {
          this.isAlertVisible.set(false);
        }, 1250);
        setTimeout(() => {
          this.routes.navigate(['login']);
        }, 2000);
        break;
      case 'error':
        this.alertMessage.set('Ha ocurrido un error');
        this.icon.set('failed');
        this.color.set('danger');
        break;
    }
  }
}
