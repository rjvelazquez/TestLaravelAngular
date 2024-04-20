import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; // Para obtener parámetros de ruta
import { environment } from '../../../../env'; // Importa el entorno

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentForm: FormGroup;
  studentId: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute  // Para obtener el ID del estudiante
  ) {
    this.studentForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: [''],
      edad: ['', [Validators.required, Validators.min(1)]],
      cedula: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    // Obtener el ID del estudiante de la ruta
    this.studentId = this.route.snapshot.params['id'];
    
    // Cargar los datos del estudiante existente
    const url = `${environment.apiUrl}/students/${this.studentId}`;
    this.http.get(url)
      .subscribe(
        (data: any) => {
          // Cargar datos en el formulario
          this.studentForm.patchValue(data);
        },
        error => {
          console.error('Error al cargar estudiante:', error);
        }
      );
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;
      const url = `${environment.apiUrl}/students/${this.studentId}`;

      this.http.put(url, formData)  // Actualizar estudiante
        .subscribe(
          response => {
            alert('Estudiante actualizado exitosamente');
            console.log('Estudiante actualizado exitosamente:', response);
          },
          error => {
            alert('Error al actualizar estudiante');
            console.error('Error al actualizar estudiante:', error);
          }
        );
    } else {
      console.log('Formulario inválido');
    }
  }
}
