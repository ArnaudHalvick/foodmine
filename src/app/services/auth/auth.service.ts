import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user));

  login(credentials: { username: string; password: string }): Promise<any> {
    return signInWithEmailAndPassword(
      this.auth,
      credentials.username,
      credentials.password
    );
  }

  signup(user: { email: string; password: string }): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
