import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../env';
import { Router } from '@angular/router';


  interface Course {
    id: number;
    nombre: string;
  }

  interface ApiResponse {
    data: {
      id: number;
      nombre: string;
      apellido: string;
      edad: number;
      cedula: string;
      email: string;
      created_at: string;
      updated_at: string;
    };
  }

  interface StudentResponse {
    data: {
      id: number;  // ID del estudiante, necesario para asignar cursos
    };
  }

declare var $: any;  // Declara la variable jQuery


@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  @Output() studentCreated = new EventEmitter<void>();

  private apiUrl = `${environment.apiUrl}`;  
  studentForm: FormGroup;
  cursos: Course[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.studentForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: [''],
      edad: ['', [Validators.required, Validators.min(1)]],
      cedula: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      curso: this.fb.array([]),  // Cambia a FormArray
    });
  }

  


  ngOnInit() {
    this.getCursos();  // Obtiene los cursos cuando se inicializa el componente
  }

  getCursos() {
    const token = localStorage.getItem('authToken'); 
    const headers = { 'Authorization': 'Bearer ' + token };
    this.http.get<Course[]>(`${this.apiUrl}/cursos`, { headers })
      .subscribe(
        response => {
          this.cursos = response;
          this.setupCursosFormArray();  // Configura el FormArray con los cursos obtenidos
        },
        error => {
          console.error('Error al obtener los cursos:', error);
        }
      );
  }
  onSubmit() {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;
      const token = localStorage.getItem('authToken'); 
      const headers = { 'Authorization': 'Bearer ' + token };
      const url = `${this.apiUrl}/estudiantes`;
  
      this.http.post<StudentResponse>(url, formData, { headers })
        .subscribe(
          response => {
            alert('Estudiante creado exitosamente');
            // Ahora se cierra el modal
            
            // Asigna los cursos al estudiante
            const studentId = response.data.id;  // This is the correct field for the student's id
            const courses = formData.curso;
            this.assignCoursesToStudent(studentId, courses);
            // Se actualiza el listado de estudiantes en el componente padre
            this.studentCreated.emit();  // Emite el evento
            $('#fromCreateStudent').modal('hide');

            this.resetFormAndCourses();  // Resetea el formulario y los cursos
            this.getCursos();  // Obtiene los cursos cuando se inicializa el componente


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


  
  onCursoChange(id: number, event: any) {
    const cursoArray = this.studentForm.get('curso') as FormArray;

    if (event.target.checked) {
      cursoArray.push(this.fb.control(id));
    } else {
      let i: number = 0;
      cursoArray.controls.forEach((item: AbstractControl) => {
        if (item.value == id) {
          cursoArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  assignCoursesToStudent(studentId: number, courses: number[]) {
    const token = localStorage.getItem('authToken'); 
    const headers = { 'Authorization': 'Bearer ' + token };
  
    courses.forEach(courseId => {
      const url = `${this.apiUrl}/cursos/${courseId}/estudiantes/${studentId}`;
  
      this.http.post(url, {}, { headers })
        .subscribe(
          response => {
            //console.log(`Curso ${courseId} asignado exitosamente al estudiante ${studentId}:`, response);
          },
          error => {
            console.error(`Error al asignar el curso ${courseId} al estudiante ${studentId}:`, error);
          }
        );
    });
  }
  resetFormAndCourses() {
    // Resetea el formulario completamente
    this.studentForm.reset();
  
    // Obtiene el FormArray y lo limpia
    const cursoArray = this.studentForm.get('curso') as FormArray;
    cursoArray.clear();  // Esto remueve todos los FormControl del array
  
    // Alternativamente, puedes reconstruir el curso array si planeas agregar nuevos cursos inmediatamente después
    this.studentForm.setControl('curso', this.fb.array([]));
  }

  
  setupCursosFormArray() {
    const cursoArray = this.studentForm.get('curso') as FormArray;
    this.cursos.forEach(() => {
      cursoArray.push(new FormControl(false));  // Inicialmente todos desmarcados
    });
  }
  
}