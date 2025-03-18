import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${environment.apiUrl}/users`;
  public currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

  login(userData: any): Observable<User | null> {
    return this.http.post<any>(`${this.authUrl}/login`, userData, { withCredentials: true })
      .pipe(
        // After a successful POST, call /me to retrieve the user
        switchMap(() => this.getCurrentUser()),
        tap(user => {
          console.log('Fetched user:', user);
          this.currentUser$.next(user);
        }),
        map(user => {
          if (!user) {
            throw new Error('No user found');
          }
          return user;
        })
      );
  }

  initializeUserState(): Observable<User | null> {
    return this.getCurrentUser().pipe(
      tap(user => {
        this.currentUser$.next(user);
      })
    );
  }
  

  getCurrentUser(): Observable<User | null> {
    return this.http.get<User>(`${this.authUrl}/me`, { withCredentials: true })
      .pipe(
        catchError(error => {
          console.error('Error fetching current user:', error);
          return of(null);
        })
      );
  }  

  logout(): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/logout`, null, { withCredentials: true });
  }
}