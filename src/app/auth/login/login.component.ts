import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

interface Credentials {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [FormsModule],
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
    this.authService.login(this.credentials).subscribe({
      next: user => {
        console.log('Login successful', user);
        this.errorMessage = null;
        this.router.navigate(['/dashboard']); // Redirect to protected route
      },
      error: error => {
        console.error('Login failed', error);
        this.errorMessage = error.message; // Display more specific error message
      },
    });
  }
}
