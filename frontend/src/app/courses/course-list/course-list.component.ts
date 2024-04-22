import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../env';  // Importa el entorno

declare var $: any;  // Declara la variable jQuery

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  private apiUrl = `${environment.apiUrl}`;  // Replace with your API URL

  courses: any[] = [];  // Para permitir cualquier tipo de objeto en el array
  selectedCourseId: number = 0;  // Initialize the 'selectedCourseId' property
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCourses();
  }

  onCourseCreated() {
    this.loadCourses();
  }

  loadCourses() {
    const token = localStorage.getItem('authToken'); 
    const headers = { 'Authorization': 'Bearer ' + token };
    const url = `${this.apiUrl}/cursos`;  // URL de la API
    
    this.http.get(url, { headers })
      .subscribe(
        (response: any) => {
          console.log('Respuesta:', response);
          if (response && Array.isArray(response)) {
            this.courses = response;
            console.log('Cursos cargados:', this.courses);
          } else {
            console.error('Error: la respuesta no contiene un array de cursos');
          }
        },
        error => {
          console.error('Error al cargar cursos:', error);
          // Si el servidor devuelve un error 401 Unauthorized, redirige al usuario a la página de inicio de sesión
          if (error.status === 401) {
            alert('Su sesión ha expirado. Por favor, inicie sesión de nuevo.');
            localStorage.removeItem('authToken');
            location.reload();
          }
        }
      );
  }

  createCourse() {
    $('#fromCreateCourse').modal('show');    
  }
  

  showEditCourse: boolean = false;

  editCourse(id: number) {
    this.selectedCourseId = id;
    this.showEditCourse = false;
  
    setTimeout(() => {
      this.showEditCourse = true;
      $('#fromEditCourse').modal('show');   
    });
  
    console.log('Editar curso:', id); 
  }
  
  deleteCourse(id: number) {
    const token = localStorage.getItem('authToken'); 
    const headers = { 'Authorization': 'Bearer ' + token };
    const url = `${this.apiUrl}/cursos`;  // URL de la API

    this.http.delete(`${url}/${id}`, { headers })
      .subscribe(
        (response: any) => {
          alert('Curso eliminado correctamente');
          console.log('Curso eliminado:', response);
          this.loadCourses();
        },
        error => {
          console.error('Error al eliminar curso:', error);
          alert('Error al eliminar curso');
        }
      );

  }
}