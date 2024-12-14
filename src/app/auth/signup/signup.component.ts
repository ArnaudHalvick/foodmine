import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface User {
  name: string;
  email: string;
  username: string;
  password?: string; // Password is optional for display but required for signup
}

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user: User = {
    name: '',
    email: '',
    username: '',
    password: '',
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup(this.user).subscribe({
      next: response => {
        console.log('Signup successful', response);
        this.errorMessage = null;
        this.router.navigate(['/login']); // Redirect to login after successful signup
      },
      error: error => {
        console.error('Signup failed', error);
        this.errorMessage = 'Signup failed. Please check your information.'; // More specific error handling would be ideal
        if (error?.error?.message) {
          this.errorMessage = error.error.message;
        }
      },
    });
  }
}
