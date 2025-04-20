import { Injectable, signal } from "@angular/core";
import { UserDTO } from "../../interfaces/DTO/userDTO";

@Injectable({ providedIn: 'root' })
export class UserService {
  private user = signal<UserDTO | null>(null);

  setUser(user: UserDTO) {
    this.user.set(user);
  }

  getUser() {
    return this.user();
  }

  userSignal = this.user;
}
