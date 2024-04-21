import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';  // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-logout',
  template: `Logging out...`
})
export class LogoutComponent implements OnInit {
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.logout();
    window.location.href = '/login';
    // Aquí puedes redirigir al usuario a la página de inicio de sesión o hacer cualquier otra limpieza necesaria
  }
}