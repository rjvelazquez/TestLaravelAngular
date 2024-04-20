// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/edit/:id', component: CourseEditComponent },
  { path: 'courses/new', component: CourseEditComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'students/edit/:id', component: StudentEditComponent },
  { path: 'students/new', component: StudentEditComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
