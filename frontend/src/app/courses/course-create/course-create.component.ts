import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../env';
import { Router } from '@angular/router';

declare var $: any;  // Declara la variable jQuery


@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  @Output() courseCreated = new EventEmitter<void>();

  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.courseForm = this.fb.group({
      nombre: ['', Validators.required],
      horario: [''],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;
      const token = localStorage.getItem('authToken'); 
      const headers = { 'Authorization': 'Bearer ' + token };
      const url = `${environment.apiUrl}/cursos`;

      this.http.post(url, formData, { headers })
        .subscribe(
          response => {
            alert('Curso creado exitosamente');
            this.courseForm.reset();
            this.courseCreated.emit();  // Emite el evento  

            $('#fromCreateCourse').modal('hide');
            // resetea el formulario
            this.courseForm.reset();
            


          },
          error => {
            alert('Error al crear curso');
            console.error('Error al crear curso:', error);
          }
        );
    } else {
      console.log('Formulario inválido');
    }
  }
}