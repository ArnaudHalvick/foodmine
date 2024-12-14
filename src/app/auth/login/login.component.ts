// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

interface Credentials {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Create a CSS file for styling
})
export class LoginComponent {
  credentials: Credentials = {
    username: '',
    password: '',
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: response => {
        // Handle successful login (e.g., store token, redirect)
        console.log('Login successful', response);
        this.errorMessage = null;
        this.router.navigate(['/']); // Navigate to a protected route
      },
      error: error => {
        // Handle login error
        console.error('Login failed', error);
        this.errorMessage = 'Invalid username or password.'; // Or a more specific message
      },
    });
  }
}
