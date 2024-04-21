import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getAuthenticationToken();

    if (token) {
      const expirationDate = this.getTokenExpirationDate();
      if (expirationDate && new Date() > new Date(expirationDate)) {
        // Si el token ha expirado, redirige al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
        return throwError('Token has expired');
      }

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          // Si el servidor devuelve un error 401 Unauthorized, redirige al usuario a la página de inicio de sesión
          this.router.navigate(['/login']);
        }

        return throwError(err);
      })
    );
  }

  getAuthenticationToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  getTokenExpirationDate() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tokenExpirationDate');
    }
    return null;
  }
}