import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';

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
    private api: AuthService,
    private router: Router,
    private token:TokenService,
    private user:UserService
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
      const { regid, password } = this.loginForm.value;
      this.isLoading = true;
  
      this.api.login(regid, password).subscribe({
        next: (res: any) => {
          this.isLoading = false;
  
          if (res.status === 1) {
            this.token.saveToken(res.token);
            this.token.saveUser({ role: res.usertype });
  
           // alert('✅ Login successful!');
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = res.message || 'Login failed';
            alert(` ${this.errorMessage}`);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Enter valid Credentials';
          alert(` ${this.errorMessage}`);
        }
      });
    } else {
      alert('⚠️ Please fill in all fields correctly.');
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


  sentotp(): void {
    if (this.forgotForm.valid) {
      const formValue = this.forgotForm.value;
      console.log("payload:",formValue);
      
  
      this.user.forgotpassword(formValue).subscribe({
        next: (res: any) => {
          console.log("sentotp:",res);
          
          if (res.status === 1) {
            this.otpSentMessage = '✅ OTP sent successfully to your email.';
            this.errorMessage = '';
            alert(this.otpSentMessage);
          } else {
            this.errorMessage = res.message || '❌ Could not send OTP.';
            this.otpSentMessage = '';
            alert(this.errorMessage);
          }
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || '❌ Server error while sending OTP.';
          this.otpSentMessage = '';
          alert(this.errorMessage);
        }
      });
    } else {
      this.errorMessage = '⚠️ Please fill in all fields correctly.';
      alert(this.errorMessage);
    }
  }
  
}








