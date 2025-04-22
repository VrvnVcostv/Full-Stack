import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserDTO } from '../interfaces/DTO/userDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ accessToken: string, refreshToken: string }>(
      'http://localhost:8080/auth/login',
      { email, password }
    ).pipe(
      map(response => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        return response;
      })
    );
  }

  register(user: UserDTO): Observable<any> {
    return this.http.post<{ accessToken: string, refreshToken: string }>(
      'http://localhost:8080/auth/register',
      user
    ).pipe(
      map(response => {
        console.log(response.accessToken);
        console.log(response.refreshToken);
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        return response;
      })
    );
  }
}
