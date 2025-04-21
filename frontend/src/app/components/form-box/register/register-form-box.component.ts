import { Component, output, signal, WritableSignal } from '@angular/core';
import { InputBoxComponent } from '../../input-box/input-box.component';
import { UserForm } from '../../../interfaces/Form/userForm';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ImageBoxComponent } from "../../image-box/image-box.component";
import { CloudinaryService } from '../../../services/cloudinaryService';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'register-form-box',
  imports: [InputBoxComponent, FormsModule, ImageBoxComponent, RouterLink, CommonModule],
  templateUrl: './register-form-box.component.html',
})
export class RegisterFormBoxComponent {

  //Outputs al padre
  isSubmitingEmitter = output<boolean>();
  registerStatus = output<'success' | 'error'>();

  //Singals del componente
  photoFile = signal<File | undefined>(undefined);
  isSubmiting: WritableSignal<boolean> = signal(false)
  alertMessage: WritableSignal<string> = signal("");

  user: UserForm = {
    photo: signal(''),
    username: signal(''),
    email: signal(''),
    password: signal(''),
    confirmPassword: signal(''),
  };

  constructor(private http: HttpClient, private cloudinaryService: CloudinaryService) { }

  onSubmit() {
    const file = (this.photoFile());
    if (!this.fileExists(file!)) return;
    const form = this.validateForm(this.user.email(), this.user.username(), this.user.password(), this.user.confirmPassword());
    if (!file || !form) return;
    this.isSubmiting.set(true);
    this.uploadPhoto(file);
  }

  private uploadPhoto(file: File) {
    this.alertMessage.set("");
    this.cloudinaryService.uploadImage(file).pipe(
      finalize(() => this.isSubmiting.set(false))
    ).subscribe({
      next: (res: any) => {
        this.user.photo.set(res.secure_url);
        const url = 'http://127.0.0.1:8080/users';
        const body = {
          username: this.user.username(),
          email: this.user.email(),
          password: this.user.password(),
          photo: res.secure_url
        };
        this.registerUser(url, body);
      },
      error: (err) => this.registerStatus.emit('error')
    });
  }

  private registerUser(url: string, body: { username: string; email: string; password: string; photo: void; }) {
    this.http.post(url, body).pipe(
      finalize(() => this.isSubmiting.set(false))
    ).subscribe({
      next: () => this.registerStatus.emit('success'),
      error: () => this.registerStatus.emit('error')
    });
  }

  private validateForm(email: string, username: string, password: string, confirmPassword: string): boolean {
    if (!email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
      this.alertMessage.set("Los campos no pueden estar vacíos");
      return false;
    }
    if (!this.isValidEmail(email)) {
      this.alertMessage.set("El email no es válido");
      return false;
    }
    if (password !== confirmPassword) {
      this.alertMessage.set("Las contraseñas no coinciden");
      return false;
    }
    return true;
  }

  private fileExists(file: File): boolean {
    if (!file) {
      this.alertMessage.set("Seleccione una foto de perfil");
      return false;
    }
    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return emailValid;
  }
}
