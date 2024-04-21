import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../env';  // Importa el entorno

declare var $: any;  // Declara la variable jQuery

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  private apiUrl = `${environment.apiUrl}`;  // Replace with your API URL

  students: any[] = [];  // Para permitir cualquier tipo de objeto en el array
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStudents();
  }
  loadStudents() {
    const token = localStorage.getItem('authToken'); 
    const headers = { 'Authorization': 'Bearer ' + token };
    const url = `${this.apiUrl}/estudiantes`;  // URL de la API
    
    this.http.get(url, { headers })
      .subscribe(
        (response: any) => {
          if (response.data && Array.isArray(response.data)) {
            this.students = response.data;
            console.log('Estudiantes cargados:', this.students);
  
            // Cargar los cursos para cada estudiante
            for (let student of this.students) {
              this.loadCoursesForStudent(student, headers);
            }
          } else {
            console.error('Error: la respuesta no contiene un array de estudiantes');
          }
        },
        error => {
          console.error('Error al cargar estudiantes:', error);
        }
      );
  }
  
  loadCoursesForStudent(student: any, headers: any) {
    const url = `${this.apiUrl}/estudiantes/${student.id}`;
  
    this.http.get(url, { headers })
    .subscribe(
    (response: any) => {
      if (response.data && Array.isArray(response.data.cursos)) {
        student.courses = response.data.cursos;
        console.log(`Cursos cargados para el estudiante ${student.id}:`, student.courses);
      } else {
        console.error(`Error: la respuesta para el estudiante ${student.id} no contiene un array de cursos`);
      }
    },
    error => {
      console.error(`Error al cargar cursos para el estudiante ${student.id}:`, error);
    }
  );
  }

  createStudent() {
    $('#fromCreateStudent').modal('show');    
  }
  
  editStudent(id: number) {
    // Implementa la lógica para editar el estudiante con el ID dado
  }
  
  deleteStudent(id: number) {
    const token = localStorage.getItem('authToken'); 
    const headers = { 'Authorization': 'Bearer ' + token };
    const url = `${this.apiUrl}/estudiantes`;  // URL de la API

    this.http.delete(`${url}/${id}`, { headers })
      .subscribe(
        (response: any) => {
          alert('Estudiante eliminado correctamente');
          console.log('Estudiante eliminado:', response);
          this.loadStudents();
        },
        error => {
          console.error('Error al eliminar estudiante:', error);
          alert('Error al eliminar estudiante');
        }
      );

  }
}
