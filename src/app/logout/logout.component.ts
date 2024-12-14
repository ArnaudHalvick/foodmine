import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.logout();
  }

  logout(): void {
    this.authService
      .logout()
      .then(() => {
        // Redirect to login or home page after successful logout
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Logout failed', error);
      });
  }
}
