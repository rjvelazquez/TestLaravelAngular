import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'; // Add this import
import { environment } from '../../../../env'; // Importa el entorno
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';


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
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  @Output() studentUpdated = new EventEmitter<void>();
  @Input() studentId: number = 0; // Assign a default value to studentId

  private apiUrl = `${environment.apiUrl}`;  
  studentForm: FormGroup;
  cursos: Course[] = [];
  cursoArray: FormArray;  // Declare cursoArray
  
  
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) { // Inject ActivatedRoute
    this.studentForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: [''],
      edad: ['', [Validators.required, Validators.min(1)]],
      cedula: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      curso: this.fb.array([]),  // Change to FormArray
    });

    this.cursoArray = this.studentForm.get('curso') as FormArray;  // Initialize cursoArray
  }

  

  ngOnInit() {
    console.log('ID del estudiante:', this.studentId);
    this.studentId = +this.route.snapshot.params['id'];  // Use route instead of router
    this.getCursos();  // Get the courses when the component is initialized
    this.loadStudent();  // Load the existing student data
    console.log('ID del estudiante:', this.studentId);
  }

  

  loadStudent() {
    const url = `${this.apiUrl}/estudiantes/${this.studentId}`;
    this.http.get<ApiResponse>(url)
      .subscribe(
        response => {
          this.studentForm.patchValue({
            nombre: response.data.nombre,
            apellido: response.data.apellido,
            edad: response.data.edad,
            cedula: response.data.cedula,
            email: response.data.email
          }); // Patch the form with the student data
          console.log('Estudiante cargado:', response.data);
        },
        error => {
          console.error('Error al cargar estudiante:', error);
        }
      );
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;
      const token = localStorage.getItem('authToken'); 
      const headers = { 'Authorization': 'Bearer ' + token };
      const url = `${this.apiUrl}/estudiantes/${this.studentId}`;

      this.http.put<StudentResponse>(url, formData, { headers })  // Usa PUT para actualizar el estudiante
        .subscribe(
          response => {
            alert('Estudiante actualizado exitosamente');
            this.studentUpdated.emit();  // Emite el evento
            $('#fromEditStudent').modal('hide');  // Cierra el modal
            this.resetFormAndCourses();  // Resetea el formulario y los cursos
            this.getCursos();  // Obtiene los cursos cuando se inicializa el componente
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
            console.log(`Curso ${courseId} asignado exitosamente al estudiante ${studentId}:`, response);
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
