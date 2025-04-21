import { Component, input, InputSignal, output, signal, WritableSignal } from '@angular/core';
import { UserForm } from '../../../interfaces/Form/userForm';
import { InputBoxComponent } from '../../input-box/input-box.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../../../interfaces/DTO/userDTO';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/Singletons/userService';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'login-form-box',
  imports: [InputBoxComponent, FormsModule, RouterLink, CommonModule],
  templateUrl: './login-form.component.html',
})

export class LoginFormComponent {
  user: UserForm = {
    photo: signal(''),
    username: signal(''),
    email: signal(''),
    password: signal(''),
    confirmPassword: signal('')
  };

  //Inputs del padre
  messageInput: InputSignal<string> = input.required();

  //Outputs al padre
  isSubmitingEmitter = output<boolean>();
  isEmailValidEmitter = output<boolean>(); 
  isEmailEmptyEmitter = output<boolean>(); 
  isPasswordEmptyEmitter = output<boolean>(); 
  isFormEmptyEmitter = output<boolean>(); 
  loginStatus = output<'success' | 'notFound' | 'wrongPassword' | 'invalidForm'>();

  //Singals del componente
  isSubmiting = signal(false);

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  onSubmit() {
    const email = this.user.email().trim();
    const password = this.user.password().trim();

    const isFormValid = this.isValidForm(email, password);
    const isEmailFormatValid = this.isValidEmail(email);

    if (!isFormValid || !isEmailFormatValid) {
      this.loginStatus.emit('invalidForm');
      return;
    }

    if (!isFormValid || !isEmailFormatValid) return;

    this.isSubmiting.set(true);
    this.isSubmitingEmitter.emit(true);

    this.login(email, password);
  }

  private isValidForm(email: string, password: string): boolean {
    const formIsEmpty = !email && !password;
    const passwordIsEmpty = !password;
    const emailIsEmpty = !email;
    this.isFormEmptyEmitter.emit(formIsEmpty);
    this.isPasswordEmptyEmitter.emit(passwordIsEmpty);
    this.isEmailEmptyEmitter.emit(emailIsEmpty);
    return !formIsEmpty && !passwordIsEmpty && !emailIsEmpty;
  }

  private isValidEmail(email: string): boolean {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    this.isEmailValidEmitter.emit(emailValid);
    return emailValid;
  }

  private login(email: string, password: string): void {
    this.http.get<UserDTO[]>("http://localhost:8080/users").subscribe({
      next: users => {
        const user = users.find(u => u.email === email);

        if (!user) {
          this.loginStatus.emit('notFound');
          this.isSubmiting.set(false);
          this.isSubmitingEmitter.emit(false);
          return;
        }

        if (user.password !== password) {
          this.loginStatus.emit('wrongPassword');
          this.isSubmiting.set(false);
          this.isSubmitingEmitter.emit(false);
          return;
        }

        this.userService.setUser(user);
        this.loginStatus.emit('success');

        setTimeout(() => {
          this.isSubmiting.set(false);
          this.isSubmitingEmitter.emit(false);
          this.router.navigate(['/main']);
        }, 2000);
      },
      error: err => {
        console.error("Error al obtener usuarios", err);
        this.loginStatus.emit('notFound');
        this.isSubmiting.set(false);
        this.isSubmitingEmitter.emit(false);
      }
    });
  }
}
