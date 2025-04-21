import { Component, signal, WritableSignal } from '@angular/core';
import { InputBoxComponent } from '../../input-box/input-box.component';
import { UserForm } from '../../../interfaces/Form/userForm';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ImageBoxComponent } from "../../image-box/image-box.component";
import { CloudinaryService } from '../../../services/cloudinaryService';
import { RouterLink } from '@angular/router';
import { AlertComponent } from "../../../shared/alert/alert.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'register-form-box',
  imports: [InputBoxComponent, FormsModule, ImageBoxComponent, RouterLink, AlertComponent, CommonModule],
  templateUrl: './register-form-box.component.html',
})
export class RegisterFormBoxComponent {

  photoFile = signal<File | undefined>(undefined);
  isSubmiting: WritableSignal<boolean> = signal(false)

  user: UserForm = {
    photo: signal(''),
    username: signal(''),
    email: signal(''),
    password: signal(''),
    confirmPassword: signal(''),
  };

  constructor(private http: HttpClient, private cloudinaryService: CloudinaryService) { }

  onSubmit() {
    const file = this.photoFile();
    if(file && this.validateForm(file, this.user.email(), this.user.username(), this.user.password(), this.user.confirmPassword())){
      this.isSubmiting.set(true);
      this.registrateUser(file);
    }
  }

  private registrateUser(file: File){
    this.cloudinaryService.uploadImage(file).subscribe({
      next: (res: any) => {
        const imageUrl = res.secure_url;
        this.user.photo.set(imageUrl);

        const body = {
          username: this.user.username(),
          email: this.user.email(),
          password: this.user.password(),
          photo: imageUrl
        };

        const url = "http://127.0.0.1:8080/users";

        this.http.post(url, body).subscribe({
          next: (res) => {
            console.log("✅ Usuario registrado", res);
            this.isSubmiting.set(false);
          },
          error: (err) => {
            console.error("❌ Error al registrar usuario:", err);
            this.isSubmiting.set(false);
          }
        });
      },
      error: (err) => {
        console.error('❌ Error al subir imagen:', err);
        this.isSubmiting.set(false);
      }
    });
  }

  private validateForm(file: File, email: string, username: string, password: string, confirmPassword: string): boolean{
    if(!file){
      return this.showError("No hay foto seleccionada"), false;
    }

    if(!email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()){
      return this.showError("Todos los campos son obligatorios"), false;
    }
    if(password != confirmPassword){
      return this.showError("Las contraseñas no coinciden"), false;
    }
    if(!this.validEmail(email)){
      return this.showError("Email no válido"), false;
    }

    return true;
  }

  private showError(msg: string): void{
    console.warn(msg);
  }

  private validEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

}
