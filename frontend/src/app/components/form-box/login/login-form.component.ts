import { Component, output, signal, WritableSignal } from '@angular/core';
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

  isSubmitingEmitter = output<boolean>();
  isSubmiting = signal(false);

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  user: UserForm = {
    photo: signal(''),
    username: signal(''),
    email: signal(''),
    password: signal(''),
    confirmPassword: signal('')
  };

  onSubmit() {
    const email = this.user.email().trim();
    const password = this.user.password().trim();
    if(!this.validateForm(email, password)){return;}
    this.isSubmitingEmitter.emit(true);
    this.isSubmiting.set(true);
    this.loginUser(email, password);
  }

  private validateForm(email: string, password: string): boolean {

    if (!email || !password) {
      this.showError('Campos vacíos');
      return false; }
    if (!this.validEmail(email)) {
      this.showError('Email no válido');
      return false; }

    return true;
  }

  private loginUser(email: string, password: string): void {
    this.http.get<UserDTO[]>("http://localhost:8080/users").subscribe(
      {
        next: users => {
          const user = users.find(u => u.email === email);

          if(!user) return this.showError("El usuario no existe");
          if(password != user.password) return this.showError("Contraseña incorrecta");
          this.userService.setUser(user);
          setTimeout(() => {
            this.isSubmiting.set(false);
            this.isSubmitingEmitter.emit(false);
            this.router.navigate(['/main']);
          }, 2000);
        },
        error: err =>{
          this.showError("No se pudo conectar al servidor");
          this.isSubmiting.set(false);
          this.isSubmitingEmitter.emit(false);
          console.error(err);
        }
      }
    )
  }

  private validEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private showError(msg: string): void{
    console.warn(msg);
    return;
  }
}
