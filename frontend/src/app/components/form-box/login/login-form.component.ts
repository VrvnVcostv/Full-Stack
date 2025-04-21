import { Component, output, signal, WritableSignal } from '@angular/core';
import { UserForm } from '../../../interfaces/Form/userForm';
import { InputBoxComponent } from '../../input-box/input-box.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../../../interfaces/DTO/userDTO';
import { UserService } from '../../../services/Singletons/userService';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'login-form-box',
  imports: [InputBoxComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './login-form.component.html',
})

export class LoginFormComponent {
  constructor(private http: HttpClient, private userService: UserService) { }

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
  alertMessage: WritableSignal<string> = signal("");


  onSubmit() {
    const email = this.user.email().trim();
    const password = this.user.password().trim();

    const isFormValid = this.isValidForm(email, password);

    if (!isFormValid) { return; }
    this.isSubmiting.set(true);
    this.login(email, password);
  }

  private login(email: string, password: string): void {
    this.http.get<UserDTO[]>("http://localhost:8080/users").subscribe({
      next: users => {
        const user = users.find(u => u.email === email);

        if (!user || user.password !== password) {
          this.alertMessage.set('El usuario o contraseña son incorrectos')
          this.isSubmiting.set(false);
          return;
        }
        this.alertMessage.set('')
        this.userService.setUser(user);
        this.loginStatus.emit('success');
      },
      error: err => {
        this.loginStatus.emit('notFound');
        this.isSubmiting.set(false);
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
