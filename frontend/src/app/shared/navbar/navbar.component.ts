import { Component, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../interfaces/DTO/userDTO.interface';

@Component({
  selector: 'navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  userInfo!: UserDTO;

  constructor(private routes: Router, private auth: AuthService) {
    this.auth.getCurrentUser().subscribe({
      next: (res: UserDTO) => {
        console.log(res.email);
        console.log(res.password);
        console.log(res.photo);
        console.log(res.username);
        this.userInfo = res
      }
    })
    console.log(this.userInfo);
  }


}
