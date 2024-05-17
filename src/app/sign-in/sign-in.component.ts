import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { RegistrationService } from '../shared/services/registration.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loginFailed = false;
  isSignedIn = false;
  email: string = '';
  password: string = '';


  constructor(
    private authService: AuthService,
    private registrationService: RegistrationService,
    private router: Router
  ) {}


 signIn() {
    this.authService.login(this.email, this.password).subscribe(
      userType => {
        console.log('Authentication successful. User type:', userType);
        this.isSignedIn = true;
        if (userType == "ADMIN") {
        this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/customer']);
        }
      },
      error => {
        console.error('Authentication failed:', error);
        this.loginFailed = true;
      }
    );
  }

  ngOnInit(): void {}
}