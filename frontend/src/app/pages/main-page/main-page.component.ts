import { Component, input, InputSignal, signal } from '@angular/core';
import { UserDTO } from '../../interfaces/DTO/userDTO';
import { UserService } from '../../services/Singletons/userService';

@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {

  userData!: UserDTO;

  constructor(private userService: UserService) {
    const user = this.userService.getUser();
    if (!user) {return;}
    this.userData = user;
  }

}
