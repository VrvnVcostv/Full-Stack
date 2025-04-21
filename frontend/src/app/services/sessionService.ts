import { computed, Injectable, signal } from "@angular/core";
import { UserDTO } from "../interfaces/DTO/userDTO";

@Injectable({ providedIn: 'root' })
export class SessionService {
  private user = signal<UserDTO | null>(null);

  constructor() {
    const saved = localStorage.getItem('user');
    if (saved) this.user.set(JSON.parse(saved));
  }

  setUser(user: UserDTO) {
    this.user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clear() {
    this.user.set(null);
    localStorage.removeItem('user');
  }

  getUser = this.user.asReadonly();
  isLoggedIn = computed(() => !!this.user());
}
