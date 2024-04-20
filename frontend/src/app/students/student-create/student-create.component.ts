import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../env'; // Importa el entorno

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.studentForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: [''],
      edad: ['', [Validators.required, Validators.min(1)]],
      cedula: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;
      const url = `${environment.apiUrl}/students`;

      this.http.post(url, formData)
        .subscribe(
          response => {
            alert('Estudiante creado exitosamente');
            console.log('Estudiante creado exitosamente:', response);
          },
          error => {
            alert('Error al crear estudiante');
            console.error('Error al crear estudiante:', error);
          }
        );
    } else {
      console.log('Formulario inválido');
    }
  }
}
