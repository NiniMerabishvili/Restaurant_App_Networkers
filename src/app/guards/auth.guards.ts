// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { AuthService } from '../shared/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     const currentUser = this.authService.currentUserValue;
//     if (currentUser) {
//       // Check user role and navigate accordingly
//       if (currentUser.role === 'admin') {
//         this.router.navigate(['/admin-dashboard']);
//       } else if (currentUser.role === 'customer') {
//         this.router.navigate(['/customer-dashboard']);
//       }
//       return true;
//     }

//     // Not logged in, redirect to login page
//     this.router.navigate(['/sign-in']);
//     return false;
//   }
// }
