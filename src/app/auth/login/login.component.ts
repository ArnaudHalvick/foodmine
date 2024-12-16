import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

interface Credentials {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials: Credentials = {
    username: '',
    password: '',
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService
      .login({
        username: this.credentials.username,
        password: this.credentials.password,
      })
      .then(() => {
        this.errorMessage = null;
        this.router.navigate(['/']); // Redirect to protected route
      })
      .catch(error => {
        this.errorMessage = error.message; // Display more specific error message
      });
  }
}
