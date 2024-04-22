import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../env';

interface Course {
  id: number;
  nombre: string;
}

interface ApiResponse {
  data: Course;
}

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit, OnDestroy {
  @Input() courseId!: number;
  @Output() courseUpdated = new EventEmitter<void>();
  private apiUrl = `${environment.apiUrl}`;
  courseForm: FormGroup;
  routeSub!: Subscription;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.courseForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.loadCourse();
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  loadCourse() {
    const token = localStorage.getItem('authToken'); 
    const headers = { 'Authorization': 'Bearer ' + token };
    const url = `${this.apiUrl}/cursos/${this.courseId}`;

    this.http.get<ApiResponse>(url, { headers })
      .subscribe(
        response => {
          this.courseForm.patchValue({
            nombre: response.data.nombre
          });
        },
        error => {
          if (error.status === 401) {
            alert('Your session has expired. Please log in again.');
            localStorage.removeItem('authToken');
            location.reload();
          }
        }
      );
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;
      const token = localStorage.getItem('authToken'); 
      const headers = { 'Authorization': 'Bearer ' + token };
      const url = `${this.apiUrl}/cursos/${this.courseId}`;

      this.http.put<Course>(url, formData, { headers })
        .subscribe(
          response => {
            alert('Course updated successfully');
            this.courseUpdated.emit();
          },
          error => {
            alert('Error updating course');
          }
        );
    } else {
      console.log('Invalid form');
    }
  }
}