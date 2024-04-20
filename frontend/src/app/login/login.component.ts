import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      const url = `${environment.apiUrl}/login`;  // URL de la API para autenticación

      this.http.post(url, loginData)
        .subscribe(
          response => {
            // Manejar respuesta exitosa
            alert('Inicio de sesión exitoso');
            console.log('Inicio de sesión exitoso:', response);
          },
          error => {
            // Manejar errores de autenticación
            alert('Error en el inicio de sesión');
            console.error('Error en el inicio de sesión:', error);
          }
        );
    } else {
      console.log('Formulario inválido');
    }
  }
}
