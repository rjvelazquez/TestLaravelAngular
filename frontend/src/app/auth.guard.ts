// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const isLoggedIn = !!localStorage.getItem('userToken');  // Verifica si el usuario está logueado
      if (!isLoggedIn) {
        this.router.navigate(['/login']);  // Redirige al login si no está autenticado
        return false;
      }
      return true;
    }
}
