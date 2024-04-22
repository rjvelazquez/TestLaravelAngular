import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient, HttpBackend, HttpXhrBackend, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { CommonModule } from '@angular/common';



// Import components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseCreateComponent } from './courses/course-create/course-create.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { AdminComponent } from './admin/admin.component';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentCreateComponent } from './students/student-create/student-create.component';
import { LogoutComponent } from './logout/logout.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    StudentsComponent,
    CoursesComponent,
    StudentCreateComponent,      
    StudentListComponent,
    StudentEditComponent,
    LoginComponent,
    LogoutComponent,
    CourseCreateComponent,
    CourseListComponent,
    // Import CourseEditComponent instead of declaring it
    CourseEditComponent,

  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,          // Import routing module
    ReactiveFormsModule,        // Import reactive forms module
    HttpClientModule,          // Import HTTP client module
    CommonModule,

  ],
  providers: [
    HttpClient,
    { provide: HttpClient, deps: [HttpBackend, HttpXhrBackend] },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    
  ],
  bootstrap: [AppComponent]   // Root component
})
export class AppModule { }