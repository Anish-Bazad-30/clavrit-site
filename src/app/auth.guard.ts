import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!sessionStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
      this.router.navigate(['/admin']); // Redirect to login page
      return false;
    }

    return true;
  }
}
