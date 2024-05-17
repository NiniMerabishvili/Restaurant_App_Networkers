import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  isUserSignedIn: boolean = false;
  isLandingPage(): boolean {
    return this.activatedRoute.snapshot.routeConfig?.path === 'landing-page';
  }

  navigateToRegistration() {
    this.router.navigate(['registration']);
  }

  navigateToSignIn() {
    this.router.navigate(['sign-in']);
  }
  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isUserSignedIn = isAuthenticated;
    });
  }

  
}
