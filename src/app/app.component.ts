import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'social-media-frontend';

  constructor(private router: Router,private authService: AuthService) { }
  
  ngOnInit() {
    // this.router.navigate(['/main-page']);
    
  }
}
