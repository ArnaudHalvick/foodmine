import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, of, switchMap, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState.pipe(
      map(user => (user ? user : null)) // Ensure consistent null value
    );
  }

  login(credentials: any): Observable<firebase.User | null> {
    return from(
      this.afAuth.signInWithEmailAndPassword(
        credentials.username,
        credentials.password
      )
    ).pipe(
      switchMap(userCredential => of(userCredential.user)), // Extract user or return null
      catchError(this.handleError)
    );
  }

  signup(user: any): Observable<firebase.User | null> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    ).pipe(
      switchMap(userCredential => of(userCredential.user)), // Extract user or return null
      catchError(this.handleError)
    );
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut()).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Auth error:', error);
    return throwError(() => new Error(error.message));
  }
}
