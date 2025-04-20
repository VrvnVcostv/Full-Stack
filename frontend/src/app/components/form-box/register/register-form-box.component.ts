import { Component, signal } from '@angular/core';
import { InputBoxComponent } from '../../input-box/input-box.component';
import { User } from '../../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ImageBoxComponent } from "../../image-box/image-box.component";

@Component({
  selector: 'register-form-box',
  imports: [InputBoxComponent, FormsModule, ImageBoxComponent],
  templateUrl: './register-form-box.component.html',
})
export class RegisterFormBoxComponent {
    user: User = {
      username: signal(''),
      email: signal(''),
      password: signal(''),
      confirmPassword: signal('')
    };

    constructor(private http: HttpClient){}

   onSubmit(){
    const body = {
      username: this.user.username(),
      email: this.user.email(),
      password: this.user.password(),
      photo: "placeholder"
    }
    const url: string = "http://127.0.0.1:8080/users"
    if(this.user.password() === this.user.confirmPassword()){
      this.http.post(url, body).subscribe({
        next: (res) =>{
          console.log("Usuario registrado", res)
        },
        error: (err) =>{
          console.log("Error: ", err)
        }
      });
    }else{
      console.log("Contraseña incorrecta");
    }
   }
 }
