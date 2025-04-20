import { Component, signal } from '@angular/core';
import { User } from '../../../interfaces/user';
import { InputBoxComponent } from '../../input-box/input-box.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'login-form-box',
  imports: [InputBoxComponent, FormsModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
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
