import { Component, signal } from '@angular/core';
import { InputBoxComponent } from '../../input-box/input-box.component';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'register-form-box',
  imports: [InputBoxComponent],
  templateUrl: './register-form-box.component.html',
})
export class RegisterFormBoxComponent {
    user: User = {
      username: signal(''),
      email: signal(''),
      password: signal(''),
      confirmPassword: signal('')
    };

   onSubmit(){
    if(this.user.password() === this.user.confirmPassword()){
      console.log(this.user.email());
      console.log(this.user.username());
      console.log(this.user.password());
    }else{
      console.log("Contraseña incorrecta");
    }
   }
 }
