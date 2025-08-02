import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  forgotForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  isForgotPassword = false;
  otpSentMessage = '';
  dashboarddata: any;
  homedata: any;
  profileData: any;

  constructor(
    private fb: FormBuilder,
    private api: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      regid: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.forgotForm = this.fb.group({
      regid: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  Login(): void {
    if (this.loginForm.valid) {
      const payload = this.loginForm.value;
      this.isLoading = true;
      this.api.login(payload).subscribe({
        next: (res: any) => {
          this.dashboarddata=res
          console.log("profiledata:",this.dashboarddata);
          
          this.isLoading = false;
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/dashboard']);
          }
        },
        error: err => {
          this.isLoading = false;
          this.errorMessage = 'Login failed. Please check credentials.';
          console.error('Login error:', err);
        }
      });
    } else {
      this.errorMessage = 'Please fill all fields correctly.';
    }
  }

  sendOtp(): void {
    if (this.forgotForm.valid) {
      const payload = this.forgotForm.value;

      this.api.forgotPassword(payload).subscribe({
        next: (res: any) => {
          console.log('OTP sent:', res);
          this.otpSentMessage = 'OTP sent to your email.';
        },
        error: err => {
          this.otpSentMessage = 'Failed to send OTP. Please try again.';
          console.error('OTP error:', err);
        }
      });
    }
  }

  toggleForgotPassword() {
    this.isForgotPassword = true;
    this.errorMessage = '';
    this.otpSentMessage = '';
  }

  backToLogin() {
    this.isForgotPassword = false;
    this.otpSentMessage = '';
  }


}
