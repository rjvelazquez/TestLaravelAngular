import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  // Importa el cliente HTTP
import { environment } from '../../../env';  // Importa el entorno


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  adminForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      // Obtener la URL de la API desde el entorno
      const apiUrl = `${environment.apiUrl}/admin`;

      // Enviar datos al backend con una solicitud POST
      this.http.post(apiUrl, this.adminForm.value)
        .subscribe(
          response => {
            // Manejar respuesta exitosa
            alert('Formulario enviado exitosamente');
            console.log('Formulario enviado exitosamente', response);
          },
          error => {
            // Manejar errores
            alert('Error al enviar el formulario');
            console.error('Error al enviar el formulario', error);
          }
        );
    } else {
      console.log('Formulario inválido');
    }
  }
}

