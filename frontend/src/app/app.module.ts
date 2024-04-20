import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Asegúrate de que la ruta al módulo de rutas es correcta

// Importa los componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { AdminComponent } from './admin/admin.component';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentCreateComponent } from './students/student-create/student-create.component'; // Importa el módulo de HTTP



@NgModule({
    declarations: [
      AppComponent,
      AdminComponent,
      StudentsComponent,
      CoursesComponent,
      StudentCreateComponent,      
      StudentListComponent,
      StudentEditComponent,
    ], 
    imports: [
      BrowserModule,
      LoginComponent,            // Importa el componente de inicio de sesión
      DashboardComponent,       // Importa el componente de tablero
      CourseListComponent,      // Importa el componente de lista de cursos
      CourseEditComponent,      // Importa el componente de edición de cursos
      AppRoutingModule,          // Importa el módulo de enrutamiento
      ReactiveFormsModule,        // Importa el módulo de formularios reactivos
      HttpClientModule,          // Importa el módulo de HTTP
    ],
    providers: [],
    bootstrap: [AppComponent]   // El componente raíz
  })
  export class AppModule { }



