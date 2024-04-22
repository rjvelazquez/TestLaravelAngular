import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../env';
import { jwtDecode } from 'jwt-decode';

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
          const expirationDate = this.getTokenExpirationDate(response.token);
          if (expirationDate) {
              localStorage.setItem('tokenExpirationDate', expirationDate.toString());
          } else {
            console.error('No se pudo obtener la fecha de expiración del token');
          }
        }
      }));
  }

  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
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
  getTotalCourses(): Observable<number> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token not found');
    }
  
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.http.get<any[]>(`${this.apiUrl}/cursos`, { headers })
      .pipe(
        map(response => response.length)
      );
  }
  
  getTotalStudents(): Observable<number> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token not found');
    }
  
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.http.get<{ data: any[] }>(`${this.apiUrl}/estudiantes`, { headers })
    .pipe(
      map(response => response.data.length)
    );
  }

  getTopCourses(): Observable<{ name: string, studentCount: number }[]> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token not found');
    }
  
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.http.get<{ cursos: { nombre: string, numero_de_estudiantes: number }[] }>(`${this.apiUrl}/cursoEstudiantes`, { headers })
      .pipe(
        map(response => response.cursos.map(curso => ({
          name: curso.nombre,
          studentCount: curso.numero_de_estudiantes
        })))
      );
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded: any = jwtDecode(token);
    
    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }
  
    const date = this.getTokenExpirationDate(token);
    if (!date) {  // Verifica que date no sea null
      return true;
    }
    return !(date.valueOf() > new Date().valueOf());
  }
}