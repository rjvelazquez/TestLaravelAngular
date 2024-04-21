// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard'; // Import the missing AuthGuard class
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'courses', component: CourseListComponent, canActivate: [AuthGuard] }, // Use the imported AuthGuard class
  { path: 'courses/edit/:id', component: CourseEditComponent, canActivate: [AuthGuard]},
  { path: 'courses/new', component: CourseEditComponent, canActivate: [AuthGuard]},
  { path: 'students', component: StudentListComponent, canActivate: [AuthGuard]},
  { path: 'students/edit/:id', component: StudentEditComponent, canActivate: [AuthGuard]},
  { path: 'students/new', component: StudentEditComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/dashboard' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
