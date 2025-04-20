import { Component, signal, WritableSignal } from '@angular/core';
import { InputBoxComponent } from '../../input-box/input-box.component';
import { User } from '../../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ImageBoxComponent } from "../../image-box/image-box.component";
import { CloudinaryService } from '../../../services/cloudinaryService';

@Component({
  selector: 'register-form-box',
  imports: [InputBoxComponent, FormsModule, ImageBoxComponent],
  templateUrl: './register-form-box.component.html',
})
export class RegisterFormBoxComponent {

  photoFile = signal<File | undefined>(undefined);

  user: User = {
    photo: signal(''),
    username: signal(''),
    email: signal(''),
    password: signal(''),
    confirmPassword: signal(''),
  };

  constructor(private http: HttpClient, private cloudinaryService: CloudinaryService) { }

  onSubmit() {
    const file = this.photoFile();
    if (!file) {
      console.log('⚠️ No hay foto seleccionada');
      return;
    }

    if (this.user.password() !== this.user.confirmPassword()) {
      console.log('❌ Contraseña incorrecta');
      return;
    }

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
          },
          error: (err) => {
            console.error("❌ Error al registrar usuario:", err);
          }
        });
      },
      error: (err) => {
        console.error('❌ Error al subir imagen:', err);
      }
    });
  }
}
