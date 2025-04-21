import { Component, output, signal, WritableSignal } from '@angular/core';
import { InputBoxComponent } from '../../input-box/input-box.component';
import { UserForm } from '../../../interfaces/Form/userForm';
import { FormsModule } from '@angular/forms';
import { ImageBoxComponent } from "../../image-box/image-box.component";
import { CloudinaryService } from '../../../services/cloudinaryService';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize, firstValueFrom } from 'rxjs';
import { UserService } from '../../../services/userService';

@Component({
  selector: 'register-form-box',
  imports: [InputBoxComponent, FormsModule, ImageBoxComponent, RouterLink, CommonModule],
  templateUrl: './register-form-box.component.html',
})
export class RegisterFormBoxComponent {
  constructor(private cloudinaryService: CloudinaryService, private userService: UserService) { }

  //Outputs al padre
  isSubmitingEmitter = output<boolean>();
  registerStatus = output<'success' | 'error'>();

  //Singals del componente
  photoFile = signal<File | undefined>(undefined);
  isSubmiting: WritableSignal<boolean> = signal(false);
  hasBeenSubmited: WritableSignal<boolean> = signal(false);
  alertMessage: WritableSignal<string> = signal("");

  user: UserForm = {
    photo: signal(''),
    username: signal(''),
    email: signal(''),
    password: signal(''),
    confirmPassword: signal(''),
  };


  async onSubmit() {
    const file = this.photoFile();
    if (!this.fileExists(file!)) return;

    const form = this.validateForm(
      this.user.email(),
      this.user.username(),
      this.user.password(),
      this.user.confirmPassword()
    );

    if (!file || !form) return;

    const emailTaken = await this.checkEmailExists(this.user.email());
    if (emailTaken) return;
    const usernameTaken = await this.checkUsernameExists(this.user.username());
    if(usernameTaken){return};

    this.isSubmiting.set(true);
    this.isSubmitingEmitter.emit(true);
    this.uploadPhoto(file);
  }

  private uploadPhoto(file: File) {
    this.cloudinaryService.uploadImage(file).pipe(
      finalize(() =>{
        this.isSubmiting.set(false)
        this.isSubmitingEmitter.emit(false);
      })).subscribe({
      next: (res: any) => {
        this.user.photo.set(res.secure_url);
        const body = {
          username: this.user.username(),
          email: this.user.email(),
          password: this.user.password(),
          photo: res.secure_url
        };
        this.registerUser(body);
      },
      error: (err) => this.registerStatus.emit('error')
    });
  }

  private registerUser(body: { username: string; email: string; password: string; photo: string; }) {
    this.alertMessage.set("");
    this.userService.create(body).pipe(
      finalize (() => {
        this.hasBeenSubmited.set(true);
        this.isSubmiting.set(false);
      })).subscribe({
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
    if (!this.isValidPassword(password)){
      this.alertMessage.set("La contraseña necesita mínimo 8 caractéres");
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

  private async checkEmailExists(email: string): Promise<boolean> {
    const exists = await firstValueFrom(this.userService.emailExists(email));
    if (exists) {
      this.alertMessage.set("El correo no está disponible");
    }
    return exists;
  }

  private async checkUsernameExists(email: string): Promise<boolean> {
    const exists = await firstValueFrom(this.userService.usernameExists(email));
    if (exists) {
      this.alertMessage.set("El usuario no está disponible");
    }
    return exists;
  }

  private isValidPassword(password: string){
    const passwordValid = password.length >= 8;
    return passwordValid;
  }

  private isValidEmail(email: string): boolean {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return emailValid;
  }

}
