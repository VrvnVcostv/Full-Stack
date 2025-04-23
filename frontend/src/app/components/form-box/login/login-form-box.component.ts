import { Component, output, signal, WritableSignal } from '@angular/core';
import { UserForm } from '../../../interfaces/Form/userForm.interface';
import { InputBoxComponent } from '../../input-box/input-box.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'login-form-box',
  standalone: true,
  imports: [InputBoxComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './login-form-box.component.html',
})

export class LoginFormComponent {
  constructor(private userService: UserService, private authService: AuthService) { }

  user: UserForm = {
    photo: signal(''),
    username: signal(''),
    email: signal(''),
    password: signal(''),
    confirmPassword: signal('')
  };

  //Outputs al padre
  loginStatus = output<'success' | 'notFound' | 'wrongPassword' | 'invalidForm'>();

  //Singals del componente
  isSubmiting = signal(false);
  hasBeenSubmited: WritableSignal<boolean> = signal(false);
  alertMessage: WritableSignal<string> = signal("");

  async onSubmit() {
    const email = this.user.email().trim();
    const password = this.user.password().trim();

    const isFormValid = this.isValidForm(email, password);
    if (!isFormValid) return;

    this.isSubmiting.set(true);
    await this.login(email, password);
  }

  private async login(email: string, password: string): Promise<void> {
    this.hasBeenSubmited.set(true);
    this.authService.login(email, password).subscribe({
      next: () => {
        this.alertMessage.set('');
        this.loginStatus.emit('success');
        this.isSubmiting.set(false);
      },
      error: () => {
        this.alertMessage.set('El usuario o contraseña son incorrectos');
        this.loginStatus.emit('notFound');
        this.isSubmiting.set(false);
        this.hasBeenSubmited.set(false);
      }
    });
  }

  private isValidForm(email: string, password: string): boolean {
    if (!email && !password) {
      this.alertMessage.set('No pueden haber campos vacíos')
      return false;
    }
    if (!password) {
      this.alertMessage.set('Es necesaria la contraseña')
      return false;
    }
    if (!email) {
      this.alertMessage.set('Es necesario el correo')
      return false;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      this.alertMessage.set('El correo no es válido')
      return false;
    }
    return true;
  }

}
