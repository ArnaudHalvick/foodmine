import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { getAuth, validatePassword } from 'firebase/auth';

interface User {
  name: string;
  email: string;
  username: string;
  password: string;
}

interface PasswordRequirement {
  label: string;
  check: (password: string) => boolean;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    username: '',
    password: '',
  };
  errorMessage: string | null = null;
  passwordRequirements: PasswordRequirement[] = [
    {
      label: 'At least 6 characters long',
      check: password => password.length >= 6,
    },
    {
      label: 'Contains lowercase letter',
      check: password => /[a-z]/.test(password),
    },
    {
      label: 'Contains uppercase letter',
      check: password => /[A-Z]/.test(password),
    },
    {
      label: 'Contains numeric character',
      check: password => /[0-9]/.test(password),
    },
    {
      label: 'Contains special character (^$*.[]{}()?"!@#%&/\\,><\':;|_~)',
      check: password => /[^a-zA-Z0-9]/.test(password),
    },
  ];
  passwordValidationErrors: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Optional: You can add additional initialization if needed
  }

  validatePasswordRequirements(password: string): boolean {
    this.passwordValidationErrors = this.passwordRequirements
      .filter(req => !req.check(password))
      .map(req => req.label);

    return this.passwordValidationErrors.length === 0;
  }

  async signup() {
    // First, validate password requirements
    if (!this.validatePasswordRequirements(this.user.password)) {
      return;
    }

    try {
      // Optional: Add Firebase password validation
      const auth = getAuth();
      const status = await validatePassword(auth, this.user.password);

      if (!status.isValid) {
        // Additional Firebase-specific validation
        this.errorMessage = 'Password does not meet Firebase requirements.';
        return;
      }

      // Proceed with signup
      await this.authService.signup({
        email: this.user.email,
        password: this.user.password,
      });

      this.errorMessage = null;
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
