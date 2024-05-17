// auth.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserType, Users } from './models/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAdmin = false;
  private url = 'http://localhost:3333/api/login';
  private currentUser: Users | null = null;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userTypeSubject = new BehaviorSubject<UserType | null>(null);
  
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  userType$ = this.userTypeSubject.asObservable();

  private readonly STORAGE_KEY = 'authState';

  constructor(private httpClient: HttpClient) {
    // Load authentication state from localStorage on service initialization
    const storedAuthState = localStorage.getItem(this.STORAGE_KEY);
    this.isAuthenticatedSubject.next(storedAuthState === 'true');
  }

  login(email: string, password: string): Observable<UserType> {
    const body = { email, password };

    return this.httpClient.post<UserType>(`${this.url}`, body).pipe(
      tap(
        (userType: UserType) => {
          if (userType) {
            console.log('Login successful. User type:', userType);
            this.isAuthenticatedSubject.next(true);
            this.userTypeSubject.next(userType); // Notify subscribers about the user type

            // Persist authentication state to localStorage
            localStorage.setItem(this.STORAGE_KEY, 'true');
          } else {
            console.error('Authentication failed.');
          }
        },
        catchError((error) => {
          console.error('Login failed:', error);
          return of(null);
        })
      )
    );
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    this.isAdmin = false;
    this.userTypeSubject.next(null); // Clear the user type
    localStorage.removeItem(this.STORAGE_KEY);

    return of(true);
  }

  isAdminUser() {
    return this.isAdmin;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getUserType(): Observable<UserType | null> {
    return this.userTypeSubject.asObservable();
  }
}
