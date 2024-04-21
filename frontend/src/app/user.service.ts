import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../env';

interface UserResponse {
    user: {
      id: number;
      name: string;
      email: string;
      email_verified_at: string;
      created_at: string;
      updated_at: string;
    };
  }

  @Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private apiUrl = `${environment.apiUrl}`;  // Replace with your API URL

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
      return this.http.post<{token: string}>(`${this.apiUrl}/login`, {email, password})
        .pipe(tap(response => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }
        }));
    }
    logout() {
      localStorage.removeItem('authToken');
    }
    
    getUsername(): Observable<string> {
      const token = localStorage.getItem('authToken'); // Replace 'token' with the key you used to store the token
      if (!token) {
        throw new Error('Token not found');
      }
    
      const headers = { 'Authorization': 'Bearer ' + token };
      return this.http.get<UserResponse>(`${this.apiUrl}/user`, { headers })
        .pipe(
          map(response => response.user.name)
        );
    }
}