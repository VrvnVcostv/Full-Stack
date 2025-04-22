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
import { AuthService } from '../../../services/auth.service';
import { UserDTO } from '../../../interfaces/DTO/userDTO';

@Component({
  selector: 'register-form-box',
  imports: [InputBoxComponent, FormsModule, ImageBoxComponent, RouterLink, CommonModule],
  templateUrl: './register-form-box.component.html',
})
export class RegisterFormBoxComponent {
  constructor(private cloudinaryService: CloudinaryService, private userService: UserService, private authService: AuthService) { }

  //Outputs al padre
  isSubmitingEmitter = output<boolean>();
  registerStatus = output<'success' | 'error'>();

  //Singals del componente
  photoFile = signal<File | undefined>(undefined);
  isSubmiting: WritableSignal<boolean> = signal(false);
  hasBeenSubmited: WritableSignal<boolean> = signal(false);
  alertMessage: WritableSignal<string> = signal("");

  userInputText: UserForm = {
    photo: signal(''),
    username: signal(''),
    email: signal(''),
    password: signal(''),
    confirmPassword: signal(''),
  };

  userUpload!: UserDTO;

  async onSubmit() {
    this.hasBeenSubmited.set(true)
    const file = this.photoFile();
    if (!this.fileExists(file!)) return;
    const form = this.validateForm(
      this.userInputText.email(),
      this.userInputText.username(),
      this.userInputText.password(),
      this.userInputText.confirmPassword()
    );

    if (!file || !form) return;
    const emailTaken = await this.checkEmailExists(this.userInputText.email());
    const usernameTaken = await this.checkUsernameExists(this.userInputText.username());

    if (emailTaken || usernameTaken) return;

    this.startSubmitting();
    await this.uploadPhoto(file);
  }

  private uploadPhoto(file: File): void {
    this.cloudinaryService.uploadImage(file).subscribe({
      next: (res: any) => {
        this.userInputText.photo.set(res.secure_url);
        const upload: UserDTO = {
          username: this.userInputText.username(),
          email: this.userInputText.email(),
          password: this.userInputText.password(),
          photo: res.secure_url
        }
        this.authService.register(upload).pipe(
          finalize(() => {this.stopSubmitting();})
        ).subscribe({
          next: () => {
            this.registerStatus.emit("success");
          },
          error: (err) => {
            this.hasBeenSubmited.set(false);
            console.error("Error registrando:", err);
            this.registerStatus.emit("error");
          }
        })
      },
      error: (err) => {this.registerStatus.emit('error'); this.hasBeenSubmited.set(false);}
    });
  }

  private async checkEmailExists(email: string): Promise<boolean> {
    const exists = await firstValueFrom(this.userService.emailExists(email));
    if (exists) {
      this.alertMessage.set("El correo no está disponible");
    }
    return exists;
  }

  private async checkUsernameExists(username: string): Promise<boolean> {
    const exists = await firstValueFrom(this.userService.usernameExists(username));
    if (exists) {
      this.alertMessage.set("El usuario no está disponible");
    }
    return exists;
  }

  private startSubmitting() {
    this.isSubmiting.set(true);
    this.isSubmitingEmitter.emit(true);
  }

  private stopSubmitting(): void {
    this.isSubmiting.set(false);
    this.isSubmitingEmitter.emit(false);
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
    if (!this.isValidPassword(password)) {
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

  private isValidPassword(password: string) {
    const passwordValid = password.length >= 8;
    return passwordValid;
  }

  private isValidEmail(email: string): boolean {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return emailValid;
  }

}
