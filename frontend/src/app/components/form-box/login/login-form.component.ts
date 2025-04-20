import { Component, signal } from '@angular/core';
import { User } from '../../../interfaces/user';
import { InputBoxComponent } from '../../input-box/input-box.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../../../interfaces/DTO/userDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form-box',
  imports: [InputBoxComponent, FormsModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {

  constructor(private http: HttpClient, private router: Router) { }

  user: User = {
    photo: signal(''),
    username: signal(''),
    email: signal(''),
    password: signal(''),
    confirmPassword: signal('')
  };

  onSubmit() {

    this.http.get<UserDTO[]>("http://localhost:8080/users").subscribe(
      {
        next: (res: UserDTO[]) => {
          res.forEach(
            us => {
              if(us.email !== this.user.email()){return};
              if(us.password !== this.user.password()){return};
              this.router.navigate(['/main']);
            }
          )
        }
      }
    )
  }
}
