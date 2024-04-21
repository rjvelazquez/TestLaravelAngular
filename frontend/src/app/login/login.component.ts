// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service'; // Import the user service to handle user data


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.warn(this.loginForm.value);

    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
  
      
      if (loginData.email && loginData.password) {
        
        console.log('Iniciando sesión...');
        console.log('Datos de inicio de sesión enviados:');
        console.log(loginData);
        this.userService.login(loginData.email, loginData.password)  // Use UserService to login
          .subscribe(
            response => {
              // Manejar respuesta exitosa
              alert('Inicio de sesión exitoso');
              // Redireccionar al dashboard
              window.location.href = '/dashboard';
              console.log('Inicio de sesión exitoso:', response);
            },
            error => {
              // Manejar errores de autenticación
              const errorMessage = error.error ? error.error.message : 'Error desconocido'; // Get the error message from the API response
              alert('Error en el inicio de sesión: ' + errorMessage); // Display the error message
              console.error('Error en el inicio de sesión:', error);
            }
          );
        } else {
          console.log('Correo electrónico o contraseña inválidos');
        }
    } else {
      console.log('Formulario inválido');
    }
  }
}
