import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../env';  // Importa el entorno

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];  // Para permitir cualquier tipo de objeto en el array
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStudents();
  }


  loadStudents() {
    const url = `${environment.apiUrl}/students`;
    this.http.get(url)
      .subscribe(
        data => {
          this.students = data as any[];
          console.log('Estudiantes cargados:', this.students);
        },
        error => {
          console.error('Error al cargar estudiantes:', error);
        }
      );
  }
}
