import { Component } from '@angular/core';

        @Component({
          selector: 'app-root',
          templateUrl: './app.component.html',
          styleUrl: './app.component.css'
        })
        export class AppComponent {
          title = 'Test Laravel Angular';
          isAuthenticated(): boolean {
            const token = localStorage.getItem('authToken');
            return !!token;
          }        
        }