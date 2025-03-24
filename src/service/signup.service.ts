import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private registerUrl = `${environment.apiUrl}/users/register`;

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, userData);
  }
}