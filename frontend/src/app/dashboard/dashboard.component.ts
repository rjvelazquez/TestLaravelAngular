import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { environment } from '../../../env';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  topCourses: { name: string, studentCount: number }[];

  username: string;
  totalCourses: number;
  totalStudents: number;
  totalTeachers: number;

  constructor(private userService: UserService) {
    this.username = '';
    this.totalCourses = 0;
    this.totalStudents = 0;
    this.totalTeachers = 0;
    this.topCourses = [];

  }

  ngOnInit() {
    this.userService.getUsername().subscribe(username => {
      this.username = username;
    });

    this.userService.getTotalCourses().subscribe(totalCourses => {
      this.totalCourses = totalCourses;
    });

    this.userService.getTotalStudents().subscribe(totalStudents => {
      this.totalStudents = totalStudents;
    });

    this.userService.getTopCourses().subscribe(topCourses => {
      this.topCourses = topCourses;
    }, error => {
      console.error('Error fetching top courses:', error);
    });

  }

  getWelcomeMessage() {
    return `Welcome, ${this.username}!`;
  }
}