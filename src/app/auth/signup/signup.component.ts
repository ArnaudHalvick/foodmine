import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

interface User {
  name: string;
  email: string;
  username: string;
  password: string;
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
        this.router.navigate(['/login']); // Redirect to login after signup
      },
      error: error => {
        console.error('Signup failed', error);
        this.errorMessage = error.message; // More specific error handling would be ideal
        if (error?.error?.message) {
          this.errorMessage = error.error.message;
        }
      },
    });
  }
}
