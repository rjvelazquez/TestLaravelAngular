import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { environment } from '../../../env';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string;

  constructor(private userService: UserService) {
    this.username = '';
  }

  ngOnInit() {
    this.userService.getUsername().subscribe(username => {
      this.username = username;
    });
  }

  getWelcomeMessage() {
    return `Welcome, ${this.username}!`;
  }
}