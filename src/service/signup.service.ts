import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  // Change the URL as needed.
  private registerUrl = `${environment.apiUrl}/api/users/register`;

  constructor(private http: HttpClient) {}

  // Register a new user by posting the signup data
  register(userData: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, userData);
  }
}