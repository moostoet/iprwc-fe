import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          console.log("user exists now")
          return of(true);
        }

        return this.authService.getCurrentUser().pipe(
          map(fetchedUser => {
            if (fetchedUser) {
              this.authService.currentUser$.next(fetchedUser);
              return true;
            }
            this.router.navigate(['/login']);
            return false;
          })
        );
      })
    );
  }
}