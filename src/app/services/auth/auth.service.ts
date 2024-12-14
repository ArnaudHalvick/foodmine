import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, throwError } from 'rxjs'; // Import 'from'
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  login(credentials: any): Observable<any> {
    return from(
      this.afAuth.signInWithEmailAndPassword(
        credentials.username,
        credentials.password
      )
    ).pipe(
      map(response => response.user),
      catchError(this.handleError)
    );
  }

  signup(user: any): Observable<any> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    ).pipe(catchError(this.handleError));
  }

  logout(): Observable<void> {
    // Return Observable<void> for logout
    return from(this.afAuth.signOut()).pipe(catchError(this.handleError));
  }

  // Handle errors
  private handleError(error: any) {
    console.error('Auth error:', error);
    return throwError(() => new Error(error.message)); // Use throwError with a factory function
  }
}
