
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../interfaces/DTO/userDTO';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  getAll(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.baseUrl);
  }

  getAllAsync(): Promise<UserDTO[]> {
    return firstValueFrom(this.getAll());
  }

  create(user: Partial<UserDTO>): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }

  update(id: number, user: Partial<UserDTO>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  emailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/users/exists/email?email=${email}`);
  }

  usernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/users/exists/username?username=${username}`);
  }

}
