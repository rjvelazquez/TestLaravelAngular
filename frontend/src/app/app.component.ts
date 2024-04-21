import { Component } from '@angular/core';
import { UserService } from './user.service';

        @Component({
          selector: 'app-root',
          templateUrl: './app.component.html',
          styleUrl: './app.component.css'
        })
        export class AppComponent {
          constructor(public userService: UserService) { }  // Inyecta UserService

          title = 'Test Laravel Angular';
         
        }