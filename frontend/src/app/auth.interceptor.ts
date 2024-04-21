import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const authToken = this.getAuthenticationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    // send cloned request with header to the next handler.
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {  // Si el status es 401 (no autorizado), la sesión ha expirado
            this.router.navigate(['/login']);  // Redirige al usuario al login
          }
          return throwError(error);
        })
      );
    }

  getAuthenticationToken() {
    if (typeof window !== 'undefined') {
      // We are in the browser, it is safe to access localStorage
      return localStorage.getItem('authToken');
    }
    // We are on the server, return a default value
    return null;
  }
}